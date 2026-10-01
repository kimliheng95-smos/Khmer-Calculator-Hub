// =========================
// API Configuration
// =========================

// Backend API is hosted on InfinityFree
const API_BASE = "https://khmercalculatorhub.infy.click/api";

// =========================
// Project Root
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

// =========================
// API Helper
// =========================

async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE}/${endpoint}`, {
      ...options,

      // Important for PHP session cookie
      credentials: "include",

      headers: {
        /*
         * Use text/plain to avoid
         * CORS preflight OPTIONS request.
         */
        "Content-Type": "text/plain;charset=UTF-8",

        ...(options.headers || {}),
      },
    });

    // =========================
    // Read Response
    // =========================

    const text = await response.text();

    // =========================
    // Parse JSON
    // =========================

    let data;

    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("API non-JSON response:", text.slice(0, 500));

      return {
        success: false,
        error: "server_error",
      };
    }

    // =========================
    // Debug
    // =========================

    console.log("API:", endpoint, data);

    return data;
  } catch (error) {
    console.error("API Error:", error);

    return {
      success: false,
      error: "network_error",
    };
  }
}

// =========================
// Current Session
// =========================

let currentUser = null;

// =========================
// Load Session
// =========================

async function loadSession() {
  const result = await apiRequest("user.php", {
    method: "GET",
  });

  if (result.success && result.user) {
    currentUser = result.user;

    return result.user;
  }

  currentUser = null;

  return null;
}

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
// Register
// =========================

async function register(name, email, password) {
  name = (name || "").trim();

  email = (email || "").trim().toLowerCase();

  password = password || "";

  // =========================
  // Check Name
  // =========================

  if (!name || name.length < 2) {
    return {
      success: false,
      error: "name_short",
    };
  }

  // =========================
  // Check Email
  // =========================

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      success: false,
      error: "invalid_email",
    };
  }

  // =========================
  // Check Password
  // =========================

  if (password.length < 6) {
    return {
      success: false,
      error: "password_short",
    };
  }

  // =========================
  // API Request
  // =========================

  const result = await apiRequest("register.php", {
    method: "POST",

    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  });

  // =========================
  // Save Current User
  // =========================

  if (result.success && result.user) {
    currentUser = result.user;
  }

  return result;
}

// =========================
// Login
// =========================

async function login(email, password) {
  email = (email || "").trim().toLowerCase();

  password = password || "";

  // =========================
  // Check Empty Fields
  // =========================

  if (!email || !password) {
    return {
      success: false,
      error: "empty",
    };
  }

  // =========================
  // API Request
  // =========================

  const result = await apiRequest("login.php", {
    method: "POST",

    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  // =========================
  // Debug Login
  // =========================

  console.log("LOGIN RESULT:", result);

  // =========================
  // Save User
  // =========================

  if (result.success && result.user) {
    currentUser = result.user;
  }

  return result;
}

// =========================
// Logout
// =========================

async function logout() {
  await apiRequest("logout.php", {
    method: "POST",
  });

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
// History API
// =========================

async function getAuthHistory() {
  const result = await apiRequest("history.php", {
    method: "GET",
  });

  if (!result.success) {
    return [];
  }

  return result.history || [];
}

// =========================
// Save History Item
// =========================

async function saveAuthHistoryItem(item) {
  return await apiRequest("history.php", {
    method: "POST",

    body: JSON.stringify({
      calculator_type:
        item.calculator_type || item.calculatorType || item.type || "",

      calculator_name:
        item.calculator_name || item.calculator || item.name || "",

      data: item.data || item.inputs || {},

      result_text: item.result_text || item.result || "",
    }),
  });
}

// =========================
// Delete History Item
// =========================

async function deleteAuthHistoryItem(id) {
  return await apiRequest(`history.php?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}

// =========================
// Clear History
// =========================

async function clearAuthHistory() {
  return await apiRequest("history.php", {
    method: "DELETE",
  });
}

// =========================
// Update Navigation
// =========================

async function updateAuthNav() {
  const user = await loadSession();

  const logged = user !== null;

  // =========================
  // Guest Elements
  // =========================

  document.querySelectorAll("[data-auth-guest]").forEach(function (el) {
    el.style.display = logged ? "none" : "";
  });

  // =========================
  // Logged-in Elements
  // =========================

  document.querySelectorAll("[data-auth-user]").forEach(function (el) {
    el.style.display = logged ? "" : "none";
  });

  // =========================
  // User Name
  // =========================

  document.querySelectorAll("[data-auth-name]").forEach(function (el) {
    if (user) {
      el.textContent = user.name;
    }
  });
}

// =========================
// DOM Ready
// =========================

document.addEventListener("DOMContentLoaded", function () {
  updateAuthNav();
});
