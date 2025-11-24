import styles from './PopularDestinations.module.css';

const DESTINATIONS = [
    {
        id: 1,
        name: 'Mumbai',
        image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1000&auto=format&fit=crop',
        routes: '200+ Buses'
    },
    {
        id: 2,
        name: 'Bangalore',
        image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1000&auto=format&fit=crop',
        routes: '180+ Buses'
    },
    {
        id: 3,
        name: 'Delhi',
        image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000&auto=format&fit=crop',
        routes: '150+ Buses'
    },
    {
        id: 4,
        name: 'Goa',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop',
        routes: '120+ Buses'
    }
];

export default function PopularDestinations() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Trending Destinations</h2>
                <div className={styles.grid}>
                    {DESTINATIONS.map(city => (
                        <div key={city.id} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <img src={city.image} alt={city.name} className={styles.image} />
                                <div className={styles.overlay}></div>
                            </div>
                            <div className={styles.content}>
                                <h3 className={styles.cityName}>{city.name}</h3>
                                <span className={styles.routes}>{city.routes}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
