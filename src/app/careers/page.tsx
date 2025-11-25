import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Careers - Bus Scanner',
    description: 'Join our team and help us revolutionize bus travel in India.',
};

export default function CareersPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Join BusScanner</h1>
            <p className="text-lg mb-8">We are building India’s most reliable bus fare comparison platform. If you&apos;re passionate about travel, technology, and solving real-world problems, join our team.</p>

            <h2 className="text-2xl font-semibold mb-6">Current Openings</h2>
            <div className="grid gap-4 mb-8">
                {['Frontend Developer (React/Next.js)', 'Backend Developer (Node.js / Python)', 'Data Engineer (APIs & scraping)', 'Digital Marketing Intern'].map((job) => (
                    <div key={job} className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <h3 className="font-medium">{job}</h3>
                    </div>
                ))}
            </div>

            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <p className="text-lg">Send your resume to <a href="mailto:careers@busscanner.in" className="text-blue-400 hover:underline">careers@busscanner.in</a></p>
            </div>
        </div>
    );
}
