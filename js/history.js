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

// ========================================
// GUEST HISTORY KEY
// ========================================

const GUEST_HISTORY_KEY = "calculatorHistory";

// ========================================
// GET HISTORY LANGUAGE
// ========================================

function getHistoryLanguage() {
  return localStorage.getItem("language") || "en";
}

// ========================================
// GET LOCAL HISTORY
// ========================================

function getLocalHistory() {
  try {
    const data = localStorage.getItem(GUEST_HISTORY_KEY);

    if (!data) {
      return [];
    }

    const history = JSON.parse(data);

    return Array.isArray(history) ? history : [];
  } catch (error) {
    console.error("GET LOCAL HISTORY ERROR:", error);

    return [];
  }
}

// ========================================
// SAVE LOCAL HISTORY
// ========================================

function saveLocalHistory(history) {
  localStorage.setItem(GUEST_HISTORY_KEY, JSON.stringify(history));
}

// ========================================
// GET HISTORY
// ========================================

async function getHistory() {
  await loadSession();

  if (isLoggedIn()) {
    return await getAuthHistory();
  }

  return getLocalHistory();
}

// ========================================
// LOAD HISTORY FROM SERVER
// ========================================

async function loadHistoryFromServer() {
  await loadSession();

  if (!isLoggedIn()) {
    return getLocalHistory();
  }

  return await getAuthHistory();
}

// ========================================
// SAVE HISTORY
// ========================================

async function saveHistory(calculatorOrOptions, result) {
  await loadSession();

  // ========================================
  // STRUCTURED FORMAT
  // ========================================

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
    // ========================================
    // OLD FORMAT
    // ========================================

    item = {
      calculator_type: calculatorOrOptions,

      calculator_name: calculatorOrOptions,

      data: {},

      result_text: result || "",
    };
  }

  // ========================================
  // LOGGED-IN USER
  // ========================================

  if (isLoggedIn()) {
    return await saveAuthHistoryItem(item);
  }

  // ========================================
  // GUEST USER
  // ========================================

  const history = getLocalHistory();

  const localItem = {
    id: Date.now().toString(),

    ...item,

    createdAt: new Date().toISOString(),
  };

  history.unshift(localItem);

  // Keep latest 20
  const limitedHistory = history.slice(0, 20);

  saveLocalHistory(limitedHistory);

  return {
    success: true,
    id: localItem.id,
  };
}

// ========================================
// DELETE HISTORY
// ========================================

async function deleteHistory(id) {
  await loadSession();

  // ========================================
  // LOGGED-IN USER
  // ========================================

  if (isLoggedIn()) {
    return await deleteAuthHistoryItem(String(id));
  }

  // ========================================
  // GUEST USER
  // ========================================

  const history = getLocalHistory();

  const newHistory = history.filter((item) => String(item.id) !== String(id));

  saveLocalHistory(newHistory);

  return {
    success: true,
  };
}

// ========================================
// CLEAR HISTORY
// ========================================

async function clearHistory() {
  await loadSession();

  // ========================================
  // LOGGED-IN USER
  // ========================================

  if (isLoggedIn()) {
    return await clearAuthHistory();
  }

  // ========================================
  // GUEST USER
  // ========================================

  localStorage.removeItem(GUEST_HISTORY_KEY);

  return {
    success: true,
  };
}

// ========================================
// CALCULATOR DISPLAY NAME
// ========================================

function getCalculatorDisplayName(type) {
  const language = getHistoryLanguage();

  const names = {
    age: {
      en: "Age Calculator",
      km: "គណនាអាយុ",
    },

    average: {
      en: "Average Calculator",
      km: "គណនាមធ្យមភាគ",
    },

    bmi: {
      en: "BMI Calculator",
      km: "គណនា BMI",
    },

    "break-even": {
      en: "Break-Even Calculator",
      km: "គណនាចំណុចស្មើ",
    },

    currency: {
      en: "Currency Converter",
      km: "បម្លែងរូបិយប័ណ្ណ",
    },

    discount: {
      en: "Discount Calculator",
      km: "គណនាបញ្ចុះតម្លៃ",
    },

    fuel: {
      en: "Fuel Cost Calculator",
      km: "គណនាតម្លៃប្រេង",
    },

    gpa: {
      en: "GPA Calculator",
      km: "គណនា GPA",
    },

    grade: {
      en: "Grade Calculator",
      km: "គណនាពិន្ទុ",
    },

    interest: {
      en: "Interest Calculator",
      km: "គណនាការប្រាក់",
    },

    loan: {
      en: "Loan Calculator",
      km: "គណនាប្រាក់កម្ចី",
    },

    percentage: {
      en: "Percentage Calculator",
      km: "គណនាភាគរយ",
    },

    profit: {
      en: "Profit Calculator",
      km: "គណនាចំណេញ",
    },

    salary: {
      en: "Salary Calculator",
      km: "គណនាប្រាក់ខែ",
    },

    savings: {
      en: "Savings Calculator",
      km: "គណនាប្រាក់សន្សំ",
    },

    tax: {
      en: "Tax Calculator",
      km: "គណនាពន្ធ",
    },

    unit: {
      en: "Unit Converter",
      km: "បម្លែងឯកតា",
    },

    vat: {
      en: "VAT Calculator",
      km: "គណនា VAT",
    },
  };

  if (names[type]) {
    return names[type][language] || names[type].en;
  }

  return type;
}

