// ========================================
// DISCOUNT CALCULATOR
// ========================================

function calculateDiscount() {
  // Get values
  const price = Number(document.getElementById("price").value);

  const discount = Number(document.getElementById("discount").value);

  // Validate price
  if (price < 0) {
    alert("Please enter a valid price.");

    return;
  }

  // Validate discount
  if (discount < 0 || discount > 100) {
    alert("Discount must be between 0% and 100%.");

    return;
  }

  // Check empty input
  if (
    document.getElementById("price").value === "" ||
    document.getElementById("discount").value === ""
  ) {
    alert("Please enter price and discount.");

    return;
  }

  // Calculate saved amount
  const saved = (price * discount) / 100;

  // Calculate final price
  const finalPrice = price - saved;

  // Show result
  document.getElementById("discountResult").style.display = "block";

  document.getElementById("saved").textContent = "$" + saved.toFixed(2);

  document.getElementById("finalPrice").textContent =
    "$" + finalPrice.toFixed(2);

  // ========================================
  // SAVE HISTORY
  // ========================================

  saveHistory(
    "Discount Calculator",
    "Save: $" + saved.toFixed(2) + " | Final: $" + finalPrice.toFixed(2),
  );

  // Refresh history
  displayHistory("historyContainer");
}

// ========================================
// CLEAR DISCOUNT HISTORY
// ========================================

function clearDiscountHistory() {
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
