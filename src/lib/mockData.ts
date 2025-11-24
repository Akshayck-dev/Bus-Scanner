import { BusRoute } from "@/types/bus";

// Real Indian Bus Operators
export const OPERATORS = [
    'VRL Logistics', 'SRS Travels', 'Orange Tours & Travels', 'KSRTC',
    'IntrCity SmartBus', 'Zingbus', 'Chartered Bus', 'National Travels',
    'Sharma Transports', 'Jabbar Travels', 'Sea Bird Tourist', 'Parveen Travels',
    'Kallada Travels', 'KPN Travels', 'Neeta Travels', 'Paulo Travels'
];

// Actual Bus Service Names used in India
export const SERVICE_NAMES = [
    'Garuda Plus', 'Airavat Club Class', 'Ambari Dream Class', 'Rajaminhal',
    'Sheetal', 'Ashwamedha', 'Amaravati', 'Indra', 'Super Luxury', 'Ultra Deluxe',
    'Volvo Multi-Axle', 'Scania AC', 'Sleeper Class', 'Semi Sleeper', 'Seater Executive'
];

export const BUS_TYPES = [
    'AC Sleeper', 'Non-AC Sleeper', 'AC Seater', 'Volvo AC', 'Volvo Multi-Axle',
    'Scania AC Multi Axle', 'Semi Sleeper', 'Seater Executive'
] as const;

export const AMENITIES_LIST = [
    'Water Bottle', 'Blanket', 'Wifi', 'Power Outlet', 'TV', 'Reading Light',
    'Track My Bus', 'Emergency Contact Number', 'M-Ticket'
];

export const INDIAN_CITIES = [
    'Mumbai', 'Pune', 'Bangalore', 'Chennai', 'Hyderabad',
    'Delhi', 'Jaipur', 'Ahmedabad', 'Surat', 'Kolkata',
    'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
    'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna',
    'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik',
    'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivli',
    'Vasai-Virar', 'Varanasi', 'Srinagar', 'Aurangabad',
    'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad',
    'Ranchi', 'Howrah', 'Coimbatore', 'Jabalpur', 'Gwalior',
    'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur', 'Kota',
    'Guwahati', 'Chandigarh', 'Solapur', 'Hubli-Dharwad',
    'Mysore', 'Tiruchirappalli', 'Bareilly', 'Aligarh',
    'Tiruppur', 'Gurgaon', 'Moradabad', 'Jalandhar',
    'Bhubaneswar', 'Salem', 'Warangal', 'Mira-Bhayandar',
    'Jalgaon', 'Guntur', 'Thiruvananthapuram', 'Bhiwandi',
    'Saharanpur', 'Gorakhpur', 'Bikaner', 'Amravati',
    'Noida', 'Jamshedpur', 'Bhilai', 'Cuttack', 'Firozabad',
    'Kochi', 'Nellore', 'Bhavnagar', 'Dehradun', 'Durgapur',
    'Asansol', 'Rourkela', 'Nanded', 'Kolhapur', 'Ajmer',
    'Akola', 'Gulbarga', 'Jamnagar', 'Ujjain', 'Loni',
    'Siliguri', 'Jhansi', 'Ulhasnagar', 'Jammu', 'Sangli',
    'Mangalore', 'Erode', 'Belgaum', 'Ambattur', 'Tirunelveli',
    'Malegaon', 'Gaya', 'Jalna', 'Udaipur', 'Maheshtala'
];

export const BOARDING_POINTS = [
    'Majestic Bus Stand', 'Anand Rao Circle', 'Kalasipalyam', 'Madiwala',
    'Silk Board', 'Electronic City', 'Hebbal', 'Yeshwanthpur'
];

export const DROPPING_POINTS = [
    'Koyambedu', 'T Nagar', 'Guindy', 'Tambaram', 'Perungalathur',
    'Vadapalani', 'Ashok Pillar', 'Ekkaduthangal'
];

