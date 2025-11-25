import { BaseProviderConnector } from './types';
import { ProviderSearchParams, ProviderSearchResponse, ProviderTrip, ProviderConfig } from '@/types/aggregation';
import { generateBusRoutes } from '@/lib/mockData';

/**
 * Mock AbhiBus Provider Connector
 * Simulates AbhiBus Partner API responses
 */
export class MockAbhiBusConnector extends BaseProviderConnector {
    name = 'AbhiBus';
    config: ProviderConfig = {
        baseUrl: 'https://www.abhibus.com',
        partnerId: 'mock_partner_abhibus'
    };

    async fetchSearch(params: ProviderSearchParams): Promise<ProviderSearchResponse> {
        await this.delay(250); // Simulate network delay

        // Generate base trips
        const baseTrips = generateBusRoutes(params.from, params.to, params.date);

        // Transform to provider format with AbhiBus-specific pricing (moderate markup)
        const trips: ProviderTrip[] = baseTrips.slice(0, 6).map((bus, index) => ({
            provider_trip_id: `abhibus_${bus.id}_${index}`,
            operator: bus.operator,
            departure_time: this.convertTo24Hour(bus.departureTime),
            arrival_time: this.convertTo24Hour(bus.arrivalTime),
            duration: bus.duration,
            bus_type: bus.type,
            price: Math.round(bus.price * 1.08), // 8% markup for AbhiBus
            seats_available: bus.seatsAvailable,
            amenities: bus.amenities,
            booking_url: this.generateBookingUrl(`abhibus_${bus.id}`, params.from, params.to)
        }));

        return {
            provider: this.name,
            trips,
            timestamp: new Date().toISOString()
        };
    }

    async fetchTripDetails(providerTripId: string): Promise<ProviderTrip | null> {
        await this.delay(150);
        return null;
    }

    private convertTo24Hour(time12h: string): string {
        const [time, modifier] = time12h.split(' ');
        const [rawHours, minutes] = time.split(':');
        let hours = rawHours;

        if (hours === '12') {
            hours = '00';
        }

        if (modifier === 'PM') {
            hours = String(parseInt(hours, 10) + 12);
        }

        return `${hours.padStart(2, '0')}:${minutes}`;
    }
}

export const mockAbhiBusConnector = new MockAbhiBusConnector();
