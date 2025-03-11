"use client"; // Mark this as a client component

import styles from "./SalonDashboard.module.css"; // Import CSS Module
import { useRouter } from "next/navigation"; // Import useRouter
import { useEffect, useState } from "react";
import { auth, db, storage } from "../firebase"; // Import initialized auth, db, and storage from firebase.js
import { onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth functions
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase Storage functions

export default function SalonDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageFile: null
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/login"); // Redirect to login if not authenticated
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imagePath = "";
      if (formData.imageFile) {
        const imageRef = ref(storage, `images/${formData.imageFile.name}`);
        await uploadBytes(imageRef, formData.imageFile);
        imagePath = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "salons"), {
        name: formData.name,
        description: formData.description,
        imagePath,
        createdBy: user.uid,
        createdAt: new Date()
      });
      alert("Salon added successfully!");
      setFormData({ name: "", description: "", imageFile: null });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding salon: ", error);
      alert("Failed to add salon. Please try again.");
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1>Salon Dashboard</h1>
        <p>Welcome, {user?.displayName}</p>
      </header>
      <main className={styles.mainContent}>
        {/* Add your dashboard content here */}
        <p>Manage your salon appointments and services.</p>
        <button onClick={toggleForm} className={styles.toggleFormButton}>
          {showForm ? "Close Form" : "Open Form"}
        </button>
        {showForm && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
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
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="imageFile">Image</label>
              <input
                type="file"
                id="imageFile"
                name="imageFile"
                accept="image/*"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className={styles.submitButton}>Submit</button>
          </form>
        )}
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2024 My Platform. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
