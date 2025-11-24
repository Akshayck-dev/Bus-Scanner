# Real API Integration Guide

This guide shows you exactly how to integrate official bus booking APIs (RedBus, AbhiBus, etc.) into your BusScanner platform.

## Prerequisites

Before you begin, you need:
- ✅ Official API credentials from the provider (API key, partner ID, etc.)
- ✅ API documentation from the provider
- ✅ Understanding of their rate limits and pricing

## Step-by-Step Integration

### Step 1: Get API Credentials

Contact these providers for official API access:

**RedBus Partner Program:**
- Website: https://www.redbus.in/info/partnerRedBus
- Email: partners@redbus.in
- What you'll get: API key, Partner ID, Base URL

**AbhiBus B2B API:**
- Website: https://www.abhibus.com
- Contact: business@abhibus.com
- What you'll get: API credentials, Documentation

**Other Providers:**
- TBO Holidays (Bus APIs)
- RateHawk
- MakeMyTrip Affiliate Program

---

## Step 2: Add Credentials to Environment Variables

Create or update `.env.local`:

```bash
# RedBus API
REDBUS_API_KEY=your_redbus_api_key_here
REDBUS_PARTNER_ID=your_partner_id
REDBUS_BASE_URL=https://api.redbus.in/v1

# AbhiBus API
ABHIBUS_API_KEY=your_abhibus_api_key_here
ABHIBUS_BASE_URL=https://api.abhibus.com/v1

# Feature flags
USE_MOCK_DATA=false
```

---

## Step 3: Create Real API Connector

### Example: RedBus Real API Connector

Create `src/lib/connectors/redBusConnector.ts`:

