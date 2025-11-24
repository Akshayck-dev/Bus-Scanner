import { ProviderSearchResponse, MergedTrip, Offer, ProviderTrip } from '@/types/aggregation';
import { generateTripId, isSameTrip } from '../utils/tripMatcher';

/**
 * Merge Engine
 * Merges trips from multiple providers into unified results
 */

export interface MergeOptions {
    sortBy?: 'price' | 'duration' | 'departure';
}

/**
 * Merge trips from multiple provider responses
 */
export function mergeTrips(
    providerResponses: ProviderSearchResponse[],
    from: string,
    to: string,
    options: MergeOptions = {}
): MergedTrip[] {
    const { sortBy = 'price' } = options;

    // Collect all trips from all providers
    const allTrips: Array<{ provider: string; trip: ProviderTrip }> = [];

    providerResponses.forEach(response => {
        response.trips.forEach(trip => {
            allTrips.push({ provider: response.provider, trip });
        });
    });

    // Group trips by similarity
    const tripGroups: Map<string, Array<{ provider: string; trip: ProviderTrip }>> = new Map();

    allTrips.forEach(({ provider, trip }) => {
        let foundGroup = false;

        // Try to find existing group this trip belongs to
        for (const [groupId, group] of tripGroups.entries()) {
            const referenceTrip = group[0].trip;
            if (isSameTrip(trip, referenceTrip, from, to)) {
                group.push({ provider, trip });
                foundGroup = true;
                break;
            }
        }

        // If no group found, create new group
        if (!foundGroup) {
            const tripId = generateTripId(trip, from, to);
            tripGroups.set(tripId, [{ provider, trip }]);
        }
    });

    // Convert groups to merged trips
    const mergedTrips: MergedTrip[] = [];

    tripGroups.forEach((group, tripId) => {
        const referenceTrip = group[0].trip;

        // Create offers from all providers in this group
        const offers: Offer[] = group.map(({ provider, trip }) => ({
            source: provider,
            price: trip.price,
            seat_class: trip.bus_type,
            booking_url: trip.booking_url,
            seats_available: trip.seats_available
        }));

        // Find best price
        const bestPrice = Math.min(...offers.map(o => o.price));

        // Convert 24h time to ISO 8601
        const departureISO = convertToISO(referenceTrip.departure_time, from);
        const arrivalISO = convertToISO(referenceTrip.arrival_time, to);

        mergedTrips.push({
            trip_id: tripId,
            operator: referenceTrip.operator,
            departure: departureISO,
            arrival: arrivalISO,
            duration: referenceTrip.duration,
            bus_type: referenceTrip.bus_type,
            best_price: bestPrice,
            offers: offers.sort((a, b) => a.price - b.price), // Sort offers by price
            route: {
                from,
                to
            },
            amenities: referenceTrip.amenities
        });
    });

    // Sort merged trips
    return sortMergedTrips(mergedTrips, sortBy);
}

/**
 * Convert 24h time to ISO 8601 format
 */
function convertToISO(time24h: string, location: string): string {
    const today = new Date();
    const [hours, minutes] = time24h.split(':').map(Number);

    const date = new Date(today);
    date.setHours(hours, minutes, 0, 0);

    return date.toISOString();
}

/**
 * Sort merged trips
 */
function sortMergedTrips(trips: MergedTrip[], sortBy: string): MergedTrip[] {
    switch (sortBy) {
        case 'price':
            return trips.sort((a, b) => a.best_price - b.best_price);

        case 'duration':
            return trips.sort((a, b) => {
                const getDurationMinutes = (dur: string) => {
                    const hourMatch = dur.match(/(\d+)h/);
                    const minMatch = dur.match(/(\d+)m/);
                    const hours = hourMatch ? parseInt(hourMatch[1]) : 0;
                    const minutes = minMatch ? parseInt(minMatch[1]) : 0;
                    return hours * 60 + minutes;
                };
                return getDurationMinutes(a.duration) - getDurationMinutes(b.duration);
            });

        case 'departure':
            return trips.sort((a, b) =>
                new Date(a.departure).getTime() - new Date(b.departure).getTime()
            );

        default:
            return trips;
    }
}
