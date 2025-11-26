// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFYX6WA-GVrMSExo3sWbMw_dvv7gg1aG8",
  authDomain: "yasin-husen-portfolio.firebaseapp.com",
  projectId: "yasin-husen-portfolio",
  storageBucket: "yasin-husen-portfolio.firebasestorage.app",
  messagingSenderId: "489170254740",
  appId: "1:489170254740:web:59c0c3fa054d3af8cfad81",
  measurementId: "G-KPWBE4G8TF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, analytics, db, auth, storage };
