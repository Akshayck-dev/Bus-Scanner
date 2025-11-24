/**
 * Aggregation System Types
 * Types for multi-provider bus aggregation
 */

// Search Query
export interface SearchQuery {
    from: string;
    to: string;
    date: string;
    passengers: number;
}

// Offer from a specific provider
export interface Offer {
    source: string;
    price: number;
    seat_class?: string;
    booking_url: string;
    seats_available?: number;
}

// Merged trip with offers from multiple providers
export interface MergedTrip {
    trip_id: string;
    operator: string;
    departure: string; // ISO 8601
    arrival: string; // ISO 8601
    duration: string;
    bus_type: string;
    best_price: number;
    offers: Offer[];
    route?: {
        from: string;
        to: string;
        distance?: string;
    };
    amenities?: string[];
}

// Warning for failed providers
export interface Warning {
    source: string;
    error: string;
    timestamp: string;
}

// Aggregated search response
export interface AggregatedSearchResponse {
    query: SearchQuery;
    results: MergedTrip[];
    warnings: Warning[];
    cache_ttl_seconds: number;
    metadata?: {
        total_providers: number;
        successful_providers: number;
        total_trips_before_merge: number;
        total_trips_after_merge: number;
    };
}

// Trip details response
export interface TripDetailsResponse {
    trip: MergedTrip;
    route_info: {
        from: string;
        to: string;
        distance: string;
        stops?: string[];
    };
    operator_info: {
        name: string;
        rating?: number;
        contact?: string;
    };
    schedules: {
        boarding_points?: Array<{ location: string; time: string }>;
        dropping_points?: Array<{ location: string; time: string }>;
    };
    vehicle_info: {
        type: string;
        amenities: string[];
        seats_layout?: string;
    };
    offers: Offer[];
}

// Provider-specific types
export interface ProviderSearchParams {
    from: string;
    to: string;
    date: string;
    passengers: number;
}

export interface ProviderTrip {
    provider_trip_id: string;
    operator: string;
    departure_time: string;
    arrival_time: string;
    duration: string;
    bus_type: string;
    price: number;
    seats_available: number;
    amenities?: string[];
    booking_url: string;
}

export interface ProviderSearchResponse {
    provider: string;
    trips: ProviderTrip[];
    timestamp: string;
}

export interface ProviderConfig {
    apiKey?: string;
    baseUrl?: string;
    partnerId?: string;
    timeout?: number;
}
