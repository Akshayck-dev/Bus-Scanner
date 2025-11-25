'use client';

import { useState } from 'react';
import { MergedTrip } from '@/types/aggregation';
import styles from './BusCard.module.css';
import { Star, Bus, Wifi, Coffee, BatteryCharging } from 'lucide-react';
import SeatSelectionModal from './SeatSelectionModal';

interface BusCardProps {
    trip: MergedTrip;
    from: string;
    to: string;
    date: string;
}

export default function BusCard({ trip, from, to, date }: BusCardProps) {
    const [isSeatModalOpen, setIsSeatModalOpen] = useState(false);

    // Format ISO time to readable format (HH:MM)
    const formatTime = (isoTime: string) => {
        const date = new Date(isoTime);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    // Calculate duration string
    const getDuration = () => {
        const start = new Date(trip.departure);
        const end = new Date(trip.arrival);
        const diff = end.getTime() - start.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
    };

    // Mock rating (random between 3.5 and 5.0)
    const rating = (3.5 + Math.random() * 1.5).toFixed(1);
    const ratingCount = Math.floor(Math.random() * 1000) + 50;

    return (
        <>
            <div className={styles.card} onClick={() => setIsSeatModalOpen(true)}>
                {/* Top Badges */}
                <div className={styles.topBadges}>
                    <span className={`${styles.badge} ${styles.badgeStarting}`}>IS STARTING</span>
                </div>

                {/* Route Info */}
                <div className={styles.routeInfo}>
                    From: {from.toUpperCase()} ▶ {to.toUpperCase()}
                </div>

                {/* Main Time & Price Row */}
                <div className={styles.mainRow}>
                    <div className={styles.timeSection}>
                        <span className={styles.time}>{formatTime(trip.departure)}</span>
                        <span className={styles.duration}>— {getDuration()} —</span>
                        <span className={styles.time}>{formatTime(trip.arrival)}</span>
                    </div>
                    <div className={styles.priceSection}>
                        <div className={styles.price}>₹{trip.best_price}</div>
                        <span className={styles.priceLabel}>Onwards</span>
                    </div>
                </div>

                {/* Operator Info Row */}
                <div className={styles.operatorRow}>
                    <div className={styles.operatorInfo}>
                        <div className={styles.operatorName}>
                            {trip.operator}
                            <Bus size={14} className="text-gray-400" />
                        </div>
                        <div className={styles.busType}>{trip.bus_type}</div>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className={styles.ratingBadge}>
                            <Star size={10} fill="white" />
                            {rating}
                        </div>
                        <span className={styles.ratingCount}>{ratingCount}</span>
                    </div>
                </div>

                {/* Footer / Offers */}
                <div className={styles.footer}>
                    <div className={styles.offerBadge}>
                        Try new ₹100 OFF
                    </div>
                    <div className={styles.amenities}>
                        <Wifi size={14} className={styles.amenityIcon} />
                        <BatteryCharging size={14} className={styles.amenityIcon} />
                        <Coffee size={14} className={styles.amenityIcon} />
                    </div>
                </div>
            </div>

            <SeatSelectionModal
                isOpen={isSeatModalOpen}
                onClose={() => setIsSeatModalOpen(false)}
                busName={trip.operator}
                busType={trip.bus_type}
                price={trip.best_price}
                from={from}
                to={to}
                date={date}
            />
        </>
    );
}