// Real route data with actual distances and typical pricing
const REAL_ROUTES: Record<string, { distance: number; basePrice: number; duration: string }> = {
    'Mumbai-Pune': { distance: 150, basePrice: 450, duration: '3h 30m' },
    'Pune-Mumbai': { distance: 150, basePrice: 450, duration: '3h 30m' },
    'Bangalore-Chennai': { distance: 350, basePrice: 850, duration: '7h 0m' },
    'Chennai-Bangalore': { distance: 350, basePrice: 850, duration: '7h 0m' },
    'Hyderabad-Bangalore': { distance: 570, basePrice: 1200, duration: '9h 0m' },
    'Bangalore-Hyderabad': { distance: 570, basePrice: 1200, duration: '9h 0m' },
    'Mumbai-Goa': { distance: 580, basePrice: 1100, duration: '10h 0m' },
    'Goa-Mumbai': { distance: 580, basePrice: 1100, duration: '10h 0m' },
    'Delhi-Jaipur': { distance: 280, basePrice: 650, duration: '5h 30m' },
    'Jaipur-Delhi': { distance: 280, basePrice: 650, duration: '5h 30m' },
    'Bangalore-Mysore': { distance: 145, basePrice: 350, duration: '3h 0m' },
    'Mysore-Bangalore': { distance: 145, basePrice: 350, duration: '3h 0m' },
    'Chennai-Coimbatore': { distance: 500, basePrice: 950, duration: '8h 0m' },
    'Coimbatore-Chennai': { distance: 500, basePrice: 950, duration: '8h 0m' },
    'Pune-Goa': { distance: 450, basePrice: 900, duration: '8h 30m' },
    'Goa-Pune': { distance: 450, basePrice: 900, duration: '8h 30m' },
};

// Popular routes with realistic mock data
export const POPULAR_ROUTES: BusRoute[] = [
    {
        id: '1',
        operator: 'VRL Logistics',
        serviceName: 'Vijayanand Travels',
        departureCity: 'Mumbai',
        arrivalCity: 'Pune',
        departureTime: '6:00 AM',
        arrivalTime: '9:30 AM',
        duration: '3h 30m',
        distance: '150 km',
        price: 450,
        type: 'AC Sleeper',
        rating: 4.5,
        seatsAvailable: 12,
        amenities: ['Wifi', 'Power Outlet', 'Blanket', 'Water Bottle']
    },
    {
        id: '2',
        operator: 'SRS Travels',
        serviceName: 'SRS Express',
        departureCity: 'Bangalore',
        arrivalCity: 'Chennai',
        departureTime: '10:00 PM',
        arrivalTime: '5:00 AM',
        duration: '7h 0m',
        distance: '350 km',
        price: 850,
        type: 'Volvo AC',
        rating: 4.2,
        seatsAvailable: 8,
        amenities: ['Wifi', 'Power Outlet', 'Water Bottle', 'Blanket', 'TV']
    },
    {
        id: '3',
        operator: 'Orange Tours & Travels',
        serviceName: 'Garuda Plus',
        departureCity: 'Hyderabad',
        arrivalCity: 'Bangalore',
        departureTime: '9:00 PM',
        arrivalTime: '6:00 AM',
        duration: '9h 0m',
        distance: '570 km',
        price: 1200,
        type: 'Volvo Multi-Axle',
        rating: 4.6,
        seatsAvailable: 20,
        amenities: ['Wifi', 'Power Outlet', 'TV', 'Blanket', 'Reading Light']
    },
    {
        id: '4',
        operator: 'KSRTC',
        serviceName: 'Airavat Club Class',
        departureCity: 'Mysore',
        arrivalCity: 'Bangalore',
        departureTime: '4:00 PM',
        arrivalTime: '7:00 PM',
        duration: '3h 0m',
        distance: '145 km',
        price: 350,
        type: 'Volvo AC',
        rating: 4.8,
        seatsAvailable: 15,
        amenities: ['Wifi', 'Water Bottle', 'Power Outlet']
    },
    {
        id: '5',
        operator: 'Neeta Travels',
        serviceName: 'Neeta Volvo',
        departureCity: 'Pune',
        arrivalCity: 'Mumbai',
        departureTime: '5:00 PM',
        arrivalTime: '9:00 PM',
        duration: '4h 0m',
        distance: '150 km',
        price: 500,
        type: 'AC Seater',
        rating: 4.0,
        seatsAvailable: 25,
        amenities: ['Wifi', 'TV', 'Power Outlet']
    }
];

