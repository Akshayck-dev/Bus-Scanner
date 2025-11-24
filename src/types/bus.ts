export interface BusRoute {
    id: string;
    operator: string;
    departureCity: string;
    arrivalCity: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    price: number;
    type: 'Standard' | 'Express' | 'Sleeper' | 'Economy' | 'Luxury' | 'AC Sleeper' | 'Volvo Multi-Axle' | 'Volvo AC' | 'AC Seater' | 'Non-AC Sleeper' | 'Non-AC Seater' | 'Scania AC Multi Axle' | 'Semi Sleeper' | 'Seater Executive';
    rating: number;
    seatsAvailable: number;
    amenities: string[];
    serviceName: string;
    distance: string;
}

export interface SearchParams {
    from?: string;
    to?: string;
    date?: string;
}
