// ========================================
// SAVINGS CALCULATOR
// ========================================

// GET TRANSLATION
function getSavingsText(key, fallback) {
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
// CALCULATE SAVINGS
// ========================================

function calculateSavings() {
  const initialInput = document.getElementById("initialDeposit").value.trim();

  const monthlyInput = document
    .getElementById("monthlyContribution")
    .value.trim();

  const rateInput = document.getElementById("savingsRate").value.trim();

  const yearsInput = document.getElementById("savingsYears").value.trim();

  // CHECK EMPTY

  if (
    initialInput === "" ||
    monthlyInput === "" ||
    rateInput === "" ||
    yearsInput === ""
  ) {
    alert(getSavingsText("enterAllValues", "Please enter all values."));

    return;
  }

  // CONVERT TO NUMBER

  const initialDeposit = Number(initialInput);

  const monthlyContribution = Number(monthlyInput);

  const annualRate = Number(rateInput);

  const years = Number(yearsInput);

  // CHECK NUMBER

  if (
    isNaN(initialDeposit) ||
    isNaN(monthlyContribution) ||
    isNaN(annualRate) ||
    isNaN(years)
  ) {
    alert(getSavingsText("validNumbers", "Please enter valid numbers."));

    return;
  }

  // CHECK VALID VALUES

  if (
    initialDeposit < 0 ||
    monthlyContribution < 0 ||
    annualRate < 0 ||
    years <= 0
  ) {
    alert(
      getSavingsText(
        "invalidSavingsValues",
        "Please enter valid savings values.",
      ),
    );

    return;
  }

  // ========================================
  // CALCULATION
  // ========================================

  const months = years * 12;

  const monthlyRate = annualRate / 100 / 12;

  let futureValue;

  // IF INTEREST RATE = 0

  if (monthlyRate === 0) {
    futureValue = initialDeposit + monthlyContribution * months;
  }

  // WITH INTEREST
  else {
    // Initial deposit growth

    const initialGrowth = initialDeposit * Math.pow(1 + monthlyRate, months);

    // Monthly contribution growth

    const contributionGrowth =
      monthlyContribution *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

    futureValue = initialGrowth + contributionGrowth;
  }

  // ========================================
  // TOTAL CONTRIBUTIONS
  // ========================================

  const totalContributions = initialDeposit + monthlyContribution * months;

  // ========================================
  // INTEREST EARNED
  // ========================================

  const interestEarned = futureValue - totalContributions;

  // ========================================
  // DISPLAY RESULT
  // ========================================

  document.getElementById("savingsResult").classList.remove("d-none");

  document.getElementById("futureValue").textContent =
    "$" + futureValue.toFixed(2);

  document.getElementById("futureValueSmall").textContent =
    "$" + futureValue.toFixed(2);

  document.getElementById("totalContributions").textContent =
    "$" + totalContributions.toFixed(2);

  document.getElementById("interestEarned").textContent =
    "$" + interestEarned.toFixed(2);

  document.getElementById("savingsResultText").textContent =
    getSavingsText("futureSavings", "Your estimated future savings") +
    ": $" +
    futureValue.toFixed(2);

  // ========================================
  // SAVE HISTORY
  // ========================================

  saveHistory(
    "Savings Calculator",

    "Initial: $" +
      initialDeposit.toFixed(2) +
      " | Monthly: $" +
      monthlyContribution.toFixed(2) +
      " | Rate: " +
      annualRate.toFixed(2) +
      "%" +
      " | Time: " +
      years +
      " years" +
      " | Interest: $" +
      interestEarned.toFixed(2) +
      " | Future Value: $" +
      futureValue.toFixed(2),
  );

  displayHistory("historyContainer");
}

// ========================================
// CLEAR HISTORY
// ========================================

function clearSavingsHistory() {
  const confirmClear = confirm(
    getSavingsText(
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
  const calculateButton = document.getElementById("calculateSavingsButton");

  if (calculateButton) {
    calculateButton.addEventListener("click", calculateSavings);
  }

  const clearButton = document.getElementById("clearSavingsHistoryButton");

  if (clearButton) {
    clearButton.addEventListener("click", clearSavingsHistory);
  }

  displayHistory("historyContainer");
});
