import { ShieldCheck, Clock, Headset, Ticket } from 'lucide-react';
import styles from './FeaturesSection.module.css';

const FEATURES = [
    {
        icon: <ShieldCheck size={48} />,
        title: 'Unmatched Safety',
        desc: 'We prioritize your safety with verified buses and trained staff.'
    },
    {
        icon: <Clock size={48} />,
        title: 'On-Time Guarantee',
        desc: 'Punctual departures and arrivals, or you get a refund.'
    },
    {
        icon: <Headset size={48} />,
        title: '24/7 Support',
        desc: 'Our customer support team is always here to help you.'
    },
    {
        icon: <Ticket size={48} />,
        title: 'Lowest Prices',
        desc: 'Best price guarantee on all bus bookings across India.'
    }
];

export default function FeaturesSection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Why Choose BusScanner?</h2>
                    <p className={styles.subtitle}>We provide the best travel experience with premium services</p>
                </div>

                <div className={styles.grid}>
                    {FEATURES.map((feature, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.iconWrapper}>
                                {feature.icon}
                            </div>
                            <h3 className={styles.cardTitle}>{feature.title}</h3>
                            <p className={styles.cardDesc}>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
