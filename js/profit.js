// ========================================
// PROFIT CALCULATOR
// ========================================

function calculateProfit() {
  // Get values
  const cost = Number(document.getElementById("cost").value);

  const selling = Number(document.getElementById("selling").value);

  // Check empty input
  if (
    document.getElementById("cost").value === "" ||
    document.getElementById("selling").value === ""
  ) {
    alert("Please enter cost price and selling price.");

    return;
  }

  // Validate values
  if (cost < 0 || selling < 0) {
    alert("Please enter valid prices.");

    return;
  }

  // Calculate profit
  const profit = selling - cost;

  // Calculate profit margin
  let margin = 0;

  if (selling !== 0) {
    margin = (profit / selling) * 100;
  }

  // Show result
  document.getElementById("profitResult").style.display = "block";

  document.getElementById("profit").textContent = "$" + profit.toFixed(2);

  document.getElementById("margin").textContent = margin.toFixed(2) + "%";

  // ========================================
  // SAVE HISTORY
  // ========================================

  saveHistory(
    "Profit Calculator",
    "Profit: $" + profit.toFixed(2) + " | Margin: " + margin.toFixed(2) + "%",
  );

  // Refresh history
  displayHistory("historyContainer");
}

// ========================================
// CLEAR PROFIT HISTORY
// ========================================

function clearProfitHistory() {
  const confirmClear = confirm(
    "Are you sure you want to clear all calculation history?",
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
