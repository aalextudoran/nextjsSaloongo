"use client"
import { useRouter } from "next/navigation"; // Import useRouter
import { signInWithGoogle, db } from "../../firebase"; // Import db from firebase.js
import styles from "./Login.Business.module.css"; // Import CSS Module
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import Firestore functions

export default function BusinessLogin() {
    const router = useRouter(); // Initialize the router

    const handleGoogleLogin = async () => {
        try {
          const userCredential = await signInWithGoogle(); // Log in user
          const user = userCredential.user; // Get user details
      
          // Reference Firestore "users" collection
          const userRef = doc(db, "users", user.uid); // Use the imported doc function
          const userSnap = await getDoc(userRef); // Use the imported getDoc function
      
          if (!userSnap.exists()) {
            // If user is logging in for the first time, save role as "salon_owner"
            await setDoc(userRef, { // Use the imported setDoc function
              email: user.email,
              name: user.displayName,
              photoURL: user.photoURL, // Store the user's photo URL
              role: "salon_owner", // This makes them a business owner
              createdAt: new Date(),
            });
            router.push("/salon-dashboard"); // Redirect to salon owner dashboard
          } else {
            const userData = userSnap.data();
            if (userData.role.includes("user")) {
              await setDoc(userRef, { role: "salon_owner,user" }, { merge: true });
              router.push("/role-selection"); // Redirect to role selection page
            } else {
              router.push("/salon-dashboard"); // Redirect to salon owner dashboard
            }
          }
        } catch (error) {
          console.error("Login error:", error);
          toast.error("Login failed: " + error.message); // Show error toast
        }
      };
  
    return (
      <div className={styles.loginContainer}>
        <ToastContainer /> 
        {/* Navbar */}
        <div className={styles.navbar}>
          <div className={styles.navbarBrand}>
            <img
              src="/assets/logo_image.png" // Path to the logo in the public directory
              alt="Saloongo"
              className={styles.logo}
            />
          </div>
          <div className={styles.navbarRight}>
            {/* Add any additional links here */}
          </div>
        </div>
  
        {/* Login Box */}
        <div className={styles.loginBox}>
          <h2 className={styles.loginHeader}>Login For Business</h2>
  
          {/* Email Input */}
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className={styles.formControl}
              placeholder="Emailul tău"
              required
            />
          </div>
  
          {/* Password Input */}
          <div className={styles.formGroup}>
            <label htmlFor="password">Parola</label>
            <input
              type="password"
              id="password"
              className={styles.formControl}
              placeholder="Parola"
              required
            />
          </div>
  
          {/* Login Button */}
          <button type="submit" className={styles.btn}>
            Login
          </button>
  
          {/* Error Message */}
          <div className={styles.errorMessage}>
            {/* Add error message logic here */}
            <a href="#" className={styles.forgotPassword}>
              Forgot Password?
            </a>
          </div>
  
          {/* Separator */}
          <p className={styles.separatorText}>sau</p>
  
          {/* Social Login */}
          <p className={styles.continueText}>Continuă cu contul:</p>
          <div className={styles.socialLogin}>
            <button className={styles.btnSocial} onClick={handleGoogleLogin}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google"
                className={styles.socialIcon}
              />
            </button>
            <button className={styles.btnSocial}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg"
                alt="Facebook"
                className={styles.socialIcon}
              />
            </button>
          </div>
  
          {/* Additional Links */}
          <p className={styles.additionalText}>
            Nu ai cont? <a href="#">Creează-ți aici</a>
          </p>
          <p className={styles.additionalText}>
            Ai un business și îți dorești ...?{" "}
            <a href="#">Creează un cont business aici</a>
          </p>
        </div>
  
        {/* Footer */}
        <footer className={styles.footerBottom}>
          <p>&copy; 2024 My Platform. All Rights Reserved.</p>
          <p>
            <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
          </p>
        </footer>
      </div>
    );
}
