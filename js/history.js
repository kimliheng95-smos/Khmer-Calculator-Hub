// ========================================
// CALCULATION HISTORY SYSTEM
// ========================================

// Guest history key
const HISTORY_KEY_GUEST = "calculatorHistory";

// Keep alias for old calculators
var HISTORY_KEY = HISTORY_KEY_GUEST;

// ========================================
// CHECK LOGIN STATUS
// ========================================

function historyUserLoggedIn() {
  return (
    typeof isLoggedIn === "function" &&
    isLoggedIn() &&
    typeof getCurrentUser === "function"
  );
}

// ========================================
// GET USER HISTORY KEY
// ========================================

function getHistoryKey() {
  if (historyUserLoggedIn()) {
    const user = getCurrentUser();

    if (user && user.id) {
      return "calculatorHistory_user_" + user.id;
    }
  }

  return HISTORY_KEY_GUEST;
}

// ========================================
// GET CURRENT LANGUAGE
// ========================================

function getHistoryLanguage() {
  if (typeof currentLanguage !== "undefined") {
    return currentLanguage;
  }

  return localStorage.getItem("language") || "en";
}

// ========================================
// GET LOCAL HISTORY
// ========================================

function getLocalHistory() {
  const history = localStorage.getItem(getHistoryKey());

  if (!history) {
    return [];
  }

  try {
    return JSON.parse(history);
  } catch (error) {
    console.error("Cannot read local calculation history:", error);

    return [];
  }
}

// ========================================
// GET HISTORY
// ========================================

function getHistory() {
  return getLocalHistory();
}

// ========================================
// LOAD HISTORY FROM MYSQL
// ========================================

async function loadHistoryFromServer() {
  if (!historyUserLoggedIn()) {
    return getLocalHistory();
  }

  if (typeof getAuthHistory !== "function") {
    console.error("getAuthHistory() is not available.");

    return getLocalHistory();
  }

  try {
    const serverHistory = await getAuthHistory();

    if (!Array.isArray(serverHistory)) {
      return getLocalHistory();
    }

    const history = serverHistory.map(function (item) {
      return {
        id: Number(item.id),

        calculator:
          item.calculator_name ||
          item.calculator ||
          item.calculatorType ||
          "Calculator",

        calculatorType: item.calculator_type || item.calculatorType || "",

        data: item.data || {},

        result: item.result_text || item.result || "",

        date: item.date || item.created_at || "",
      };
    });

    // Cache server history locally
    localStorage.setItem(getHistoryKey(), JSON.stringify(history));

    return history;
  } catch (error) {
    console.error("Cannot load history from server:", error);

    return getLocalHistory();
  }
}

// ========================================
// SAVE HISTORY
// ========================================

async function saveHistory(calculatorOrOptions, result) {
  let newCalculation;

  // ========================================
  // NEW STRUCTURED FORMAT
  // ========================================

  if (
    typeof calculatorOrOptions === "object" &&
    calculatorOrOptions !== null &&
    calculatorOrOptions.calculatorType
  ) {
    newCalculation = {
      id: Date.now(),

      calculator:
        calculatorOrOptions.calculator || calculatorOrOptions.calculatorType,

      calculatorType: calculatorOrOptions.calculatorType,

      data: calculatorOrOptions.data || {},

      result: calculatorOrOptions.result || "",

      date: new Date().toLocaleString(),
    };
  }

  // ========================================
  // OLD FORMAT
  // ========================================
  else {
    newCalculation = {
      id: Date.now(),

      calculator: calculatorOrOptions,

      result: result || "",

      date: new Date().toLocaleString(),
    };
  }

  // ========================================
  // LOGGED-IN USER → MYSQL
  // ========================================

  if (historyUserLoggedIn() && typeof saveAuthHistoryItem === "function") {
    try {
      const response = await saveAuthHistoryItem(newCalculation);

      if (response && response.success) {
        console.log("History saved to MySQL:", response);

        await loadHistoryFromServer();
      } else {
        console.error("Failed to save history to MySQL:", response);
      }

      return response;
    } catch (error) {
      console.error("History save error:", error);

      return {
        success: false,
        error: "history_save_error",
      };
    }
  }

  // ========================================
  // GUEST → LOCAL STORAGE
  // ========================================

  const history = getLocalHistory();

  history.unshift(newCalculation);

  // Keep latest 20
  if (history.length > 20) {
    history.pop();
  }

  localStorage.setItem(HISTORY_KEY_GUEST, JSON.stringify(history));

  return {
    success: true,
    history: history,
  };
}

