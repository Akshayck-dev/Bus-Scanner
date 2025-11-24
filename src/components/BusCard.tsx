'use client';

import { useState } from 'react';
import { MergedTrip } from '@/types/aggregation';
import styles from './BusCard.module.css';
import { Clock, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import SeatSelectionModal from './SeatSelectionModal';

interface BusCardProps {
    trip: MergedTrip;
    from: string;
    to: string;
    date: string;
}

export default function BusCard({ trip, from, to, date }: BusCardProps) {
    const [showOffers, setShowOffers] = useState(false);
    const [isSeatModalOpen, setIsSeatModalOpen] = useState(false);

    // Format ISO time to readable format
    const formatTime = (isoTime: string) => {
        const date = new Date(isoTime);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    // Find cheapest offer
    const cheapestOffer = trip.offers[0]; // Already sorted by price

    return (
        <>
            <div className={styles.card}>
                {/* Gradient Border */}
                <div className={styles.gradientBorder}></div>

                <div className={styles.cardContent}>
                    {/* Operator Badge */}
                    <div className={styles.operatorSection}>
                        <div className={styles.operatorBadge}>
                            <div className={styles.badgeGradient}></div>
                            <span className={styles.badgeText}>
                                {trip.operator.substring(0, 2).toUpperCase()}
                            </span>
                        </div>
                        <div className={styles.operatorInfo}>
                            <div className={styles.operatorName}>{trip.operator}</div>
                            <div className={styles.busType}>{trip.bus_type}</div>
                            {trip.offers.length > 1 && (
                                <div className={styles.providerCount}>
                                    {trip.offers.length} providers
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Journey Timeline */}
                    <div className={styles.journey}>
                        <div className={styles.timePoint}>
                            <div className={styles.time}>{formatTime(trip.departure)}</div>
                            <div className={styles.city}>{trip.route?.from || from}</div>
                        </div>

                        <div className={styles.timeline}>
                            <div className={styles.timelineDot}></div>
                            <div className={styles.timelineLine}></div>
                            <div className={styles.timelineInfo}>
                                <Clock size={14} />
                                <span>{trip.duration}</span>
                            </div>
                            <div className={styles.timelineLine}></div>
                            <div className={styles.timelineDot}></div>
                        </div>

                        <div className={styles.timePoint}>
                            <div className={styles.time}>{formatTime(trip.arrival)}</div>
                            <div className={styles.city}>{trip.route?.to || to}</div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className={styles.details}>
                        {trip.route?.distance && (
                            <div className={styles.detailItem}>
                                <MapPin size={16} />
                                <span>{trip.route.distance}</span>
                            </div>
                        )}
                        {trip.amenities && trip.amenities.length > 0 && (
                            <div className={styles.amenityTags}>
                                {trip.amenities.slice(0, 2).map((amenity, i) => (
                                    <span key={i} className={styles.amenityTag}>{amenity}</span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Price & CTA */}
                    <div className={styles.priceSection}>
                        <div className={styles.priceInfo}>
                            <div className={styles.priceLabel}>Best Price</div>
                            <div className={styles.price}>
                                ₹{trip.best_price.toLocaleString()}
                            </div>
                            {trip.offers.length > 1 && (
                                <div className={styles.savingsText}>
                                    Save ₹{(trip.offers[trip.offers.length - 1].price - trip.best_price).toLocaleString()}
                                </div>
                            )}
                        </div>
                        <button
                            className={styles.bookBtn}
                            onClick={() => setIsSeatModalOpen(true)}
                        >
                            <span>Select Seats</span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M8 16l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Multi-Provider Offers */}
                {trip.offers.length > 1 && (
                    <div className={styles.offersSection}>
                        <button
                            className={styles.toggleOffers}
                            onClick={() => setShowOffers(!showOffers)}
                        >
                            <span>Compare {trip.offers.length} Offers</span>
                            {showOffers ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>

                        {showOffers && (
                            <div className={styles.offersList}>
                                {trip.offers.map((offer, index) => (
                                    <div key={index} className={styles.offerItem}>
                                        <div className={styles.offerSource}>
                                            <strong>{offer.source}</strong>
                                            {index === 0 && (
                                                <span className={styles.bestPriceBadge}>Best Price</span>
                                            )}
                                        </div>
                                        <div className={styles.offerPrice}>
                                            ₹{offer.price.toLocaleString()}
                                        </div>
                                        <button
                                            className={styles.offerBookBtn}
                                            onClick={() => window.open(offer.booking_url, '_blank')}
                                        >
                                            Book
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Amenities Footer */}
                {trip.amenities && trip.amenities.length > 0 && (
                    <div className={styles.footer}>
                        <div className={styles.amenities}>
                            {trip.amenities.slice(0, 4).map((amenity, i) => (
                                <span key={i} className={styles.amenity}>{amenity}</span>
                            ))}
                            {trip.amenities.length > 4 && (
                                <span className={styles.amenityMore}>+{trip.amenities.length - 4} more</span>
                            )}
                        </div>
                    </div>
                )}
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
