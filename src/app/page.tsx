import SearchHero from '@/components/SearchHero';
import OffersCarousel from '@/components/OffersCarousel';
import PopularDestinations from '@/components/PopularDestinations';
import FeaturesSection from '@/components/FeaturesSection';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.heroWrapper}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Book Bus Tickets</h1>
          <SearchHero />
        </div>
      </div>

      <OffersCarousel />
      <PopularDestinations />
      <FeaturesSection />
    </main>
  );
}
