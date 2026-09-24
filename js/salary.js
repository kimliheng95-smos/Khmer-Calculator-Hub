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

function calculateSalary() {
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

  saveHistory(
    "Salary Calculator",

    "Basic: $" +
      basicSalary.toFixed(2) +
      " | Allowances: $" +
      allowances.toFixed(2) +
      " | Deductions: $" +
      deductions.toFixed(2) +
      " | Tax: " +
      taxRate.toFixed(2) +
      "%" +
      " | Gross: $" +
      grossSalary.toFixed(2) +
      " | Net: $" +
      netSalary.toFixed(2),
  );

  displayHistory("historyContainer");
}

// ========================================
// CLEAR HISTORY
// ========================================

function clearSalaryHistory() {
  const confirmClear = confirm(
    getSalaryText(
      "confirmClearHistory",
      "Are you sure you want to clear all calculation history?",
    ),
  );

  if (!confirmClear) {
    return;
  }

  clearHistory();

  displayHistory("historyContainer");
}

// ========================================
// PAGE LOAD
// ========================================

document.addEventListener("DOMContentLoaded", function () {
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
