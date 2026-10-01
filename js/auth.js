// =========================
// API Configuration
// Auto-detect so it works on any host, root or subfolder, phone or computer
// =========================

const API_BASE = (function () {
  try {
    if (document.currentScript && document.currentScript.src) {
      return document.currentScript.src.replace(
        /\/js\/auth\.js(\?.*)?$/i,
        "/api"
      );
    }
  } catch (e) {}

  const path = window.location.pathname || "";
  if (path.indexOf("/calculators/") !== -1) {
    return "../api";
  }
  return "api";
})();

// Project root (for redirects that work from calculators/ too)
const SITE_ROOT = (function () {
  try {
    if (document.currentScript && document.currentScript.src) {
      return document.currentScript.src.replace(
        /\/js\/auth\.js(\?.*)?$/i,
        "/"
      );
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
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("API non-JSON response:", text.slice(0, 200));
      return { success: false, error: "server_error" };
    }

    console.log("API:", endpoint, data);
    return data;
  } catch (error) {
    console.error("API Error:", error);
    return { success: false, error: "network_error" };
  }
}

// =========================
// Current Session
// =========================

let currentUser = null;

async function loadSession() {
  const result = await apiRequest("user.php", { method: "GET" });

  if (result.success && result.user) {
    currentUser = result.user;
    return result.user;
  }

  currentUser = null;
  return null;
}

function getCurrentUser() {
  return currentUser;
}

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

  if (!name || name.length < 2) {
    return { success: false, error: "name_short" };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "invalid_email" };
  }
  if (password.length < 6) {
    return { success: false, error: "password_short" };
  }

  const result = await apiRequest("register.php", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

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

  if (!email || !password) {
    return { success: false, error: "empty" };
  }

  const result = await apiRequest("login.php", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  console.log("LOGIN RESULT:", result);

  if (result.success && result.user) {
    currentUser = result.user;
  }
  return result;
}

// =========================
// Logout
// =========================

async function logout() {
  await apiRequest("logout.php", { method: "POST" });
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
  const result = await apiRequest("history.php", { method: "GET" });
  if (!result.success) return [];
  return result.history || [];
}

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

async function deleteAuthHistoryItem(id) {
  return await apiRequest(`history.php?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}

async function clearAuthHistory() {
  return await apiRequest("history.php", { method: "DELETE" });
}

// =========================
// Update Navigation
// =========================

async function updateAuthNav() {
  const user = await loadSession();
  const logged = user !== null;

  document.querySelectorAll("[data-auth-guest]").forEach((el) => {
    el.style.display = logged ? "none" : "";
  });
  document.querySelectorAll("[data-auth-user]").forEach((el) => {
    el.style.display = logged ? "" : "none";
  });
  document.querySelectorAll("[data-auth-name]").forEach((el) => {
    if (user) el.textContent = user.name;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  updateAuthNav();
});
