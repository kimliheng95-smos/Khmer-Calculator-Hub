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

async function calculateLoan() {
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

  if (
    !Number.isFinite(loanAmount) ||
    !Number.isFinite(interestRate) ||
    !Number.isFinite(loanTerm)
  ) {
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
  // MONTHLY INTEREST RATE
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

  // 0% interest
  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / totalMonths;
  }

  // Normal interest
  else {
    const factor = Math.pow(1 + monthlyRate, totalMonths);

    monthlyPayment = (loanAmount * (monthlyRate * factor)) / (factor - 1);
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
  // DISPLAY MONTHLY PAYMENT
  // ========================================

  document.getElementById("monthlyPayment").textContent =
    "$" + monthlyPayment.toFixed(2);

  // ========================================
  // DISPLAY TOTAL PAYMENT
  // ========================================

  document.getElementById("totalPayment").textContent =
    "$" + totalPayment.toFixed(2);

  // ========================================
  // DISPLAY TOTAL INTEREST
  // ========================================

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
  // SAVE HISTORY
  // ========================================

  // ========================================
  // SAVE HISTORY (Firestore if logged in)
  // ========================================

  if (typeof window.saveHistory === "function") {
    try {
      await window.saveHistory({
        calculatorType: "loan",
        calculatorName: "Loan Calculator",
        data: { monthlyPayment: typeof monthlyPayment !== 'undefined' ? monthlyPayment : 0 },
        resultText: `Monthly: ${monthlyPayment}`,
      });
    } catch (err) {
      console.error("Loan Calculator saveHistory error:", err);
    }
  } else {
    console.error("saveHistory is not available on window");
  }

  if (typeof window.displayHistory === "function") {
    await window.displayHistory("historyContainer");
  }


  // ========================================
  // REFRESH HISTORY
  // ========================================

  displayHistory("historyContainer");
}

// ========================================
// CLEAR HISTORY
// ========================================

async function clearLoanHistory() {
  const confirmClear = confirm(
    getLoanText(
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
  // ========================================
  // CALCULATE BUTTON
  // ========================================

  const calculateButton = document.getElementById("calculateLoanButton");

  if (calculateButton) {
    calculateButton.addEventListener("click", calculateLoan);
  }

  // ========================================
  // CLEAR HISTORY BUTTON
  // ========================================

  const clearButton = document.getElementById("clearLoanHistoryButton");

  if (clearButton) {
    clearButton.addEventListener("click", clearLoanHistory);
  }

  // ========================================
  // LOAD HISTORY
  // ========================================

  displayHistory("historyContainer");
});

window.calculateLoan = calculateLoan;

window.clearLoanHistory = clearLoanHistory;
