'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRecentSearches, deleteRecentSearch, type RecentSearch } from '@/lib/utils/localStorage';
import { Clock, X } from 'lucide-react';
import styles from './RecentSearches.module.css';

export default function RecentSearches() {
    const [searches, setSearches] = useState<RecentSearch[]>([]);
    const router = useRouter();

    useEffect(() => {
        setSearches(getRecentSearches());
    }, []);

    const handleSearch = (search: RecentSearch) => {
        router.push(`/search?from=${search.from}&to=${search.to}&date=${search.date}`);
    };

    const handleDelete = (timestamp: number, e: React.MouseEvent) => {
        e.stopPropagation();
        deleteRecentSearch(timestamp);
        setSearches(getRecentSearches());
    };

    if (searches.length === 0) {
        return null;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Clock size={16} />
                <span>Recent Searches</span>
            </div>
            <div className={styles.list}>
                {searches.slice(0, 5).map((search) => (
                    <div
                        key={search.timestamp}
                        className={styles.item}
                        onClick={() => handleSearch(search)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                handleSearch(search);
                            }
                        }}
                    >
                        <div className={styles.route}>
                            <span className={styles.city}>{search.from}</span>
                            <span className={styles.arrow}>→</span>
                            <span className={styles.city}>{search.to}</span>
                        </div>
                        <div className={styles.date}>{search.date}</div>
                        <button
                            className={styles.deleteBtn}
                            onClick={(e) => handleDelete(search.timestamp, e)}
                            aria-label="Delete"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
