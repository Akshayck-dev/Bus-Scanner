/**
 * LocalStorage Utilities
 * Handles recent searches and favorite routes
 */

export interface RecentSearch {
    from: string;
    to: string;
    date: string;
    timestamp: number;
}

export interface FavoriteRoute {
    id: string;
    from: string;
    to: string;
    label?: string;
    createdAt: number;
}

const RECENT_SEARCHES_KEY = 'busscanner_recent_searches';
const FAVORITE_ROUTES_KEY = 'busscanner_favorite_routes';
const MAX_RECENT_SEARCHES = 10;
const MAX_FAVORITE_ROUTES = 20;

/**
 * Recent Searches
 */
export function getRecentSearches(): RecentSearch[] {
    if (typeof window === 'undefined') return [];

    try {
        const data = localStorage.getItem(RECENT_SEARCHES_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

export function addRecentSearch(search: Omit<RecentSearch, 'timestamp'>): void {
    if (typeof window === 'undefined') return;

    try {
        const searches = getRecentSearches();

        // Check if this search already exists
        const existingIndex = searches.findIndex(
            s => s.from === search.from && s.to === search.to && s.date === search.date
        );

        // Remove if exists (we'll add it to the front)
        if (existingIndex !== -1) {
            searches.splice(existingIndex, 1);
        }

        // Add to front
        searches.unshift({
            ...search,
            timestamp: Date.now()
        });

        // Keep only MAX_RECENT_SEARCHES
        const trimmed = searches.slice(0, MAX_RECENT_SEARCHES);

        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(trimmed));
    } catch (error) {
        console.error('Error saving recent search:', error);
    }
}

export function clearRecentSearches(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(RECENT_SEARCHES_KEY);
}

export function deleteRecentSearch(timestamp: number): void {
    if (typeof window === 'undefined') return;

    try {
        const searches = getRecentSearches();
        const filtered = searches.filter(s => s.timestamp !== timestamp);
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(filtered));
    } catch (error) {
        console.error('Error deleting recent search:', error);
    }
}

/**
 * Favorite Routes
 */
export function getFavoriteRoutes(): FavoriteRoute[] {
    if (typeof window === 'undefined') return [];

    try {
        const data = localStorage.getItem(FAVORITE_ROUTES_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

export function addFavoriteRoute(route: Omit<FavoriteRoute, 'id' | 'createdAt'>): void {
    if (typeof window === 'undefined') return;

    try {
        const favorites = getFavoriteRoutes();

        // Check if already exists
        const exists = favorites.some(
            f => f.from === route.from && f.to === route.to
        );

        if (exists) {
            return; // Already favorited
        }

        // Check limit
        if (favorites.length >= MAX_FAVORITE_ROUTES) {
            throw new Error(`Maximum ${MAX_FAVORITE_ROUTES} favorites allowed`);
        }

        const newFavorite: FavoriteRoute = {
            id: `fav_${Date.now()}`,
            ...route,
            createdAt: Date.now()
        };

        favorites.push(newFavorite);
        localStorage.setItem(FAVORITE_ROUTES_KEY, JSON.stringify(favorites));
    } catch (error) {
        console.error('Error adding favorite:', error);
        throw error;
    }
}

export function removeFavoriteRoute(id: string): void {
    if (typeof window === 'undefined') return;

    try {
        const favorites = getFavoriteRoutes();
        const filtered = favorites.filter(f => f.id !== id);
        localStorage.setItem(FAVORITE_ROUTES_KEY, JSON.stringify(filtered));
    } catch (error) {
        console.error('Error removing favorite:', error);
    }
}

export function isFavoriteRoute(from: string, to: string): boolean {
    const favorites = getFavoriteRoutes();
    return favorites.some(f => f.from === from && f.to === to);
}

export function clearFavoriteRoutes(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(FAVORITE_ROUTES_KEY);
}
