import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Careers - Bus Scanner',
    description: 'Join our team and help us revolutionize bus travel in India.',
};

export default function CareersPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Careers</h1>
            <p>Check out our open positions.</p>
        </div>
    );
}
