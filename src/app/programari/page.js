"use client"; // Mark this as a client component

import styles from "./Programari.module.css"; // Import CSS Module

export default function Programari() {
  return (
    <div className={styles.container}>
      <h1>Programari</h1>
      <p>Here you can view and manage your appointments.</p>
      {/* Add your appointments content here */}
    </div>
  );
}
