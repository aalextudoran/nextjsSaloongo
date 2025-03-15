"use client";

import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import styles from "../../SalonDashboard.module.css"; // Adjust the import path

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const q = query(collection(db, "appointments"), where("salonId", "==", "your-salon-id"));
      const querySnapshot = await getDocs(q);
      const appointmentsData = querySnapshot.docs.map((doc) => doc.data());
      setAppointments(appointmentsData);
    };

    fetchAppointments();
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <h2 className={styles.header}>Appointments</h2>
      <ul className={styles.appointmentsList}>
        {appointments.map((appointment, index) => (
          <li key={index} className={styles.appointmentItem}>
            <p><strong>Client:</strong> {appointment.clientName}</p>
            <p><strong>Date:</strong> {appointment.date}</p>
            <p><strong>Time:</strong> {appointment.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
