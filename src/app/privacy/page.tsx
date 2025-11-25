import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy - Bus Scanner',
    description: 'We value your privacy. Read our privacy policy to know how we handle your data.',
};

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-lg mb-6">BusScanner is committed to protecting your data.</p>

            <div className="space-y-4 text-gray-300">
                <ul className="list-disc pl-5 space-y-2">
                    <li>We do not collect sensitive personal information.</li>
                    <li>We may store basic usage analytics (visited routes, searches) to improve the platform.</li>
                    <li>We do not sell or share your data with any third party.</li>
                    <li>When you click “Book Now,” you are redirected to the operator’s website — their privacy policy will apply.</li>
                </ul>

                <p className="pt-4">To request data deletion, email <a href="mailto:privacy@busscanner.in" className="text-blue-400 hover:underline">privacy@busscanner.in</a></p>
            </div>
        </div>
    );
}
