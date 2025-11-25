import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sitemap - Bus Scanner',
    description: 'Overview of all pages on Bus Scanner.',
};

export default function SitemapPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Sitemap</h1>
            <p>Links to all sections of our website.</p>
        </div>
    );
}
