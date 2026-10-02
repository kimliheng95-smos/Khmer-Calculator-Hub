// ========================================
// VAT CALCULATOR
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

function getText(key, fallback) {
  const language = getCurrentLanguage();

  if (translations && translations[language] && translations[language][key]) {
    return translations[language][key];
  }

  return fallback;
}

// ========================================
// FORMAT MONEY
// ========================================

function formatMoney(value) {
  return "$" + Number(value).toFixed(2);
}

// ========================================
// CALCULATE VAT
// ========================================

async function calculateVAT() {
  const vatType = document.getElementById("vatType");

  const priceInput = document.getElementById("price");

  const vatRateInput = document.getElementById("vatRate");

  if (!vatType || !priceInput || !vatRateInput) {
    return;
  }

  // ========================================
  // GET VALUES
  // ========================================

  const type = vatType.value;

  const priceText = priceInput.value.trim();

  const rateText = vatRateInput.value.trim();

  // ========================================
  // EMPTY CHECK
  // ========================================

  if (priceText === "" || rateText === "") {
    alert(getText("enterAllValues", "Please enter all values."));

    return;
  }

  // ========================================
  // CONVERT NUMBER
  // ========================================

  const price = Number(priceText);

  const rate = Number(rateText);

  // ========================================
  // VALID NUMBER
  // ========================================

  if (!Number.isFinite(price) || !Number.isFinite(rate)) {
    alert(getText("invalidVatValues", "Please enter valid numbers."));

    return;
  }

  // ========================================
  // VALIDATION
  // ========================================

  if (price < 0 || rate < 0 || rate > 100) {
    alert(getText("invalidVatValues", "Please enter valid values."));

    return;
  }

  // ========================================
  // VARIABLES
  // ========================================

  let priceBeforeVAT = 0;

  let vatAmount = 0;

  let totalPrice = 0;

  // ========================================
  // ADD VAT
  // ========================================

  if (type === "add") {
    priceBeforeVAT = price;

    vatAmount = price * (rate / 100);

    totalPrice = price + vatAmount;
  }

  // ========================================
  // REMOVE VAT
  // ========================================
  else if (type === "remove") {
    totalPrice = price;

    priceBeforeVAT = price / (1 + rate / 100);

    vatAmount = price - priceBeforeVAT;
  }

  // ========================================
  // SHOW RESULT
  // ========================================

  const resultBox = document.getElementById("vatResult");

  const beforeElement = document.getElementById("priceBeforeVat");

  const vatElement = document.getElementById("vatAmount");

  const totalElement = document.getElementById("totalPrice");

  if (resultBox) {
    resultBox.classList.remove("d-none");
  }

  if (beforeElement) {
    beforeElement.textContent = formatMoney(priceBeforeVAT);
  }

  if (vatElement) {
    vatElement.textContent = formatMoney(vatAmount);
  }

  if (totalElement) {
    totalElement.textContent = formatMoney(totalPrice);
  }

  // ========================================
  // VAT MODE TEXT
  // ========================================

  const modeText =
    type === "add"
      ? getText("addVat", "Add VAT")
      : getText("removeVat", "Remove VAT");

  // ========================================
  // SAVE HISTORY
  // ========================================

  const historyResult = await saveHistory({
    calculatorType: "vat",

    calculatorName: getText("vatCalculator", "VAT Calculator"),

    data: {
      type: type,

      modeText: modeText,

      price: price,

      rate: rate,

      priceBeforeVAT: priceBeforeVAT,

      vatAmount: vatAmount,

      total: totalPrice,
    },

    resultText: `${modeText}: ` + `${formatMoney(totalPrice)} ` + `(${rate}%)`,
  });

  // ========================================
  // CHECK SAVE
  // ========================================

  if (!historyResult || !historyResult.success) {
    console.error("Failed to save VAT history:", historyResult);
  }

  // ========================================
  // REFRESH HISTORY
  // ========================================

  await displayHistory("historyContainer");
}

// ========================================
// CLEAR VAT HISTORY
// ========================================

async function clearVATHistory() {
  const confirmClear = confirm(
    getText(
      "confirmClearHistory",
      "Are you sure you want to clear all calculation history?",
    ),
  );

  if (!confirmClear) {
    return;
  }

  // ========================================
  // CLEAR CENTRAL HISTORY
  // ========================================

  const result = await clearHistory();

  if (!result || !result.success) {
    console.error("Failed to clear VAT history:", result);

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
  const calculateButton = document.getElementById("calculateVATButton");

  const clearButton = document.getElementById("clearVATHistoryButton");

  // ======================================
  // CALCULATE
  // ======================================

  if (calculateButton) {
    calculateButton.addEventListener("click", calculateVAT);
  }

  // ======================================
  // CLEAR
  // ======================================

  if (clearButton) {
    clearButton.addEventListener("click", clearVATHistory);
  }

  // ======================================
  // LOAD HISTORY
  // ======================================

  displayHistory("historyContainer");
});

// ========================================
// EXPORT
// ========================================

export { calculateVAT, clearVATHistory };
