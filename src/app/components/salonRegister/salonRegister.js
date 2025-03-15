"use client"; // Mark this as a client component

import styles from "./SalonRegister.module.css"; // Import CSS Module
import { useRouter } from "next/navigation";

export default function SalonRegister() {
  const router = useRouter();
  return (
    <section className={styles.cta}>
      <div className={styles.overlay}></div>
      <div className={styles.ctaContent}>
        <h2 className={styles.header2}>Înscrie-te</h2> <span></span><h2 className={styles.header2}>cu salonul Tău</h2>
        <p className={styles.p}>O propoziție faină și inviting</p>
        <button className={styles.gotobutton} onClick={() => router.push("/login/business")}>Go to Business</button>
      </div>
    </section>
  );
}
