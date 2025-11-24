import { BusRoute } from '@/types/bus';

/**
 * Interface for bus data providers
 * All providers (mock, real API, etc.) must implement this interface
 */
export interface BusDataProvider {
    /**
     * Search for buses between two cities on a specific date
     */
    searchBuses(params: {
        from: string;
        to: string;
        date: string;
    }): Promise<BusRoute[]>;

    /**
     * Get a specific bus by ID
     */
    getBusById(params: {
        id: string;
        from: string;
        to: string;
        date: string;
    }): Promise<BusRoute | null>;

    /**
     * Get popular bus routes
     */
    getPopularRoutes(): Promise<BusRoute[]>;
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        message: string;
        code?: string;
    };
}

/**
 * Search parameters
 */
export interface SearchParams {
    from: string;
    to: string;
    date: string;
}
