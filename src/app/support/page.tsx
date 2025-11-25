import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Support - Bus Scanner',
    description: 'Get in touch with our support team for any assistance.',
};

export default function SupportPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Support</h1>
            <p>Contact our support team here.</p>
        </div>
    );
}
