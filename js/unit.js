// ========================================
// UNIT CONVERTER
// ========================================

// ========================================
// UNIT DATA
// ========================================

const unitData = {
  length: {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    inch: 0.0254,
    foot: 0.3048,
  },

  weight: {
    kilogram: 1,
    gram: 0.001,
    milligram: 0.000001,
    pound: 0.45359237,
  },

  area: {
    squareMeter: 1,
    squareKilometer: 1000000,
    squareCentimeter: 0.0001,
    squareFoot: 0.09290304,
  },

  temperature: {
    celsius: null,
    fahrenheit: null,
    kelvin: null,
  },
};

// ========================================
// UNIT NAMES
// ========================================

const unitNames = {
  length: {
    meter: "Meter",
    kilometer: "Kilometer",
    centimeter: "Centimeter",
    millimeter: "Millimeter",
    inch: "Inch",
    foot: "Foot",
  },

  weight: {
    kilogram: "Kilogram",
    gram: "Gram",
    milligram: "Milligram",
    pound: "Pound",
  },

  temperature: {
    celsius: "Celsius",
    fahrenheit: "Fahrenheit",
    kelvin: "Kelvin",
  },

  area: {
    squareMeter: "Square Meter",
    squareKilometer: "Square Kilometer",
    squareCentimeter: "Square Centimeter",
    squareFoot: "Square Foot",
  },
};

// ========================================
// TRANSLATION
// ========================================

const unitTranslationKeys = {
  meter: "meter",
  kilometer: "kilometer",
  centimeter: "centimeter",
  millimeter: "millimeter",
  inch: "inch",
  foot: "foot",

  kilogram: "kilogram",
  gram: "gram",
  milligram: "milligram",
  pound: "pound",

  celsius: "celsius",
  fahrenheit: "fahrenheit",
  kelvin: "kelvin",

  squareMeter: "squareMeter",
  squareKilometer: "squareKilometer",
  squareCentimeter: "squareCentimeter",
  squareFoot: "squareFoot",
};

function getLanguage() {
  return localStorage.getItem("language") || "en";
}

function getTranslation(key, fallback) {
  const language = getLanguage();

  // If language.js exposes translations
  if (
    window.translations &&
    window.translations[language] &&
    window.translations[language][key]
  ) {
    return window.translations[language][key];
  }

  return fallback;
}

function getUnitName(unit) {
  const key = unitTranslationKeys[unit];

  if (key) {
    return getTranslation(key, findEnglishUnitName(unit));
  }

  return unit;
}

function findEnglishUnitName(unit) {
  for (const type in unitNames) {
    if (unitNames[type][unit]) {
      return unitNames[type][unit];
    }
  }

  return unit;
}

// ========================================
// CHANGE DROPDOWN
// ========================================

function changeUnitType() {
  const unitType = document.getElementById("unitType");
  const fromUnit = document.getElementById("fromUnit");
  const toUnit = document.getElementById("toUnit");

  if (!unitType || !fromUnit || !toUnit) {
    return;
  }

  const type = unitType.value;

  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";

  const units = Object.keys(unitNames[type]);

  units.forEach((unit) => {
    const fromOption = document.createElement("option");

    fromOption.value = unit;
    fromOption.textContent = getUnitName(unit);

    fromUnit.appendChild(fromOption);

    const toOption = document.createElement("option");

    toOption.value = unit;
    toOption.textContent = getUnitName(unit);

    toUnit.appendChild(toOption);
  });

  // Default
  if (units.length > 1) {
    fromUnit.selectedIndex = 0;
    toUnit.selectedIndex = 1;
  }
}

// ========================================
// TEMPERATURE CONVERSION
// ========================================

function convertTemperature(value, from, to) {
  let celsius;

  // FROM → Celsius
  if (from === "celsius") {
    celsius = value;
  } else if (from === "fahrenheit") {
    celsius = ((value - 32) * 5) / 9;
  } else if (from === "kelvin") {
    celsius = value - 273.15;
  }

  // Celsius → TO
  if (to === "celsius") {
    return celsius;
  }

  if (to === "fahrenheit") {
    return (celsius * 9) / 5 + 32;
  }

  if (to === "kelvin") {
    return celsius + 273.15;
  }

  return celsius;
}

// ========================================
// SAVE HISTORY
// ========================================

function saveHistory(data) {
  const key = "unitHistory";

  let history = [];

  try {
    history = JSON.parse(localStorage.getItem(key)) || [];
  } catch (error) {
    history = [];
  }

  history.unshift(data);

  if (history.length > 20) {
    history = history.slice(0, 20);
  }

  localStorage.setItem(key, JSON.stringify(history));

  displayHistory();
}

// ========================================
// DISPLAY HISTORY
// ========================================

