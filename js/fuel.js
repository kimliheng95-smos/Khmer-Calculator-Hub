function getFuelText(key) {
  if (typeof currentLanguage !== "undefined" && currentLanguage === "kh") {
    return translations.kh[key] || key;
  }

  return translations.en[key] || key;
}

async function calculateFuel() {
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

  // ========================================
  // ========================================
  // SAVE HISTORY (Firestore if logged in)
  // ========================================

  if (typeof window.saveHistory === "function") {
    try {
      await window.saveHistory({
        calculatorType: "fuel",
        calculatorName: "Fuel Cost Calculator",
        data: { distance, fuelConsumption, fuelPrice, fuelUsed, totalFuelCost, costPerKm },
        resultText: `Fuel cost: ${totalFuelCost}`,
      });
    } catch (err) {
      console.error("Fuel Cost Calculator saveHistory error:", err);
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
async function clearFuelHistory() {
  const confirmed = confirm(getFuelText("confirmClearHistory"));

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

// GLOBAL
window.calculateFuel = calculateFuel;
window.clearFuelHistory = clearFuelHistory;

document.addEventListener("DOMContentLoaded", async function () {
  const calcBtn = document.getElementById("calculateFuelButton");
  if (calcBtn) calcBtn.addEventListener("click", calculateFuel);
  const clearBtn = document.getElementById("clearFuelHistoryButton");
  if (clearBtn) clearBtn.addEventListener("click", clearFuelHistory);
  
  if (typeof window.displayHistory === "function") window.displayHistory("historyContainer");
});
