/**
 * API Configuration
 * Centralized configuration for API settings
 */

export const apiConfig = {
    // Feature flags
    useMockData: process.env.USE_MOCK_DATA !== 'false', // Default to true

    // Real API settings (when available)
    realApi: {
        baseUrl: process.env.REAL_API_BASE_URL || '',
        apiKey: process.env.REAL_API_KEY || '',
        timeout: 10000, // 10 seconds
    },

    // Mock data settings
    mockApi: {
        simulateDelay: true,
        minDelay: 100,
        maxDelay: 500,
    },

    // General settings
    cache: {
        enabled: true,
        ttl: 300, // 5 minutes in seconds
    }
};

/**
 * Get API base URL based on environment
 */
export function getApiBaseUrl(): string {
    if (typeof window === 'undefined') {
        // Server-side
        return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    }
    // Client-side
    return process.env.NEXT_PUBLIC_API_URL || window.location.origin;
}
