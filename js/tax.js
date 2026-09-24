// ========================================
// TAX CALCULATOR
// ========================================

// GET TRANSLATION

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
  const incomeInput = document.getElementById("income").value.trim();

  const deductionInput = document.getElementById("deduction").value.trim();

  const rateInput = document.getElementById("taxRate").value.trim();

  // CHECK EMPTY

  if (incomeInput === "" || deductionInput === "" || rateInput === "") {
    alert(getTaxText("enterAllValues", "Please enter all values."));

    return;
  }

  // CONVERT NUMBER

  const income = Number(incomeInput);

  const deduction = Number(deductionInput);

  const taxRate = Number(rateInput);

  // CHECK NUMBER

  if (isNaN(income) || isNaN(deduction) || isNaN(taxRate)) {
    alert(getTaxText("validNumbers", "Please enter valid numbers."));

    return;
  }

  // CHECK VALID VALUES

  if (income < 0 || deduction < 0 || taxRate < 0 || taxRate > 100) {
    alert(getTaxText("invalidTaxValues", "Please enter valid tax values."));

    return;
  }

  // DEDUCTION CANNOT BE GREATER THAN INCOME

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

  saveHistory(
    "Tax Calculator",

    "Income: $" +
      income.toFixed(2) +
      " | Deduction: $" +
      deduction.toFixed(2) +
      " | Rate: " +
      taxRate.toFixed(2) +
      "%" +
      " | Taxable: $" +
      taxableIncome.toFixed(2) +
      " | Tax: $" +
      taxAmount.toFixed(2) +
      " | After Tax: $" +
      afterTaxIncome.toFixed(2),
  );

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
  const calculateButton = document.getElementById("calculateTaxButton");

  if (calculateButton) {
    calculateButton.addEventListener("click", calculateTax);
  }

  const clearButton = document.getElementById("clearTaxHistoryButton");

  if (clearButton) {
    clearButton.addEventListener("click", clearTaxHistory);
  }

  displayHistory("historyContainer");
});
