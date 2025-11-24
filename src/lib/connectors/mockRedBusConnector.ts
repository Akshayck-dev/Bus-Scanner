import { BaseProviderConnector } from './types';
import { ProviderSearchParams, ProviderSearchResponse, ProviderTrip, ProviderConfig } from '@/types/aggregation';
import { generateBusRoutes } from '@/lib/mockData';

/**
 * Mock RedBus Provider Connector
 * Simulates RedBus Partner API responses
 */
export class MockRedBusConnector extends BaseProviderConnector {
    name = 'RedBus';
    config: ProviderConfig = {
        baseUrl: 'https://www.redbus.in',
        partnerId: 'mock_partner_redbus'
    };

    async fetchSearch(params: ProviderSearchParams): Promise<ProviderSearchResponse> {
        await this.delay(200); // Simulate network delay

        // Generate base trips using existing mock data
        const baseTrips = generateBusRoutes(params.from, params.to, params.date);

        // Transform to provider format with RedBus-specific pricing (slightly higher)
        const trips: ProviderTrip[] = baseTrips.slice(0, 5).map((bus, index) => ({
            provider_trip_id: `redbus_${bus.id}_${index}`,
            operator: bus.operator,
            departure_time: this.convertTo24Hour(bus.departureTime),
            arrival_time: this.convertTo24Hour(bus.arrivalTime),
            duration: bus.duration,
            bus_type: bus.type,
            price: Math.round(bus.price * 1.15), // 15% markup for RedBus
            seats_available: bus.seatsAvailable,
            amenities: bus.amenities,
            booking_url: this.generateBookingUrl(`redbus_${bus.id}`, params.from, params.to)
        }));

        return {
            provider: this.name,
            trips,
            timestamp: new Date().toISOString()
        };
    }

    async fetchTripDetails(providerTripId: string): Promise<ProviderTrip | null> {
        await this.delay(150);
        // In real implementation, would fetch from API
        return null;
    }

    private convertTo24Hour(time12h: string): string {
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes] = time.split(':');

        if (hours === '12') {
            hours = '00';
        }

        if (modifier === 'PM') {
            hours = String(parseInt(hours, 10) + 12);
        }

        return `${hours.padStart(2, '0')}:${minutes}`;
    }
}

export const mockRedBusConnector = new MockRedBusConnector();
