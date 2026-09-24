// ========================================
// BMI CALCULATOR
// ========================================

function calculateBMI() {
  // Get values
  const weight = Number(document.getElementById("weight").value);

  const height = Number(document.getElementById("height").value);

  // ========================================
  // VALIDATION
  // ========================================

  if (
    document.getElementById("weight").value === "" ||
    document.getElementById("height").value === ""
  ) {
    alert("Please enter your weight and height.");

    return;
  }

  if (weight <= 0 || height <= 0) {
    alert("Please enter valid weight and height.");

    return;
  }

  // ========================================
  // CONVERT HEIGHT
  // ========================================

  // cm → meter
  const heightMeter = height / 100;

  // ========================================
  // CALCULATE BMI
  // ========================================

  const bmi = weight / (heightMeter * heightMeter);

  const roundedBMI = bmi.toFixed(2);

  // ========================================
  // DETERMINE CATEGORY
  // ========================================

  let category;
  let message;

  if (bmi < 18.5) {
    category = "Underweight";

    message = "Your BMI is below the normal range.";
  } else if (bmi < 25) {
    category = "Normal Weight";

    message = "Your BMI is within the normal range.";
  } else if (bmi < 30) {
    category = "Overweight";

    message = "Your BMI is above the normal range.";
  } else {
    category = "Obesity";

    message = "Your BMI is in the obesity range.";
  }

  // ========================================
  // DISPLAY RESULT
  // ========================================

  document.getElementById("bmiResult").classList.remove("d-none");

  document.getElementById("bmiValue").textContent = roundedBMI;

  document.getElementById("bmiCategory").textContent = category;

  document.getElementById("bmiMessage").textContent = message;

  // ========================================
  // SAVE HISTORY
  // ========================================

  saveHistory("BMI Calculator", "BMI: " + roundedBMI + " | " + category);

  // Refresh history
  displayHistory("historyContainer");
}

// ========================================
// CLEAR BMI HISTORY
// ========================================

function clearBMIHistory() {
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
