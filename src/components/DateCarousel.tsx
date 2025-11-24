'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './DateCarousel.module.css';

interface DateCarouselProps {
    currentDate: string;
    from: string;
    to: string;
}

export default function DateCarousel({ currentDate, from, to }: DateCarouselProps) {
    const router = useRouter();

    // Generate dates (current date - 2 days to + 7 days)
    const dates = [];
    const baseDate = new Date(currentDate);

    for (let i = -2; i <= 7; i++) {
        const d = new Date(baseDate);
        d.setDate(baseDate.getDate() + i);
        dates.push(d);
    }

    const handleDateClick = (date: Date) => {
        const dateStr = date.toISOString().split('T')[0];
        const params = new URLSearchParams({
            from,
            to,
            date: dateStr
        });
        router.push(`/search?${params.toString()}`);
    };

    const getDayName = (date: Date) => {
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    };

    const getDayNumber = (date: Date) => {
        return date.getDate();
    };

    const isSelected = (date: Date) => {
        return date.toISOString().split('T')[0] === currentDate;
    };

    const isPast = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    return (
        <div className={styles.carouselContainer}>
            <div className={styles.carousel}>
                {dates.map((date, index) => {
                    const selected = isSelected(date);
                    const past = isPast(date);

                    return (
                        <button
                            key={index}
                            className={`${styles.dateCard} ${selected ? styles.selected : ''} ${past ? styles.disabled : ''}`}
                            onClick={() => !past && handleDateClick(date)}
                            disabled={past}
                        >
                            <span className={styles.dayName}>{getDayName(date)}</span>
                            <span className={styles.dayNumber}>{getDayNumber(date)}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
