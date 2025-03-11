"use client"; // Mark this as a client component

import styles from "./Notificari.module.css"; // Import CSS Module

export default function Notificari() {
  return (
    <div className={styles.container}>
      <h1>Notificari</h1>
      <p>Here you can view your notifications.</p>
      {/* Add your notifications content here */}
    </div>
  );
}
