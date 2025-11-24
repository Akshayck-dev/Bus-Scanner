/**
 * Seat Types and Interfaces
 */

export type SeatStatus = 'available' | 'selected' | 'booked' | 'ladies';

export interface Seat {
    id: string;
    row: number;
    column: number;
    number: string;
    status: SeatStatus;
    type: 'lower' | 'upper';
    position: 'window' | 'aisle' | 'middle';
    price: number;
}

export interface SeatLayout {
    rows: number;
    columns: number;
    seats: Seat[];
}

export interface SeatSelection {
    seats: Seat[];
    totalPrice: number;
    count: number;
}
