// ========================================
// LOAN CALCULATOR
// ========================================

// ========================================
// GET TRANSLATION
// ========================================

function getLoanText(key, fallback) {
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
// CALCULATE LOAN
// ========================================

function calculateLoan() {
  const loanAmountInput = document.getElementById("loanAmount").value.trim();

  const interestRateInput = document
    .getElementById("interestRate")
    .value.trim();

  const loanTermInput = document.getElementById("loanTerm").value.trim();

  // ========================================
  // EMPTY CHECK
  // ========================================

  if (
    loanAmountInput === "" ||
    interestRateInput === "" ||
    loanTermInput === ""
  ) {
    alert(getLoanText("enterAllValues", "Please enter all values."));

    return;
  }

  // ========================================
  // CONVERT NUMBER
  // ========================================

  const loanAmount = Number(loanAmountInput);

  const interestRate = Number(interestRateInput);

  const loanTerm = Number(loanTermInput);

  // ========================================
  // VALID NUMBER
  // ========================================

  if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm)) {
    alert(getLoanText("validNumbers", "Please enter valid numbers."));

    return;
  }

  // ========================================
  // VALID VALUES
  // ========================================

  if (loanAmount <= 0 || interestRate < 0 || loanTerm <= 0) {
    alert(getLoanText("invalidLoanValues", "Please enter valid loan values."));

    return;
  }

  // ========================================
  // MONTHLY INTEREST
  // ========================================

  const monthlyRate = interestRate / 100 / 12;

  // ========================================
  // TOTAL MONTHS
  // ========================================

  const totalMonths = loanTerm * 12;

  // ========================================
  // MONTHLY PAYMENT
  // ========================================

  let monthlyPayment;

  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / totalMonths;
  } else {
    monthlyPayment =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
  }

  // ========================================
  // TOTAL PAYMENT
  // ========================================

  const totalPayment = monthlyPayment * totalMonths;

  // ========================================
  // TOTAL INTEREST
  // ========================================

  const totalInterest = totalPayment - loanAmount;

  // ========================================
  // SHOW RESULT
  // ========================================

  document.getElementById("loanResult").classList.remove("d-none");

  // ========================================
  // DISPLAY
  // ========================================

  document.getElementById("monthlyPayment").textContent =
    "$" + monthlyPayment.toFixed(2);

  document.getElementById("totalPayment").textContent =
    "$" + totalPayment.toFixed(2);

  document.getElementById("totalInterest").textContent =
    "$" + totalInterest.toFixed(2);

  // ========================================
  // RESULT TEXT
  // ========================================

  document.getElementById("loanResultText").textContent =
    getLoanText("loanResultSummary", "Monthly payment") +
    ": $" +
    monthlyPayment.toFixed(2);

  // ========================================
  // HISTORY
  // ========================================

  saveHistory(
    "Loan Calculator",

    "Loan: $" +
      loanAmount.toFixed(2) +
      " | Rate: " +
      interestRate.toFixed(2) +
      "%" +
      " | Term: " +
      loanTerm +
      " years" +
      " | Monthly: $" +
      monthlyPayment.toFixed(2),
  );

  displayHistory("historyContainer");
}

// ========================================
// CLEAR HISTORY
// ========================================

function clearLoanHistory() {
  const confirmClear = confirm(
    getLoanText(
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
  // Calculate button

  const calculateButton = document.getElementById("calculateLoanButton");

  if (calculateButton) {
    calculateButton.addEventListener("click", calculateLoan);
  }

  // Clear history

  const clearButton = document.getElementById("clearLoanHistoryButton");

  if (clearButton) {
    clearButton.addEventListener("click", clearLoanHistory);
  }

  // Display history

  displayHistory("historyContainer");
});