export function generateBusRoutes(from: string, to: string, date: string): BusRoute[] {
    if (!from || !to) return [];

    const routeKey = `${from}-${to}`;
    const routeData = REAL_ROUTES[routeKey];

    // If we have real route data, use it; otherwise estimate
    const distance = routeData?.distance || Math.floor(200 + Math.random() * 600);
    const basePrice = routeData?.basePrice || Math.floor(distance * 2.5);
    const baseDuration = routeData?.duration || `${Math.floor(distance / 60)}h ${Math.floor((distance % 60))}m`;

    // Dynamic pricing based on date
    const today = new Date();
    const travelDate = date ? new Date(date) : today;
    const daysDiff = Math.max(0, Math.ceil((travelDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
    const priceMultiplier = daysDiff <= 1 ? 1.5 : (daysDiff <= 7 ? 1.2 : 1.0);

    // Generate 8-12 realistic buses
    const busCount = 8 + Math.floor(Math.random() * 5);
    const buses: BusRoute[] = [];

    for (let i = 0; i < busCount; i++) {
        const operator = OPERATORS[Math.floor(Math.random() * OPERATORS.length)];
        const serviceName = SERVICE_NAMES[Math.floor(Math.random() * SERVICE_NAMES.length)];
        const type = BUS_TYPES[Math.floor(Math.random() * BUS_TYPES.length)];

        // Realistic departure times (6 AM to 11 PM)
        const departureHour = 6 + Math.floor(Math.random() * 17);
        const departureMin = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
        const departureTime = `${departureHour > 12 ? departureHour - 12 : departureHour}:${departureMin.toString().padStart(2, '0')} ${departureHour >= 12 ? 'PM' : 'AM'}`;

        // Calculate arrival time
        const durationHours = parseInt(baseDuration.split('h')[0]);
        const durationMins = parseInt(baseDuration.split('h')[1]?.split('m')[0] || '0');
        let arrivalHour = departureHour + durationHours;
        let arrivalMin = departureMin + durationMins;
        if (arrivalMin >= 60) {
            arrivalHour += 1;
            arrivalMin -= 60;
        }
        if (arrivalHour >= 24) arrivalHour -= 24;

        const arrivalTime = `${arrivalHour > 12 ? arrivalHour - 12 : arrivalHour}:${arrivalMin.toString().padStart(2, '0')} ${arrivalHour >= 12 ? 'PM' : 'AM'}`;

        // Price variation based on bus type
        let typeMultiplier = 1.0;
        if (type.includes('Volvo Multi-Axle') || type.includes('Scania')) typeMultiplier = 1.4;
        else if (type.includes('Volvo AC')) typeMultiplier = 1.2;
        else if (type.includes('Non-AC')) typeMultiplier = 0.7;

        const finalPrice = Math.round(basePrice * priceMultiplier * typeMultiplier);

        // Realistic ratings (3.5 to 5.0)
        const rating = 3.5 + Math.random() * 1.5;

        // Seat availability (realistic distribution)
        const seatsAvailable = Math.random() < 0.2
            ? Math.floor(2 + Math.random() * 8)  // 20% chance of low seats
            : Math.floor(15 + Math.random() * 25); // 80% chance of normal availability

        // Random amenities (2-5 items)
        const amenityCount = 2 + Math.floor(Math.random() * 4);
        const shuffled = [...AMENITIES_LIST].sort(() => Math.random() - 0.5);
        const amenities = shuffled.slice(0, amenityCount);

        buses.push({
            id: `${from}-${to}-${i}`,
            operator,
            serviceName,
            departureCity: from,
            arrivalCity: to,
            departureTime,
            arrivalTime,
            duration: baseDuration,
            distance: `${distance} km`,
            price: finalPrice,
            type,
            rating: Number(rating.toFixed(1)),
            seatsAvailable,
            amenities
        });
    }

    // Sort by departure time
    return buses.sort((a, b) => {
        const timeA = a.departureTime.includes('PM') ? parseInt(a.departureTime) + 12 : parseInt(a.departureTime);
        const timeB = b.departureTime.includes('PM') ? parseInt(b.departureTime) + 12 : parseInt(b.departureTime);
        return timeA - timeB;
    });
}
