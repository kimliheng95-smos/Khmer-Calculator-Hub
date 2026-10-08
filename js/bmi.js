// ========================================
// BMI CALCULATOR
// ========================================

// ========================================
// GET TRANSLATION
// ========================================

function getBMIText(key, fallback) {
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
// CALCULATE BMI
// ========================================

async function calculateBMI() {
  // ========================================
  // GET VALUES
  // ========================================

  const weightInput = document.getElementById("weight");
  const heightInput = document.getElementById("height");

  if (!weightInput || !heightInput) {
    console.error("BMI input elements not found.");
    return;
  }

  const weight = Number(weightInput.value);
  const height = Number(heightInput.value);

  // ========================================
  // VALIDATION
  // ========================================

  if (weightInput.value === "" || heightInput.value === "") {
    alert(
      getBMIText("enterWeightHeight", "Please enter your weight and height."),
    );

    return;
  }

  if (weight <= 0 || height <= 0) {
    alert(
      getBMIText("validWeightHeight", "Please enter valid weight and height."),
    );

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
    category = getBMIText("underweight", "Underweight");

    message = getBMIText(
      "bmiUnderweightMessage",
      "Your BMI is below the normal range.",
    );
  } else if (bmi < 25) {
    category = getBMIText("normalWeight", "Normal Weight");

    message = getBMIText(
      "bmiNormalMessage",
      "Your BMI is within the normal range.",
    );
  } else if (bmi < 30) {
    category = getBMIText("overweight", "Overweight");

    message = getBMIText(
      "bmiOverweightMessage",
      "Your BMI is above the normal range.",
    );
  } else {
    category = getBMIText("obesity", "Obesity");

    message = getBMIText(
      "bmiObesityMessage",
      "Your BMI is in the obesity range.",
    );
  }

  // ========================================
  // DISPLAY RESULT
  // ========================================

  const resultBox = document.getElementById("bmiResult");
  const bmiValue = document.getElementById("bmiValue");
  const bmiCategory = document.getElementById("bmiCategory");
  const bmiMessage = document.getElementById("bmiMessage");

  if (resultBox) {
    resultBox.classList.remove("d-none");
  }

  if (bmiValue) {
    bmiValue.textContent = roundedBMI;
  }

  if (bmiCategory) {
    bmiCategory.textContent = category;
  }

  if (bmiMessage) {
    bmiMessage.textContent = message;
  }

  // ========================================
  // SAVE HISTORY TO MYSQL
  // ========================================

  if (typeof window.saveHistory === "function") {
    try {
      const historyResult = await window.saveHistory({
        calculatorType: "bmi",
        calculatorName: "BMI Calculator",
        data: { weight, height, bmi: typeof roundedBMI !== "undefined" ? roundedBMI : bmi, category },
        resultText: `BMI: ${typeof roundedBMI !== "undefined" ? roundedBMI : bmi} (${category})`,
      });
      if (!historyResult || !historyResult.success) {
        console.error("Failed to save BMI history:", historyResult);
      }
    } catch (error) {
      console.error("Failed to save BMI history:", error);
    }
  } else {
    console.error("saveHistory() is not available.");
  }

  // ========================================
  // REFRESH HISTORY
  // ========================================

  if (typeof window.displayHistory === "function") {
    await window.displayHistory("historyContainer");
  }
}

// ========================================
// CLEAR BMI HISTORY
// ========================================

async function clearBMIHistory() {
  const confirmClear = confirm(
    getBMIText(
      "confirmClearHistory",
      "Are you sure you want to clear all calculation history?",
    ),
  );

  if (!confirmClear) {
    return;
  }

  // ========================================
  // CLEAR HISTORY FROM MYSQL
  // ========================================

  if (typeof window.clearHistory === "function") {
    try {
      await window.clearHistory();
    } catch (error) {
      console.error("Failed to clear BMI history:", error);
      return;
    }
  }

  // ========================================
  // REFRESH HISTORY
  // ========================================

  if (typeof window.displayHistory === "function") {
    await window.displayHistory("historyContainer");
  }
}

// ========================================
// GLOBAL (onclick handlers)
// ========================================

window.calculateBMI = calculateBMI;
window.clearBMIHistory = clearBMIHistory;

// ========================================
// LOAD HISTORY
// ========================================

document.addEventListener("DOMContentLoaded", async function () {
  if (typeof window.displayHistory === "function") {
    await window.displayHistory("historyContainer");
  }
});
