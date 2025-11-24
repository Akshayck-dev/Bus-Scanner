import { busDataProvider } from '../providers';
import { BusRoute } from '@/types/bus';

/**
 * Bus service layer
 * Provides business logic and calls the data provider
 */
class BusService {
    /**
     * Search for buses
     */
    async searchBuses(params: {
        from: string;
        to: string;
        date: string;
    }): Promise<BusRoute[]> {
        // Validate parameters
        if (!params.from || !params.to) {
            throw new Error('From and To cities are required');
        }

        // Call data provider
        return await busDataProvider.searchBuses(params);
    }

    /**
     * Get bus by ID
     */
    async getBusById(params: {
        id: string;
        from: string;
        to: string;
        date: string;
    }): Promise<BusRoute | null> {
        if (!params.id) {
            throw new Error('Bus ID is required');
        }

        return await busDataProvider.getBusById(params);
    }

    /**
     * Get popular routes
     */
    async getPopularRoutes(): Promise<BusRoute[]> {
        return await busDataProvider.getPopularRoutes();
    }
}

// Export singleton instance
export const busService = new BusService();