// ========================================
// FORMAT HISTORY RESULT
// ========================================

function formatHistoryResult(item) {
  if (!item) {
    return "";
  }

  // If result_text already exists
  if (item.result_text) {
    return item.result_text;
  }

  const data = item.data || {};

  const type = item.calculator_type;

  // ========================================
  // GPA
  // ========================================

  if (type === "gpa") {
    if (data.gpa !== undefined) {
      return `GPA: ${data.gpa}`;
    }
  }

  // ========================================
  // GRADE
  // ========================================

  if (type === "grade") {
    if (data.score !== undefined) {
      return `Score: ${data.score} | Grade: ${data.grade || ""}`;
    }
  }

  // ========================================
  // BMI
  // ========================================

  if (type === "bmi") {
    if (data.bmi !== undefined) {
      return `BMI: ${data.bmi}`;
    }
  }

  // ========================================
  // AGE
  // ========================================

  if (type === "age") {
    if (data.age !== undefined) {
      return `Age: ${data.age}`;
    }
  }

  // ========================================
  // PERCENTAGE
  // ========================================

  if (type === "percentage") {
    if (data.result !== undefined) {
      return `Result: ${data.result}`;
    }
  }

  // ========================================
  // DISCOUNT
  // ========================================

  if (type === "discount") {
    if (data.finalPrice !== undefined) {
      return `Final Price: ${data.finalPrice}`;
    }
  }

  // ========================================
  // PROFIT
  // ========================================

  if (type === "profit") {
    if (data.profit !== undefined) {
      return `Profit: ${data.profit}`;
    }
  }

  // ========================================
  // DEFAULT
  // ========================================

  return JSON.stringify(data);
}

// ========================================
// DISPLAY HISTORY
// ========================================

async function displayHistory(containerId) {
  const container = document.getElementById(containerId);

  if (!container) {
    return;
  }

  container.innerHTML = `
        <div class="text-center py-4">
            <div class="spinner-border"></div>
            <p class="mt-2">
                Loading history...
            </p>
        </div>
    `;

  const history = await getHistory();

  if (!history || history.length === 0) {
    container.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-clock-history fs-1 text-muted"></i>

                <h5 class="mt-3">
                    No History
                </h5>

                <p class="text-muted">
                    Your calculator history will appear here.
                </p>
            </div>
        `;

    return;
  }

  container.innerHTML = "";

  history.forEach((item) => {
    const name =
      item.calculator_name || getCalculatorDisplayName(item.calculator_type);

    const result = formatHistoryResult(item);

    let dateText = "";

    if (item.createdAt) {
      try {
        if (item.createdAt.toDate) {
          dateText = item.createdAt.toDate().toLocaleString();
        } else {
          dateText = new Date(item.createdAt).toLocaleString();
        }
      } catch (error) {
        dateText = "";
      }
    }

    const card = document.createElement("div");

    card.className = "history-item border rounded p-3 mb-3";

    card.innerHTML = `

            <div class="d-flex justify-content-between align-items-start">

                <div>

                    <h5 class="mb-1">
                        ${name}
                    </h5>

                    <div class="text-muted small">
                        ${dateText}
                    </div>

                </div>

                <button
                    type="button"
                    class="btn btn-sm btn-outline-danger history-delete"
                    data-id="${item.id}"
                >
                    <i class="bi bi-trash"></i>
                </button>

            </div>

            <div class="mt-3">
                ${result}
            </div>

        `;

    container.appendChild(card);
  });

  // ========================================
  // DELETE BUTTONS
  // ========================================

  container.querySelectorAll(".history-delete").forEach((button) => {
    button.addEventListener("click", async function () {
      const id = this.dataset.id;

      const result = await deleteHistory(id);

      if (result.success) {
        await displayHistory(containerId);
      } else {
        console.error(result.message);
      }
    });
  });
}

// ========================================
// DELETE HISTORY ITEM
// ========================================

async function deleteHistoryItem(id, containerId) {
  const result = await deleteHistory(id);

  if (result.success) {
    await displayHistory(containerId);
  }

  return result;
}

// ========================================
// AUTO DISPLAY HISTORY
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  const historyContainers = document.querySelectorAll(
    '[id$="historyContainer"]',
  );

  historyContainers.forEach(function (container) {
    displayHistory(container.id);
  });
});

// ========================================
// EXPORT
// ========================================

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
