import { BusDataProvider } from './types';
import { BusRoute } from '@/types/bus';
import { generateBusRoutes, POPULAR_ROUTES } from '@/lib/mockData';

/**
 * Mock data provider implementation
 * Uses the existing mock data generation logic
 */
export class MockDataProvider implements BusDataProvider {
    async searchBuses(params: {
        from: string;
        to: string;
        date: string;
    }): Promise<BusRoute[]> {
        // Simulate network delay for realism
        await this.delay(300);

        const buses = generateBusRoutes(params.from, params.to, params.date);
        return buses;
    }

    async getBusById(params: {
        id: string;
        from: string;
        to: string;
        date: string;
    }): Promise<BusRoute | null> {
        await this.delay(200);

        const buses = generateBusRoutes(params.from, params.to, params.date);
        const bus = buses.find(b => b.id === params.id);
        return bus || null;
    }

    async getPopularRoutes(): Promise<BusRoute[]> {
        await this.delay(100);
        return POPULAR_ROUTES;
    }

    /**
     * Simulate network delay
     */
    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Export singleton instance
export const mockDataProvider = new MockDataProvider();
