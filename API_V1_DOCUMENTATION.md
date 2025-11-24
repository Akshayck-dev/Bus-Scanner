# Multi-Provider Bus Aggregation API - v1 Documentation

## Overview

The BusScanner v1 API aggregates bus search results from multiple providers (RedBus, AbhiBus, etc.) and returns merged results with all available offers.

## Base URL

```
http://localhost:3000/api/v1
```

## Endpoints

### 1. Search Buses

**Endpoint**: `GET /api/v1/search`

**Description**: Search for buses across multiple providers with automatic city alias resolution and trip merging.

**Query Parameters**:
- `from` (required): Departure city (supports aliases like "Blr", "Mum", "Che")
- `to` (required): Destination city (supports aliases)
- `date` (optional): Travel date (YYYY-MM-DD), defaults to today
- `passengers` (optional): Number of passengers, defaults to 1

**Example Request**:
```bash
GET /api/v1/search?from=Blr&to=Chennai&date=2025-11-25&passengers=2
```

**Response**:
```json
{
  "query": {
    "from": "Bangalore",
    "to": "Chennai",
    "date": "2025-11-25",
    "passengers": 2
  },
  "results": [
    {
      "trip_id": "abc123def456",
      "operator": "VRL Logistics",
      "departure": "2025-11-25T22:00:00.000Z",
      "arrival": "2025-11-26T05:00:00.000Z",
      "duration": "7h 0m",
      "bus_type": "AC Sleeper",
      "best_price": 850,
      "offers": [
        {
          "source": "AbhiBus",
          "price": 918,
          "seat_class": "AC Sleeper",
          "booking_url": "https://www.abhibus.com/booking?trip=...",
          "seats_available": 12
        },
        {
          "source": "RedBus",
          "price": 977,
          "seat_class": "AC Sleeper",
          "booking_url": "https://www.redbus.in/booking?trip=...",
          "seats_available": 12
        }
      ],
      "route": {
        "from": "Bangalore",
        "to": "Chennai"
      },
      "amenities": ["Wifi", "Power Outlet", "Blanket", "Water Bottle"]
    }
  ],
  "warnings": [],
  "cache_ttl_seconds": 300,
  "metadata": {
    "total_providers": 2,
    "successful_providers": 2,
    "total_trips_before_merge": 11,
    "total_trips_after_merge": 8
  }
}
```

### 2. Get Trip Details

**Endpoint**: `GET /api/v1/trip/:trip_id`

**Description**: Get detailed information about a specific trip including all offers, boarding/dropping points, and amenities.

**Path Parameters**:
- `trip_id`: Unique trip identifier from search results

**Query Parameters**:
- `from` (required): Departure city
- `to` (required): Destination city
- `date` (optional): Travel date

**Example Request**:
```bash
GET /api/v1/trip/abc123def456?from=Bangalore&to=Chennai&date=2025-11-25
```

**Response**:
```json
{
  "trip": {
    "trip_id": "abc123def456",
    "operator": "VRL Logistics",
    "departure": "2025-11-25T22:00:00.000Z",
    "arrival": "2025-11-26T05:00:00.000Z",
    "duration": "7h 0m",
    "bus_type": "AC Sleeper",
    "best_price": 850,
    "offers": [...]
  },
  "route_info": {
    "from": "Bangalore",
    "to": "Chennai",
    "distance": "350 km"
  },
  "operator_info": {
    "name": "VRL Logistics",
    "rating": 4.2,
    "contact": "+91-1800-XXX-XXXX"
  },
  "schedules": {
    "boarding_points": [
      { "location": "Main Bus Stand", "time": "2025-11-25T22:00:00.000Z" },
      { "location": "City Center", "time": "2025-11-25T22:00:00.000Z" }
    ],
    "dropping_points": [
      { "location": "Central Station", "time": "2025-11-26T05:00:00.000Z" },
      { "location": "Airport Road", "time": "2025-11-26T05:00:00.000Z" }
    ]
  },
  "vehicle_info": {
    "type": "AC Sleeper",
    "amenities": ["Wifi", "Power Outlet", "Blanket", "Water Bottle"],
    "seats_layout": "2+2"
  },
  "offers": [...]
}
```

## Features

### City Alias Resolution

The API automatically resolves city aliases to canonical names:

- **Blr** / **Bang** → Bangalore
- **Mum** / **BOM** → Mumbai
- **Che** / **MAA** → Chennai
- **Tvm** / **TRV** → Thiruvananthapuram
- **Koz** / **Calicut** → Kozhikode

### Trip Merging

The system intelligently merges trips from multiple providers based on:
- Same route (from/to)
- Departure time within ±15 minutes
- Same operator (fuzzy match)
- Duration similarity (±30 minutes)

### Caching

- Search results are cached for 5 minutes (300 seconds)
- Cache key includes: from, to, date, passengers
- `cache_ttl_seconds` returned in response

### Error Handling

If a provider fails, the API:
- Does NOT block the response
- Returns results from successful providers
- Includes warnings for failed providers

**Example with Warnings**:
```json
{
  "results": [...],
  "warnings": [
    {
      "source": "RedBus",
      "error": "timeout",
      "timestamp": "2025-11-25T10:30:00.000Z"
    }
  ]
}
```

## Testing

### Using cURL

```bash
# Search buses
curl "http://localhost:3000/api/v1/search?from=Mumbai&to=Pune&date=2025-11-25"

# Search with alias
curl "http://localhost:3000/api/v1/search?from=Blr&to=Che&date=2025-11-25"

# Get trip details
curl "http://localhost:3000/api/v1/trip/abc123def456?from=Bangalore&to=Chennai"
```

### Using Browser

Navigate to:
- http://localhost:3000/api/v1/search?from=Mumbai&to=Pune
- http://localhost:3000/api/v1/search?from=Blr&to=Che

## Architecture

```
Frontend
    ↓
API v1 (/api/v1/search, /api/v1/trip/:id)
    ↓
Aggregation Service
    ↓
Provider Connectors (RedBus, AbhiBus)
    ↓
Merge Engine → City Resolver → Cache Layer
```

## Current Providers

### Phase 1 (Mock Data)
- **RedBus** - 15% price markup
- **AbhiBus** - 8% price markup

### Phase 2 (Future - Real APIs)
- Real RedBus Partner API
- Real AbhiBus Partner API
- Direct operator APIs
- GTFS/GTFS-RT feeds

## Migration to Real APIs

When you get real API access:

1. Create connector implementing `ProviderConnector` interface
2. Add API credentials to `.env.local`
3. Register in `lib/connectors/index.ts`
4. **No changes to API endpoints needed!**

## Error Codes

- `MISSING_PARAMS` - Required parameters missing
- `NOT_FOUND` - Trip not found
- `INTERNAL_ERROR` - Server error

## Rate Limiting

Currently no rate limiting in Phase 1. Will be added in Phase 2.
