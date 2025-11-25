import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Use - Bus Scanner',
    description: 'Read our terms and conditions for using Bus Scanner services.',
};

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Terms of Use</h1>
            <p>Please read these terms carefully.</p>
        </div>
    );
}
