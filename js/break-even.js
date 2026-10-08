function getBreakEvenText(key) {
  if (typeof window.currentLanguage !== "undefined" && window.window.currentLanguage === "kh") {
    return translations.kh[key] || key;
  }

  return translations.en[key] || key;
}

async function calculateBreakEven() {
  const fixedCosts = parseFloat(document.getElementById("fixedCosts").value);

  const sellingPrice = parseFloat(
    document.getElementById("sellingPrice").value,
  );

  const variableCost = parseFloat(
    document.getElementById("variableCost").value,
  );

  // Validation
  if (
    isNaN(fixedCosts) ||
    isNaN(sellingPrice) ||
    isNaN(variableCost) ||
    fixedCosts < 0 ||
    sellingPrice <= 0 ||
    variableCost < 0
  ) {
    alert(getBreakEvenText("invalidBreakEvenValues"));

    return;
  }

  // Selling price must be greater than variable cost
  if (sellingPrice <= variableCost) {
    alert(getBreakEvenText("sellingPriceTooLow"));

    return;
  }

  // Contribution margin
  const contributionMargin = sellingPrice - variableCost;

  // Break-even units
  const exactUnits = fixedCosts / contributionMargin;

  // Cannot sell a fraction of a product
  const breakEvenUnits = Math.ceil(exactUnits);

  // Break-even revenue
  const breakEvenRevenue = breakEvenUnits * sellingPrice;

  // Display result
  document.getElementById("breakEvenUnits").textContent =
    breakEvenUnits + " " + getBreakEvenText("units");

  document.getElementById("breakEvenRevenue").textContent =
    "$" + breakEvenRevenue.toFixed(2);

  document.getElementById("breakEvenResult").classList.remove("d-none");

  // ========================================
  // ========================================
  // SAVE HISTORY (Firestore if logged in)
  // ========================================

  if (typeof window.saveHistory === "function") {
    try {
      await window.saveHistory({
        calculatorType: "break-even",
        calculatorName: "Break-Even Calculator",
        data: { fixedCosts: typeof fixedCosts !== 'undefined' ? fixedCosts : 0, variableCost: typeof variableCost !== 'undefined' ? variableCost : 0, price: typeof price !== 'undefined' ? price : 0, breakEven: typeof breakEven !== 'undefined' ? breakEven : 0 },
        resultText: `Break-Even result`,
      });
    } catch (err) {
      console.error("Break-Even Calculator saveHistory error:", err);
    }
  } else {
    console.error("saveHistory is not available on window");
  }

  if (typeof window.displayHistory === "function") {
    await window.displayHistory("historyContainer");
  }
if (typeof window.displayHistory === "function") window.displayHistory("historyContainer");
}

// Clear history
async function clearBreakEvenHistory() {
  const confirmed = confirm(getBreakEvenText("confirmClearHistory"));

  if (!confirmed) {
    return;
  }

  if (typeof window.clearHistory === "function") {
    await window.clearHistory();
  }

  if (typeof window.displayHistory === "function") window.displayHistory("historyContainer");
}

// Load history
document.addEventListener("DOMContentLoaded", async function () {
  if (typeof window.displayHistory === "function") window.displayHistory("historyContainer");
});

// ========================================
// GLOBAL (onclick handlers)
// ========================================
window.calculateBreakEven = calculateBreakEven;
window.clearBreakEvenHistory = clearBreakEvenHistory;
