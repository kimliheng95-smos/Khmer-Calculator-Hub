function getBreakEvenText(key) {
  if (typeof currentLanguage !== "undefined" && currentLanguage === "kh") {
    return translations.kh[key] || key;
  }

  return translations.en[key] || key;
}

function calculateBreakEven() {
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
  // SAVE HISTORY
  // ========================================

  const history = getHistory();

  const newCalculation = {
    id: Date.now(),

    calculator: "Break-Even Calculator",

    calculatorType: "break-even",

    data: {
      fixedCosts: fixedCosts,
      sellingPrice: sellingPrice,
      variableCost: variableCost,
      breakEvenUnits: breakEvenUnits,
      breakEvenRevenue: breakEvenRevenue,
    },

    date: new Date().toLocaleString(),
  };

  history.unshift(newCalculation);

  // Keep latest 20
  if (history.length > 20) {
    history.pop();
  }

  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));

  displayHistory("historyContainer");
}

// Clear history
function clearBreakEvenHistory() {
  const confirmed = confirm(getBreakEvenText("confirmClearHistory"));

  if (!confirmed) {
    return;
  }

  clearHistory();

  displayHistory("historyContainer");
}

// Load history
document.addEventListener("DOMContentLoaded", function () {
  displayHistory("historyContainer");
});
