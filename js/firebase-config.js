// ========================================
// Firebase Configuration
// ========================================
// 
// 1. Go to https://console.firebase.google.com
// 2. Create a project (or use existing)
// 3. Enable Authentication > Sign-in method > Email/Password
// 4. Create Firestore Database (start in test mode, then secure later)
// 5. Project Settings > Your apps > Add web app
// 6. Copy the firebaseConfig object below and replace the values
// ========================================

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase (using compat SDK for simplicity)
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