// ========================================
// DELETE ONE HISTORY
// ========================================

async function deleteHistory(id) {
  // ========================================
  // LOGGED-IN USER → MYSQL
  // ========================================

  if (historyUserLoggedIn() && typeof deleteAuthHistoryItem === "function") {
    try {
      const response = await deleteAuthHistoryItem(id);

      if (response && response.success) {
        console.log("History deleted from MySQL:", id);

        await loadHistoryFromServer();

        return true;
      }

      console.error("Failed to delete history:", response);

      return false;
    } catch (error) {
      console.error("Delete history error:", error);

      return false;
    }
  }

  // ========================================
  // GUEST → LOCAL STORAGE
  // ========================================

  let history = getLocalHistory();

  history = history.filter(function (item) {
    return Number(item.id) !== Number(id);
  });

  localStorage.setItem(HISTORY_KEY_GUEST, JSON.stringify(history));

  return true;
}

// ========================================
// CLEAR ALL HISTORY
// ========================================

async function clearHistory() {
  // ========================================
  // LOGGED-IN USER → MYSQL
  // ========================================

  if (historyUserLoggedIn() && typeof clearAuthHistory === "function") {
    try {
      const response = await clearAuthHistory();

      if (response && response.success) {
        console.log("All history cleared from MySQL.");

        localStorage.removeItem(getHistoryKey());

        return true;
      }

      console.error("Failed to clear history:", response);

      return false;
    } catch (error) {
      console.error("Clear history error:", error);

      return false;
    }
  }

  // ========================================
  // GUEST → LOCAL STORAGE
  // ========================================

  localStorage.removeItem(HISTORY_KEY_GUEST);

  return true;
}

// ========================================
// CALCULATOR DISPLAY NAMES
// ========================================

function getCalculatorDisplayName(item, language) {
  const type = item.calculatorType;

  const names = {
    age: {
      en: "Age Calculator",
      kh: "ម៉ាស៊ីនគណនាអាយុ",
    },

    average: {
      en: "Average Calculator",
      kh: "ម៉ាស៊ីនគណនាមធ្យមភាគ",
    },

    bmi: {
      en: "BMI Calculator",
      kh: "ម៉ាស៊ីនគណនា BMI",
    },

    "break-even": {
      en: "Break-Even Calculator",
      kh: "ម៉ាស៊ីនគណនាចំណុចស្មើដើម",
    },

    currency: {
      en: "Currency Converter",
      kh: "កម្មវិធីបម្លែងរូបិយប័ណ្ណ",
    },

    discount: {
      en: "Discount Calculator",
      kh: "ម៉ាស៊ីនគណនាបញ្ចុះតម្លៃ",
    },

    fuel: {
      en: "Fuel Cost Calculator",
      kh: "ម៉ាស៊ីនគណនាថ្លៃប្រេង",
    },

    gpa: {
      en: "GPA Calculator",
      kh: "ម៉ាស៊ីនគណនា GPA",
    },

    grade: {
      en: "Grade Calculator",
      kh: "ម៉ាស៊ីនគណនាពិន្ទុ",
    },

    interest: {
      en: "Interest Calculator",
      kh: "ម៉ាស៊ីនគណនាការប្រាក់",
    },

    loan: {
      en: "Loan Calculator",
      kh: "ម៉ាស៊ីនគណនាកម្ចី",
    },

    percentage: {
      en: "Percentage Calculator",
      kh: "ម៉ាស៊ីនគណនាភាគរយ",
    },

    profit: {
      en: "Profit Calculator",
      kh: "ម៉ាស៊ីនគណនាចំណេញ",
    },

    salary: {
      en: "Salary Calculator",
      kh: "ម៉ាស៊ីនគណនាប្រាក់ខែ",
    },

    savings: {
      en: "Savings Calculator",
      kh: "ម៉ាស៊ីនគណនាការសន្សំ",
    },

    tax: {
      en: "Tax Calculator",
      kh: "ម៉ាស៊ីនគណនាពន្ធ",
    },

    unit: {
      en: "Unit Converter",
      kh: "កម្មវិធីបម្លែងឯកតា",
    },

    vat: {
      en: "VAT Calculator",
      kh: "ម៉ាស៊ីនគណនា VAT",
    },
  };

  if (type && names[type]) {
    return language === "kh" ? names[type].kh : names[type].en;
  }

  return item.calculator || "Calculator";
}

// ========================================
// FORMAT HISTORY RESULT
// ========================================

