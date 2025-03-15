"use client";

import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import styles from "../../SalonDashboard.module.css"; // Adjust the import path

export default function ManageBarbers() {
  const [barbers, setBarbers] = useState([]);
  const [newBarber, setNewBarber] = useState("");

  useEffect(() => {
    const fetchBarbers = async () => {
      const barbersCollection = collection(db, "barbers");
      const barbersSnapshot = await getDocs(barbersCollection);
      const barbersList = barbersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBarbers(barbersList);
    };

    fetchBarbers();
  }, []);

  const handleAddBarber = async () => {
    if (newBarber.trim() === "") return;

    const barbersCollection = collection(db, "barbers");
    const docRef = await addDoc(barbersCollection, { name: newBarber });
    setBarbers([...barbers, { id: docRef.id, name: newBarber }]);
    setNewBarber("");
  };

  const handleDeleteBarber = async (id) => {
    const barberDoc = doc(db, "barbers", id);
    await deleteDoc(barberDoc);
    setBarbers(barbers.filter((barber) => barber.id !== id));
  };

  return (
    <div className={styles.dashboardContainer}>
      <h2 className={styles.header}>Manage Barbers</h2>
      <div className={styles.formGroup}>
        <input
          type="text"
          value={newBarber}
          onChange={(e) => setNewBarber(e.target.value)}
          placeholder="Add new barber"
        />
        <button onClick={handleAddBarber}>Add Barber</button>
      </div>
      <ul>
        {barbers.map((barber) => (
          <li key={barber.id}>
            {barber.name}
            <button onClick={() => handleDeleteBarber(barber.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
