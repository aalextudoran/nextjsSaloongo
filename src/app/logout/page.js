"use client"; // Mark this as a client component

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { auth } from "../firebase"; // Import initialized auth from firebase.js
import { signOut } from "firebase/auth"; // Import Firebase Auth functions
import styles from "./Logout.module.css"; // Import CSS Module

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await signOut(auth);
        router.push("/login");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    logoutUser();
  }, [router]);

  return (
    <div className={styles.container}>
      <h1>Logging out...</h1>
    </div>
  );
}
