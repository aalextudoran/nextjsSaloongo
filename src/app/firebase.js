import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getFirestore, connectFirestoreEmulator  } from "firebase/firestore"; // Add Firestore import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDImOZHVGcReFOLut0t2-4FJp-Qtc0k2Eo",
  authDomain: "saloongo-ecd0e.firebaseapp.com",
  projectId: "saloongo-ecd0e",
  storageBucket: "saloongo-ecd0e.firebasestorage.app",
  messagingSenderId: "424763380518",
  appId: "1:424763380518:web:28e009fb3dca1b330967e7",
  measurementId: "G-L2QPJN0VE2",
};

// Initialize Firebase only on the client side
let app, auth, storage,db;
if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  storage = getStorage(app);
  db = getFirestore(app);
  console.log("Running on the client side"); 
  // Use Emulator for Local Development
  if (process.env.NODE_ENV === "development") {
    connectAuthEmulator(auth, "http://localhost:9099");
    connectStorageEmulator(storage, "localhost", 9199);
    connectFirestoreEmulator(db, "localhost", 8080);
  }
}

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User signed in:", result.user);
    return result; // Return the user credential
  } catch (error) {
    console.error("Error signing in:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export { app, auth, storage, db };



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth, connectAuthEmulator, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyDImOZHVGcReFOLut0t2-4FJp-Qtc0k2Eo",
//     authDomain: "saloongo-ecd0e.firebaseapp.com",
//     projectId: "saloongo-ecd0e",
//     storageBucket: "saloongo-ecd0e.firebasestorage.app",
//     messagingSenderId: "424763380518",
//     appId: "1:424763380518:web:28e009fb3dca1b330967e7",
//     measurementId: "G-L2QPJN0VE2"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// console.log(analytics);

// const storage = getStorage(app);
// const auth = getAuth(app);

// // ✅ Use Emulator for Local Development
// if (process.env.NODE_ENV === "development") {
//   connectStorageEmulator(storage, "localhost", 9199);
// }

// export { app, storage, auth };
// // Example usage
// //logEvent(analytics, 'some_event', { parameter: 'value' });
// if (process.env.NODE_ENV === "development") {
//     connectAuthEmulator(auth, "http://localhost:9099");
//   }
  
//   const provider = new GoogleAuthProvider();
  
//   export const signInWithGoogle = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       console.log("User signed in:", result.user);
//       return result; // Return the user credential
//     } catch (error) {
//       console.error("Error signing in:", error);
//       throw error; // Rethrow the error to be handled by the caller
//     }
//   };