import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FAQ - Bus Scanner',
    description: 'Frequently Asked Questions about booking bus tickets on Bus Scanner.',
};

export default function FAQPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">FAQ</h1>
            <p>Frequently Asked Questions.</p>
        </div>
    );
}
