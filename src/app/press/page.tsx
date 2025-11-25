import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Press - Bus Scanner',
    description: 'Latest news and press releases from Bus Scanner.',
};

export default function PressPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Press</h1>
            <p>Read about us in the news.</p>
        </div>
    );
}
