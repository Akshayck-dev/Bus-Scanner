import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Popular Routes - Bus Scanner',
    description: 'Explore the most popular bus routes across India.',
};

export default function RoutesPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Popular Routes</h1>
            <p>Find buses for top destinations.</p>
        </div>
    );
}
