"use client"; // Mark this as a client component
import styles from "./GoToBussiness.module.css";
import { useRouter } from "next/navigation";

export default function GoToBussiness() {
    const router = useRouter();
  return (
    <section>
      <div className = {styles.gotobuttoncontainer}>
        <button className={styles.gotobutton} onClick={() => router.push("/login/business")}>Go to Business</button>
      </div>
    </section>
  );
}