import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Refund Policy - Bus Scanner',
    description: 'Information about our cancellation and refund policies.',
};

export default function RefundsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Refund Policy</h1>
            <p>Details about refunds and cancellations.</p>
        </div>
    );
}
