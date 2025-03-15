import styles from "./DashboardCard.module.css";

export default function DashboardCard({ title, children }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
}