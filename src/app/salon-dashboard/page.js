"use client"; // Ensure this is a client-side component

import styles from "./SalonDashboard.module.css"; // Import CSS Module
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { useEffect, useState } from "react";
import { auth } from "../firebase"; // Import Firebase Auth
import { onAuthStateChanged } from "firebase/auth"; // Firebase Auth functions
import SummaryStats from "./components/SummaryStats";
import DashboardCard from "./components/DashboardCard";
import Link from "next/link"; // Import Next.js Link
import useSalonData from "./hooks/useSalonData"; // Corrected import path
import { Home, Calendar, SmilePlus, Wrench, Info } from "lucide-react";

const navItems = [
  { icon: Home, href: "/" },
  { icon: Calendar, href: "/appointments" },
  { icon: SmilePlus, href: "/clients" },
  { icon: Wrench, href: "/settings" },
  { icon: Info, href: "/help" },
];

export default function SalonDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [salonId, setSalonId] = useState(null);

  // Fetch salon data using custom hook
  const { salonData, loading: salonLoading } = useSalonData(user?.uid);

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

  useEffect(() => {
    if (salonData?.id) {
      setSalonId(salonData.id);
    }
  }, [salonData]);

  if (loading || salonLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar Navigation */}
      <div className="fixed left-0 top-0 h-full w-16 border-r bg-white">
        <div className="flex flex-col items-center gap-6 py-6">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
            >
              <item.icon className="h-5 w-5" />
            </Link>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className={styles.header}>
        <h1>Salon Dashboard</h1>
        <p>Welcome, {user?.displayName || "Owner"}</p>
        {salonData ? (
          <p className={styles.salonName}>Managing: {salonData.name}</p>
        ) : (
          <p className={styles.salonWarning}>No salon found. Please create one.</p>
        )}
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <DashboardCard />
        <p>Manage your salon appointments and services.</p>
        <SummaryStats />

        {/* Conditional Salon Creation UI */}
        {!salonData && (
          <div className={styles.createSalonSection}>
            <p>No salon linked to your account.</p>
            <Link href="/create-salon">
              <button className={styles.createSalonBtn}>Create Salon</button>
            </Link>
          </div>
        )}

        {/* Buttons for Manage Pages */}
        <div className={styles.manageButtons}>
          <Link href="/salon-dashboard/manage/appointments">
            <button className={styles.manageButton}>Manage Appointments</button>
          </Link>
          <Link href="/salon-dashboard/manage/barbers">
            <button className={styles.manageButton}>Manage Barbers</button>
          </Link>
          <Link href="/salon-dashboard/manage/services">
            <button className={styles.manageButton}>Manage Services</button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2024 My Platform. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