function displayHistory() {
  const container = document.getElementById("historyContainer");

  if (!container) {
    return;
  }

  let history = [];

  try {
    history = JSON.parse(localStorage.getItem("unitHistory")) || [];
  } catch (error) {
    history = [];
  }

  if (history.length === 0) {
    container.innerHTML = `
      <div class="text-center text-muted py-4">
        <i class="bi bi-clock-history fs-3"></i>
        <p class="mb-0 mt-2">
          ${getTranslation("noHistory", "No calculation history yet.")}
        </p>
      </div>
    `;

    return;
  }

  container.innerHTML = "";

  history.forEach((item) => {
    const historyItem = document.createElement("div");

    historyItem.className = "history-item p-3 rounded-3 mb-2";

    historyItem.innerHTML = `
      <div class="d-flex justify-content-between align-items-start gap-3">

        <div>
          <div class="history-calculator">
            ${item.value} ${item.fromName}
            =
            ${item.result} ${item.toName}
          </div>

          <div class="history-date text-muted mt-1">
            ${item.date}
          </div>
        </div>

        <div class="history-result">
          ${item.result}
        </div>

      </div>
    `;

    container.appendChild(historyItem);
  });
}

// ========================================
// CONVERT UNIT
// ========================================

function convertUnit() {
  const unitType = document.getElementById("unitType");
  const fromValue = document.getElementById("fromValue");
  const fromUnit = document.getElementById("fromUnit");
  const toUnit = document.getElementById("toUnit");

  if (!unitType || !fromValue || !fromUnit || !toUnit) {
    return;
  }

  const type = unitType.value;
  const inputValue = fromValue.value.trim();

  // ========================================
  // EMPTY
  // ========================================

  if (inputValue === "") {
    alert(getTranslation("enterValue", "Please enter a value."));

    fromValue.focus();
    return;
  }

  // ========================================
  // NUMBER
  // ========================================

  const value = Number(inputValue);

  if (!Number.isFinite(value)) {
    alert(getTranslation("validNumbers", "Please enter a valid number."));

    return;
  }

  const from = fromUnit.value;
  const to = toUnit.value;

  let result;

  // ========================================
  // TEMPERATURE
  // ========================================

  if (type === "temperature") {
    // Kelvin cannot be below absolute zero
    if (from === "kelvin" && value < 0) {
      alert(getTranslation("invalidValues", "Invalid temperature value."));

      return;
    }

    result = convertTemperature(value, from, to);
  }

  // ========================================
  // LENGTH / WEIGHT / AREA
  // ========================================
  else {
    const baseValue = value * unitData[type][from];

    result = baseValue / unitData[type][to];
  }

  // ========================================
  // CHECK RESULT
  // ========================================

  if (!Number.isFinite(result)) {
    alert(getTranslation("invalidValues", "Unable to convert this value."));

    return;
  }

  // ========================================
  // DISPLAY
  // ========================================

  const resultBox = document.getElementById("unitResult");

  const resultValue = document.getElementById("resultValue");

  const resultText = document.getElementById("resultText");

  resultBox.classList.remove("d-none");

  resultValue.textContent = result.toFixed(4);

  resultText.textContent = `${value} ${getUnitName(from)} = ${result.toFixed(
    4,
  )} ${getUnitName(to)}`;

  // ========================================
  // HISTORY
  // ========================================

  saveHistory({
    value: value,
    from: from,
    to: to,
    fromName: getUnitName(from),
    toName: getUnitName(to),
    result: result.toFixed(4),
    date: new Date().toLocaleString(getLanguage() === "kh" ? "km-KH" : "en-US"),
  });
}

// ========================================
// SWAP
// ========================================

function swapUnits() {
  const fromUnit = document.getElementById("fromUnit");

  const toUnit = document.getElementById("toUnit");

  if (!fromUnit || !toUnit) {
    return;
  }

  const temp = fromUnit.value;

  fromUnit.value = toUnit.value;
  toUnit.value = temp;

  // If result already exists, calculate again
  const fromValue = document.getElementById("fromValue");

  if (fromValue && fromValue.value.trim() !== "") {
    convertUnit();
  }
}

// ========================================
// CLEAR HISTORY
// ========================================

function clearUnitHistory() {
  const confirmClear = confirm(
    getTranslation(
      "confirmClearHistory",
      "Are you sure you want to clear all calculation history?",
    ),
  );

  if (!confirmClear) {
    return;
  }

  localStorage.removeItem("unitHistory");

  displayHistory();
}

// ========================================
// EVENTS
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  const unitType = document.getElementById("unitType");

  const swapButton = document.getElementById("swapUnitButton");

  const convertButton = document.getElementById("convertUnitButton");

  const clearButton = document.getElementById("clearUnitHistoryButton");

  // Unit type
  if (unitType) {
    unitType.addEventListener("change", changeUnitType);
  }

  // Swap
  if (swapButton) {
    swapButton.addEventListener("click", swapUnits);
  }

  // Convert
  if (convertButton) {
    convertButton.addEventListener("click", convertUnit);
  }

  // Clear
  if (clearButton) {
    clearButton.addEventListener("click", clearUnitHistory);
  }

  // Initialize dropdown
  changeUnitType();

  // Load history
  displayHistory();
});

// ========================================
// EXPORT
// ========================================

export { changeUnitType, convertUnit, swapUnits, clearUnitHistory };
