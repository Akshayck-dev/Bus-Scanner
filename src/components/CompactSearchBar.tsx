'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import styles from './CompactSearchBar.module.css';

interface CompactSearchBarProps {
    from: string;
    to: string;
    date: string;
    passengers?: number;
}

export default function CompactSearchBar({ from, to, date, passengers = 1 }: CompactSearchBarProps) {
    const router = useRouter();
    const currentDate = new Date(date);

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        // Use UTC methods to ensure consistency across server/client and timezones
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        return `${days[d.getUTCDay()]}, ${d.getUTCDate()} ${months[d.getUTCMonth()]}`;
    };

    const handleDateChange = (days: number) => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + days);

        // Prevent selecting past dates
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (newDate < today) return;

        const dateString = newDate.toISOString().split('T')[0];

        // Construct new URL
        const params = new URLSearchParams(window.location.search);
        params.set('date', dateString);
        router.push(`/search?${params.toString()}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.searchBar}>
                {/* Search Button */}
                <button className={styles.searchIconBtn}>
                    <Search size={20} />
                </button>

                {/* Route Summary */}
                <div className={styles.routeSummary}>
                    <span className={styles.routeText}>
                        {from} (Any) – {to} (Any)
                    </span>
                    <span className={styles.dot}>•</span>
                    <span className={styles.metaText}>
                        {passengers} adult{passengers > 1 ? 's' : ''}, Economy
                    </span>
                </div>

                {/* Date Stepper */}
                <div className={styles.dateStepper}>
                    <button
                        className={styles.navBtn}
                        onClick={() => handleDateChange(-1)}
                        disabled={new Date(date) <= new Date(new Date().setHours(0, 0, 0, 0))}
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <div className={styles.dateDisplay}>
                        {formatDate(date)}
                    </div>

                    <button
                        className={styles.navBtn}
                        onClick={() => handleDateChange(1)}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
