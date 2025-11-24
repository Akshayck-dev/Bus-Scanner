/**
 * In-Memory Cache
 * Simple TTL-based cache (will be replaced with Redis in Phase 2)
 */

interface CacheEntry<T> {
    data: T;
    expiresAt: number;
}

class InMemoryCache {
    private cache: Map<string, CacheEntry<any>>;

    constructor() {
        this.cache = new Map();
        // Clean up expired entries every 60 seconds
        setInterval(() => this.cleanup(), 60000);
    }

    /**
     * Set cache entry with TTL
     */
    set<T>(key: string, data: T, ttlSeconds: number): void {
        const expiresAt = Date.now() + (ttlSeconds * 1000);
        this.cache.set(key, { data, expiresAt });
    }

    /**
     * Get cache entry
     */
    get<T>(key: string): T | null {
        const entry = this.cache.get(key);

        if (!entry) return null;

        // Check if expired
        if (Date.now() > entry.expiresAt) {
            this.cache.delete(key);
            return null;
        }

        return entry.data as T;
    }

    /**
     * Delete cache entry
     */
    delete(key: string): void {
        this.cache.delete(key);
    }

    /**
     * Clear all cache
     */
    clear(): void {
        this.cache.clear();
    }

    /**
     * Get TTL remaining for a key (in seconds)
     */
    getTTL(key: string): number {
        const entry = this.cache.get(key);
        if (!entry) return 0;

        const remaining = entry.expiresAt - Date.now();
        return Math.max(0, Math.floor(remaining / 1000));
    }

    /**
     * Clean up expired entries
     */
    private cleanup(): void {
        const now = Date.now();
        for (const [key, entry] of this.cache.entries()) {
            if (now > entry.expiresAt) {
                this.cache.delete(key);
            }
        }
    }

    /**
     * Get cache stats
     */
    getStats(): { size: number; keys: string[] } {
        return {
            size: this.cache.size,
            keys: Array.from(this.cache.keys())
        };
    }
}

// Export singleton instance
export const inMemoryCache = new InMemoryCache();
