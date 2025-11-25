import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us - Bus Scanner',
    description: 'Learn more about Bus Scanner, India\'s fastest growing online bus ticketing platform.',
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">About Us</h1>
            <p>Learn more about our company.</p>
        </div>
    );
}
