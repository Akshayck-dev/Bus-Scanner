import CompactSearchBar from '@/components/CompactSearchBar';
import SearchResults from '@/components/SearchResults';
import { aggregationService } from '@/lib/services/aggregationService';
import styles from './page.module.css';

interface SearchPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const params = await searchParams;
    const from = params.from as string;
    const to = params.to as string;
    const date = (params.date as string) || new Date().toISOString().split('T')[0];
    const passengers = parseInt((params.passengers as string) || '1');

    // Fetch from v1 aggregation API
    let searchData = null;
    let error = null;

    try {
        searchData = await aggregationService.searchBuses({
            from,
            to,
            date,
            passengers
        });

    } catch (err) {
        console.error('Search error:', err);
        error = err instanceof Error ? err.message : 'Failed to fetch bus data';
    }

    return (
        <div className={styles.page}>
            {/* Compact Search Bar & Date Stepper */}
            <CompactSearchBar
                from={from}
                to={to}
                date={date}
                passengers={passengers}
            />

            {searchData?.metadata && (
                <div className="container">
                    <div className={styles.metadata}>
                        <span className={styles.metadataItem}>
                            {searchData.metadata.total_trips_after_merge} trips found
                        </span>
                        <span className={styles.metadataItem}>
                            {searchData.metadata.successful_providers} providers
                        </span>
                        {searchData.warnings && searchData.warnings.length > 0 && (
                            <span className={styles.warning}>
                                {searchData.warnings.length} provider(s) unavailable
                            </span>
                        )}
                    </div>
                </div>
            )}

            {error ? (
                <div className="container">
                    <div className={styles.error}>
                        <h2>Error Loading Results</h2>
                        <p>{error}</p>
                    </div>
                </div>
            ) : (
                <SearchResults
                    searchData={searchData}
                    from={from}
                    to={to}
                    date={date}
                />
            )}
        </div>
    );
}
