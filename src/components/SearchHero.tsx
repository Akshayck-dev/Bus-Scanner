'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Calendar, ArrowLeftRight, Minus, Plus } from 'lucide-react';
import { INDIAN_CITIES } from '@/lib/mockData';
import { addRecentSearch } from '@/lib/utils/localStorage';
import RecentSearches from './RecentSearches';
import styles from './SearchHero.module.css';

export default function SearchHero() {
    const router = useRouter();
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [fromSuggestions, setFromSuggestions] = useState<string[]>([]);
    const [toSuggestions, setToSuggestions] = useState<string[]>([]);
    const [fromFocused, setFromFocused] = useState(false);
    const [toFocused, setToFocused] = useState(false);
    const [selectedFromIndex, setSelectedFromIndex] = useState(-1);
    const [selectedToIndex, setSelectedToIndex] = useState(-1);
    const [travellers, setTravellers] = useState(1);
    const [showTravellerModal, setShowTravellerModal] = useState(false);

    const fromInputRef = useRef<HTMLInputElement>(null);
    const toInputRef = useRef<HTMLInputElement>(null);
    const travellerRef = useRef<HTMLDivElement>(null);

    const handleFromChange = (value: string) => {
        setFrom(value);
        setSelectedFromIndex(-1);
        if (value.length > 0) {
            const filtered = INDIAN_CITIES.filter(city =>
                city.toLowerCase().includes(value.toLowerCase())
            ).slice(0, 8);
            setFromSuggestions(filtered);
        } else {
            setFromSuggestions([]);
        }
    };

    const handleToChange = (value: string) => {
        setTo(value);
        setSelectedToIndex(-1);
        if (value.length > 0) {
            const filtered = INDIAN_CITIES.filter(city =>
                city.toLowerCase().includes(value.toLowerCase())
            ).slice(0, 8);
            setToSuggestions(filtered);
        } else {
            setToSuggestions([]);
        }
    };

    const handleFromKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedFromIndex(prev =>
                prev < fromSuggestions.length - 1 ? prev + 1 : prev
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedFromIndex(prev => prev > 0 ? prev - 1 : -1);
        } else if (e.key === 'Enter' && selectedFromIndex >= 0) {
            e.preventDefault();
            setFrom(fromSuggestions[selectedFromIndex]);
            setFromSuggestions([]);
            setSelectedFromIndex(-1);
            toInputRef.current?.focus();
        } else if (e.key === 'Escape') {
            setFromSuggestions([]);
            setSelectedFromIndex(-1);
        }
    };

    const handleToKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedToIndex(prev =>
                prev < toSuggestions.length - 1 ? prev + 1 : prev
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedToIndex(prev => prev > 0 ? prev - 1 : -1);
        } else if (e.key === 'Enter' && selectedToIndex >= 0) {
            e.preventDefault();
            setTo(toSuggestions[selectedToIndex]);
            setToSuggestions([]);
            setSelectedToIndex(-1);
        } else if (e.key === 'Escape') {
            setToSuggestions([]);
            setSelectedToIndex(-1);
        }
    };

    const handleSwap = () => {
        const temp = from;
        setFrom(to);
        setTo(temp);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (from && to) {
            const searchDate = date || new Date().toISOString().split('T')[0];

            // Save to recent searches
            addRecentSearch({ from, to, date: searchDate });

            const params = new URLSearchParams({
                from,
                to,
                date: searchDate,
                travellers: travellers.toString()
            });
            router.push(`/search?${params.toString()}`);
        }
    };

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Update to check for the new class name 'searchSection'
            if (!target.closest(`.${styles.searchSection}`)) {
                setFromSuggestions([]);
                setToSuggestions([]);
            }
            if (travellerRef.current && !travellerRef.current.contains(target)) {
                setShowTravellerModal(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles.container}>
            <form onSubmit={handleSearch} className={styles.searchBarContainer}>
                <div className={styles.searchBar}>
                    {/* From Section */}
                    <div className={styles.searchSection}>
                        <label className={styles.sectionLabel}>From</label>
                        <div className={styles.inputWrapper}>
                            <input
                                ref={fromInputRef}
                                type="text"
                                placeholder="Select origin"
                                value={from}
                                onChange={(e) => handleFromChange(e.target.value)}
                                onKeyDown={handleFromKeyDown}
                                onFocus={() => {
                                    setFromFocused(true);
                                    if (from.length > 0) handleFromChange(from);
                                }}
                                onBlur={() => setTimeout(() => setFromFocused(false), 200)}
                                className={styles.input}
                                autoComplete="off"
                            />
                            {fromSuggestions.length > 0 && fromFocused && (
                                <div className={styles.suggestions}>
                                    {fromSuggestions.map((city, index) => (
                                        <div
                                            key={city}
                                            className={`${styles.suggestion} ${index === selectedFromIndex ? styles.suggestionActive : ''}`}
                                            onClick={() => {
                                                setFrom(city);
                                                setFromSuggestions([]);
                                                toInputRef.current?.focus();
                                            }}
                                            onMouseEnter={() => setSelectedFromIndex(index)}
                                        >
                                            <MapPin size={14} />
                                            <span>{city}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Swap Button */}
                    <div className={styles.swapWrapper}>
                        <button
                            type="button"
                            className={styles.swapBtn}
                            onClick={handleSwap}
                            title="Swap cities"
                        >
                            <ArrowLeftRight size={16} />
                        </button>
                    </div>

                    {/* To Section */}
                    <div className={styles.searchSection}>
                        <label className={styles.sectionLabel}>To</label>
                        <div className={styles.inputWrapper}>
                            <input
                                ref={toInputRef}
                                type="text"
                                placeholder="Select destination"
                                value={to}
                                onChange={(e) => handleToChange(e.target.value)}
                                onKeyDown={handleToKeyDown}
                                onFocus={() => {
                                    setToFocused(true);
                                    if (to.length > 0) handleToChange(to);
                                }}
                                onBlur={() => setTimeout(() => setToFocused(false), 200)}
                                className={styles.input}
                                autoComplete="off"
                            />
                            {toSuggestions.length > 0 && toFocused && (
                                <div className={styles.suggestions}>
                                    {toSuggestions.map((city, index) => (
                                        <div
                                            key={city}
                                            className={`${styles.suggestion} ${index === selectedToIndex ? styles.suggestionActive : ''}`}
                                            onClick={() => {
                                                setTo(city);
                                                setToSuggestions([]);
                                            }}
                                            onMouseEnter={() => setSelectedToIndex(index)}
                                        >
                                            <MapPin size={14} />
                                            <span>{city}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={styles.divider}></div>

                    {/* Depart Section */}
                    <div className={styles.searchSection}>
                        <label className={styles.sectionLabel}>Depart</label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className={styles.dateInput}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                    </div>

                    <div className={styles.divider}></div>

                    {/* Return Section (Visual Only) */}
                    <div className={`${styles.searchSection} ${styles.optionalSection}`}>
                        <label className={styles.sectionLabel}>Return</label>
                        <div className={styles.placeholderText}>Add return date</div>
                    </div>

                    <div className={styles.divider}></div>

                    {/* Travellers Section */}
                    <div className={styles.searchSection} ref={travellerRef}>
                        <label className={styles.sectionLabel}>Travellers</label>
                        <div
                            className={styles.valueText}
                            onClick={() => setShowTravellerModal(!showTravellerModal)}
                            style={{ cursor: 'pointer' }}
                        >
                            {travellers} Adult{travellers > 1 ? 's' : ''}
                        </div>
                        {showTravellerModal && (
                            <div className={styles.travellerModal}>
                                <div className={styles.travellerRow}>
                                    <span className={styles.travellerLabel}>Adults</span>
                                    <div className={styles.counterControls}>
                                        <button
                                            type="button"
                                            onClick={() => setTravellers(Math.max(1, travellers - 1))}
                                            disabled={travellers <= 1}
                                            className={styles.counterBtn}
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className={styles.counterValue}>{travellers}</span>
                                        <button
                                            type="button"
                                            onClick={() => setTravellers(Math.min(6, travellers + 1))}
                                            disabled={travellers >= 6}
                                            className={styles.counterBtn}
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Search Button */}
                    <button type="submit" className={styles.searchBtn} disabled={!from || !to}>
                        Search
                    </button>
                </div>
            </form>

            {/* Recent Searches */}
            <RecentSearches />

            {/* Popular Routes Quick Links */}
            <div className={styles.popularRoutes}>
                <span className={styles.popularLabel}>Popular:</span>
                {['Mumbai → Pune', 'Bangalore → Chennai', 'Delhi → Jaipur'].map((route) => (
                    <button
                        key={route}
                        type="button"
                        className={styles.popularRoute}
                        onClick={() => {
                            const [fromCity, toCity] = route.split(' → ');
                            setFrom(fromCity);
                            setTo(toCity);
                        }}
                    >
                        {route}
                    </button>
                ))}
            </div>
        </div>
    );
}
