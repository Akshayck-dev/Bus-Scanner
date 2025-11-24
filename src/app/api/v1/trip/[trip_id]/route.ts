import { NextRequest, NextResponse } from 'next/server';
import { aggregationService } from '@/lib/services/aggregationService';
import { TripDetailsResponse } from '@/types/aggregation';

/**
 * GET /api/v1/trip/:trip_id
 * Get detailed information about a specific trip
 * 
 * Query params:
 * - from: string (required) - For context
 * - to: string (required) - For context
 * - date: string (optional) - For context
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ trip_id: string }> }
) {
    try {
        const { trip_id } = await params;
        const searchParams = request.nextUrl.searchParams;

        const from = searchParams.get('from');
        const to = searchParams.get('to');
        const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

        if (!from || !to) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        message: 'Missing required parameters: from and to',
                        code: 'MISSING_PARAMS'
                    }
                },
                { status: 400 }
            );
        }

        // Search to find the trip
        const searchResponse = await aggregationService.searchBuses({
            from,
            to,
            date,
            passengers: 1
        });

        const trip = searchResponse.results.find(t => t.trip_id === trip_id);

        if (!trip) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        message: 'Trip not found',
                        code: 'NOT_FOUND'
                    }
                },
                { status: 404 }
            );
        }

        // Build detailed response
        const response: TripDetailsResponse = {
            trip,
            route_info: {
                from: trip.route?.from || from,
                to: trip.route?.to || to,
                distance: trip.route?.distance || 'N/A'
            },
            operator_info: {
                name: trip.operator,
                rating: 4.2,
                contact: '+91-1800-XXX-XXXX'
            },
            schedules: {
                boarding_points: [
                    { location: 'Main Bus Stand', time: trip.departure },
                    { location: 'City Center', time: trip.departure }
                ],
                dropping_points: [
                    { location: 'Central Station', time: trip.arrival },
                    { location: 'Airport Road', time: trip.arrival }
                ]
            },
            vehicle_info: {
                type: trip.bus_type,
                amenities: trip.amenities || [],
                seats_layout: '2+2'
            },
            offers: trip.offers
        };

        return NextResponse.json(response);

    } catch (error) {
        console.error('Error in /api/v1/trip/:trip_id:', error);

        return NextResponse.json(
            {
                success: false,
                error: {
                    message: error instanceof Error ? error.message : 'Internal server error',
                    code: 'INTERNAL_ERROR'
                }
            },
            { status: 500 }
        );
    }
}
