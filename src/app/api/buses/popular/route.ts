import { NextResponse } from 'next/server';
import { busService } from '@/lib/services/busService';
import { ApiResponse } from '@/lib/providers/types';
import { BusRoute } from '@/types/bus';

/**
 * GET /api/buses/popular
 * Get popular bus routes
 */
export async function GET() {
    try {
        const routes = await busService.getPopularRoutes();

        const response: ApiResponse<BusRoute[]> = {
            success: true,
            data: routes
        };

        return NextResponse.json(response);

    } catch (error) {
        console.error('Error in /api/buses/popular:', error);

        const response: ApiResponse<null> = {
            success: false,
            error: {
                message: error instanceof Error ? error.message : 'Internal server error',
                code: 'INTERNAL_ERROR'
            }
        };

        return NextResponse.json(response, { status: 500 });
    }
}
