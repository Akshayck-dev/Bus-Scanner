'use client';

import { useState } from 'react';
import { BusRoute } from '@/types/bus';
import { Wifi, Coffee, BatteryCharging, MapPin, Info, Armchair } from 'lucide-react';
import { BOARDING_POINTS, DROPPING_POINTS } from '@/lib/mockData';
import styles from './BusDetails.module.css';

interface BusDetailsProps {
    bus: BusRoute;
}

export default function BusDetails({ bus }: BusDetailsProps) {
    const [activeTab, setActiveTab] = useState<'seats' | 'amenities' | 'points'>('seats');
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    const toggleSeat = (seatNo: string) => {
        if (selectedSeats.includes(seatNo)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seatNo));
        } else {
            if (selectedSeats.length < 6) {
                setSelectedSeats([...selectedSeats, seatNo]);
            }
        }
    };

    const totalPrice = selectedSeats.length * bus.price;
    const tax = Math.round(totalPrice * 0.05);
    const finalAmount = totalPrice + tax;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'seats' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('seats')}
                    >
                        Select Seats
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'points' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('points')}
                    >
                        Boarding & Dropping
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'amenities' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('amenities')}
                    >
                        Amenities
                    </button>
                </div>
            </div>

            <div className={styles.content}>
                {activeTab === 'seats' && (
                    <div className={styles.seatsView}>
                        <div className={styles.busLayout}>
                            <div className={styles.driverCabin}>
                                <Armchair size={24} className={styles.driverIcon} />
                            </div>
                            <div className={styles.deck}>
                                <div className={styles.row}>
                                    {['1A', '2A', '3A', '4A', '5A', '6A'].map(seat => (
                                        <button
                                            key={seat}
                                            className={`${styles.seat} ${selectedSeats.includes(seat) ? styles.selectedSeat : ''}`}
                                            onClick={() => toggleSeat(seat)}
                                        >
                                            {seat}
                                        </button>
                                    ))}
                                </div>
                                <div className={styles.aisle}></div>
                                <div className={styles.row}>
                                    {['1B', '2B', '3B', '4B', '5B', '6B'].map(seat => (
                                        <button
                                            key={seat}
                                            className={`${styles.seat} ${selectedSeats.includes(seat) ? styles.selectedSeat : ''}`}
                                            onClick={() => toggleSeat(seat)}
                                        >
                                            {seat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={styles.bookingSummary}>
                            <h3>Booking Summary</h3>
                            <div className={styles.summaryRow}>
                                <span>Seat(s):</span>
                                <span>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Base Fare:</span>
                                <span>₹{totalPrice}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Tax (5%):</span>
                                <span>₹{tax}</span>
                            </div>
                            <div className={`${styles.summaryRow} ${styles.total}`}>
                                <span>Total Amount:</span>
                                <span>₹{finalAmount}</span>
                            </div>
                            <button
                                className={styles.payBtn}
                                disabled={selectedSeats.length === 0}
                            >
                                Proceed to Pay
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'points' && (
                    <div className={styles.pointsView}>
                        <div className={styles.pointColumn}>
                            <h3><MapPin size={18} /> Boarding Points</h3>
                            <ul className={styles.pointList}>
                                {BOARDING_POINTS.map((point, i) => (
                                    <li key={i} className={styles.pointItem}>
                                        <span className={styles.pointTime}>
                                            {/* Mock time logic relative to departure */}
                                            {bus.departureTime}
                                        </span>
                                        <span className={styles.pointName}>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.pointColumn}>
                            <h3><MapPin size={18} /> Dropping Points</h3>
                            <ul className={styles.pointList}>
                                {DROPPING_POINTS.map((point, i) => (
                                    <li key={i} className={styles.pointItem}>
                                        <span className={styles.pointTime}>
                                            {/* Mock time logic relative to arrival */}
                                            {bus.arrivalTime}
                                        </span>
                                        <span className={styles.pointName}>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {activeTab === 'amenities' && (
                    <div className={styles.amenitiesView}>
                        <h3>Amenities</h3>
                        <div className={styles.amenitiesGrid}>
                            {bus.amenities.map((amenity, i) => (
                                <div key={i} className={styles.amenityCard}>
                                    {amenity === 'Wifi' && <Wifi size={20} />}
                                    {amenity.includes('Power') && <BatteryCharging size={20} />}
                                    {amenity.includes('Water') && <Coffee size={20} />}
                                    {!['Wifi', 'Power', 'Water'].some(k => amenity.includes(k)) && <Info size={20} />}
                                    <span>{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
