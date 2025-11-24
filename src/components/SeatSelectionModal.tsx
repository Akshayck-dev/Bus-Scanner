'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Seat } from '@/types/seats';
import SeatMap from './SeatMap';
import styles from './SeatSelectionModal.module.css';

interface SeatSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    busName: string;
    busType: string;
    price: number;
    from: string;
    to: string;
    date: string;
}

export default function SeatSelectionModal({
    isOpen,
    onClose,
    busName,
    busType,
    price,
    from,
    to,
    date
}: SeatSelectionModalProps) {
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

    if (!isOpen) return null;

    const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

    const handleBook = () => {
        alert(`Booking confirmed for ${selectedSeats.length} seats!\nTotal: ₹${totalPrice}`);
        onClose();
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div>
                        <h2 className={styles.busName}>{busName}</h2>
                        <p className={styles.routeInfo}>
                            {from} → {to} • {date}
                        </p>
                    </div>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className={styles.content}>
                    <div className={styles.seatMapSection}>
                        <h3 className={styles.sectionTitle}>Select Seats</h3>
                        <SeatMap
                            busType={busType}
                            price={price}
                            onSeatSelect={setSelectedSeats}
                        />
                    </div>

                    <div className={styles.summarySection}>
                        <h3 className={styles.sectionTitle}>Booking Summary</h3>

                        <div className={styles.summaryCard}>
                            <div className={styles.summaryRow}>
                                <span>Seat(s)</span>
                                <span className={styles.seatList}>
                                    {selectedSeats.map(s => s.number).join(', ') || '-'}
                                </span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Price per seat</span>
                                <span>₹{price}</span>
                            </div>
                            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                                <span>Total Amount</span>
                                <span>₹{totalPrice}</span>
                            </div>

                            <button
                                className={styles.bookBtn}
                                disabled={selectedSeats.length === 0}
                                onClick={handleBook}
                            >
                                Proceed to Book
                            </button>
                        </div>

                        <div className={styles.infoNote}>
                            <p>🔒 Secure Payment</p>
                            <p>⚡ Instant Confirmation</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
