"use client"; // Mark this as a client component

import styles from "./DetaliiCont.module.css"; // Import CSS Module

export default function DetaliiCont() {
  return (
    <div className={styles.container}>
      <h1>Detalii Cont</h1>
      <p>Here you can view and update your account details.</p>
      {/* Add your account details content here */}
    </div>
  );
}
