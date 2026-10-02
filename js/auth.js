// ========================================
// AUTH.JS
// Khmer Calculator Hub
// Firebase Modular SDK
// ========================================

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  writeBatch,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "./firebase-config.js";

// ========================================
// CURRENT USER
// ========================================

let currentUser = null;

// ========================================
// AUTH STATE READY
// ========================================

let authStateReady = false;

let authStatePromise = new Promise((resolve) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser = {
        id: user.uid,
        uid: user.uid,
        email: user.email,
        name: user.displayName || "",
      };
    } else {
      currentUser = null;
    }

    authStateReady = true;

    updateAuthNav();

    resolve(currentUser);
  });
});

// ========================================
// GET CURRENT USER
// ========================================

function getCurrentUser() {
  return currentUser;
}

// ========================================
// IS LOGGED IN
// ========================================

function isLoggedIn() {
  return currentUser !== null;
}

// ========================================
// LOAD SESSION
// ========================================

async function loadSession() {
  if (!authStateReady) {
    await authStatePromise;
  }

  return currentUser;
}

// ========================================
// REGISTER
// ========================================

async function register(name, email, password) {
  try {
    name = name.trim();
    email = email.trim().toLowerCase();

    // Validate name
    if (name.length < 2) {
      return {
        success: false,
        error: "invalid_name",
        message: "Please enter your full name.",
      };
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "invalid_email",
        message: "Please enter a valid email.",
      };
    }

    // Validate password
    if (password.length < 6) {
      return {
        success: false,
        error: "password_short",
        message: "Password must be at least 6 characters.",
      };
    }

    // ========================================
    // CREATE FIREBASE AUTH USER
    // ========================================

    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const user = credential.user;

    // ========================================
    // UPDATE PROFILE NAME
    // ========================================

    await updateProfile(user, {
      displayName: name,
    });

    // ========================================
    // CREATE FIRESTORE USER
    // ========================================

    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      createdAt: serverTimestamp(),
    });

    // ========================================
    // UPDATE CURRENT USER
    // ========================================

    currentUser = {
      id: user.uid,
      uid: user.uid,
      email: user.email,
      name: name,
    };

    updateAuthNav();

    return {
      success: true,
      user: currentUser,
    };
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    if (error.code === "auth/email-already-in-use") {
      return {
        success: false,
        error: "email_exists",
        message: "This email is already registered.",
      };
    }

    if (error.code === "auth/weak-password") {
      return {
        success: false,
        error: "password_short",
        message: "Password must be at least 6 characters.",
      };
    }

    if (error.code === "auth/invalid-email") {
      return {
        success: false,
        error: "invalid_email",
        message: "Invalid email address.",
      };
    }

    return {
      success: false,
      error: error.code || "register_error",
      message: error.message || "Registration failed.",
    };
  }
}

// ========================================
// LOGIN
// ========================================

async function login(email, password) {
  try {
    email = email.trim().toLowerCase();

    // Validate email
    if (!email) {
      return {
        success: false,
        error: "invalid_email",
        message: "Please enter your email.",
      };
    }

    // Validate password
    if (!password) {
      return {
        success: false,
        error: "password_required",
        message: "Please enter your password.",
      };
    }

    // ========================================
    // FIREBASE LOGIN
    // ========================================

    const credential = await signInWithEmailAndPassword(auth, email, password);

    const user = credential.user;

    // ========================================
    // UPDATE CURRENT USER
    // ========================================

    currentUser = {
      id: user.uid,
      uid: user.uid,
      email: user.email,
      name: user.displayName || "",
    };

    updateAuthNav();

    return {
      success: true,
      user: currentUser,
    };
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    if (
      error.code === "auth/invalid-credential" ||
      error.code === "auth/invalid-login-credentials" ||
      error.code === "auth/user-not-found" ||
      error.code === "auth/wrong-password"
    ) {
      return {
        success: false,
        error: "invalid_credentials",
        message: "Invalid email or password.",
      };
    }

    if (error.code === "auth/invalid-email") {
      return {
        success: false,
        error: "invalid_email",
        message: "Invalid email address.",
      };
    }

    return {
      success: false,
      error: error.code || "login_error",
      message: error.message || "Login failed.",
    };
  }
}

// ========================================
// LOGOUT
// ========================================

async function logout() {
  try {
    await signOut(auth);

    currentUser = null;

    updateAuthNav();

    return {
      success: true,
    };
  } catch (error) {
    console.error("LOGOUT ERROR:", error);

    return {
      success: false,
      error: error.code || "logout_error",
      message: error.message || "Logout failed.",
    };
  }
}

