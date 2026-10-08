// ========================================
// SALARY CALCULATOR
// ========================================

// GET TRANSLATION

function getSalaryText(key, fallback) {
  if (
    typeof translations !== "undefined" &&
    typeof currentLanguage !== "undefined" &&
    translations[currentLanguage] &&
    translations[currentLanguage][key]
  ) {
    return translations[currentLanguage][key];
  }

  return fallback;
}

// ========================================
// CALCULATE SALARY
// ========================================

async function calculateSalary() {
  const basicInput = document.getElementById("basicSalary").value.trim();

  const allowanceInput = document.getElementById("allowances").value.trim();

  const deductionInput = document.getElementById("deductions").value.trim();

  const taxInput = document.getElementById("salaryTaxRate").value.trim();

  // ========================================
  // CHECK EMPTY
  // ========================================

  if (
    basicInput === "" ||
    allowanceInput === "" ||
    deductionInput === "" ||
    taxInput === ""
  ) {
    alert(getSalaryText("enterAllValues", "Please enter all values."));

    return;
  }

  // ========================================
  // CONVERT NUMBER
  // ========================================

  const basicSalary = Number(basicInput);

  const allowances = Number(allowanceInput);

  const deductions = Number(deductionInput);

  const taxRate = Number(taxInput);

  // ========================================
  // CHECK NUMBER
  // ========================================

  if (
    isNaN(basicSalary) ||
    isNaN(allowances) ||
    isNaN(deductions) ||
    isNaN(taxRate)
  ) {
    alert(getSalaryText("validNumbers", "Please enter valid numbers."));

    return;
  }

  // ========================================
  // VALIDATION
  // ========================================

  if (
    basicSalary < 0 ||
    allowances < 0 ||
    deductions < 0 ||
    taxRate < 0 ||
    taxRate > 100
  ) {
    alert(
      getSalaryText("invalidSalaryValues", "Please enter valid salary values."),
    );

    return;
  }

  // ========================================
  // GROSS SALARY
  // ========================================

  const grossSalary = basicSalary + allowances;

  // ========================================
  // TAX
  // ========================================

  const taxAmount = grossSalary * (taxRate / 100);

  // ========================================
  // TOTAL DEDUCTIONS
  // ========================================

  const totalDeductions = deductions + taxAmount;

  // ========================================
  // NET SALARY
  // ========================================

  const netSalary = grossSalary - totalDeductions;

  // ========================================
  // CHECK NET SALARY
  // ========================================

  if (netSalary < 0) {
    alert(
      getSalaryText(
        "deductionsTooHigh",
        "Total deductions cannot be greater than gross salary.",
      ),
    );

    return;
  }

  // ========================================
  // DISPLAY RESULT
  // ========================================

  document.getElementById("salaryResult").classList.remove("d-none");

  document.getElementById("grossSalary").textContent =
    "$" + grossSalary.toFixed(2);

  document.getElementById("totalDeductions").textContent =
    "$" + totalDeductions.toFixed(2);

  document.getElementById("netSalary").textContent = "$" + netSalary.toFixed(2);

  document.getElementById("netSalarySmall").textContent =
    "$" + netSalary.toFixed(2);

  document.getElementById("salaryResultText").textContent =
    getSalaryText("yourNetSalary", "Your estimated net salary") +
    ": $" +
    netSalary.toFixed(2);

  // ========================================
  // SAVE HISTORY
  // ========================================

  // ========================================
  // SAVE HISTORY (Firestore if logged in)
  // ========================================

  if (typeof window.saveHistory === "function") {
    try {
      await window.saveHistory({
        calculatorType: "salary",
        calculatorName: "Salary Calculator",
        data: { net: typeof net !== 'undefined' ? net : 0 },
        resultText: `Net: ${net}`,
      });
    } catch (err) {
      console.error("Salary Calculator saveHistory error:", err);
    }
  } else {
    console.error("saveHistory is not available on window");
  }

  if (typeof window.displayHistory === "function") {
    await window.displayHistory("historyContainer");
  }


  displayHistory("historyContainer");
}

// ========================================
// CLEAR HISTORY
// ========================================

async function clearSalaryHistory() {
  const confirmClear = confirm(
    getSalaryText(
      "confirmClearHistory",
      "Are you sure you want to clear all calculation history?",
    ),
  );

  if (!confirmClear) {
    return;
  }

  if (typeof window.clearHistory === "function") await window.clearHistory();

  displayHistory("historyContainer");
}

// ========================================
// PAGE LOAD
// ========================================

document.addEventListener("DOMContentLoaded", async function () {
  const calculateButton = document.getElementById("calculateSalaryButton");

  if (calculateButton) {
    calculateButton.addEventListener("click", calculateSalary);
  }

  const clearButton = document.getElementById("clearSalaryHistoryButton");

  if (clearButton) {
    clearButton.addEventListener("click", clearSalaryHistory);
  }

  displayHistory("historyContainer");
});

window.calculateSalary = calculateSalary;

window.clearSalaryHistory = clearSalaryHistory;
