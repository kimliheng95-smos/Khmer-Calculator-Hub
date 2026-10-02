// ========================================
// VAT CALCULATOR
// ========================================

// ========================================
// LANGUAGE HELPER
// ========================================

function getLanguage() {
  return localStorage.getItem("language") || "en";
}

function getText(key, fallback) {
  const language = getLanguage();

  if (
    window.translations &&
    window.translations[language] &&
    window.translations[language][key]
  ) {
    return window.translations[language][key];
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
// GET HISTORY
// ========================================

function getVATHistory() {
  try {
    return JSON.parse(localStorage.getItem("vatHistory")) || [];
  } catch (error) {
    return [];
  }
}

// ========================================
// SAVE HISTORY
// ========================================

function saveVATHistory(data) {
  let history = getVATHistory();

  history.unshift(data);

  // Keep only latest 20
  if (history.length > 20) {
    history = history.slice(0, 20);
  }

  localStorage.setItem("vatHistory", JSON.stringify(history));

  displayVATHistory();
}

// ========================================
// DISPLAY HISTORY
// ========================================

function displayVATHistory() {
  const container = document.getElementById("historyContainer");

  if (!container) {
    return;
  }

  const history = getVATHistory();

  // No history
  if (history.length === 0) {
    container.innerHTML = `
      <div class="text-center text-muted py-4">
        <i class="bi bi-clock-history fs-3"></i>

        <p class="mb-0 mt-2">
          ${getText("noHistory", "No calculation history yet.")}
        </p>
      </div>
    `;

    return;
  }

  // Clear old content
  container.innerHTML = "";

  history.forEach((item) => {
    const historyItem = document.createElement("div");

    historyItem.className = "history-item p-3 rounded-3 mb-2";

    historyItem.innerHTML = `
      <div class="d-flex justify-content-between align-items-start gap-3">

        <div>

          <div class="history-calculator">

            ${item.modeText}

          </div>

          <div class="mt-1">

            ${formatMoney(item.price)}
            ×
            ${item.rate}%
          </div>

          <div class="history-date text-muted mt-1">

            ${item.date}

          </div>

        </div>


        <div class="history-result">

          ${formatMoney(item.total)}

        </div>

      </div>
    `;

    container.appendChild(historyItem);
  });
}

// ========================================
// CALCULATE VAT
// ========================================

function calculateVAT() {
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
  // NUMBER
  // ========================================

  const price = Number(priceText);

  const rate = Number(rateText);

  if (!Number.isFinite(price) || !Number.isFinite(rate)) {
    alert(getText("invalidValues", "Please enter valid numbers."));

    return;
  }

  // ========================================
  // VALIDATION
  // ========================================

  if (price < 0 || rate < 0 || rate > 100) {
    alert(getText("invalidValues", "Please enter valid values."));

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
  // HISTORY
  // ========================================

  const modeText =
    type === "add"
      ? getText("addVat", "Add VAT")
      : getText("removeVat", "Remove VAT");

  saveVATHistory({
    id: Date.now(),

    type: type,

    modeText: modeText,

    price: price,

    rate: rate,

    priceBeforeVAT: priceBeforeVAT,

    vatAmount: vatAmount,

    total: totalPrice,

    date: new Date().toLocaleString(getLanguage() === "kh" ? "km-KH" : "en-US"),
  });
}

// ========================================
// CLEAR HISTORY
// ========================================

function clearVATHistory() {
  const confirmClear = confirm(
    getText(
      "confirmClearHistory",
      "Are you sure you want to clear all calculation history?",
    ),
  );

  if (!confirmClear) {
    return;
  }

  localStorage.removeItem("vatHistory");

  displayVATHistory();
}

// ========================================
// EVENT LISTENERS
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  const calculateButton = document.getElementById("calculateVATButton");

  const clearButton = document.getElementById("clearVATHistoryButton");

  // Calculate
  if (calculateButton) {
    calculateButton.addEventListener("click", calculateVAT);
  }

  // Clear
  if (clearButton) {
    clearButton.addEventListener("click", clearVATHistory);
  }

  // Load history
  displayVATHistory();
});

// ========================================
// EXPORT
// ========================================

export { calculateVAT, clearVATHistory };
