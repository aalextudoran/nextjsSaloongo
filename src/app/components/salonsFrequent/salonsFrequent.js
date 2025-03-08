"use client"; // Mark this as a client component

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "../../firebase"; // Correct import path
import { ref, getDownloadURL } from "firebase/storage";
import styles from "./SalonsFrequent.module.css";

export default function SalonsFrequent() {
  const [salons, setSalons] = useState([]);
  console.log("Firestore DB:", db);
  useEffect(() => {
    const fetchSalons = async () => {
      try {
        if (!db) {
          console.error("Firestore is not initialized.");
          return;
        }

        console.log("Fetching salons from Firestore...");
        // Fetch salons from Firestore
        const querySnapshot = await getDocs(collection(db, "salons"));
        const salonsData = [];

        for (const doc of querySnapshot.docs) {
          const salon = doc.data();
          salon.id = doc.id;

          // Fetch image URL from Firebase Storage
          if (salon.imagePath) {
            const imageRef = ref(storage, salon.imagePath);
            salon.imageUrl = await getDownloadURL(imageRef);
          }

          salonsData.push(salon);
        }

        setSalons(salonsData);
        console.log("Salons fetched successfully:", salonsData);
      } catch (error) {
        console.error("Error fetching salons:", error);
      }
    };

    fetchSalons();
  }, []);

  return (
    <section className={styles.featured}>
      <h2>Frecvent vizitate</h2>
      <div className={styles.cardDeck}>
        {salons.slice(0, 3).map((salon) => (
          <div key={salon.id} className={styles.salonCard}>
            <div className={styles.imageContainer}>
              {salon.imageUrl && (
                <img src={salon.imageUrl} alt={salon.name} className={styles.salonImage} />
              )}
              {salon.frequentlyChosen && <span className={styles.badge}>Frequently chosen</span>}
            </div>
            <div className={styles.salonDetails}>
              <h3 className={styles.salonName}>{salon.name}</h3>
              <p className={styles.salonLocation}>📍 {salon.location}</p>
              <p className={styles.salonRating}>⭐ {salon.rating} {salon.reviews && `(${salon.reviews})`}</p>
              <div className={styles.tags}>
                {salon.tags?.map((tag, index) => (
                  <span key={index} className={styles.tag}>{tag}</span>
                ))}
              </div>            
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}