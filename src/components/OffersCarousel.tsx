'use client';

import styles from './OffersCarousel.module.css';

const OFFERS = [
    {
        id: 1,
        code: 'FIRST',
        title: 'First Ride Free',
        desc: 'Get 100% cashback on your first booking',
        validity: 'Valid till 31st Dec',
        bg: 'linear-gradient(135deg, #FF6B6B 0%, #EE5253 100%)',
        icon: '🎁'
    },
    {
        id: 2,
        code: 'HDFC500',
        title: 'HDFC Bank Offer',
        desc: 'Flat ₹500 off on payments via HDFC Cards',
        validity: 'Valid on weekends',
        bg: 'linear-gradient(135deg, #4834D4 0%, #686DE0 100%)',
        icon: '💳'
    },
    {
        id: 3,
        code: 'SUMMER',
        title: 'Summer Special',
        desc: 'Upto 20% off on AC bus bookings',
        validity: 'Limited time offer',
        bg: 'linear-gradient(135deg, #F0932B 0%, #FFBE76 100%)',
        icon: '☀️'
    },
    {
        id: 4,
        code: 'APP100',
        title: 'App Exclusive',
        desc: 'Extra ₹100 off on app bookings',
        validity: 'New users only',
        bg: 'linear-gradient(135deg, #6AB04C 0%, #BADC58 100%)',
        icon: '📱'
    }
];

export default function OffersCarousel() {
    // Duplicate offers to create seamless infinite scroll
    // We duplicate it enough times to ensure it covers the screen width comfortably
    const infiniteOffers = [...OFFERS, ...OFFERS, ...OFFERS];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Exclusive Offers</h2>
                </div>

                <div className={styles.carouselWrapper}>
                    <div className={styles.carouselTrack}>
                        {infiniteOffers.map((offer, index) => (
                            <div key={`${offer.id}-${index}`} className={styles.card} style={{ background: offer.bg }}>
                                <div className={styles.cardContent}>
                                    <div className={styles.icon}>{offer.icon}</div>
                                    <div className={styles.details}>
                                        <div className={styles.chip}>{offer.code}</div>
                                        <h3 className={styles.offerTitle}>{offer.title}</h3>
                                        <p className={styles.offerDesc}>{offer.desc}</p>
                                        <p className={styles.validity}>{offer.validity}</p>
                                    </div>
                                </div>
                                <div className={styles.circle1}></div>
                                <div className={styles.circle2}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
