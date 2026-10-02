// ========================================
// PROFIT CALCULATOR
// ========================================

// ========================================
// IMPORT LANGUAGE
// ========================================

import { getCurrentLanguage, translations } from "./language.js";

// ========================================
// IMPORT HISTORY
// ========================================

import { saveHistory, displayHistory, clearHistory } from "./history.js";

// ========================================
// GET TRANSLATION
// ========================================

function getProfitText(key, fallback) {
  const language = getCurrentLanguage();

  if (translations && translations[language] && translations[language][key]) {
    return translations[language][key];
  }

  return fallback;
}

// ========================================
// CALCULATE PROFIT
// ========================================

async function calculateProfit() {
  // ========================================
  // GET INPUTS
  // ========================================

  const costInput = document.getElementById("cost");
  const sellingInput = document.getElementById("selling");

  if (!costInput || !sellingInput) {
    return;
  }

  const cost = Number(costInput.value);
  const selling = Number(sellingInput.value);

  // ========================================
  // CHECK EMPTY INPUT
  // ========================================

  if (costInput.value.trim() === "" || sellingInput.value.trim() === "") {
    alert(
      getProfitText(
        "enterCostSelling",
        "Please enter cost price and selling price.",
      ),
    );

    return;
  }

  // ========================================
  // VALID NUMBER
  // ========================================

  if (!Number.isFinite(cost) || !Number.isFinite(selling)) {
    alert(getProfitText("validNumbers", "Please enter valid numbers."));

    return;
  }

  // ========================================
  // VALIDATE VALUES
  // ========================================

  if (cost < 0 || selling < 0) {
    alert(getProfitText("validPrices", "Please enter valid prices."));

    return;
  }

  // ========================================
  // CALCULATE PROFIT
  // ========================================

  const profit = selling - cost;

  // ========================================
  // CALCULATE PROFIT MARGIN
  // ========================================

  let margin = 0;

  if (selling !== 0) {
    margin = (profit / selling) * 100;
  }

  // ========================================
  // SHOW RESULT
  // ========================================

  const profitResult = document.getElementById("profitResult");

  const profitElement = document.getElementById("profit");

  const marginElement = document.getElementById("margin");

  if (profitResult) {
    profitResult.style.display = "block";
  }

  if (profitElement) {
    profitElement.textContent = "$" + profit.toFixed(2);
  }

  if (marginElement) {
    marginElement.textContent = margin.toFixed(2) + "%";
  }

  // ========================================
  // SAVE HISTORY
  // ========================================

  const historyResult = await saveHistory({
    calculatorType: "profit",

    calculatorName: getProfitText("profitCalculator", "Profit Calculator"),

    data: {
      cost: cost,
      selling: selling,
      profit: profit,
      margin: margin,
    },

    resultText:
      `Profit: $${profit.toFixed(2)} | ` + `Margin: ${margin.toFixed(2)}%`,
  });

  // ========================================
  // CHECK HISTORY SAVE
  // ========================================

  if (!historyResult || !historyResult.success) {
    console.error("Failed to save profit history:", historyResult);
  }

  // ========================================
  // REFRESH HISTORY
  // ========================================

  await displayHistory("historyContainer");
}

// ========================================
// CLEAR PROFIT HISTORY
// ========================================

async function clearProfitHistory() {
  const confirmClear = confirm(
    getProfitText(
      "confirmClearHistory",
      "Are you sure you want to clear all calculation history?",
    ),
  );

  if (!confirmClear) {
    return;
  }

  // ========================================
  // CLEAR HISTORY
  // ========================================

  const result = await clearHistory();

  if (!result || !result.success) {
    console.error("Failed to clear history:", result);

    return;
  }

  // ========================================
  // REFRESH HISTORY
  // ========================================

  await displayHistory("historyContainer");
}

// ========================================
// EVENT LISTENERS
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  const calculateButton = document.getElementById("calculateProfitButton");

  const clearHistoryButton = document.getElementById(
    "clearProfitHistoryButton",
  );

  if (calculateButton) {
    calculateButton.addEventListener("click", calculateProfit);
  }

  if (clearHistoryButton) {
    clearHistoryButton.addEventListener("click", clearProfitHistory);
  }

  // ========================================
  // LOAD HISTORY
  // ========================================

  displayHistory("historyContainer");
});

// ========================================
// EXPORT
// ========================================

export { calculateProfit, clearProfitHistory };
