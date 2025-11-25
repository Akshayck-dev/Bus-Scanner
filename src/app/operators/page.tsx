import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bus Operators - Bus Scanner',
    description: 'List of all bus operators available on Bus Scanner.',
};

export default function OperatorsPage() {
    const operators = [
        'KSRTC, UPSRTC, MSRTC, APSRTC, TSRTC',
        'VRL Travels',
        'SRS Travels',
        'Kallada Travels',
        'Orange Travels',
        'Parveen Travels',
        'ZingBus',
        'National Travels'
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Bus Operators on BusScanner</h1>
            <p className="text-lg mb-8">We compare fares from major operators across India, including:</p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
                {operators.map((op) => (
                    <div key={op} className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <span className="font-medium">{op}</span>
                    </div>
                ))}
                <div className="p-4 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                    <span className="text-gray-400 italic">And 300+ more operators</span>
                </div>
            </div>

            <div className="bg-blue-500/10 p-6 rounded-lg border border-blue-500/20">
                <p>If you are a bus operator and want to be listed or update your details, contact: <a href="mailto:partners@busscanner.in" className="text-blue-400 hover:underline">partners@busscanner.in</a></p>
            </div>
        </div>
    );
}
