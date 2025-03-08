"use client"; // Mark this as a client component

import styles from "./Header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      {/* Navbar */}
      <div className={styles.navbar}>
        <Link href="/" className={styles.navbarBrand}>
          <img src="/assets/logo_image.png" alt="Saloongo" />
        </Link>
        <div className={styles.navbarRight}>
          <Link href="/login">Login</Link>
          <Link href="#">Meniu</Link>
        </div>
      </div>

      {/* Service Icons */}
      <div className={styles.serviceIcons}>
        <button className={styles.icon}>
          <img src="/assets/coafor-icon.png" alt="Coafor" />
        </button>
        <button className={styles.icon}>
          <img src="/assets/barba-icon.png" alt="Barba" />
        </button>
        <button className={styles.icon}>
          <img src="/assets/wellness-icon.png" alt="Wellness" />
        </button>
        <button className={styles.icon}>
          <img src="/assets/frizerie-icon.png" alt="Frizerie" />
        </button>
        <button className={styles.icon}>
          <img src="/assets/fata-icon.png" alt="Fata" />
        </button>
        <button className={styles.icon}>
          <img src="/assets/picioare-icon.png" alt="Picioare" />
        </button>
      </div>

      {/* Search Bar */}
      <div className={styles.searchBar}>
        <input type="text" placeholder="Serviciu/Salon" />
        <span className={styles.separator}></span>
        <input type="text" placeholder="Locație" />
        <span className={styles.separator}></span>
        <input type="date" placeholder="Data" />
        <span className={styles.separator}></span>
        <input type="time" placeholder="Ora" />
        <button>Caută</button>
      </div>

      {/* Main Header */}
      <h1 className={styles.mainHeader}>Programari, mai la-ndemana ca oricand !</h1>

    </header>
  );
}