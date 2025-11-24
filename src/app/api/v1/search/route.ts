import { NextRequest, NextResponse } from 'next/server';
import { aggregationService } from '@/lib/services/aggregationService';

/**
 * GET /api/v1/search
 * Search for buses across multiple providers
 * 
 * Query params:
 * - from: string (required) - Departure city (supports aliases)
 * - to: string (required) - Destination city (supports aliases)
 * - date: string (optional) - Travel date (YYYY-MM-DD), defaults to today
 * - passengers: number (optional) - Number of passengers, defaults to 1
 * - sort: string (optional) - Sort by 'price' (default), 'duration', or 'departure'
 */
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        // Get and validate parameters
        const from = searchParams.get('from');
        const to = searchParams.get('to');
        const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
        const passengers = parseInt(searchParams.get('passengers') || '1');

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

        // Call aggregation service
        const response = await aggregationService.searchBuses({
            from,
            to,
            date,
            passengers
        });

        return NextResponse.json(response);

    } catch (error) {
        console.error('Error in /api/v1/search:', error);

        const errorMessage = error instanceof Error ? error.message : 'Internal server error';

        return NextResponse.json(
            {
                success: false,
                error: {
                    message: errorMessage,
                    code: 'INTERNAL_ERROR'
                }
            },
            { status: 500 }
        );
    }
}
