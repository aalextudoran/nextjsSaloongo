"use client"; // Mark this as a client component

import { useRouter } from "next/navigation"; // Import useRouter
import styles from "./RoleSelection.module.css"; // Import CSS Module

export default function RoleSelection() {
  const router = useRouter();

  const goToSalonDashboard = () => {
    router.push("/salon-dashboard");
  };

  const goToHomePage = () => {
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <h1>Select Your Role</h1>
      <p>You have both a user and a salon owner account. Where would you like to go?</p>
      <div className={styles.buttonGroup}>
        <button onClick={goToSalonDashboard} className={styles.button}>
          Salon Dashboard
        </button>
        <button onClick={goToHomePage} className={styles.button}>
          Home Page
        </button>
      </div>
    </div>
  );
}
