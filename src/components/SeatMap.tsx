'use client';

import { useState, useEffect } from 'react';
import { Seat, SeatStatus } from '@/types/seats';
import styles from './SeatMap.module.css';

interface SeatMapProps {
    busType: string;
    price: number;
    onSeatSelect: (seats: Seat[]) => void;
}

export default function SeatMap({ busType, price, onSeatSelect }: SeatMapProps) {
    const [seats, setSeats] = useState<Seat[]>([]);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    // Generate mock seats based on bus type
    useEffect(() => {
        const isSleeper = busType.toLowerCase().includes('sleeper');
        const generatedSeats: Seat[] = [];
        const rows = isSleeper ? 6 : 10;
        const cols = isSleeper ? 3 : 4; // 2+1 for sleeper, 2+2 for seater

        for (let r = 1; r <= rows; r++) {
            for (let c = 1; c <= cols; c++) {
                // Skip some seats to create aisle
                if (isSleeper && c === 2) continue; // Aisle in middle for 2+1
                if (!isSleeper && c === 3) continue; // Aisle in middle for 2+2

                const seatId = `${r}-${c}`;
                const isLadies = Math.random() > 0.9;
                const isBooked = Math.random() > 0.7;

                generatedSeats.push({
                    id: seatId,
                    row: r,
                    column: c,
                    number: `${r}${String.fromCharCode(64 + c)}`,
                    status: isBooked ? 'booked' : (isLadies ? 'ladies' : 'available'),
                    type: isSleeper ? 'upper' : 'lower', // Simplified for now
                    position: c === 1 || c === cols ? 'window' : 'aisle',
                    price: price
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setSeats(generatedSeats);
    }, [busType, price]);

    const handleSeatClick = (seat: Seat) => {
        if (seat.status === 'booked') return;

        let newSelected: string[];
        if (selectedSeats.includes(seat.id)) {
            newSelected = selectedSeats.filter(id => id !== seat.id);
        } else {
            if (selectedSeats.length >= 6) {
                alert('You can only select up to 6 seats');
                return;
            }
            newSelected = [...selectedSeats, seat.id];
        }

        setSelectedSeats(newSelected);

        const selectedSeatObjects = seats.filter(s => newSelected.includes(s.id));
        onSeatSelect(selectedSeatObjects);
    };

    return (
        <div className={styles.seatMapContainer}>
            <div className={styles.legend}>
                <div className={styles.legendItem}>
                    <div className={`${styles.seatIcon} ${styles.available}`}></div>
                    <span>Available</span>
                </div>
                <div className={styles.legendItem}>
                    <div className={`${styles.seatIcon} ${styles.selected}`}></div>
                    <span>Selected</span>
                </div>
                <div className={styles.legendItem}>
                    <div className={`${styles.seatIcon} ${styles.booked}`}></div>
                    <span>Booked</span>
                </div>
                <div className={styles.legendItem}>
                    <div className={`${styles.seatIcon} ${styles.ladies}`}></div>
                    <span>Ladies</span>
                </div>
            </div>

            <div className={styles.busLayout}>
                <div className={styles.driverCabin}>
                    <div className={styles.steeringWheel}></div>
                </div>

                <div className={styles.seatsGrid}>
                    {seats.map((seat) => (
                        <button
                            key={seat.id}
                            className={`
                                ${styles.seat} 
                                ${styles[seat.status]} 
                                ${selectedSeats.includes(seat.id) ? styles.selected : ''}
                                ${seat.type === 'upper' ? styles.sleeper : styles.seater}
                            `}
                            onClick={() => handleSeatClick(seat)}
                            disabled={seat.status === 'booked'}
                            style={{
                                gridRow: seat.row,
                                gridColumn: seat.column > 2 ? seat.column + 1 : seat.column // Adjust for aisle
                            }}
                            title={`Seat ${seat.number} - ₹${seat.price}`}
                        >
                            <span className={styles.seatNumber}>{seat.number}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
