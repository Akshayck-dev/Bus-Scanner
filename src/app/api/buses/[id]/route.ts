import { NextRequest, NextResponse } from 'next/server';
import { busService } from '@/lib/services/busService';
import { ApiResponse } from '@/lib/providers/types';
import { BusRoute } from '@/types/bus';

/**
 * GET /api/buses/[id]
 * Get a specific bus by ID
 * 
 * Query params:
 * - from: string (required)
 * - to: string (required)
 * - date: string (optional)
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const searchParams = request.nextUrl.searchParams;
        const from = searchParams.get('from');
        const to = searchParams.get('to');
        const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

        // Validate required parameters
        if (!from || !to) {
            const response: ApiResponse<null> = {
                success: false,
                error: {
                    message: 'Missing required parameters: from and to',
                    code: 'MISSING_PARAMS'
                }
            };
            return NextResponse.json(response, { status: 400 });
        }

        // Call service layer
        const bus = await busService.getBusById({ id, from, to, date });

        if (!bus) {
            const response: ApiResponse<null> = {
                success: false,
                error: {
                    message: 'Bus not found',
                    code: 'NOT_FOUND'
                }
            };
            return NextResponse.json(response, { status: 404 });
        }

        const response: ApiResponse<BusRoute> = {
            success: true,
            data: bus
        };

        return NextResponse.json(response);

    } catch (error) {
        console.error('Error in /api/buses/[id]:', error);

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
