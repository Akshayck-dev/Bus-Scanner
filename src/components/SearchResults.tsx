'use client';

import { useState, useMemo } from 'react';
import { MergedTrip, AggregatedSearchResponse } from '@/types/aggregation';
import BusCard from './BusCard';
import styles from '../app/search/page.module.css';

interface SearchResultsProps {
    searchData: AggregatedSearchResponse | null;
    from: string;
    to: string;
    date: string;
}

type SortOption = 'price' | 'duration' | 'early' | 'late';
type SeatTypeFilter = 'all' | 'seater' | 'sleeper';
type ACFilter = 'all' | 'ac' | 'non-ac';

export default function SearchResults({ searchData, from, to, date }: SearchResultsProps) {
    const [priceRange, setPriceRange] = useState<number>(5000);
    const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<SortOption>('price');
    const [seatType, setSeatType] = useState<SeatTypeFilter>('all');
    const [acFilter, setACFilter] = useState<ACFilter>('all');

    const [showFilters, setShowFilters] = useState(false);

    const handleTimeChange = (time: string) => {
        setSelectedTimes(prev =>
            prev.includes(time)
                ? prev.filter(t => t !== time)
                : [...prev, time]
        );
    };

    const clearAllFilters = () => {
        setPriceRange(5000);
        setSelectedTimes([]);
        setSortBy('price');
        setSeatType('all');
        setACFilter('all');
    };

    const filteredAndSortedTrips = useMemo(() => {
        if (!searchData?.results) return [];

        const filtered = searchData.results.filter(trip => {
            // Price filter
            if (trip.best_price > priceRange) return false;

            // Seat type filter
            if (seatType !== 'all') {
                const busType = trip.bus_type.toLowerCase();
                if (seatType === 'seater' && busType.includes('sleeper')) return false;
                if (seatType === 'sleeper' && !busType.includes('sleeper')) return false;
            }

            // AC filter
            if (acFilter !== 'all') {
                const busType = trip.bus_type.toLowerCase();
                if (acFilter === 'ac' && !busType.includes('ac')) return false;
                if (acFilter === 'non-ac' && busType.includes('ac')) return false;
            }

            // Time filter
            if (selectedTimes.length > 0) {
                const departureDate = new Date(trip.departure);
                const hour24 = departureDate.getHours();

                const isEarlyMorning = hour24 >= 0 && hour24 < 6;
                const isMorning = hour24 >= 6 && hour24 < 12;
                const isAfternoon = hour24 >= 12 && hour24 < 18;
                const isEvening = hour24 >= 18 && hour24 < 24;

                let matchesTime = false;
                if (selectedTimes.includes('early_morning') && isEarlyMorning) matchesTime = true;
                if (selectedTimes.includes('morning') && isMorning) matchesTime = true;
                if (selectedTimes.includes('afternoon') && isAfternoon) matchesTime = true;
                if (selectedTimes.includes('evening') && isEvening) matchesTime = true;

                if (!matchesTime) return false;
            }

            return true;
        });

        // Sort
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price':
                    return a.best_price - b.best_price;
                case 'duration':
                    const getDurationMinutes = (dur: string) => {
                        const hourMatch = dur.match(/(\d+)h/);
                        const minMatch = dur.match(/(\d+)m/);
                        const hours = hourMatch ? parseInt(hourMatch[1]) : 0;
                        const minutes = minMatch ? parseInt(minMatch[1]) : 0;
                        return hours * 60 + minutes;
                    };
                    return getDurationMinutes(a.duration) - getDurationMinutes(b.duration);
                case 'early':
                    return new Date(a.departure).getTime() - new Date(b.departure).getTime();
                case 'late':
                    return new Date(b.departure).getTime() - new Date(a.departure).getTime();
                default:
                    return 0;
            }
        });

        return filtered;
    }, [searchData, priceRange, selectedTimes, sortBy, seatType, acFilter]);

    if (!searchData) {
        return (
            <div className="container">
                <div className={styles.loading}>Loading...</div>
            </div>
        );
    }

    return (
        <div className={`container ${styles.content}`}>
            {/* Mobile Filter Toggle */}
            <button
                className={styles.mobileFilterBtn}
                onClick={() => setShowFilters(!showFilters)}
            >
                {showFilters ? 'Close Filters' : 'Filter & Sort'}
            </button>

            <aside className={`${styles.filters} ${showFilters ? styles.show : ''}`}>
                <div className={styles.filterCard}>
                    <div className={styles.filterHeader}>
                        <h3>Filter & Sorting</h3>
                        <button className={styles.removeAll} onClick={clearAllFilters}>
                            Remove All
                        </button>
                    </div>

                    {/* Sort By */}
                    <div className={styles.filterGroup}>
                        <div className={styles.filterGroupHeader}>
                            <label>Sort By</label>
                            {sortBy !== 'price' && (
                                <button className={styles.removeFilter} onClick={() => setSortBy('price')}>
                                    Remove
                                </button>
                            )}
                        </div>
                        <div className={styles.sortOptions}>
                            <button
                                className={`${styles.sortOption} ${sortBy === 'price' ? styles.active : ''}`}
                                onClick={() => setSortBy('price')}
                            >
                                💰 Cheapest First
                            </button>
                            <button
                                className={`${styles.sortOption} ${sortBy === 'duration' ? styles.active : ''}`}
                                onClick={() => setSortBy('duration')}
                            >
                                ⚡ Fastest First
                            </button>
                            <button
                                className={`${styles.sortOption} ${sortBy === 'early' ? styles.active : ''}`}
                                onClick={() => setSortBy('early')}
                            >
                                🌅 Early Departure
                            </button>
                            <button
                                className={`${styles.sortOption} ${sortBy === 'late' ? styles.active : ''}`}
                                onClick={() => setSortBy('late')}
                            >
                                🌙 Late Departure
                            </button>
                        </div>
                    </div>

                    {/* Seat Type */}
                    <div className={styles.filterGroup}>
                        <label>Seat Type</label>
                        <div className={styles.seatTypeOptions}>
                            <button
                                className={`${styles.seatTypeBtn} ${seatType === 'seater' ? styles.active : ''}`}
                                onClick={() => setSeatType(seatType === 'seater' ? 'all' : 'seater')}
                            >
                                🪑 Seater
                            </button>
                            <button
                                className={`${styles.seatTypeBtn} ${seatType === 'sleeper' ? styles.active : ''}`}
                                onClick={() => setSeatType(seatType === 'sleeper' ? 'all' : 'sleeper')}
                            >
                                🛏️ Sleeper
                            </button>
                        </div>
                    </div>

                    {/* AC Filter */}
                    <div className={styles.filterGroup}>
                        <label>AC</label>
                        <div className={styles.acOptions}>
                            <button
                                className={`${styles.acBtn} ${acFilter === 'ac' ? styles.active : ''}`}
                                onClick={() => setACFilter(acFilter === 'ac' ? 'all' : 'ac')}
                            >
                                ❄️ AC
                            </button>
                            <button
                                className={`${styles.acBtn} ${acFilter === 'non-ac' ? styles.active : ''}`}
                                onClick={() => setACFilter(acFilter === 'non-ac' ? 'all' : 'non-ac')}
                            >
                                🌡️ Non-AC
                            </button>
                        </div>
                    </div>

                    {/* Departure Time */}
                    <div className={styles.filterGroup}>
                        <label>Departure Time from {from}</label>
                        <div className={styles.timeSlots}>
                            <button
                                className={`${styles.timeSlot} ${selectedTimes.includes('early_morning') ? styles.active : ''}`}
                                onClick={() => handleTimeChange('early_morning')}
                            >
                                <span className={styles.timeIcon}>🌄</span>
                                <div>
                                    <div className={styles.timeLabel}>00:00 - 06:00</div>
                                    <div className={styles.timeSubLabel}>Early Morning</div>
                                </div>
                            </button>
                            <button
                                className={`${styles.timeSlot} ${selectedTimes.includes('morning') ? styles.active : ''}`}
                                onClick={() => handleTimeChange('morning')}
                            >
                                <span className={styles.timeIcon}>☀️</span>
                                <div>
                                    <div className={styles.timeLabel}>06:00 - 12:00</div>
                                    <div className={styles.timeSubLabel}>Morning</div>
                                </div>
                            </button>
                            <button
                                className={`${styles.timeSlot} ${selectedTimes.includes('afternoon') ? styles.active : ''}`}
                                onClick={() => handleTimeChange('afternoon')}
                            >
                                <span className={styles.timeIcon}>🌤️</span>
                                <div>
                                    <div className={styles.timeLabel}>12:00 - 18:00</div>
                                    <div className={styles.timeSubLabel}>Afternoon</div>
                                </div>
                            </button>
                            <button
                                className={`${styles.timeSlot} ${selectedTimes.includes('evening') ? styles.active : ''}`}
                                onClick={() => handleTimeChange('evening')}
                            >
                                <span className={styles.timeIcon}>🌙</span>
                                <div>
                                    <div className={styles.timeLabel}>18:00 - 23:59</div>
                                    <div className={styles.timeSubLabel}>Evening</div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className={styles.filterGroup}>
                        <label>Max Price: ₹{priceRange}</label>
                        <input
                            type="range"
                            min="0"
                            max="5000"
                            step="100"
                            value={priceRange}
                            onChange={(e) => setPriceRange(Number(e.target.value))}
                            className={styles.priceSlider}
                        />
                    </div>
                </div>
            </aside>

            <main className={styles.results}>
                <div className={styles.resultsHeader}>
                    <h2>{filteredAndSortedTrips.length} buses found</h2>
                </div>
                {filteredAndSortedTrips.length > 0 ? (
                    filteredAndSortedTrips.map((trip) => (
                        <BusCard
                            key={trip.trip_id}
                            trip={trip}
                            from={from}
                            to={to}
                            date={date}
                        />
                    ))
                ) : (
                    <div className={styles.noResults}>
                        <h3>No buses found</h3>
                        <p>Try adjusting your filters.</p>
                        <button className={styles.clearFiltersBtn} onClick={clearAllFilters}>
                            Clear All Filters
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
