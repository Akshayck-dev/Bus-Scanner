'use client';

import Link from 'next/link';
import { useState } from 'react';
import { User, Menu, Bus, Train, Hotel, X } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
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
                    <button className={styles.menuBtn} onClick={toggleMenu}>
                        <Menu size={24} />
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className={styles.mobileMenu}>
                        <div className={styles.mobileMenuHeader}>
                            <Link href="/" className={styles.logo} onClick={toggleMenu}>
                                <span className={styles.logoIcon}>🚌</span>
                                <span className={styles.logoText}>BusScanner</span>
                            </Link>
                            <button className={styles.closeBtn} onClick={toggleMenu}>
                                <X size={24} />
                            </button>
                        </div>
                        <nav className={styles.mobileNav}>
                            <Link href="/" className={styles.mobileNavLink} onClick={toggleMenu}>
                                <Bus size={20} />
                                <span>Buses</span>
                            </Link>
                            <Link href="/trains" className={styles.mobileNavLink} onClick={toggleMenu}>
                                <Train size={20} />
                                <span>Trains</span>
                            </Link>
                            <Link href="/hotels" className={styles.mobileNavLink} onClick={toggleMenu}>
                                <Hotel size={20} />
                                <span>Hotels</span>
                            </Link>
                            <div className={styles.divider}></div>
                            <Link href="/offers" className={styles.mobileNavLink} onClick={toggleMenu}>
                                <span>Offers</span>
                            </Link>
                            <Link href="/support" className={styles.mobileNavLink} onClick={toggleMenu}>
                                <span>Contact</span>
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
