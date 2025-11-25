import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bus Operators - Bus Scanner',
    description: 'List of all bus operators available on Bus Scanner.',
};

export default function OperatorsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Bus Operators</h1>
            <p>Browse our network of trusted bus operators.</p>
        </div>
    );
}
