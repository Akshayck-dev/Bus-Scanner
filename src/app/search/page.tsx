import CompactSearchBar from '@/components/CompactSearchBar';
import SearchResults from '@/components/SearchResults';
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
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/v1/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}&passengers=${passengers}`;

        const response = await fetch(apiUrl, {
            cache: 'no-store' // Don't cache on server side, API has its own cache
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        searchData = await response.json();
    } catch (err) {
        error = err instanceof Error ? err.message : 'Failed to fetch bus data';
        console.error('Search API error:', err);
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
