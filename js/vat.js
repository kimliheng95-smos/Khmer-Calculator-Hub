function getVATText(key) {
  if (typeof currentLanguage !== "undefined" && currentLanguage === "kh") {
    return translations.kh[key] || key;
  }

  return translations.en[key] || key;
}

function calculateVAT() {
  const type = document.getElementById("vatType").value;

  const price = parseFloat(document.getElementById("price").value);

  const vatRate = parseFloat(document.getElementById("vatRate").value);

  // Validation
  if (
    isNaN(price) ||
    isNaN(vatRate) ||
    price < 0 ||
    vatRate < 0 ||
    vatRate > 100
  ) {
    alert(getVATText("invalidVatValues"));

    return;
  }

  let priceBeforeVAT;
  let vatAmount;
  let totalPrice;

  // Add VAT
  if (type === "add") {
    priceBeforeVAT = price;

    vatAmount = price * (vatRate / 100);

    totalPrice = price + vatAmount;
  }

  // Remove VAT
  else {
    totalPrice = price;

    priceBeforeVAT = price / (1 + vatRate / 100);

    vatAmount = totalPrice - priceBeforeVAT;
  }

  // Display result
  document.getElementById("priceBeforeVat").textContent =
    "$" + priceBeforeVAT.toFixed(2);

  document.getElementById("vatAmount").textContent = "$" + vatAmount.toFixed(2);

  document.getElementById("totalPrice").textContent =
    "$" + totalPrice.toFixed(2);

  document.getElementById("vatResult").classList.remove("d-none");

  // ========================================
  // SAVE HISTORY
  // ========================================

  const typeName =
    type === "add" ? getVATText("addVat") : getVATText("removeVat");

  const history = getHistory();

  const newCalculation = {
    id: Date.now(),

    calculator: "VAT Calculator",

    calculatorType: "vat",

    data: {
      type: type,
      typeName: typeName,
      price: price,
      vatRate: vatRate,
      priceBeforeVAT: priceBeforeVAT,
      vatAmount: vatAmount,
      totalPrice: totalPrice,
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
function clearVATHistory() {
  const confirmed = confirm(getVATText("confirmClearHistory"));

  if (!confirmed) {
    return;
  }

  clearHistory();

  displayHistory("historyContainer");
}

// Load history when page opens
document.addEventListener("DOMContentLoaded", function () {
  displayHistory("historyContainer");
});
