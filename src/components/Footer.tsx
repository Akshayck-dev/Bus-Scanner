import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.topSection}>
                    <div className={styles.brandCol}>
                        <div className={styles.logo}>
                            <span className={styles.logoIcon}>🚌</span>
                            <span className={styles.logoText}>BusScanner</span>
                        </div>
                        <p className={styles.desc}>
                            India&apos;s fastest growing online bus ticketing platform.
                            Book tickets for over 2500+ bus operators and 100,000+ routes.
                        </p>
                        <div className={styles.socials}>
                            <a href="#" className={styles.socialLink}><Facebook size={20} /></a>
                            <a href="#" className={styles.socialLink}><Twitter size={20} /></a>
                            <a href="#" className={styles.socialLink}><Instagram size={20} /></a>
                            <a href="#" className={styles.socialLink}><Linkedin size={20} /></a>
                            <a href="#" className={styles.socialLink}><Youtube size={20} /></a>
                        </div>
                    </div>

                    <div className={styles.linksCol}>
                        <h4 className={styles.colTitle}>About</h4>
                        <ul className={styles.linkList}>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/contact">Contact Us</Link></li>
                            <li><Link href="/careers">Careers</Link></li>
                            <li><Link href="/press">Press</Link></li>
                        </ul>
                    </div>

                    <div className={styles.linksCol}>
                        <h4 className={styles.colTitle}>Support</h4>
                        <ul className={styles.linkList}>
                            <li><Link href="/faq">FAQ</Link></li>
                            <li><Link href="/terms">Terms of Use</Link></li>
                            <li><Link href="/privacy">Privacy Policy</Link></li>
                            <li><Link href="/refunds">Refund Policy</Link></li>
                        </ul>
                    </div>

                    <div className={styles.linksCol}>
                        <h4 className={styles.colTitle}>Useful Links</h4>
                        <ul className={styles.linkList}>
                            <li><Link href="/offers">Offers</Link></li>
                            <li><Link href="/operators">Bus Operators</Link></li>
                            <li><Link href="/routes">Popular Routes</Link></li>
                            <li><Link href="/sitemap">Sitemap</Link></li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottomSection}>
                    <p>&copy; {new Date().getFullYear()} BusScanner. All rights reserved.</p>
                    <div className={styles.paymentIcons}>
                        <span>💳 Visa</span>
                        <span>💳 Mastercard</span>
                        <span>💳 UPI</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
