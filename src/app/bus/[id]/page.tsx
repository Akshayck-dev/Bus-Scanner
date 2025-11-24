import { generateBusRoutes } from '@/lib/mockData';
import BusDetails from '@/components/BusDetails';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BusDetailsPage({ params, searchParams }: PageProps) {
    const { id } = await params;
    const query = await searchParams;

    const from = query.from as string;
    const to = query.to as string;
    const date = query.date as string;

    if (!from || !to) {
        return notFound();
    }

    // Reconstruct the bus list to find the specific bus
    // In a real app, this would be an API call by ID
    const routes = generateBusRoutes(from, to, date);
    const bus = routes.find(b => b.id === id);

    if (!bus) {
        return notFound();
    }

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                {bus.operator} - {bus.serviceName}
            </h1>
            <div style={{
                display: 'flex',
                gap: '1rem',
                color: '#666',
                marginBottom: '2rem',
                fontSize: '0.875rem'
            }}>
                <span>{bus.departureCity} → {bus.arrivalCity}</span>
                <span>•</span>
                <span>{date}</span>
                <span>•</span>
                <span>{bus.type}</span>
            </div>

            <BusDetails bus={bus} />
        </div>
    );
}
