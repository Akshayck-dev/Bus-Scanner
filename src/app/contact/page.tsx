import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us - Bus Scanner',
    description: 'Get in touch with Bus Scanner for any queries or support.',
};

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <p>We are here to help you.</p>
        </div>
    );
}
