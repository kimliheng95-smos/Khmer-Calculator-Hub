// ========================================
// PERCENTAGE CALCULATOR
// ========================================

// ========================================
// GET TRANSLATION
// ========================================

function getPercentageText(key, fallback) {
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
// CHANGE CALCULATION TYPE
// ========================================

function changePercentageType() {
  const type = document.getElementById("percentageType").value;

  const labelOne = document.getElementById("labelOne");

  const labelTwo = document.getElementById("labelTwo");

  const valueOne = document.getElementById("valueOne");

  const valueTwo = document.getElementById("valueTwo");

  // X% OF Y
  if (type === "percentOf") {
    labelOne.textContent = getPercentageText("percentage", "Percentage");

    labelTwo.textContent = getPercentageText("number", "Number");

    valueOne.placeholder = getPercentageText("example20", "Example: 20");

    valueTwo.placeholder = getPercentageText("example500", "Example: 500");
  }

  // X IS WHAT % OF Y
  else if (type === "whatPercent") {
    labelOne.textContent = getPercentageText("value", "Value");

    labelTwo.textContent = getPercentageText("total", "Total");

    valueOne.placeholder = getPercentageText("example50", "Example: 50");

    valueTwo.placeholder = getPercentageText("example200", "Example: 200");
  }

  // PERCENTAGE INCREASE
  else if (type === "increase") {
    labelOne.textContent = getPercentageText("originalValue", "Original Value");

    labelTwo.textContent = getPercentageText("newValue", "New Value");

    valueOne.placeholder = getPercentageText("example100", "Example: 100");

    valueTwo.placeholder = getPercentageText("example120", "Example: 120");
  }

  // PERCENTAGE DECREASE
  else if (type === "decrease") {
    labelOne.textContent = getPercentageText("originalValue", "Original Value");

    labelTwo.textContent = getPercentageText("newValue", "New Value");

    valueOne.placeholder = getPercentageText("example100", "Example: 100");

    valueTwo.placeholder = getPercentageText("example80", "Example: 80");
  }
}

// ========================================
// CALCULATE
// ========================================

function calculatePercentage() {
  const type = document.getElementById("percentageType").value;

  const valueOneInput = document.getElementById("valueOne").value;

  const valueTwoInput = document.getElementById("valueTwo").value;

  // ========================================
  // CHECK EMPTY
  // ========================================

  if (valueOneInput === "" || valueTwoInput === "") {
    alert(getPercentageText("enterBothValues", "Please enter both values."));

    return;
  }

  const valueOne = Number(valueOneInput);

  const valueTwo = Number(valueTwoInput);

  // ========================================
  // CHECK VALID NUMBER
  // ========================================

  if (isNaN(valueOne) || isNaN(valueTwo)) {
    alert(getPercentageText("validNumbers", "Please enter valid numbers."));

    return;
  }

  let result;
  let resultText;
  let historyText;

  // ========================================
  // X% OF Y
  // ========================================

  if (type === "percentOf") {
    result = (valueOne / 100) * valueTwo;

    resultText = valueOne + "% of " + valueTwo + " = " + result.toFixed(2);

    historyText = valueOne + "% of " + valueTwo + " = " + result.toFixed(2);
  }

  // ========================================
  // X IS WHAT % OF Y
  // ========================================
  else if (type === "whatPercent") {
    if (valueTwo === 0) {
      alert(getPercentageText("totalZero", "Total cannot be zero."));

      return;
    }

    result = (valueOne / valueTwo) * 100;

    resultText = valueOne + " is " + result.toFixed(2) + "% of " + valueTwo;

    historyText = valueOne + " is " + result.toFixed(2) + "% of " + valueTwo;
  }

  // ========================================
  // PERCENTAGE INCREASE
  // ========================================
  else if (type === "increase") {
    if (valueOne === 0) {
      alert(
        getPercentageText("originalZero", "Original value cannot be zero."),
      );

      return;
    }

    result = ((valueTwo - valueOne) / valueOne) * 100;

    resultText =
      getPercentageText("increaseResult", "Increase") +
      " = " +
      result.toFixed(2) +
      "%";

    historyText =
      valueOne + " → " + valueTwo + " = " + result.toFixed(2) + "% increase";
  }

  // ========================================
  // PERCENTAGE DECREASE
  // ========================================
  else if (type === "decrease") {
    if (valueOne === 0) {
      alert(
        getPercentageText("originalZero", "Original value cannot be zero."),
      );

      return;
    }

    result = ((valueOne - valueTwo) / valueOne) * 100;

    resultText =
      getPercentageText("decreaseResult", "Decrease") +
      " = " +
      result.toFixed(2) +
      "%";

    historyText =
      valueOne + " → " + valueTwo + " = " + result.toFixed(2) + "% decrease";
  }

  // ========================================
  // SHOW RESULT
  // ========================================

  document.getElementById("percentageResult").classList.remove("d-none");

  document.getElementById("resultValue").textContent = result.toFixed(2);

  document.getElementById("resultText").textContent = resultText;

  // ========================================
  // SAVE HISTORY
  // ========================================

  saveHistory("Percentage Calculator", historyText);

  // ========================================
  // REFRESH HISTORY
  // ========================================

  displayHistory("historyContainer");
}

// ========================================
// CLEAR HISTORY
// ========================================

function clearPercentageHistory() {
  const confirmClear = confirm(
    getPercentageText(
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
// PAGE LOAD
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  changePercentageType();

  displayHistory("historyContainer");
});
