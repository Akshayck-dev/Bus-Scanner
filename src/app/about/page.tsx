import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'About Us - Bus Scanner',
    description: 'Learn more about Bus Scanner, India\'s fastest growing online bus ticketing platform.',
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
                <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-6">Who We Are</h1>
                    <p className="text-lg mb-4">
                        BusScanner is India’s smart and simple bus fare comparison platform.
                        We help travellers compare prices, schedules, ratings, routes, and operators — and then book safely on the official operator website.
                    </p>
                    <p className="text-xl font-semibold text-blue-400">
                        Our goal is to make bus travel transparent, affordable, and easy for everyone.
                    </p>
                </div>
                <div className="flex-1 relative h-64 w-full md:h-80">
                    <Image
                        src="/images/about_hero.png"
                        alt="Bus Scanner Digital Interface"
                        fill
                        className="object-cover rounded-xl shadow-lg"
                    />
                </div>
            </div>

            {/* What We Do */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold mb-8 text-center">What We Do</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                        <div className="text-3xl mb-4">🚌</div>
                        <h3 className="text-xl font-semibold mb-2">Compare fares</h3>
                        <p className="text-gray-300">From 300+ government & private operators across India.</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                        <div className="text-3xl mb-4">🕒</div>
                        <h3 className="text-xl font-semibold mb-2">Real-time schedules</h3>
                        <p className="text-gray-300">See seat availability and timings instantly.</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                        <div className="text-3xl mb-4">🔗</div>
                        <h3 className="text-xl font-semibold mb-2">Official Redirects</h3>
                        <p className="text-gray-300">We never handle payments — book directly on trusted sites.</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                        <div className="text-3xl mb-4">💰</div>
                        <h3 className="text-xl font-semibold mb-2">Save Money</h3>
                        <p className="text-gray-300">Find the lowest bus fares in seconds.</p>
                    </div>
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="flex flex-col-reverse md:flex-row items-center gap-12 mb-16 bg-white/5 p-8 rounded-2xl border border-white/10">
                <div className="flex-1 relative h-64 w-full md:h-80">
                    <Image
                        src="/images/about_mission.png"
                        alt="Happy Travelers"
                        fill
                        className="object-cover rounded-xl shadow-lg"
                    />
                </div>
                <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-6">Why We Built BusScanner</h2>
                    <p className="text-lg mb-6 text-gray-300">
                        Booking a bus in India is often confusing — too many apps, different prices, hidden charges, wrong timings.
                        BusScanner was created to solve this problem by bringing all information into one clean platform.
                    </p>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold text-blue-400 mb-2">Our Mission</h3>
                            <p>To make bus travel simple, affordable, and reliable for every traveller in India.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-blue-400 mb-2">Our Vision</h3>
                            <p>To become India’s most trusted platform for bus search, fare comparison, and travel information.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <div className="flex items-start gap-4 p-4">
                        <div className="bg-blue-500/20 p-3 rounded-lg text-blue-400">💎</div>
                        <div>
                            <h3 className="text-xl font-semibold mb-1">Transparency</h3>
                            <p className="text-gray-300">No hidden prices or surprise charges.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4">
                        <div className="bg-blue-500/20 p-3 rounded-lg text-blue-400">🎯</div>
                        <div>
                            <h3 className="text-xl font-semibold mb-1">Accuracy</h3>
                            <p className="text-gray-300">Latest fares & operator data.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4">
                        <div className="bg-blue-500/20 p-3 rounded-lg text-blue-400">🛡️</div>
                        <div>
                            <h3 className="text-xl font-semibold mb-1">Trust</h3>
                            <p className="text-gray-300">Book only on official websites.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4">
                        <div className="bg-blue-500/20 p-3 rounded-lg text-blue-400">⚡</div>
                        <div>
                            <h3 className="text-xl font-semibold mb-1">User-first</h3>
                            <p className="text-gray-300">Fast, clean, and easy to use.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Who Uses & Work With Us */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                    <h2 className="text-2xl font-bold mb-6">Who Uses BusScanner</h2>
                    <ul className="space-y-3 text-lg text-gray-300">
                        <li className="flex items-center gap-2">👤 Daily commuters</li>
                        <li className="flex items-center gap-2">🎓 Students</li>
                        <li className="flex items-center gap-2">💼 Office travellers</li>
                        <li className="flex items-center gap-2">🌏 Long-distance interstate travellers</li>
                        <li className="flex items-center gap-2">🏖️ Tourists</li>
                    </ul>
                    <p className="mt-6 font-medium text-white">Basically, anyone who wants the best bus at the best price.</p>
                </div>

                <div className="bg-blue-600/10 p-8 rounded-2xl border border-blue-500/20">
                    <h2 className="text-2xl font-bold mb-6">Work With Us</h2>
                    <p className="text-lg mb-6">
                        We partner with operators, booking platforms, and travel agencies.
                        If you're interested in collaborating:
                    </p>
                    <a
                        href="mailto:partners@busscanner.in"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        📧 Email Partners
                    </a>
                </div>
            </div>
        </div>
    );
}
