import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us - Bus Scanner',
    description: 'Get in touch with Bus Scanner for any queries or support.',
};

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
            <div className="space-y-6">
                <p className="text-lg">Have questions, suggestions, or partnership inquiries? We’re here to help.</p>

                <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                    <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
                    <div className="space-y-3">
                        <p><strong>Email:</strong> <a href="mailto:support@busscanner.in" className="text-blue-400 hover:underline">support@busscanner.in</a></p>
                        <p><strong>Business Hours:</strong> 9:00 AM – 6:00 PM (Mon–Fri)</p>
                    </div>
                </div>

                <div className="bg-blue-500/10 p-6 rounded-lg border border-blue-500/20">
                    <h2 className="text-xl font-semibold mb-2 text-blue-300">For urgent issues:</h2>
                    <p>Please mention the subject as <span className="font-semibold text-white">“URGENT – BusScanner”</span> and we will prioritize your request.</p>
                </div>
            </div>
        </div>
    );
}
