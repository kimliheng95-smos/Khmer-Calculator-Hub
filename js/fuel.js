function getFuelText(key) {
  if (typeof currentLanguage !== "undefined" && currentLanguage === "kh") {
    return translations.kh[key] || key;
  }

  return translations.en[key] || key;
}

function calculateFuel() {
  const distance = parseFloat(document.getElementById("distance").value);

  const fuelConsumption = parseFloat(
    document.getElementById("fuelConsumption").value,
  );

  const fuelPrice = parseFloat(document.getElementById("fuelPrice").value);

  // Validation
  if (
    isNaN(distance) ||
    isNaN(fuelConsumption) ||
    isNaN(fuelPrice) ||
    distance <= 0 ||
    fuelConsumption <= 0 ||
    fuelPrice < 0
  ) {
    alert(getFuelText("invalidFuelValues"));

    return;
  }

  // Calculate fuel used
  const fuelUsed = (distance * fuelConsumption) / 100;

  // Calculate total fuel cost
  const totalFuelCost = fuelUsed * fuelPrice;

  // Calculate cost per kilometer
  const costPerKm = totalFuelCost / distance;

  // Display result
  document.getElementById("fuelUsed").textContent = fuelUsed.toFixed(2) + " L";

  document.getElementById("totalFuelCost").textContent =
    "$" + totalFuelCost.toFixed(2);

  document.getElementById("costPerKm").textContent = "$" + costPerKm.toFixed(2);

  document.getElementById("fuelResult").classList.remove("d-none");

  // Save history
  saveHistory(
    getFuelText("fuelCalculator"),
    getFuelText("fuelUsed") +
      ": " +
      fuelUsed.toFixed(2) +
      " L | " +
      getFuelText("totalFuelCost") +
      ": $" +
      totalFuelCost.toFixed(2),
  );

  displayHistory("historyContainer");
}

// Clear history
function clearFuelHistory() {
  const confirmed = confirm(getFuelText("confirmClearHistory"));

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
