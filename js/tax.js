// ========================================
// TAX CALCULATOR
// ========================================

// ========================================
// GET TRANSLATION
// ========================================

function getTaxText(key, fallback) {
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
// CALCULATE TAX
// ========================================

function calculateTax() {
  // ========================================
  // GET INPUT VALUES
  // ========================================

  const incomeInput = document.getElementById("income").value.trim();

  const deductionInput = document.getElementById("deduction").value.trim();

  const rateInput = document.getElementById("taxRate").value.trim();

  // ========================================
  // CHECK EMPTY
  // ========================================

  if (incomeInput === "" || deductionInput === "" || rateInput === "") {
    alert(getTaxText("enterAllValues", "Please enter all values."));

    return;
  }

  // ========================================
  // CONVERT TO NUMBER
  // ========================================

  const income = Number(incomeInput);
  const deduction = Number(deductionInput);
  const taxRate = Number(rateInput);

  // ========================================
  // CHECK NUMBER
  // ========================================

  if (
    !Number.isFinite(income) ||
    !Number.isFinite(deduction) ||
    !Number.isFinite(taxRate)
  ) {
    alert(getTaxText("validNumbers", "Please enter valid numbers."));

    return;
  }

  // ========================================
  // CHECK VALID VALUES
  // ========================================

  if (income < 0 || deduction < 0 || taxRate < 0 || taxRate > 100) {
    alert(getTaxText("invalidTaxValues", "Please enter valid tax values."));

    return;
  }

  // ========================================
  // DEDUCTION CANNOT BE GREATER THAN INCOME
  // ========================================

  if (deduction > income) {
    alert(
      getTaxText(
        "deductionTooHigh",
        "Tax deduction cannot be greater than income.",
      ),
    );

    return;
  }

  // ========================================
  // TAXABLE INCOME
  // ========================================

  const taxableIncome = income - deduction;

  // ========================================
  // TAX AMOUNT
  // ========================================

  const taxAmount = taxableIncome * (taxRate / 100);

  // ========================================
  // AFTER TAX INCOME
  // ========================================

  const afterTaxIncome = income - taxAmount;

  // ========================================
  // DISPLAY RESULT
  // ========================================

  document.getElementById("taxResult").classList.remove("d-none");

  document.getElementById("taxAmount").textContent = "$" + taxAmount.toFixed(2);

  document.getElementById("taxAmountSmall").textContent =
    "$" + taxAmount.toFixed(2);

  document.getElementById("taxableIncome").textContent =
    "$" + taxableIncome.toFixed(2);

  document.getElementById("afterTaxIncome").textContent =
    "$" + afterTaxIncome.toFixed(2);

  document.getElementById("taxResultText").textContent =
    getTaxText("taxAmountResult", "Tax Amount") + ": $" + taxAmount.toFixed(2);

  // ========================================
  // SAVE HISTORY
  // ========================================

  const history = getHistory();

  const newCalculation = {
    id: Date.now(),

    calculator: "Tax Calculator",

    calculatorType: "tax",

    data: {
      income: income,

      deduction: deduction,

      taxRate: taxRate,

      taxableIncome: taxableIncome,

      taxAmount: taxAmount,

      afterTaxIncome: afterTaxIncome,
    },

    date: new Date().toLocaleString(),
  };

  history.unshift(newCalculation);

  // Keep latest 20

  if (history.length > 20) {
    history.pop();
  }

  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));

  // ========================================
  // DISPLAY HISTORY
  // ========================================

  displayHistory("historyContainer");
}

// ========================================
// CLEAR HISTORY
// ========================================

function clearTaxHistory() {
  const confirmClear = confirm(
    getTaxText(
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
  // ========================================
  // CALCULATE BUTTON
  // ========================================

  const calculateButton = document.getElementById("calculateTaxButton");

  if (calculateButton) {
    calculateButton.addEventListener("click", calculateTax);
  }

  // ========================================
  // CLEAR HISTORY BUTTON
  // ========================================

  const clearButton = document.getElementById("clearTaxHistoryButton");

  if (clearButton) {
    clearButton.addEventListener("click", clearTaxHistory);
  }

  // ========================================
  // LOAD HISTORY
  // ========================================

  displayHistory("historyContainer");
});
