import { ProviderTrip } from '@/types/aggregation';

/**
 * Trip Matcher Utility
 * Determines if two trips from different providers are the same trip
 */

/**
 * Simple hash function for browser compatibility
 */
function simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36).substring(0, 16);
}

/**
 * Generate a unique trip ID from trip data
 */
export function generateTripId(trip: ProviderTrip, from: string, to: string): string {
    const data = `${from}-${to}-${trip.operator}-${trip.departure_time}-${trip.duration}`;
    return simpleHash(data.toLowerCase());
}

/**
 * Check if two trips are the same
 * Matching criteria:
 * - Same route (from/to)
 * - Departure time within ±15 minutes
 * - Same operator (fuzzy match)
 * - Duration similarity (±30 minutes)
 */
export function isSameTrip(
    trip1: ProviderTrip,
    trip2: ProviderTrip,
    from: string,
    to: string
): boolean {
    // Check operator (fuzzy match)
    if (!isSameOperator(trip1.operator, trip2.operator)) {
        return false;
    }

    // Check departure time (±15 minutes)
    if (!isWithinTimeWindow(trip1.departure_time, trip2.departure_time, 15)) {
        return false;
    }

    // Check duration similarity (±30 minutes)
    if (!isSimilarDuration(trip1.duration, trip2.duration, 30)) {
        return false;
    }

    return true;
}

/**
 * Fuzzy operator name matching
 */
function isSameOperator(op1: string, op2: string): boolean {
    const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const norm1 = normalize(op1);
    const norm2 = normalize(op2);

    // Exact match
    if (norm1 === norm2) return true;

    // One contains the other
    if (norm1.includes(norm2) || norm2.includes(norm1)) return true;

    // Check if they share significant words
    const words1 = op1.toLowerCase().split(/\s+/);
    const words2 = op2.toLowerCase().split(/\s+/);
    const commonWords = words1.filter(w => words2.includes(w) && w.length > 3);

    return commonWords.length >= 2;
}

/**
 * Check if two times are within a window (in minutes)
 */
function isWithinTimeWindow(time1: string, time2: string, windowMinutes: number): boolean {
    const parseTime = (timeStr: string): number => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const minutes1 = parseTime(time1);
    const minutes2 = parseTime(time2);
    const diff = Math.abs(minutes1 - minutes2);

    return diff <= windowMinutes;
}

/**
 * Check if two durations are similar (within threshold minutes)
 */
function isSimilarDuration(dur1: string, dur2: string, thresholdMinutes: number): boolean {
    const parseDuration = (durStr: string): number => {
        const hourMatch = durStr.match(/(\d+)h/);
        const minMatch = durStr.match(/(\d+)m/);
        const hours = hourMatch ? parseInt(hourMatch[1]) : 0;
        const minutes = minMatch ? parseInt(minMatch[1]) : 0;
        return hours * 60 + minutes;
    };

    const minutes1 = parseDuration(dur1);
    const minutes2 = parseDuration(dur2);
    const diff = Math.abs(minutes1 - minutes2);

    return diff <= thresholdMinutes;
}
