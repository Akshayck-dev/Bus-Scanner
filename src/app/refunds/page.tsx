import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Refund Policy - Bus Scanner',
    description: 'Information about our cancellation and refund policies.',
};

export default function RefundsPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>

            <div className="bg-white/5 p-6 rounded-lg border border-white/10 mb-8">
                <h2 className="text-xl font-semibold mb-4">BusScanner does not process payments or issue tickets.</h2>
                <div className="space-y-4 text-gray-300">
                    <p>Therefore:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>All refunds, cancellations, rescheduling, and support must be handled directly with the bus operator or the booking partner (RedBus, AbhiBus, ZingBus, etc.)</li>
                        <li>We provide help by guiding you to the correct support channel but cannot process refunds ourselves.</li>
                    </ul>
                </div>
            </div>

            <p>For help finding the right support link, email <a href="mailto:help@busscanner.in" className="text-blue-400 hover:underline">help@busscanner.in</a></p>
        </div>
    );
}
