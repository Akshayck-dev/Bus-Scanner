import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Popular Routes - Bus Scanner',
    description: 'Explore the most popular bus routes across India.',
};

export default function RoutesPage() {
    const routes = [
        'Bangalore → Hyderabad',
        'Chennai → Bangalore',
        'Kochi → Bangalore',
        'Mumbai → Pune',
        'Delhi → Jaipur',
        'Hyderabad → Vijayawada',
        'Kolkata → Digha'
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Popular Bus Routes in India</h1>
            <p className="text-lg mb-8">We cover thousands of routes. Some major routes:</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {routes.map((route) => (
                    <div key={route} className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                        <span className="font-medium">{route}</span>
                    </div>
                ))}
            </div>

            <p className="text-lg text-center text-gray-300">Search your route to see real-time prices, ratings, and operator options.</p>
        </div>
    );
}
