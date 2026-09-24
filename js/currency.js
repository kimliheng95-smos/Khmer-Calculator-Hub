// ========================================
// CURRENCY CONVERTER
// ========================================

// Sample exchange rates based on USD
const currencyRates = {
  USD: 1,
  KHR: 4000,
  THB: 32,
  VND: 25000,
  JPY: 150,
  EUR: 0.85,
};

// Currency names
const currencyNames = {
  USD: "US Dollar",
  KHR: "Cambodian Riel",
  THB: "Thai Baht",
  VND: "Vietnamese Dong",
  JPY: "Japanese Yen",
  EUR: "Euro",
};

// ========================================
// LOAD CURRENCIES
// ========================================

function loadCurrencies() {
  const fromCurrency = document.getElementById("fromCurrency");

  const toCurrency = document.getElementById("toCurrency");

  fromCurrency.innerHTML = "";
  toCurrency.innerHTML = "";

  Object.keys(currencyRates).forEach(function (currency) {
    const fromOption = document.createElement("option");

    fromOption.value = currency;
    fromOption.textContent = currency + " - " + currencyNames[currency];

    fromCurrency.appendChild(fromOption);

    const toOption = document.createElement("option");

    toOption.value = currency;
    toOption.textContent = currency + " - " + currencyNames[currency];

    toCurrency.appendChild(toOption);
  });

  // Default
  fromCurrency.value = "USD";
  toCurrency.value = "KHR";
}

// ========================================
// CONVERT CURRENCY
// ========================================

function convertCurrency() {
  const amountInput = document.getElementById("amount").value;

  const from = document.getElementById("fromCurrency").value;

  const to = document.getElementById("toCurrency").value;

  // Check empty
  if (amountInput === "") {
    alert("Please enter an amount.");

    return;
  }

  const amount = Number(amountInput);

  // Check valid number
  if (amount < 0 || isNaN(amount)) {
    alert("Please enter a valid amount.");

    return;
  }

  // Convert to USD first
  const usdAmount = amount / currencyRates[from];

  // Convert USD to target currency
  const result = usdAmount * currencyRates[to];

  // Show result
  document.getElementById("currencyResult").classList.remove("d-none");

  document.getElementById("resultValue").textContent = result.toFixed(2);

  document.getElementById("resultText").textContent =
    amount.toFixed(2) + " " + from + " = " + result.toFixed(2) + " " + to;

  // ========================================
  // SAVE HISTORY
  // ========================================

  saveHistory(
    "Currency Converter",
    amount.toFixed(2) + " " + from + " = " + result.toFixed(2) + " " + to,
  );

  // Refresh history
  displayHistory("historyContainer");
}

// ========================================
// SWAP CURRENCY
// ========================================

function swapCurrency() {
  const fromCurrency = document.getElementById("fromCurrency");

  const toCurrency = document.getElementById("toCurrency");

  const temp = fromCurrency.value;

  fromCurrency.value = toCurrency.value;

  toCurrency.value = temp;
}

// ========================================
// CLEAR CURRENCY HISTORY
// ========================================

function clearCurrencyHistory() {
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
// PAGE LOAD
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  loadCurrencies();

  displayHistory("historyContainer");
});
