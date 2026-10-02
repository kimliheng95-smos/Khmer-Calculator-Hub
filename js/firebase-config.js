// ========================================
// FIREBASE CONFIGURATION
// Khmer Calculator Hub
// ========================================

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAE37a7JTFPBYYNuadZF_oXs5d8RaAFzl8",
  authDomain: "khmer-calculator-hub.firebaseapp.com",
  projectId: "khmer-calculator-hub",
  storageBucket: "khmer-calculator-hub.firebasestorage.app",
  messagingSenderId: "334769113777",
  appId: "1:334769113777:web:bb437c148659937ce9b090",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
const auth = getAuth(app);

// Firestore Database
const db = getFirestore(app);

export { auth, db };
