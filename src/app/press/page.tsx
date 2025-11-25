import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Press - Bus Scanner',
    description: 'Latest news and press releases from Bus Scanner.',
};

export default function PressPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Press & Media</h1>
            <div className="space-y-6">
                <p className="text-lg">BusScanner is India’s smart bus fare comparison tool, helping users compare prices, schedules, operators, and features — and book securely on official partner sites.</p>

                <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                    <h2 className="text-xl font-semibold mb-4">Media Inquiries</h2>
                    <p className="mb-4">For media inquiries, interviews, or collaborations:</p>
                    <p><strong>Email:</strong> <a href="mailto:press@busscanner.in" className="text-blue-400 hover:underline">press@busscanner.in</a></p>
                    <p className="text-sm text-gray-400 mt-2">We respond within 2 working days.</p>
                </div>
            </div>
        </div>
    );
}
