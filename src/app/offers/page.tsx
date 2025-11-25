import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Offers - Bus Scanner',
    description: 'Check out the latest offers and deals on bus tickets.',
};

export default function OffersPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Offers</h1>
            <p>Special offers and deals coming soon...</p>
        </div>
    );
}
