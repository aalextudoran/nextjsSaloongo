"use client";

import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import styles from "./SummaryStats.module.css";

export default function SummaryStats({ userId }) {
  const [stats, setStats] = useState({ appointments: 0, reviews: 0, revenue: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const appointmentsQuery = query(collection(db, "appointments"), where("salonId", "==", userId));
        const reviewsQuery = query(collection(db, "reviews"), where("salonId", "==", userId));
        const revenueQuery = query(collection(db, "payments"), where("salonId", "==", userId));

        const [appointmentsSnapshot, reviewsSnapshot, revenueSnapshot] = await Promise.all([
          getDocs(appointmentsQuery),
          getDocs(reviewsQuery),
          getDocs(revenueQuery),
        ]);

        const appointments = appointmentsSnapshot.size;
        const reviews = reviewsSnapshot.size;
        const revenue = revenueSnapshot.docs.reduce((total, doc) => total + doc.data().amount, 0);

        setStats({ appointments, reviews, revenue });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [userId]);

  return (
    <div className={styles.statsContainer}>
      <div className={styles.stat}>
        <h3>Appointments</h3>
        <p>{stats.appointments}</p>
      </div>
      <div className={styles.stat}>
        <h3>Reviews</h3>
        <p>{stats.reviews}</p>
      </div>
      <div className={styles.stat}>
        <h3>Revenue</h3>
        <p>${stats.revenue.toFixed(2)}</p>
      </div>
    </div>
  );
}