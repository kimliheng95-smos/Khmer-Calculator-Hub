// ========================================
// DISCOUNT CALCULATOR
// ========================================

// ========================================
// GET TRANSLATION
// ========================================

function getDiscountText(key, fallback) {
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
// CALCULATE DISCOUNT
// ========================================

function calculateDiscount() {
  // ========================================
  // GET INPUTS
  // ========================================

  const priceInput = document.getElementById("price");
  const discountInput = document.getElementById("discount");

  const price = Number(priceInput.value);
  const discount = Number(discountInput.value);

  // ========================================
  // CHECK EMPTY INPUT
  // ========================================

  if (priceInput.value === "" || discountInput.value === "") {
    alert(
      getDiscountText("enterPriceDiscount", "Please enter price and discount."),
    );

    return;
  }

  // ========================================
  // VALID NUMBER
  // ========================================

  if (!Number.isFinite(price) || !Number.isFinite(discount)) {
    alert(getDiscountText("validNumbers", "Please enter valid numbers."));

    return;
  }

  // ========================================
  // VALIDATE PRICE
  // ========================================

  if (price < 0) {
    alert(getDiscountText("validPrice", "Please enter a valid price."));

    return;
  }

  // ========================================
  // VALIDATE DISCOUNT
  // ========================================

  if (discount < 0 || discount > 100) {
    alert(
      getDiscountText("discountRange", "Discount must be between 0% and 100%."),
    );

    return;
  }

  // ========================================
  // CALCULATE SAVED AMOUNT
  // ========================================

  const saved = (price * discount) / 100;

  // ========================================
  // CALCULATE FINAL PRICE
  // ========================================

  const finalPrice = price - saved;

  // ========================================
  // SHOW RESULT
  // ========================================

  document.getElementById("discountResult").style.display = "block";

  document.getElementById("saved").textContent = "$" + saved.toFixed(2);

  document.getElementById("finalPrice").textContent =
    "$" + finalPrice.toFixed(2);

  // ========================================
  // SAVE TYPED HISTORY
  // ========================================

  const history = getHistory();

  const newCalculation = {
    id: Date.now(),

    calculator: "Discount Calculator",

    calculatorType: "discount",

    data: {
      price: price,
      discount: discount,
      saved: saved,
      finalPrice: finalPrice,
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
// CLEAR DISCOUNT HISTORY
// ========================================

function clearDiscountHistory() {
  const confirmClear = confirm(
    getDiscountText(
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