```typescript
import { BaseProviderConnector } from './types';
import { ProviderSearchParams, ProviderSearchResponse, ProviderTrip, ProviderConfig } from '@/types/aggregation';

/**
 * Real RedBus API Connector
 * Integrates with official RedBus Partner API
 */
export class RedBusConnector extends BaseProviderConnector {
    name = 'RedBus';
    config: ProviderConfig = {
        apiKey: process.env.REDBUS_API_KEY,
        baseUrl: process.env.REDBUS_BASE_URL || 'https://api.redbus.in/v1',
        partnerId: process.env.REDBUS_PARTNER_ID,
        timeout: 10000
    };

    async fetchSearch(params: ProviderSearchParams): Promise<ProviderSearchResponse> {
        try {
            // Build API request
            const url = `${this.config.baseUrl}/search`;
            const requestBody = {
                source: params.from,
                destination: params.to,
                journey_date: params.date,
                // Add other required fields based on RedBus API docs
            };

            // Make API call
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.config.apiKey}`,
                    'Content-Type': 'application/json',
                    'X-Partner-ID': this.config.partnerId || ''
                },
                body: JSON.stringify(requestBody),
                signal: AbortSignal.timeout(this.config.timeout || 10000)
            });

            if (!response.ok) {
                throw new Error(`RedBus API error: ${response.statusText}`);
            }

            const data = await response.json();

            // Transform RedBus response to our format
            const trips: ProviderTrip[] = data.buses?.map((bus: any) => ({
                provider_trip_id: `redbus_${bus.id}`,
                operator: bus.travels,
                departure_time: this.convertToISO(bus.departureTime),
                arrival_time: this.convertToISO(bus.arrivalTime),
                duration: bus.duration,
                bus_type: bus.busType,
                price: bus.fare,
                seats_available: bus.availableSeats,
                amenities: bus.amenities || [],
                booking_url: `https://www.redbus.in/booking/${bus.id}`
            })) || [];

            return {
                provider: this.name,
                trips,
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('RedBus API error:', error);
            throw error;
        }
    }

    async fetchTripDetails(providerTripId: string): Promise<ProviderTrip | null> {
        try {
            const url = `${this.config.baseUrl}/trip/${providerTripId}`;
            
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.config.apiKey}`,
                    'X-Partner-ID': this.config.partnerId || ''
                }
            });

            if (!response.ok) {
                return null;
            }

            const data = await response.json();
            
            // Transform to ProviderTrip format
            return {
                provider_trip_id: providerTripId,
                operator: data.travels,
                departure_time: this.convertToISO(data.departureTime),
                arrival_time: this.convertToISO(data.arrivalTime),
                duration: data.duration,
                bus_type: data.busType,
                price: data.fare,
                seats_available: data.availableSeats,
                amenities: data.amenities || [],
                booking_url: `https://www.redbus.in/booking/${data.id}`
            };

        } catch (error) {
            console.error('RedBus trip details error:', error);
            return null;
        }
    }

    /**
     * Convert RedBus time format to ISO 8601
     * Adjust based on actual RedBus API response format
     */
    private convertToISO(timeString: string): string {
        // Example: "2025-11-25 14:30" -> ISO format
        // Adjust this based on actual API response
        return new Date(timeString).toISOString();
    }

    async isHealthy(): Promise<boolean> {
        try {
            const url = `${this.config.baseUrl}/health`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.config.apiKey}`
                }
            });
            return response.ok;
        } catch {
            return false;
        }
    }
}

export const redBusConnector = new RedBusConnector();
```

---

## Step 4: Register the Real Connector

Update `src/lib/connectors/index.ts`:

```typescript
import { ProviderConnector } from './types';
import { mockRedBusConnector } from './mockRedBusConnector';
import { mockAbhiBusConnector } from './mockAbhiBusConnector';
import { redBusConnector } from './redBusConnector'; // Import real connector

/**
 * Provider Registry
 * Switch between mock and real providers here
 */

// Use environment variable to determine which providers to use
const USE_MOCK = process.env.USE_MOCK_DATA !== 'false';

export const activeProviders: ProviderConnector[] = USE_MOCK
    ? [
        // Mock providers for development
        mockRedBusConnector,
        mockAbhiBusConnector
      ]
    : [
        // Real providers for production
        redBusConnector,
        // Add more real connectors here
      ];

export function getActiveProviders(): ProviderConnector[] {
    return activeProviders;
}

export function getProviderByName(name: string): ProviderConnector | undefined {
    return activeProviders.find(p => p.name.toLowerCase() === name.toLowerCase());
}
```

---

## Step 5: Test the Integration

### 5.1 Test API Connectivity

Create `src/scripts/testApiConnection.ts`:

```typescript
import { redBusConnector } from '@/lib/connectors/redBusConnector';

async function testRedBusAPI() {
    console.log('Testing RedBus API connection...');
    
    try {
        // Test health check
        const isHealthy = await redBusConnector.isHealthy();
        console.log('Health check:', isHealthy ? '✅ Healthy' : '❌ Failed');

        // Test search
        const result = await redBusConnector.fetchSearch({
            from: 'Mumbai',
            to: 'Pune',
            date: '2025-11-25',
            passengers: 1
        });

        console.log('Search results:', result);
        console.log(`Found ${result.trips.length} buses`);

    } catch (error) {
        console.error('API test failed:', error);
    }
}

testRedBusAPI();
```

Run: `npx ts-node src/scripts/testApiConnection.ts`

### 5.2 Test Through Your API

```bash
# Set environment variable
USE_MOCK_DATA=false

# Test the aggregation API
curl "http://localhost:3000/api/v1/search?from=Mumbai&to=Pune&date=2025-11-25"
```

---

## Step 6: Handle API-Specific Requirements

### Rate Limiting

Add rate limiting to your connector:

```typescript
class RedBusConnector extends BaseProviderConnector {
    private requestCount = 0;
    private resetTime = Date.now();
    private readonly MAX_REQUESTS_PER_MINUTE = 60;

    async fetchSearch(params: ProviderSearchParams): Promise<ProviderSearchResponse> {
        // Check rate limit
        await this.checkRateLimit();

        // ... rest of the code
    }

    private async checkRateLimit(): Promise<void> {
        const now = Date.now();
        
        // Reset counter every minute
        if (now - this.resetTime > 60000) {
            this.requestCount = 0;
            this.resetTime = now;
        }

        // Check if limit exceeded
        if (this.requestCount >= this.MAX_REQUESTS_PER_MINUTE) {
            const waitTime = 60000 - (now - this.resetTime);
            await new Promise(resolve => setTimeout(resolve, waitTime));
            this.requestCount = 0;
            this.resetTime = Date.now();
        }

        this.requestCount++;
    }
}
```

### Caching

Update cache TTL based on API costs:

```typescript
// In aggregationService.ts
const CACHE_TTL_SECONDS = process.env.USE_MOCK_DATA === 'false'
    ? 600  // 10 minutes for real API (reduce API calls)
    : 300; // 5 minutes for mock data
```

### Error Handling

```typescript
async fetchSearch(params: ProviderSearchParams): Promise<ProviderSearchResponse> {
    try {
        const response = await fetch(url, options);

        // Handle specific error codes
        if (response.status === 429) {
            throw new Error('Rate limit exceeded');
        }

        if (response.status === 401) {
            throw new Error('Invalid API credentials');
        }

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        return await response.json();

    } catch (error) {
        // Log error for monitoring
        console.error(`${this.name} API error:`, error);
        
        // Re-throw to be handled by aggregation service
        throw error;
    }
}
```

---

## Step 7: Deploy with Real APIs

### Update Environment Variables

**Production (.env.production):**
```bash
USE_MOCK_DATA=false
REDBUS_API_KEY=prod_api_key_here
ABHIBUS_API_KEY=prod_api_key_here
```

**Development (.env.local):**
```bash
USE_MOCK_DATA=true
# Keep mock data for development
```

### Deploy

```bash
# Build with production env
npm run build

# Deploy to Vercel/Netlify/etc
vercel deploy --prod
```

---

## Common API Response Formats

### RedBus API (Example)

```json
{
  "buses": [
    {
      "id": "123456",
      "travels": "VRL Travels",
      "busType": "AC Sleeper",
      "departureTime": "2025-11-25T22:00:00",
      "arrivalTime": "2025-11-26T06:00:00",
      "duration": "8h 0m",
      "fare": 1200,
      "availableSeats": 15,
      "amenities": ["WiFi", "Charging Point", "Blanket"]
    }
  ]
}
```

### Your Format (ProviderTrip)

```typescript
{
  provider_trip_id: "redbus_123456",
  operator: "VRL Travels",
  departure_time: "2025-11-25T22:00:00.000Z",
  arrival_time: "2025-11-26T06:00:00.000Z",
  duration: "8h 0m",
  bus_type: "AC Sleeper",
  price: 1200,
  seats_available: 15,
  amenities: ["WiFi", "Charging Point", "Blanket"],
  booking_url: "https://www.redbus.in/booking/123456"
}
```

---

## Monitoring & Debugging

### Add Logging

```typescript
import { redBusConnector } from '@/lib/connectors/redBusConnector';

// Log all API calls
redBusConnector.fetchSearch = new Proxy(redBusConnector.fetchSearch, {
    apply: async (target, thisArg, args) => {
        console.log('[RedBus] Search request:', args[0]);
        const start = Date.now();
        
        try {
            const result = await target.apply(thisArg, args);
            console.log(`[RedBus] Success in ${Date.now() - start}ms`);
            return result;
        } catch (error) {
            console.error(`[RedBus] Failed in ${Date.now() - start}ms:`, error);
            throw error;
        }
    }
});
```

### Monitor API Usage

Track API calls and costs:

```typescript
class ApiUsageTracker {
    private calls: Map<string, number> = new Map();

    track(provider: string) {
        const count = this.calls.get(provider) || 0;
        this.calls.set(provider, count + 1);
    }

    getStats() {
        return Object.fromEntries(this.calls);
    }
}

export const apiUsageTracker = new ApiUsageTracker();
```

---

## Troubleshooting

### Issue: API returns 401 Unauthorized
**Solution:** Check your API key and partner ID in `.env.local`

### Issue: API returns empty results
**Solution:** Verify city names match the API's expected format

### Issue: Timeout errors
**Solution:** Increase timeout in connector config

### Issue: Rate limit exceeded
**Solution:** Implement request queuing or increase cache TTL

---

## Next Steps

1. **Get API Access** - Apply for partner programs
2. **Read API Docs** - Understand their specific request/response format
3. **Create Connector** - Use the template above
4. **Test Thoroughly** - Use the test script
5. **Monitor Usage** - Track API calls and costs
6. **Optimize Caching** - Reduce unnecessary API calls

## Support

If you need help integrating a specific API, provide:
- API documentation link
- Sample API response
- Any error messages you're getting

Your system is **ready** to accept real APIs - just plug them in!