function formatHistoryResult(item) {
  const language = getHistoryLanguage();

  const d = item.data || {};

  // ========================================
  // AGE
  // ========================================

  if (item.calculatorType === "age") {
    if (language === "kh") {
      return `អាយុ៖ ${d.years} ឆ្នាំ ${d.months} ខែ ${d.days} ថ្ងៃ`;
    }

    return `Age: ${d.years} years, ${d.months} months, ${d.days} days`;
  }

  // ========================================
  // AVERAGE
  // ========================================

  if (item.calculatorType === "average") {
    if (language === "kh") {
      return `ផលបូក៖ ${Number(d.sum).toFixed(2)} | មធ្យមភាគ៖ ${Number(d.average).toFixed(2)} | តូចបំផុត៖ ${Number(d.minimum).toFixed(2)} | ធំបំផុត៖ ${Number(d.maximum).toFixed(2)}`;
    }

    return `Sum: ${Number(d.sum).toFixed(2)} | Average: ${Number(d.average).toFixed(2)} | Min: ${Number(d.minimum).toFixed(2)} | Max: ${Number(d.maximum).toFixed(2)}`;
  }

  // ========================================
  // BMI
  // ========================================

  if (item.calculatorType === "bmi") {
    if (language === "kh") {
      return `BMI៖ ${Number(d.bmi).toFixed(2)} | ទម្ងន់៖ ${d.weight} kg | កម្ពស់៖ ${d.height} cm | ប្រភេទ៖ ${d.category}`;
    }

    return `BMI: ${Number(d.bmi).toFixed(2)} | Weight: ${d.weight} kg | Height: ${d.height} cm | Category: ${d.category}`;
  }

  // ========================================
  // BREAK-EVEN
  // ========================================

  if (item.calculatorType === "break-even") {
    if (language === "kh") {
      return `ចំនួនឯកតា៖ ${d.breakEvenUnits} | ចំណូល៖ $${Number(d.breakEvenRevenue).toFixed(2)}`;
    }

    return `Units: ${d.breakEvenUnits} | Revenue: $${Number(d.breakEvenRevenue).toFixed(2)}`;
  }

  // ========================================
  // CURRENCY
  // ========================================

  if (item.calculatorType === "currency") {
    return `${Number(d.amount).toFixed(2)} ${d.from} = ${Number(d.result).toFixed(2)} ${d.to}`;
  }

  // ========================================
  // DISCOUNT
  // ========================================

  if (item.calculatorType === "discount") {
    if (language === "kh") {
      return `តម្លៃ៖ $${Number(d.price).toFixed(2)} | បញ្ចុះ៖ ${d.discount}% | សន្សំ៖ $${Number(d.saved).toFixed(2)} | តម្លៃចុងក្រោយ៖ $${Number(d.finalPrice).toFixed(2)}`;
    }

    return `Price: $${Number(d.price).toFixed(2)} | Discount: ${d.discount}% | Saved: $${Number(d.saved).toFixed(2)} | Final: $${Number(d.finalPrice).toFixed(2)}`;
  }

  // ========================================
  // FUEL
  // ========================================

  if (item.calculatorType === "fuel") {
    if (language === "kh") {
      return `ប្រេងប្រើ៖ ${Number(d.fuelUsed).toFixed(2)} L | ថ្លៃសរុប៖ $${Number(d.totalFuelCost).toFixed(2)} | ក្នុង ១km៖ $${Number(d.costPerKm).toFixed(2)}`;
    }

    return `Fuel Used: ${Number(d.fuelUsed).toFixed(2)} L | Total Cost: $${Number(d.totalFuelCost).toFixed(2)} | Per km: $${Number(d.costPerKm).toFixed(2)}`;
  }

  // ========================================
  // GPA
  // ========================================

  if (item.calculatorType === "gpa") {
    if (language === "kh") {
      return `GPA៖ ${Number(d.gpa).toFixed(2)} | ឥណទានសរុប៖ ${d.totalCredits} | ពិន្ទុសរុប៖ ${Number(d.totalPoints || 0).toFixed(2)}`;
    }

    return `GPA: ${Number(d.gpa).toFixed(2)} | Credits: ${d.totalCredits} | Points: ${Number(d.totalPoints || 0).toFixed(2)}`;
  }

  // ========================================
  // GRADE
  // ========================================

  if (item.calculatorType === "grade") {
    if (language === "kh") {
      return `ពិន្ទុ៖ ${d.score}/${d.maxScore} | ភាគរយ៖ ${Number(d.percentage).toFixed(2)}% | ថ្នាក់៖ ${d.grade}`;
    }

    return `Score: ${d.score}/${d.maxScore} | Percentage: ${Number(d.percentage).toFixed(2)}% | Grade: ${d.grade}`;
  }

  // ========================================
  // INTEREST
  // ========================================

  if (item.calculatorType === "interest") {
    if (language === "kh") {
      return `${d.typeName || d.type} | ដើមទុន៖ $${Number(d.principal).toFixed(2)} | អត្រា៖ ${d.rate}% | ពេល៖ ${d.time} | ការប្រាក់៖ $${Number(d.interest).toFixed(2)} | សរុប៖ $${Number(d.totalAmount).toFixed(2)}`;
    }

    return `${d.typeName || d.type} | Principal: $${Number(d.principal).toFixed(2)} | Rate: ${d.rate}% | Time: ${d.time} | Interest: $${Number(d.interest).toFixed(2)} | Total: $${Number(d.totalAmount).toFixed(2)}`;
  }

  // ========================================
  // LOAN
  // ========================================

  if (item.calculatorType === "loan") {
    if (language === "kh") {
      return `កម្ចី៖ $${Number(d.loanAmount).toFixed(2)} | អត្រា៖ ${d.interestRate}% | រយៈពេល៖ ${d.loanTerm} | បង់ប្រចាំខែ៖ $${Number(d.monthlyPayment).toFixed(2)} | ការប្រាក់សរុប៖ $${Number(d.totalInterest).toFixed(2)}`;
    }

    return `Loan: $${Number(d.loanAmount).toFixed(2)} | Rate: ${d.interestRate}% | Term: ${d.loanTerm} | Monthly: $${Number(d.monthlyPayment).toFixed(2)} | Total Interest: $${Number(d.totalInterest).toFixed(2)}`;
  }

  // ========================================
  // PERCENTAGE
  // ========================================

  if (item.calculatorType === "percentage") {
    if (language === "kh") {
      return `ប្រភេទ៖ ${d.type} | លទ្ធផល៖ ${Number(d.result).toFixed(2)}`;
    }

    return `Type: ${d.type} | Result: ${Number(d.result).toFixed(2)}`;
  }

  // ========================================
  // PROFIT
  // ========================================

  if (item.calculatorType === "profit") {
    if (language === "kh") {
      return `ថ្លៃដើម៖ $${Number(d.cost).toFixed(2)} | តម្លៃលក់៖ $${Number(d.selling).toFixed(2)} | ចំណេញ៖ $${Number(d.profit).toFixed(2)} | ម៉ាជិន៖ ${Number(d.margin).toFixed(2)}%`;
    }

    return `Cost: $${Number(d.cost).toFixed(2)} | Selling: $${Number(d.selling).toFixed(2)} | Profit: $${Number(d.profit).toFixed(2)} | Margin: ${Number(d.margin).toFixed(2)}%`;
  }

  // ========================================
  // SALARY
  // ========================================

  if (item.calculatorType === "salary") {
    if (language === "kh") {
      return `ប្រាក់មូលដ្ឋាន៖ $${Number(d.basicSalary).toFixed(2)} | ប្រាក់បន្ថែម៖ $${Number(d.allowances).toFixed(2)} | កាត់បន្ថយ៖ $${Number(d.deductions).toFixed(2)} | ពន្ធ៖ ${d.taxRate}% | សរុប៖ $${Number(d.grossSalary).toFixed(2)} | សុទ្ធ៖ $${Number(d.netSalary).toFixed(2)}`;
    }

    return `Basic: $${Number(d.basicSalary).toFixed(2)} | Allowances: $${Number(d.allowances).toFixed(2)} | Deductions: $${Number(d.deductions).toFixed(2)} | Tax: ${d.taxRate}% | Gross: $${Number(d.grossSalary).toFixed(2)} | Net: $${Number(d.netSalary).toFixed(2)}`;
  }

  // ========================================
  // SAVINGS
  // ========================================

  if (item.calculatorType === "savings") {
    if (language === "kh") {
      return `ដាក់ដើម៖ $${Number(d.initialDeposit).toFixed(2)} | ប្រចាំខែ៖ $${Number(d.monthlyContribution).toFixed(2)} | អត្រា៖ ${d.annualRate}% | ឆ្នាំ៖ ${d.years} | ការប្រាក់៖ $${Number(d.interestEarned).toFixed(2)} | តម្លៃអនាគត៖ $${Number(d.futureValue).toFixed(2)}`;
    }

    return `Initial: $${Number(d.initialDeposit).toFixed(2)} | Monthly: $${Number(d.monthlyContribution).toFixed(2)} | Rate: ${d.annualRate}% | Years: ${d.years} | Interest: $${Number(d.interestEarned).toFixed(2)} | Future: $${Number(d.futureValue).toFixed(2)}`;
  }

  // ========================================
  // TAX
  // ========================================

  if (item.calculatorType === "tax") {
    if (language === "kh") {
      return `ចំណូល៖ $${Number(d.income).toFixed(2)} | កាត់បន្ថយ៖ $${Number(d.deduction).toFixed(2)} | អត្រា៖ ${d.taxRate}% | ពន្ធ៖ $${Number(d.taxAmount).toFixed(2)} | បន្ទាប់ពីពន្ធ៖ $${Number(d.afterTaxIncome).toFixed(2)}`;
    }

    return `Income: $${Number(d.income).toFixed(2)} | Deduction: $${Number(d.deduction).toFixed(2)} | Rate: ${d.taxRate}% | Tax: $${Number(d.taxAmount).toFixed(2)} | After Tax: $${Number(d.afterTaxIncome).toFixed(2)}`;
  }

  // ========================================
  // UNIT
  // ========================================

  if (item.calculatorType === "unit") {
    return `${d.value} ${d.fromName || d.from} = ${Number(d.result).toFixed(4)} ${d.toName || d.to}`;
  }

  // ========================================
  // VAT
  // ========================================

  if (item.calculatorType === "vat") {
    if (language === "kh") {
      return `${d.typeName || d.type} | តម្លៃមុន VAT៖ $${Number(d.priceBeforeVAT).toFixed(2)} | VAT៖ $${Number(d.vatAmount).toFixed(2)} | សរុប៖ $${Number(d.totalPrice).toFixed(2)}`;
    }

    return `${d.typeName || d.type} | Before VAT: $${Number(d.priceBeforeVAT).toFixed(2)} | VAT: $${Number(d.vatAmount).toFixed(2)} | Total: $${Number(d.totalPrice).toFixed(2)}`;
  }

  // ========================================
  // OLD HISTORY FALLBACK
  // ========================================

  return item.result || "";
}

