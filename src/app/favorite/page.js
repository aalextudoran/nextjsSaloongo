"use client"; // Mark this as a client component

import styles from "./Favorite.module.css"; // Import CSS Module

export default function Favorite() {
  return (
    <div className={styles.container}>
      <h1>Favorite</h1>
      <p>Here you can view and manage your favorite items.</p>
      {/* Add your favorite items content here */}
    </div>
  );
}
