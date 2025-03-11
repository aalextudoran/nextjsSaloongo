"use client"; // Mark this as a client component

import styles from "./SetariNotificari.module.css"; // Import CSS Module

export default function SetariNotificari() {
  return (
    <div className={styles.container}>
      <h1>Setari Notificari</h1>
      <p>Here you can configure your notification settings.</p>
      {/* Add your notification settings content here */}
    </div>
  );
}
