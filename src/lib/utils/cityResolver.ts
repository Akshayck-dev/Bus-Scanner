import citiesData from '../data/india_cities_alias.json';

interface CityAlias {
    city: string;
    state: string;
    aliases: string[];
}

/**
 * City Resolver
 * Resolves user input to canonical city names using aliases
 */
class CityResolver {
    private cities: CityAlias[];
    private aliasMap: Map<string, string>;

    constructor() {
        this.cities = citiesData as CityAlias[];
        this.aliasMap = new Map();
        this.buildAliasMap();
    }

    /**
     * Build a map of all aliases to canonical city names
     */
    private buildAliasMap(): void {
        this.cities.forEach(cityData => {
            // Add the city name itself
            this.aliasMap.set(cityData.city.toLowerCase(), cityData.city);

            // Add all aliases
            cityData.aliases.forEach(alias => {
                this.aliasMap.set(alias.toLowerCase(), cityData.city);
            });
        });
    }

    /**
     * Resolve user input to canonical city name
     * Returns null if city not found
     */
    resolveCity(input: string): string | null {
        if (!input) return null;

        const normalized = input.trim().toLowerCase();

        // Exact match
        const exactMatch = this.aliasMap.get(normalized);
        if (exactMatch) return exactMatch;

        // Fuzzy match - check if input is contained in any alias
        for (const [alias, city] of this.aliasMap.entries()) {
            if (alias.includes(normalized) || normalized.includes(alias)) {
                return city;
            }
        }

        return null;
    }

    /**
     * Get all cities
     */
    getAllCities(): CityAlias[] {
        return this.cities;
    }

    /**
     * Get city details
     */
    getCityDetails(cityName: string): CityAlias | null {
        const resolved = this.resolveCity(cityName);
        if (!resolved) return null;

        return this.cities.find(c => c.city === resolved) || null;
    }
}

// Export singleton instance
export const cityResolver = new CityResolver();

// Export type
export type { CityAlias };
