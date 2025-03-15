"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db, storage } from "../../../firebase"; // Import Firebase Auth, Firestore, and Storage
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import styles from "../../SalonDashboard.module.css"; // Adjust the import path

export default function CreateSalon() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", address: "", imageFile: null });
  const [user, setUser] = useState(null);

  // Fetch the logged-in user
  useState(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/login"); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setFormData({ ...formData, imageFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCreateSalon = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.address) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      let imagePath = "";
      if (formData.imageFile) {
        const imageRef = ref(storage, `images/${formData.imageFile.name}`);
        await uploadBytes(imageRef, formData.imageFile);
        imagePath = await getDownloadURL(imageRef);
      }

      const salonsRef = collection(db, "salons");
      await addDoc(salonsRef, {
        name: formData.name,
        address: formData.address,
        imagePath,
        ownerId: user.uid, // Save the logged-in user's UID as the owner
        createdAt: new Date(),
      });

      alert("Salon created successfully!");
      setFormData({ name: "", address: "", imageFile: null });
      router.push("/salon-dashboard"); // Redirect to the dashboard
    } catch (error) {
      console.error("Error creating salon:", error);
      alert("Failed to create salon.");
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <h2 className={styles.header}>Create Salon</h2>
      <form className={styles.form} onSubmit={handleCreateSalon}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Salon Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address">Salon Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="imageFile">Salon Image</label>
          <input
            type="file"
            id="imageFile"
            name="imageFile"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Create Salon
        </button>
      </form>
    </div>
  );
}
