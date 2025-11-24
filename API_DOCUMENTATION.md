# BusScanner API Documentation

## Overview

The BusScanner backend uses a **Service Layer Pattern** that abstracts data sources, making it easy to switch from mock data to real APIs without changing frontend code.

## Architecture

```
Frontend → API Routes → Service Layer → Data Provider
```

- **API Routes**: Next.js API endpoints (`/api/buses/*`)
- **Service Layer**: Business logic and validation (`busService.ts`)
- **Data Provider**: Pluggable data source (mock or real API)

## API Endpoints

### 1. Search Buses

**Endpoint**: `GET /api/buses/search`

**Query Parameters**:
- `from` (required): Departure city
- `to` (required): Destination city
- `date` (optional): Travel date (YYYY-MM-DD), defaults to today

**Example Request**:
```
GET /api/buses/search?from=Mumbai&to=Pune&date=2025-11-25
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "Mumbai-Pune-0",
      "operator": "VRL Logistics",
      "serviceName": "Vijayanand Travels",
      "departureCity": "Mumbai",
      "arrivalCity": "Pune",
      "departureTime": "6:00 AM",
      "arrivalTime": "9:30 AM",
      "duration": "3h 30m",
      "distance": "150 km",
      "price": 450,
      "type": "AC Sleeper",
      "rating": 4.5,
      "seatsAvailable": 12,
      "amenities": ["Wifi", "Power Outlet", "Blanket"]
    }
  ]
}
```

### 2. Get Bus by ID

**Endpoint**: `GET /api/buses/{id}`

**Path Parameters**:
- `id`: Bus ID

**Query Parameters**:
- `from` (required): Departure city
- `to` (required): Destination city
- `date` (optional): Travel date

**Example Request**:
```
GET /api/buses/Mumbai-Pune-0?from=Mumbai&to=Pune&date=2025-11-25
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "Mumbai-Pune-0",
    "operator": "VRL Logistics",
    ...
  }
}
```

### 3. Get Popular Routes

**Endpoint**: `GET /api/buses/popular`

**Example Request**:
```
GET /api/buses/popular
```

**Response**:
```json
{
  "success": true,
  "data": [...]
}
```

## Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "error": {
    "message": "Missing required parameters: from and to",
    "code": "MISSING_PARAMS"
  }
}
```

**Error Codes**:
- `MISSING_PARAMS`: Required parameters missing
- `NOT_FOUND`: Resource not found
- `INTERNAL_ERROR`: Server error

## Switching to Real API

### Step 1: Configure Environment Variables

Create `.env.local`:
```bash
USE_MOCK_DATA=false
REAL_API_BASE_URL=https://api.yourprovider.com
REAL_API_KEY=your_api_key_here
```

### Step 2: Implement Real API Provider

Edit `src/lib/providers/realApiProvider.ts`:
```typescript
// Implement the transformApiBusToBusRoute method
// based on your actual API response structure
```

### Step 3: Switch Provider

Edit `src/lib/providers/index.ts`:
```typescript
import { realApiProvider } from './realApiProvider';

export const busDataProvider = realApiProvider; // Changed from mockDataProvider
```

That's it! No other code changes needed.

## Testing the API

### Using cURL

```bash
# Search buses
curl "http://localhost:3000/api/buses/search?from=Mumbai&to=Pune&date=2025-11-25"

# Get specific bus
curl "http://localhost:3000/api/buses/Mumbai-Pune-0?from=Mumbai&to=Pune"

# Get popular routes
curl "http://localhost:3000/api/buses/popular"
```

### Using Browser

Navigate to:
- http://localhost:3000/api/buses/search?from=Mumbai&to=Pune
- http://localhost:3000/api/buses/popular

## Data Provider Interface

All data providers must implement:

```typescript
interface BusDataProvider {
    searchBuses(params: { from: string; to: string; date: string }): Promise<BusRoute[]>;
    getBusById(params: { id: string; from: string; to: string; date: string }): Promise<BusRoute | null>;
    getPopularRoutes(): Promise<BusRoute[]>;
}
```

This ensures consistency across all data sources.