// ========================================
// DISPLAY HISTORY
// ========================================

async function displayHistory(containerId) {
  const container = document.getElementById(containerId);

  if (!container) {
    return;
  }

  const language = getHistoryLanguage();

  let history;

  // ========================================
  // LOGGED-IN → MYSQL
  // ========================================

  if (historyUserLoggedIn()) {
    history = await loadHistoryFromServer();
  }

  // ========================================
  // GUEST → LOCAL STORAGE
  // ========================================
  else {
    history = getLocalHistory();
  }

  // ========================================
  // NO HISTORY
  // ========================================

  if (!history || history.length === 0) {
    container.innerHTML = `
      <div class="text-center py-4">
        <i class="bi bi-clock-history fs-1 text-secondary"></i>

        <p class="mt-2 mb-0 text-secondary">
          ${
            language === "kh"
              ? "មិនទាន់មានប្រវត្តិការគណនាទេ។"
              : "No calculation history yet."
          }
        </p>
      </div>
    `;

    return;
  }

  // ========================================
  // DISPLAY HISTORY
  // ========================================

  container.innerHTML = history
    .map(function (item) {
      const calculatorName = getCalculatorDisplayName(item, language);

      const safeDate = item.date || "";

      return `
        <div class="history-item border rounded p-3 mb-2">

          <div class="d-flex justify-content-between align-items-start gap-3">

            <div>

              <div class="history-calculator fw-semibold">
                ${calculatorName}
              </div>

              <div class="history-result mt-1">
                ${formatHistoryResult(item)}
              </div>

              <small class="history-date text-secondary">
                ${safeDate}
              </small>

            </div>

            <button
              type="button"
              class="btn btn-sm btn-outline-danger"
              onclick="deleteHistoryItem(${item.id}, '${containerId}')"
              title="${language === "kh" ? "លុប" : "Delete"}"
            >
              <i class="bi bi-trash"></i>
            </button>

          </div>

        </div>
      `;
    })
    .join("");
}

// ========================================
// DELETE + REFRESH
// ========================================

async function deleteHistoryItem(id, containerId) {
  const success = await deleteHistory(id);

  if (success) {
    await displayHistory(containerId);
  }
}

// ========================================
// PAGE LOAD
// ========================================

document.addEventListener("DOMContentLoaded", async function () {
  const containers = document.querySelectorAll('[id$="historyContainer"]');

  for (const container of containers) {
    await displayHistory(container.id);
  }
});
