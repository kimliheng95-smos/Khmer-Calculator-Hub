// ========================================
// DISCOUNT CALCULATOR
// ========================================

// ========================================
// GET TRANSLATION
// ========================================

function getDiscountText(key, fallback) {
  const lang =
    typeof window.currentLanguage !== "undefined"
      ? window.currentLanguage
      : "en";
  const t = window.translations;
  if (t && t[lang] && t[lang][key]) {
    return t[lang][key];
  }
  return fallback;
}

// ========================================
// CALCULATE DISCOUNT
// ========================================

async function calculateDiscount() {
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
  // ========================================
  // SAVE HISTORY (Firestore if logged in)
  // ========================================

  if (typeof window.saveHistory === "function") {
    try {
      await window.saveHistory({
        calculatorType: "discount",
        calculatorName: "Discount Calculator",
        data: { price, discount, saved, finalPrice },
        resultText: `Final: $${finalPrice.toFixed(2)}`,
      });
    } catch (err) {
      console.error("Discount Calculator saveHistory error:", err);
    }
  } else {
    console.error("saveHistory is not available on window");
  }

  if (typeof window.displayHistory === "function") {
    await window.displayHistory("historyContainer");
  }
}

// ========================================
// CLEAR DISCOUNT HISTORY
// ========================================

async function clearDiscountHistory() {
  const confirmClear = confirm(
    getDiscountText(
      "confirmClearHistory",
      "Are you sure you want to clear all calculation history?",
    ),
  );

  if (!confirmClear) {
    return;
  }

  const HISTORY_KEY = window.HISTORY_KEY || "calculatorHistory";
  localStorage.removeItem(HISTORY_KEY);
  if (typeof window.clearHistory === "function") {
    window.clearHistory();
  }
  if (typeof window.displayHistory === "function") {
    window.displayHistory("historyContainer");
  }
}

// ========================================
// GLOBAL
// ========================================

window.calculateDiscount = calculateDiscount;
window.clearDiscountHistory = clearDiscountHistory;

// ========================================
// LOAD HISTORY + BIND BUTTONS
// ========================================

document.addEventListener("DOMContentLoaded", async function () {
  const calcBtn = document.getElementById("calculateDiscountButton");
  if (calcBtn) calcBtn.addEventListener("click", calculateDiscount);

  const clearBtn = document.getElementById("clearDiscountHistoryButton");
  if (clearBtn) clearBtn.addEventListener("click", clearDiscountHistory);

  if (typeof window.displayHistory === "function") {
    window.displayHistory("historyContainer");
  }
});
