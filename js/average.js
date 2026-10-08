// ========================================
// AVERAGE CALCULATOR
// ========================================

// ========================================
// GET TRANSLATION
// ========================================

function getAverageText(key, fallback) {
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
// ADD NUMBER INPUT
// ========================================

function addNumberInput() {
  const container = document.getElementById("numberInputs");

  const row = document.createElement("div");

  row.className = "number-row";

  row.innerHTML = `
    <input
      type="number"
      class="form-control number-input"
      placeholder="${getAverageText("exampleNumber", "Example: 100")}"
      step="any"
    >

    <button
      type="button"
      class="btn btn-outline-danger remove-number"
    >
      <i class="bi bi-trash"></i>
    </button>
  `;

  container.appendChild(row);

  updateRemoveButtons();
}

// ========================================
// UPDATE REMOVE BUTTONS
// ========================================

function updateRemoveButtons() {
  const rows = document.querySelectorAll(".number-row");

  const buttons = document.querySelectorAll(".remove-number");

  if (rows.length === 1) {
    buttons[0].disabled = true;
  } else {
    buttons.forEach(function (button) {
      button.disabled = false;
    });
  }
}

// ========================================
// REMOVE NUMBER
// ========================================

function removeNumberInput(button) {
  const row = button.closest(".number-row");

  if (!row) {
    return;
  }

  const rows = document.querySelectorAll(".number-row");

  // Keep at least one input
  if (rows.length <= 1) {
    return;
  }

  row.remove();

  updateRemoveButtons();
}

// ========================================
// CALCULATE
// ========================================

async function calculateAverage() {
  const inputs = document.querySelectorAll(".number-input");

  const numbers = [];

  // ========================================
  // GET NUMBERS
  // ========================================

  inputs.forEach(function (input) {
    const value = input.value.trim();

    if (value !== "") {
      numbers.push(Number(value));
    }
  });

  // ========================================
  // EMPTY CHECK
  // ========================================

  if (numbers.length === 0) {
    alert(
      getAverageText(
        "enterAtLeastOneNumber",
        "Please enter at least one number.",
      ),
    );

    return;
  }

  // ========================================
  // VALID NUMBER CHECK
  // ========================================

  const invalidNumber = numbers.some(function (number) {
    return isNaN(number);
  });

  if (invalidNumber) {
    alert(getAverageText("validNumbers", "Please enter valid numbers."));

    return;
  }

  // ========================================
  // SUM
  // ========================================

  const sum = numbers.reduce(function (total, number) {
    return total + number;
  }, 0);

  // ========================================
  // AVERAGE
  // ========================================

  const average = sum / numbers.length;

  // ========================================
  // MINIMUM
  // ========================================

  const minimum = Math.min(...numbers);

  // ========================================
  // MAXIMUM
  // ========================================

  const maximum = Math.max(...numbers);

  // ========================================
  // SHOW RESULT
  // ========================================

  document.getElementById("averageResult").classList.remove("d-none");

  document.getElementById("sumValue").textContent = sum.toFixed(2);

  document.getElementById("averageValue").textContent = average.toFixed(2);

  document.getElementById("minimumValue").textContent = minimum.toFixed(2);

  document.getElementById("maximumValue").textContent = maximum.toFixed(2);

  // ========================================
  // RESULT TEXT
  // ========================================

  document.getElementById("resultText").textContent =
    getAverageText("averageOfNumbers", "Average of") +
    " " +
    numbers.length +
    " " +
    getAverageText("numbers", "numbers") +
    " = " +
    average.toFixed(2);

  // ========================================
  // HISTORY
  // ========================================

  // ========================================
  // SAVE HISTORY (Firestore if logged in)
  // ========================================

  if (typeof window.saveHistory === "function") {
    try {
      await window.saveHistory({
        calculatorType: "average",
        calculatorName: "Average Calculator",
        data: { average: typeof average !== 'undefined' ? average : 0 },
        resultText: `Average: ${average}`,
      });
    } catch (err) {
      console.error("Average Calculator saveHistory error:", err);
    }
  } else {
    console.error("saveHistory is not available on window");
  }

  if (typeof window.displayHistory === "function") {
    await window.displayHistory("historyContainer");
  }


  displayHistory("historyContainer");
}

// ========================================
// CLEAR HISTORY
// ========================================

async function clearAverageHistory() {
  const confirmClear = confirm(
    getAverageText(
      "confirmClearHistory",
      "Are you sure you want to clear all calculation history?",
    ),
  );

  if (!confirmClear) {
    return;
  }

  if (typeof window.clearHistory === "function") await window.clearHistory();

  displayHistory("historyContainer");
}

// ========================================
// PAGE LOAD
// ========================================

document.addEventListener("DOMContentLoaded", async function () {
  // ========================================
  // ADD BUTTON
  // ========================================

  const addButton = document.getElementById("addNumberButton");

  if (addButton) {
    addButton.addEventListener("click", addNumberInput);
  }

  // ========================================
  // CALCULATE BUTTON
  // ========================================

  const calculateButton = document.getElementById("calculateAverageButton");

  if (calculateButton) {
    calculateButton.addEventListener("click", calculateAverage);
  }

  // ========================================
  // CLEAR HISTORY
  // ========================================

  const clearButton = document.getElementById("clearAverageHistoryButton");

  if (clearButton) {
    clearButton.addEventListener("click", clearAverageHistory);
  }

  // ========================================
  // REMOVE NUMBER
  // ========================================

  document.addEventListener("click", function (event) {
    const button = event.target.closest(".remove-number");

    if (button) {
      removeNumberInput(button);
    }
  });

  // ========================================
  // INITIAL STATE
  // ========================================

  updateRemoveButtons();

  displayHistory("historyContainer");
});

window.calculateAverage = calculateAverage;

window.clearAverageHistory = clearAverageHistory;
