import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FAQ - BusScanner',
    description: 'Frequently Asked Questions about booking bus tickets on BusScanner.',
};

export default function FAQPage() {
    const faqs = [
        {
            question: "1. What is BusScanner?",
            answer: "BusScanner is a fare comparison platform that helps you compare bus prices, schedules, ratings, and operators across India. We redirect you to the official bus operator or booking partner to complete your booking."
        },
        {
            question: "2. Does BusScanner sell bus tickets?",
            answer: "No. We do not sell tickets or handle payments. You book safely on the official website of the operator (like KSRTC, VRL, ZingBus, etc.)."
        },
        {
            question: "3. Are the fares shown on BusScanner accurate?",
            answer: "We try to display the most accurate and up-to-date fares, but prices may change on the operator’s website due to demand or availability."
        },
        {
            question: "4. How do I book a ticket?",
            answer: "Search your route → Compare prices → Click Book Now → You will be redirected to the operator’s official site → Complete the booking there."
        },
        {
            question: "5. Can I cancel or reschedule my ticket through BusScanner?",
            answer: "No. Since we don’t handle bookings, all cancellations, rescheduling, and refunds must be done directly on the bus operator’s website."
        },
        {
            question: "6. I booked a ticket but didn’t receive a confirmation. What should I do?",
            answer: "Please contact the respective bus operator or booking platform. BusScanner does not issue tickets or confirmations."
        },
        {
            question: "7. Which bus operators are available on BusScanner?",
            answer: "We show fares from 300+ operators, including: KSRTC, MSRTC, UPSRTC, APSRTC, TSRTC, VRL Travels, SRS Travels, Kallada, Orange, Parveen, ZingBus, National Travels, and many more."
        },
        {
            question: "8. Is BusScanner free to use?",
            answer: "Yes! BusScanner is completely free for all users."
        },
        {
            question: "9. Do you track my personal data?",
            answer: "No. We only collect basic analytics to improve the app. No sensitive personal information is stored or shared."
        },
        {
            question: "10. I am a bus operator. How can I list my services?",
            answer: (
                <span>
                    Email us at <a href="mailto:partners@busscanner.in" className="text-blue-400 hover:underline">partners@busscanner.in</a> and our team will help you get listed or update your details.
                </span>
            )
        },
        {
            question: "11. Do you offer customer support?",
            answer: (
                <span>
                    Yes.<br />
                    For general queries: <a href="mailto:support@busscanner.in" className="text-blue-400 hover:underline">support@busscanner.in</a><br />
                    For urgent issues: mention “URGENT – BusScanner” in the subject.
                </span>
            )
        },
        {
            question: "12. Why is the fare different when I click “Book Now”?",
            answer: "Operators update prices frequently based on demand and availability. We always try to show the latest price, but small differences may occur."
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h1>

            <div className="space-y-6">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                        <h2 className="text-xl font-semibold mb-3 text-white">{faq.question}</h2>
                        <div className="text-gray-300 leading-relaxed">
                            {faq.answer}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
