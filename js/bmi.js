// ========================================
// BMI CALCULATOR
// ========================================

// ========================================
// GET TRANSLATION
// ========================================

function getBMIText(key, fallback) {
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

  if (typeof saveAuthHistoryItem === "function") {
    try {
      const historyResult = await saveAuthHistoryItem({
        calculator: "BMI Calculator",

        calculatorType: "bmi",

        data: {
          weight: weight,
          height: height,
          bmi: bmi,
          category: category,
        },

        result: `BMI: ${roundedBMI}`,
      });

      console.log("BMI history saved:", historyResult);
    } catch (error) {
      console.error("Failed to save BMI history:", error);
    }
  } else {
    console.error("saveAuthHistoryItem() is not available.");
  }

  // ========================================
  // REFRESH HISTORY
  // ========================================

  if (typeof displayHistory === "function") {
    await displayHistory("historyContainer");
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

  if (typeof clearAuthHistory === "function") {
    try {
      const result = await clearAuthHistory();

      console.log("BMI history cleared:", result);
    } catch (error) {
      console.error("Failed to clear BMI history:", error);

      alert(getBMIText("historyClearError", "Failed to clear history."));

      return;
    }
  } else {
    console.error("clearAuthHistory() is not available.");

    return;
  }

  // ========================================
  // REFRESH HISTORY
  // ========================================

  if (typeof displayHistory === "function") {
    await displayHistory("historyContainer");
  }
}

// ========================================
// LOAD HISTORY
// ========================================

document.addEventListener("DOMContentLoaded", async function () {
  if (typeof displayHistory === "function") {
    await displayHistory("historyContainer");
  }
});
