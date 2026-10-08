// ========================================
// HISTORY.JS
// Khmer Calculator Hub
// Firebase + LocalStorage History
// ========================================

import {
  isLoggedIn,
  getCurrentUser,
  loadSession,
  getAuthHistory,
  saveAuthHistoryItem,
  deleteAuthHistoryItem,
  clearAuthHistory,
} from "./auth.js";

const GUEST_HISTORY_KEY = "calculatorHistory";

function getHistoryLanguage() {
  return localStorage.getItem("language") || "en";
}

// ========================================
// LOCAL STORAGE
// ========================================

function getLocalHistory() {
  try {
    const data = localStorage.getItem(GUEST_HISTORY_KEY);
    if (!data) return [];
    const history = JSON.parse(data);
    return Array.isArray(history) ? history : [];
  } catch (error) {
    console.error("GET LOCAL HISTORY ERROR:", error);
    return [];
  }
}

function saveLocalHistory(history) {
  try {
    localStorage.setItem(GUEST_HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error("SAVE LOCAL HISTORY ERROR:", error);
  }
}

function removeLocalHistoryItem(id) {
  const history = getLocalHistory().filter(
    (item) => String(item.id) !== String(id),
  );
  saveLocalHistory(history);
}

// ========================================
// NORMALIZE
// ========================================

function normalizeHistoryItem(item) {
  if (!item || typeof item !== "object") return item;

  const type = item.calculator_type || item.calculatorType || item.type || "";
  const name =
    item.calculator_name || item.calculatorName || item.calculator || "";
  const resultText = item.result_text || item.resultText || item.result || "";

  return {
    ...item,
    calculator_type: type,
    calculator_name: name,
    result_text: resultText,
    data: item.data || {},
  };
}

// ========================================
// GET HISTORY
// Logged-in: prefer Firestore, merge with local if needed
// Guest: localStorage only
// ========================================

async function getHistory() {
  await loadSession();

  if (isLoggedIn()) {
    try {
      const remote = await getAuthHistory();
      if (Array.isArray(remote) && remote.length > 0) {
        return remote.map(normalizeHistoryItem);
      }
      // Remote empty → show local so user still sees recent calcs
      return getLocalHistory().map(normalizeHistoryItem);
    } catch (e) {
      console.error("getHistory remote error:", e);
      return getLocalHistory().map(normalizeHistoryItem);
    }
  }

  return getLocalHistory().map(normalizeHistoryItem);
}

async function loadHistoryFromServer() {
  await loadSession();
  if (!isLoggedIn()) return getLocalHistory().map(normalizeHistoryItem);
  const remote = await getAuthHistory();
  return Array.isArray(remote) ? remote.map(normalizeHistoryItem) : [];
}

// ========================================
// SAVE HISTORY
// Always localStorage + Firestore when logged in
// ========================================

async function saveHistory(calculatorOrOptions, result) {
  await loadSession();

  let item;

  if (
    calculatorOrOptions &&
    typeof calculatorOrOptions === "object" &&
    calculatorOrOptions.calculatorType
  ) {
    item = {
      calculator_type: calculatorOrOptions.calculatorType,
      calculator_name:
        calculatorOrOptions.calculatorName ||
        calculatorOrOptions.calculatorType,
      data: calculatorOrOptions.data || {},
      result_text: calculatorOrOptions.resultText || result || "",
    };
  } else {
    item = {
      calculator_type: calculatorOrOptions || "unknown",
      calculator_name: calculatorOrOptions || "unknown",
      data: {},
      result_text: result || "",
    };
  }

  // Local always
  const localItem = {
    id: "local_" + Date.now().toString(),
    ...item,
    createdAt: new Date().toISOString(),
  };

  const history = getLocalHistory();
  history.unshift(localItem);
  saveLocalHistory(history.slice(0, 50));

  console.log(
    "[history] saved local:",
    localItem.calculator_type,
    "loggedIn=",
    isLoggedIn(),
  );

  // Firestore when logged in
  if (isLoggedIn()) {
    try {
      const remote = await saveAuthHistoryItem(item);
      console.log("[history] saved remote:", remote);
      if (!remote || !remote.success) {
        console.error("[history] Firestore save failed:", remote);
        return {
          success: true,
          id: localItem.id,
          remoteError: remote,
        };
      }
      return {
        success: true,
        id: remote.id || localItem.id,
        remote: true,
      };
    } catch (err) {
      console.error("[history] Firestore save exception:", err);
      return {
        success: true,
        id: localItem.id,
        remoteError: String(err),
      };
    }
  }

  return { success: true, id: localItem.id };
}

// ========================================
// DELETE ONE
// ========================================

async function deleteHistory(id) {
  await loadSession();

  const sid = String(id);

  // Always remove from local
  removeLocalHistoryItem(sid);

  // If logged in and looks like Firestore id (not local_ prefix), delete remote
  if (isLoggedIn() && !sid.startsWith("local_")) {
    try {
      const result = await deleteAuthHistoryItem(sid);
      console.log("[history] delete remote:", result);
      return result && result.success
        ? { success: true }
        : { success: true, remoteError: result }; // local already deleted
    } catch (err) {
      console.error("[history] delete remote exception:", err);
      return { success: true, remoteError: String(err) };
    }
  }

  return { success: true };
}

// ========================================
// CLEAR ALL
// ========================================

async function clearHistory() {
  await loadSession();

  localStorage.removeItem(GUEST_HISTORY_KEY);

  if (isLoggedIn()) {
    try {
      const result = await clearAuthHistory();
      console.log("[history] clear remote:", result);
      return result && result.success
        ? { success: true }
        : { success: true, remoteError: result };
    } catch (err) {
      console.error("[history] clear remote exception:", err);
      return { success: true, remoteError: String(err) };
    }
  }

  return { success: true };
}

// ========================================
// DISPLAY NAME
// ========================================

function getCalculatorDisplayName(typeOrItem, langOverride) {
  let type = typeOrItem;
  let fallbackName = "";

  if (typeOrItem && typeof typeOrItem === "object") {
    type =
      typeOrItem.calculator_type ||
      typeOrItem.calculatorType ||
      typeOrItem.type ||
      "";
    fallbackName =
      typeOrItem.calculator_name ||
      typeOrItem.calculatorName ||
      typeOrItem.calculator ||
      "";
  }

  let language = langOverride || getHistoryLanguage();
  if (language === "kh") language = "km";

  const names = {
    age: { en: "Age Calculator", km: "គណនាអាយុ" },
    average: { en: "Average Calculator", km: "គណនាមធ្យមភាគ" },
    bmi: { en: "BMI Calculator", km: "គណនា BMI" },
    "break-even": { en: "Break-Even Calculator", km: "គណនាចំណុចស្មើ" },
    breakeven: { en: "Break-Even Calculator", km: "គណនាចំណុចស្មើ" },
    currency: { en: "Currency Converter", km: "បម្លែងរូបិយប័ណ្ណ" },
    discount: { en: "Discount Calculator", km: "គណនាបញ្ចុះតម្លៃ" },
    fuel: { en: "Fuel Cost Calculator", km: "គណនាតម្លៃប្រេង" },
    gpa: { en: "GPA Calculator", km: "គណនា GPA" },
    grade: { en: "Grade Calculator", km: "គណនាពិន្ទុ" },
    interest: { en: "Interest Calculator", km: "គណនាការប្រាក់" },
    loan: { en: "Loan Calculator", km: "គណនាប្រាក់កម្ចី" },
    percentage: { en: "Percentage Calculator", km: "គណនាភាគរយ" },
    profit: { en: "Profit Calculator", km: "គណនាចំណេញ" },
    salary: { en: "Salary Calculator", km: "គណនាប្រាក់ខែ" },
    savings: { en: "Savings Calculator", km: "គណនាប្រាក់សន្សំ" },
    tax: { en: "Tax Calculator", km: "គណនាពន្ធ" },
    unit: { en: "Unit Converter", km: "បម្លែងឯកតា" },
    vat: { en: "VAT Calculator", km: "គណនា VAT" },
  };

  const key = String(type || "").toLowerCase();
  if (names[key]) return names[key][language] || names[key].en;
  return fallbackName || type || "Calculator";
}

// ========================================
// FORMAT RESULT
// ========================================

function formatHistoryResult(item) {
  if (!item) return "";
  item = normalizeHistoryItem(item);
  if (item.result_text) return item.result_text;

  const data = item.data || {};
  const type = String(item.calculator_type || "").toLowerCase();

  if (type === "gpa" && data.gpa !== undefined) return `GPA: ${data.gpa}`;
  if (type === "grade" && data.score !== undefined)
    return `Score: ${data.score} | Grade: ${data.grade || ""}`;
  if (type === "bmi" && data.bmi !== undefined)
    return `BMI: ${data.bmi}${data.category ? " (" + data.category + ")" : ""}`;
  if (type === "age") {
    if (data.years !== undefined)
      return `${data.years}y ${data.months || 0}m ${data.days || 0}d`;
    if (data.age !== undefined) return `Age: ${data.age}`;
  }
  if (type === "percentage" && data.result !== undefined)
    return `Result: ${data.result}`;
  if (type === "discount" && data.finalPrice !== undefined)
    return `Final: ${data.finalPrice}`;
  if (type === "profit" && data.profit !== undefined)
    return `Profit: ${data.profit}`;
  if (type === "loan" && data.monthlyPayment !== undefined)
    return `Monthly: ${data.monthlyPayment}`;
  if (type === "interest" && data.interest !== undefined)
    return `Interest: ${data.interest}`;
  if (type === "tax" && data.tax !== undefined) return `Tax: ${data.tax}`;
  if (type === "salary" && data.net !== undefined) return `Net: ${data.net}`;
  if (type === "savings" && data.futureValue !== undefined)
    return `Future: ${data.futureValue}`;
  if (type === "fuel" && data.totalFuelCost !== undefined)
    return `Cost: ${data.totalFuelCost}`;
  if (type === "average" && data.average !== undefined)
    return `Average: ${data.average}`;
  if (
    (type === "break-even" || type === "breakeven") &&
    data.breakEven !== undefined
  )
    return `Break-Even: ${data.breakEven}`;
  if (
    type === "vat" &&
    (data.total !== undefined || data.finalPrice !== undefined)
  )
    return `Total: ${data.total ?? data.finalPrice}`;
  if (type === "unit" && data.result !== undefined) return String(data.result);
  if (type === "currency" && data.result !== undefined)
    return String(data.result);

  try {
    const keys = Object.keys(data);
    if (!keys.length) return "";
    return keys
      .slice(0, 4)
      .map((k) => `${k}: ${data[k]}`)
      .join(" | ");
  } catch (e) {
    return "";
  }
}

// ========================================
// DISPLAY ON CALCULATOR PAGES
// ========================================

async function displayHistory(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="text-center py-4">
      <div class="spinner-border spinner-border-sm"></div>
      <p class="mt-2 mb-0 small text-muted">Loading history...</p>
    </div>
  `;

  let history = [];
  try {
    history = await getHistory();
  } catch (e) {
    console.error("displayHistory error:", e);
    history = [];
  }

  if (!history || history.length === 0) {
    container.innerHTML = `
      <div class="text-center py-4">
        <i class="bi bi-clock-history fs-3 text-muted"></i>
        <p class="mt-2 mb-0 text-muted">No history yet.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = "";

  history.forEach((raw) => {
    const item = normalizeHistoryItem(raw);
    const name = item.calculator_name || getCalculatorDisplayName(item);
    const result = formatHistoryResult(item);

    let dateText = "";
    if (item.createdAt) {
      try {
        if (typeof item.createdAt.toDate === "function") {
          dateText = item.createdAt.toDate().toLocaleString();
        } else {
          dateText = new Date(item.createdAt).toLocaleString();
        }
      } catch (e) {
        dateText = "";
      }
    } else if (item.date) {
      dateText = item.date;
    }

    const card = document.createElement("div");
    card.className = "history-item border rounded p-3 mb-2";
    card.innerHTML = `
      <div class="d-flex justify-content-between align-items-start gap-2">
        <div>
          <div class="fw-semibold">${name}</div>
          <div class="small text-muted">${dateText}</div>
          <div class="mt-1">${result}</div>
        </div>
        <button type="button" class="btn btn-sm btn-outline-danger history-delete" data-id="${item.id}">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;
    container.appendChild(card);
  });

  container.querySelectorAll(".history-delete").forEach((button) => {
    button.addEventListener("click", async function () {
      const id = this.getAttribute("data-id");
      const result = await deleteHistory(id);
      if (result && result.success) {
        await displayHistory(containerId);
      } else {
        alert("Cannot delete history item.");
        console.error("delete failed:", result);
      }
    });
  });
}

async function deleteHistoryItem(id, containerId) {
  const result = await deleteHistory(id);
  if (result && result.success && containerId) {
    await displayHistory(containerId);
  }
  return result;
}

// Auto-load history containers
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('[id$="historyContainer"]').forEach(function (el) {
    displayHistory(el.id);
  });
});

// Globals for onclick calculators
window.getHistory = getHistory;
window.loadHistoryFromServer = loadHistoryFromServer;
window.saveHistory = saveHistory;
window.deleteHistory = deleteHistory;
window.deleteHistoryItem = deleteHistoryItem;
window.clearHistory = clearHistory;
window.getCalculatorDisplayName = getCalculatorDisplayName;
window.formatHistoryResult = formatHistoryResult;
window.displayHistory = displayHistory;
window.HISTORY_KEY = GUEST_HISTORY_KEY;

export {
  getHistory,
  loadHistoryFromServer,
  saveHistory,
  deleteHistory,
  deleteHistoryItem,
  clearHistory,
  getCalculatorDisplayName,
  formatHistoryResult,
  displayHistory,
};
