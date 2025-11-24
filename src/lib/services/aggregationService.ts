import { getActiveProviders } from '../connectors';
import { mergeTrips } from './mergeEngine';
import { inMemoryCache } from '../cache/inMemoryCache';
import { cityResolver } from '../utils/cityResolver';
import { AggregatedSearchResponse, SearchQuery, Warning, ProviderSearchResponse } from '@/types/aggregation';

/**
 * Simple hash function for cache keys
 */
function simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
}

/**
 * Aggregation Service
 * Orchestrates multi-provider search and merging
 */

const CACHE_TTL_SECONDS = 300; // 5 minutes

export class AggregationService {
    /**
     * Search buses across all providers
     */
    async searchBuses(query: SearchQuery): Promise<AggregatedSearchResponse> {
        // Resolve city names
        const resolvedFrom = cityResolver.resolveCity(query.from);
        const resolvedTo = cityResolver.resolveCity(query.to);

        if (!resolvedFrom || !resolvedTo) {
            throw new Error(`Invalid cities: ${query.from} or ${query.to}`);
        }

        // Create cache key
        const cacheKey = this.generateCacheKey(resolvedFrom, resolvedTo, query.date, query.passengers);

        // Check cache
        const cached = inMemoryCache.get<AggregatedSearchResponse>(cacheKey);
        if (cached) {
            return cached;
        }

        // Get all active providers
        const providers = getActiveProviders();
        const warnings: Warning[] = [];
        const providerResponses: ProviderSearchResponse[] = [];

        // Call all providers in parallel
        const results = await Promise.allSettled(
            providers.map(provider =>
                provider.fetchSearch({
                    from: resolvedFrom,
                    to: resolvedTo,
                    date: query.date,
                    passengers: query.passengers
                })
            )
        );

        // Process results
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                providerResponses.push(result.value);
            } else {
                warnings.push({
                    source: providers[index].name,
                    error: result.reason?.message || 'Unknown error',
                    timestamp: new Date().toISOString()
                });
            }
        });

        // Merge trips from all providers
        const totalTripsBeforeMerge = providerResponses.reduce((sum, r) => sum + r.trips.length, 0);
        const mergedTrips = mergeTrips(providerResponses, resolvedFrom, resolvedTo, { sortBy: 'price' });

        // Build response
        const response: AggregatedSearchResponse = {
            query: {
                from: resolvedFrom,
                to: resolvedTo,
                date: query.date,
                passengers: query.passengers
            },
            results: mergedTrips,
            warnings,
            cache_ttl_seconds: CACHE_TTL_SECONDS,
            metadata: {
                total_providers: providers.length,
                successful_providers: providerResponses.length,
                total_trips_before_merge: totalTripsBeforeMerge,
                total_trips_after_merge: mergedTrips.length
            }
        };

        // Cache the response
        inMemoryCache.set(cacheKey, response, CACHE_TTL_SECONDS);

        return response;
    }

    /**
     * Generate cache key
     */
    private generateCacheKey(from: string, to: string, date: string, passengers: number): string {
        const data = `search:${from}:${to}:${date}:${passengers}`;
        return simpleHash(data.toLowerCase());
    }
}

// Export singleton instance
export const aggregationService = new AggregationService();
