import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy - Bus Scanner',
    description: 'We value your privacy. Read our privacy policy to know how we handle your data.',
};

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
            <p>Your privacy is important to us.</p>
        </div>
    );
}
