import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBw-sbf5uFZ4R0jcX1ud9H3hesoUZ7tp7o",
  authDomain: "foodkart-web-app-3b45d.firebaseapp.com",
  projectId: "foodkart-web-app-3b45d",
  storageBucket: "foodkart-web-app-3b45d.firebasestorage.app",
  messagingSenderId: "599483933278",
  appId: "1:599483933278:web:e759c98a0f0e79aad08acf",
  measurementId: "G-JX8FDQM5P6"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// Analytics (only on client side)
const analytics = typeof window !== 'undefined' ? isSupported().then(yes => yes ? getAnalytics(app) : null) : null;

export { app, auth, db, analytics };
