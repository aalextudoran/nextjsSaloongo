"use client"; // Mark this as a client component

import styles from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { User, Bell, Heart, Settings, Store, LogOut, Calendar } from "react-feather"; // those icons are the mero icons/ maybe we should replace those with the icons from the design
import { useAuthState } from "react-firebase-hooks/auth"; // Import hook for auth state
import { auth } from "../../firebase"; // Import initialized auth from firebase.js

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const [user] = useAuthState(auth); // Get the current user

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.header}>
      {/* Navbar */}
      <div className={styles.navbar}>
        <Link href="/" className={styles.navbarBrand}>
          <img src="/assets/logo_image.png" alt="Saloongo" />
        </Link>
        <div className={styles.navbarRight}>
          {/* <Link href="/login">Login</Link> */}
          {user && (
            <div className="relative">
              <button ref={buttonRef} onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2">
                <div className="relative">
                  <Image
                    src={user.photoURL || "/placeholder.svg?height=32&width=32"}
                    alt="User avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </div>
                <span className="font-medium">{user.displayName}</span>
              </button>

              {/* Dropdown menu */}
              {isOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                >
                  <div className="py-1">
                    <Link href="/detalii-cont" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                      <User className="h-5 w-5 text-gray-600" />
                      <span>Detalii cont</span>
                    </Link>

                    <Link href="/programari" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                      <Calendar className="h-5 w-5 text-gray-600" />
                      <span>Programări</span>
                    </Link>

                    <Link href="/notificari" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                      <Bell className="h-5 w-5 text-gray-600" />
                      <span>Notificări</span>
                    </Link>

                    <Link href="/favorite" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                      <Heart className="h-5 w-5 text-gray-600" />
                      <span>Favorite</span>
                    </Link>

                    <div className="border-t border-gray-200"></div>

                    <Link href="/setari-notificari" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                      <Settings className="h-5 w-5 text-gray-600" />
                      <span>Setări notificări</span>
                    </Link>

                    <Link href="/devino-partener" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                      {/* <Store className="h-5 w-5 text-gray-600" /> */}
                      <span>Devino partener</span>
                    </Link>

                    <div className="border-t border-gray-200"></div>

                    <Link href="/logout" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                      <LogOut className="h-5 w-5 text-gray-600" />
                      <span>Ieși din cont</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Right side - Navigation items */}
      <div className="flex items-center gap-6">
        {/* Calendar/Appointments */}
        <Link href="/programari" className="flex items-center gap-2 text-gray-800 hover:text-gray-600">
          <Calendar className="h-5 w-5" />
          <span className="font-medium">Programări</span>
        </Link>
      </div>

      {/* Service Icons */}
      <div className={styles.serviceIcons}>
        <button className={styles.icon}>
          <img src="/assets/coafor-icon.png" alt="Coafor" />
        </button>
        <button className={styles.icon}>
          <img src="/assets/barba-icon.png" alt="Barba" />
        </button>
        <button className={styles.icon}>
          <img src="/assets/wellness-icon.png" alt="Wellness" />
        </button>
        <button className={styles.icon}>
          <img src="/assets/frizerie-icon.png" alt="Frizerie" />
        </button>
        <button className={styles.icon}>
          <img src="/assets/fata-icon.png" alt="Fata" />
        </button>
        <button className={styles.icon}>
          <img src="/assets/picioare-icon.png" alt="Picioare" />
        </button>
      </div>

      {/* Search Bar */}
      <div className={styles.searchBar}>
        <input type="text" placeholder="Serviciu/Salon" />
        <span className={styles.separator}></span>
        <input type="text" placeholder="Locație" />
        <span className={styles.separator}></span>
        <input type="date" placeholder="Data" />
        <span className={styles.separator}></span>
        <input type="time" placeholder="Ora" />
        <button>Caută</button>
      </div>

      {/* Main Header */}
      <h1 className={styles.mainHeader}>Programari, mai la-ndemana ca oricand !</h1>
    </header>
  );
}