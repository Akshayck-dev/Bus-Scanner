import Link from 'next/link';
import { User, Menu, Bus, Train, Hotel } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.leftSection}>
                    <Link href="/" className={styles.logo}>
                        <span className={styles.logoIcon}>🚌</span>
                        <span className={styles.logoText}>BusScanner</span>
                    </Link>
                </div>

                <nav className={styles.nav}>
                    <Link href="/" className={`${styles.navLink} ${styles.active}`}>
                        <Bus size={18} />
                        <span>Buses</span>
                    </Link>
                    <Link href="/trains" className={styles.navLink}>
                        <Train size={18} />
                        <span>Trains</span>
                    </Link>
                    <Link href="/hotels" className={styles.navLink}>
                        <Hotel size={18} />
                        <span>Hotels</span>
                    </Link>
                </nav>

                <div className={styles.rightSection}>
                    <Link href="/offers" className={styles.secondaryLink}>Offers</Link>
                    <Link href="/support" className={styles.secondaryLink}>Contact</Link>
                    <button className={styles.loginBtn}>
                        <User size={18} />
                        <span>Login / SignUp</span>
                    </button>
                    <button className={styles.menuBtn}>
                        <Menu size={24} />
                    </button>
                </div>
            </div>
        </header>
    );
}