// ========================================
// REQUIRE LOGIN
// ========================================

async function requireAuth() {
  const user = await loadSession();

  if (!user) {
    window.location.href = "login.html";

    return null;
  }

  return user;
}

// ========================================
// GET AUTH HISTORY
// ========================================

async function getAuthHistory() {
  try {
    const user = await loadSession();

    if (!user) {
      return [];
    }

    const historyRef = collection(db, "users", user.uid, "history");

    const historyQuery = query(
      historyRef,
      orderBy("createdAt", "desc"),
      limit(100),
    );

    const snapshot = await getDocs(historyQuery);

    const history = [];

    snapshot.forEach((docSnapshot) => {
      history.push({
        id: docSnapshot.id,

        ...docSnapshot.data(),
      });
    });

    return history;
  } catch (error) {
    console.error("GET AUTH HISTORY ERROR:", error);

    return [];
  }
}

// ========================================
// SAVE AUTH HISTORY ITEM
// ========================================

async function saveAuthHistoryItem(item) {
  try {
    const user = await loadSession();

    if (!user) {
      return {
        success: false,
        error: "not_logged_in",
      };
    }

    const historyRef = collection(db, "users", user.uid, "history");

    const docRef = await addDoc(historyRef, {
      ...item,

      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      id: docRef.id,
    };
  } catch (error) {
    console.error("SAVE AUTH HISTORY ERROR:", error);

    return {
      success: false,
      error: error.code || "save_history_error",
      message: error.message || "Could not save history.",
    };
  }
}

// ========================================
// DELETE AUTH HISTORY ITEM
// ========================================

async function deleteAuthHistoryItem(id) {
  try {
    const user = await loadSession();

    if (!user) {
      return {
        success: false,
        error: "not_logged_in",
      };
    }

    await deleteDoc(doc(db, "users", user.uid, "history", String(id)));

    return {
      success: true,
    };
  } catch (error) {
    console.error("DELETE AUTH HISTORY ERROR:", error);

    return {
      success: false,
      error: error.code || "delete_history_error",
      message: error.message || "Could not delete history.",
    };
  }
}

// ========================================
// CLEAR AUTH HISTORY
// ========================================

async function clearAuthHistory() {
  try {
    const user = await loadSession();

    if (!user) {
      return {
        success: false,
        error: "not_logged_in",
      };
    }

    const historyRef = collection(db, "users", user.uid, "history");

    const snapshot = await getDocs(historyRef);

    if (snapshot.empty) {
      return {
        success: true,
      };
    }

    const batch = writeBatch(db);

    snapshot.forEach((docSnapshot) => {
      batch.delete(doc(db, "users", user.uid, "history", docSnapshot.id));
    });

    await batch.commit();

    return {
      success: true,
    };
  } catch (error) {
    console.error("CLEAR AUTH HISTORY ERROR:", error);

    return {
      success: false,
      error: error.code || "clear_history_error",
      message: error.message || "Could not clear history.",
    };
  }
}

// ========================================
// UPDATE NAVBAR
// ========================================

function updateAuthNav() {
  const guestElements = document.querySelectorAll("[data-auth-guest]");

  const userElements = document.querySelectorAll("[data-auth-user]");

  const nameElements = document.querySelectorAll("[data-auth-name]");

  if (currentUser) {
    guestElements.forEach((element) => {
      element.style.display = "none";
    });

    userElements.forEach((element) => {
      element.style.display = "";
    });

    nameElements.forEach((element) => {
      element.textContent = currentUser.name || currentUser.email || "User";
    });
  } else {
    guestElements.forEach((element) => {
      element.style.display = "";
    });

    userElements.forEach((element) => {
      element.style.display = "none";
    });

    nameElements.forEach((element) => {
      element.textContent = "";
    });
  }
}

// ========================================
// LOGOUT BUTTON
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  updateAuthNav();

  const logoutButton = document.getElementById("logoutButton");

  if (logoutButton) {
    logoutButton.addEventListener("click", async function (event) {
      event.preventDefault();

      const result = await logout();

      if (result.success) {
        window.location.href = "index.html";
      } else {
        console.error(result.message);
      }
    });
  }
});

// ========================================
// EXPORT
// ========================================

export {
  getCurrentUser,
  isLoggedIn,
  loadSession,
  register,
  login,
  logout,
  requireAuth,
  getAuthHistory,
  saveAuthHistoryItem,
  deleteAuthHistoryItem,
  clearAuthHistory,
  updateAuthNav,
};
