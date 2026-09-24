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

function calculateAverage() {
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

  saveHistory(
    "Average Calculator",

    "Average: " +
      average.toFixed(2) +
      " | Sum: " +
      sum.toFixed(2) +
      " | Min: " +
      minimum.toFixed(2) +
      " | Max: " +
      maximum.toFixed(2),
  );

  displayHistory("historyContainer");
}

// ========================================
// CLEAR HISTORY
// ========================================

function clearAverageHistory() {
  const confirmClear = confirm(
    getAverageText(
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
