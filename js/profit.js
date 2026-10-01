// ========================================
// PROFIT CALCULATOR
// ========================================

// ========================================
// GET TRANSLATION
// ========================================

function getProfitText(key, fallback) {
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
// CALCULATE PROFIT
// ========================================

function calculateProfit() {
  // ========================================
  // GET INPUTS
  // ========================================

  const costInput = document.getElementById("cost");
  const sellingInput = document.getElementById("selling");

  const cost = Number(costInput.value);
  const selling = Number(sellingInput.value);

  // ========================================
  // CHECK EMPTY INPUT
  // ========================================

  if (costInput.value === "" || sellingInput.value === "") {
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

  document.getElementById("profitResult").style.display = "block";

  document.getElementById("profit").textContent = "$" + profit.toFixed(2);

  document.getElementById("margin").textContent = margin.toFixed(2) + "%";

  // ========================================
  // SAVE TYPED HISTORY
  // ========================================

  const history = getHistory();

  const newCalculation = {
    id: Date.now(),

    calculator: "Profit Calculator",

    calculatorType: "profit",

    data: {
      cost: cost,
      selling: selling,
      profit: profit,
      margin: margin,
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
  // REFRESH HISTORY
  // ========================================

  displayHistory("historyContainer");
}

// ========================================
// CLEAR PROFIT HISTORY
// ========================================

function clearProfitHistory() {
  const confirmClear = confirm(
    getProfitText(
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
// LOAD HISTORY
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  displayHistory("historyContainer");
});
