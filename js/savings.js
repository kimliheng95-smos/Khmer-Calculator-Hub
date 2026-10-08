// ========================================
// SAVINGS CALCULATOR
// ========================================

// ========================================
// GET TRANSLATION
// ========================================

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

async function calculateSavings() {
  // ========================================
  // GET INPUT VALUES
  // ========================================

  const initialInput = document.getElementById("initialDeposit").value.trim();

  const monthlyInput = document
    .getElementById("monthlyContribution")
    .value.trim();

  const rateInput = document.getElementById("savingsRate").value.trim();

  const yearsInput = document.getElementById("savingsYears").value.trim();

  // ========================================
  // CHECK EMPTY
  // ========================================

  if (
    initialInput === "" ||
    monthlyInput === "" ||
    rateInput === "" ||
    yearsInput === ""
  ) {
    alert(getSavingsText("enterAllValues", "Please enter all values."));

    return;
  }

  // ========================================
  // CONVERT TO NUMBER
  // ========================================

  const initialDeposit = Number(initialInput);
  const monthlyContribution = Number(monthlyInput);
  const annualRate = Number(rateInput);
  const years = Number(yearsInput);

  // ========================================
  // CHECK NUMBER
  // ========================================

  if (
    !Number.isFinite(initialDeposit) ||
    !Number.isFinite(monthlyContribution) ||
    !Number.isFinite(annualRate) ||
    !Number.isFinite(years)
  ) {
    alert(getSavingsText("validNumbers", "Please enter valid numbers."));

    return;
  }

  // ========================================
  // CHECK VALID VALUES
  // ========================================

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

  // ========================================
  // ZERO INTEREST
  // ========================================

  if (monthlyRate === 0) {
    futureValue = initialDeposit + monthlyContribution * months;
  }

  // ========================================
  // WITH INTEREST
  // ========================================
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
  // SHOW RESULT
  // ========================================

  document.getElementById("savingsResult").classList.remove("d-none");

  // ========================================
  // DISPLAY FUTURE VALUE
  // ========================================

  document.getElementById("futureValue").textContent =
    "$" + futureValue.toFixed(2);

  document.getElementById("futureValueSmall").textContent =
    "$" + futureValue.toFixed(2);

  // ========================================
  // DISPLAY CONTRIBUTIONS
  // ========================================

  document.getElementById("totalContributions").textContent =
    "$" + totalContributions.toFixed(2);

  // ========================================
  // DISPLAY INTEREST
  // ========================================

  document.getElementById("interestEarned").textContent =
    "$" + interestEarned.toFixed(2);

  // ========================================
  // RESULT TEXT
  // ========================================

  document.getElementById("savingsResultText").textContent =
    getSavingsText("futureSavings", "Your estimated future savings") +
    ": $" +
    futureValue.toFixed(2);

  // ========================================
  // SAVE HISTORY
  // ========================================

  // ========================================
  // SAVE HISTORY (Firestore if logged in)
  // ========================================

  if (typeof window.saveHistory === "function") {
    try {
      await window.saveHistory({
        calculatorType: "savings",
        calculatorName: "Savings Calculator",
        data: { futureValue: typeof futureValue !== 'undefined' ? futureValue : 0 },
        resultText: `Future: ${futureValue}`,
      });
    } catch (err) {
      console.error("Savings Calculator saveHistory error:", err);
    }
  } else {
    console.error("saveHistory is not available on window");
  }

  if (typeof window.displayHistory === "function") {
    await window.displayHistory("historyContainer");
  }


  // ========================================
  // DISPLAY HISTORY
  // ========================================

  displayHistory("historyContainer");
}

// ========================================
// CLEAR HISTORY
// ========================================

async function clearSavingsHistory() {
  const confirmClear = confirm(
    getSavingsText(
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

  const calculateButton = document.getElementById("calculateSavingsButton");

  if (calculateButton) {
    calculateButton.addEventListener("click", calculateSavings);
  }

  // ========================================
  // CLEAR HISTORY BUTTON
  // ========================================

  const clearButton = document.getElementById("clearSavingsHistoryButton");

  if (clearButton) {
    clearButton.addEventListener("click", clearSavingsHistory);
  }

  // ========================================
  // LOAD HISTORY
  // ========================================

  displayHistory("historyContainer");
});

window.calculateSavings = calculateSavings;

window.clearSavingsHistory = clearSavingsHistory;
