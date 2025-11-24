import { ProviderSearchParams, ProviderSearchResponse, ProviderConfig, ProviderTrip } from '@/types/aggregation';

/**
 * Provider Connector Interface
 * All provider connectors must implement this interface
 */
export interface ProviderConnector {
    name: string;
    config: ProviderConfig;

    /**
     * Search for buses
     */
    fetchSearch(params: ProviderSearchParams): Promise<ProviderSearchResponse>;

    /**
     * Get trip details by provider-specific trip ID
     */
    fetchTripDetails(providerTripId: string): Promise<ProviderTrip | null>;

    /**
     * Health check
     */
    isHealthy(): Promise<boolean>;
}

/**
 * Base Provider Connector
 * Abstract class with common functionality
 */
export abstract class BaseProviderConnector implements ProviderConnector {
    abstract name: string;
    abstract config: ProviderConfig;

    abstract fetchSearch(params: ProviderSearchParams): Promise<ProviderSearchResponse>;
    abstract fetchTripDetails(providerTripId: string): Promise<ProviderTrip | null>;

    async isHealthy(): Promise<boolean> {
        try {
            // Basic health check - can be overridden
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Simulate network delay for realistic mock responses
     */
    protected async delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Generate booking URL
     */
    protected generateBookingUrl(tripId: string, from: string, to: string): string {
        const baseUrl = this.config.baseUrl || 'https://example.com';
        return `${baseUrl}/booking?trip=${tripId}&from=${from}&to=${to}`;
    }
}
