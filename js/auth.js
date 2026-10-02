// =========================
// Khmer Calculator Hub - Auth (Firebase)
// =========================

const SITE_ROOT = (function () {
  try {
    if (document.currentScript && document.currentScript.src) {
      return document.currentScript.src.replace(/\/js\/auth\.js(\?.*)?$/i, "/");
    }
  } catch (e) {}

  const path = window.location.pathname || "";
  if (path.indexOf("/calculators/") !== -1) {
    return "../";
  }
  return "./";
})();

let currentUser = null;

// =========================
// Listen to Auth State
// =========================
auth.onAuthStateChanged(async function (user) {
  if (user) {
    // Get extra profile data from Firestore
    let profile = { name: user.displayName || user.email.split("@")[0] };

    try {
      const doc = await db.collection("users").doc(user.uid).get();
      if (doc.exists) {
        profile = { ...profile, ...doc.data() };
      }
    } catch (e) {
      console.warn("Could not load user profile:", e);
    }

    currentUser = {
      id: user.uid,
      uid: user.uid,
      email: user.email,
      name: profile.name || user.displayName || "User",
    };
  } else {
    currentUser = null;
  }

  updateAuthNav();
});

// =========================
// Get Current User
// =========================
function getCurrentUser() {
  return currentUser;
}

// =========================
// Check Login
// =========================
function isLoggedIn() {
  return currentUser !== null;
}

// =========================
// Load Session (compatibility)
// =========================
async function loadSession() {
  // Wait a bit for auth state if needed
  if (auth.currentUser) {
    return getCurrentUser();
  }
  return new Promise(function (resolve) {
    const unsubscribe = auth.onAuthStateChanged(function (user) {
      unsubscribe();
      resolve(getCurrentUser());
    });
  });
}

// =========================
// Register
// =========================
async function register(name, email, password) {
  name = (name || "").trim();
  email = (email || "").trim().toLowerCase();
  password = password || "";

  if (!name || name.length < 2) {
    return { success: false, error: "name_short" };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "invalid_email" };
  }
  if (password.length < 6) {
    return { success: false, error: "password_short" };
  }

  try {
    const cred = await auth.createUserWithEmailAndPassword(email, password);

    // Update display name
    await cred.user.updateProfile({ displayName: name });

    // Save profile to Firestore
    await db.collection("users").doc(cred.user.uid).set({
      name: name,
      email: email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    currentUser = {
      id: cred.user.uid,
      uid: cred.user.uid,
      email: email,
      name: name,
    };

    return {
      success: true,
      user: currentUser,
    };
  } catch (error) {
    console.error("Register error:", error);
    let errorCode = "server_error";
    if (error.code === "auth/email-already-in-use") errorCode = "email_exists";
    if (error.code === "auth/weak-password") errorCode = "password_short";
    if (error.code === "auth/invalid-email") errorCode = "invalid_email";
    return { success: false, error: errorCode, message: error.message };
  }
}

// =========================
// Login
// =========================
async function login(email, password) {
  email = (email || "").trim().toLowerCase();
  password = password || "";

  if (!email || !password) {
    return { success: false, error: "empty" };
  }

  try {
    const cred = await auth.signInWithEmailAndPassword(email, password);

    let name = cred.user.displayName || email.split("@")[0];
    try {
      const doc = await db.collection("users").doc(cred.user.uid).get();
      if (doc.exists && doc.data().name) {
        name = doc.data().name;
      }
    } catch (e) {}

    currentUser = {
      id: cred.user.uid,
      uid: cred.user.uid,
      email: cred.user.email,
      name: name,
    };

    return {
      success: true,
      user: currentUser,
    };
  } catch (error) {
    console.error("Login error:", error);
    let errorCode = "invalid";
    if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
      errorCode = "invalid";
    }
    if (error.code === "auth/too-many-requests") errorCode = "too_many";
    return { success: false, error: errorCode, message: error.message };
  }
}

// =========================
// Logout
// =========================
async function logout() {
  try {
    await auth.signOut();
  } catch (e) {
    console.error("Logout error:", e);
  }
  currentUser = null;
  window.location.href = SITE_ROOT + "index.html";
}

// =========================
// Authentication Guard
// =========================
async function requireAuth() {
  const user = await loadSession();
  if (!user) {
    window.location.href = SITE_ROOT + "login.html";
    return false;
  }
  return true;
}

// =========================
// History API (Firestore)
// =========================
async function getAuthHistory() {
  if (!currentUser) return [];

  try {
    const snapshot = await db
      .collection("users")
      .doc(currentUser.uid)
      .collection("history")
      .orderBy("createdAt", "desc")
      .limit(100)
      .get();

    return snapshot.docs.map(function (doc) {
      const data = doc.data();
      return {
        id: doc.id,
        calculator_type: data.calculator_type || "",
        calculator_name: data.calculator_name || "",
        data: data.data || {},
        result_text: data.result_text || "",
        createdAt: data.createdAt,
      };
    });
  } catch (e) {
    console.error("getAuthHistory error:", e);
    return [];
  }
}

async function saveAuthHistoryItem(item) {
  if (!currentUser) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const ref = await db
      .collection("users")
      .doc(currentUser.uid)
      .collection("history")
      .add({
        calculator_type: item.calculator_type || item.calculatorType || item.type || "",
        calculator_name: item.calculator_name || item.calculator || item.name || "",
        data: item.data || item.inputs || {},
        result_text: item.result_text || item.result || "",
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

    return { success: true, id: ref.id };
  } catch (e) {
    console.error("saveAuthHistoryItem error:", e);
    return { success: false, error: "server_error" };
  }
}

async function deleteAuthHistoryItem(id) {
  if (!currentUser) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await db
      .collection("users")
      .doc(currentUser.uid)
      .collection("history")
      .doc(String(id))
      .delete();
    return { success: true };
  } catch (e) {
    console.error("deleteAuthHistoryItem error:", e);
    return { success: false, error: "server_error" };
  }
}

async function clearAuthHistory() {
  if (!currentUser) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const snapshot = await db
      .collection("users")
      .doc(currentUser.uid)
      .collection("history")
      .get();

    const batch = db.batch();
    snapshot.docs.forEach(function (doc) {
      batch.delete(doc.ref);
    });
    await batch.commit();
    return { success: true };
  } catch (e) {
    console.error("clearAuthHistory error:", e);
    return { success: false, error: "server_error" };
  }
}

// =========================
// Update Navigation
// =========================
function updateAuthNav() {
  const logged = currentUser !== null;

  document.querySelectorAll("[data-auth-guest]").forEach(function (el) {
    el.style.display = logged ? "none" : "";
  });

  document.querySelectorAll("[data-auth-user]").forEach(function (el) {
    el.style.display = logged ? "" : "none";
  });

  document.querySelectorAll("[data-auth-name]").forEach(function (el) {
    if (currentUser) {
      el.textContent = currentUser.name;
    }
  });
}

// =========================
// DOM Ready
// =========================
document.addEventListener("DOMContentLoaded", function () {
  // Auth state listener will call updateAuthNav
});
