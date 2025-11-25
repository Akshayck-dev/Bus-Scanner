import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Use - Bus Scanner',
    description: 'Read our terms and conditions for using Bus Scanner services.',
};

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
            <p className="text-lg mb-8">Welcome to BusScanner. By using our platform, you agree to the following:</p>

            <div className="space-y-8">
                <section>
                    <h2 className="text-xl font-semibold mb-3">BusScanner does not handle bookings</h2>
                    <p className="text-gray-300">We only compare fares and redirect you to the official operator or partner website to complete your booking.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">No responsibility for ticket issues</h2>
                    <p className="text-gray-300">Any cancellations, refunds, delays, or seat problems must be resolved with the respective bus operator or their booking platform.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">Data Accuracy</h2>
                    <p className="text-gray-300">We try our best to display accurate fares and schedules, but prices may change at the operator’s end.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">Use of Website</h2>
                    <p className="text-gray-300">You agree not to misuse our data, scrape content, or interfere with the website’s performance.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">Limitation of Liability</h2>
                    <p className="text-gray-300">BusScanner is not responsible for travel-related disputes between you and any bus operator.</p>
                </section>
            </div>
        </div>
    );
}
