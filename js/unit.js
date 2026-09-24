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
    squareFoot: 0.092903,
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
// CHANGE UNIT TYPE
// ========================================

function changeUnitType() {
  const type = document.getElementById("unitType").value;

  const fromUnit = document.getElementById("fromUnit");

  const toUnit = document.getElementById("toUnit");

  // Clear old options

  fromUnit.innerHTML = "";

  toUnit.innerHTML = "";

  const units = Object.keys(unitNames[type]);

  // Add options

  units.forEach(function (unit) {
    const fromOption = document.createElement("option");

    fromOption.value = unit;

    fromOption.textContent = unitNames[type][unit];

    fromUnit.appendChild(fromOption);

    const toOption = document.createElement("option");

    toOption.value = unit;

    toOption.textContent = unitNames[type][unit];

    toUnit.appendChild(toOption);
  });

  // Select different default units

  if (units.length > 1) {
    toUnit.selectedIndex = 1;
  }
}

// ========================================
// CONVERT TEMPERATURE
// ========================================

function convertTemperature(value, from, to) {
  let celsius;

  // Convert to Celsius

  if (from === "celsius") {
    celsius = value;
  } else if (from === "fahrenheit") {
    celsius = ((value - 32) * 5) / 9;
  } else if (from === "kelvin") {
    celsius = value - 273.15;
  }

  // Celsius to target

  if (to === "celsius") {
    return celsius;
  } else if (to === "fahrenheit") {
    return (celsius * 9) / 5 + 32;
  } else if (to === "kelvin") {
    return celsius + 273.15;
  }
}

// ========================================
// CONVERT UNIT
// ========================================

function convertUnit() {
  const type = document.getElementById("unitType").value;

  const valueInput = document.getElementById("fromValue").value;

  const from = document.getElementById("fromUnit").value;

  const to = document.getElementById("toUnit").value;

  // Check empty

  if (valueInput === "") {
    alert("Please enter a value.");

    return;
  }

  const value = Number(valueInput);

  let result;

  // ========================================
  // TEMPERATURE
  // ========================================

  if (type === "temperature") {
    result = convertTemperature(value, from, to);
  }

  // ========================================
  // OTHER UNITS
  // ========================================
  else {
    const baseValue = value * unitData[type][from];

    result = baseValue / unitData[type][to];
  }

  // ========================================
  // DISPLAY RESULT
  // ========================================

  document.getElementById("unitResult").classList.remove("d-none");

  document.getElementById("resultValue").textContent = result.toFixed(4);

  document.getElementById("resultText").textContent =
    value +
    " " +
    unitNames[type][from] +
    " = " +
    result.toFixed(4) +
    " " +
    unitNames[type][to];

  // ========================================
  // SAVE HISTORY
  // ========================================

  saveHistory(
    "Unit Converter",

    value +
      " " +
      unitNames[type][from] +
      " = " +
      result.toFixed(4) +
      " " +
      unitNames[type][to],
  );

  // Refresh History

  displayHistory("historyContainer");
}

// ========================================
// SWAP UNITS
// ========================================

function swapUnits() {
  const fromUnit = document.getElementById("fromUnit");

  const toUnit = document.getElementById("toUnit");

  const temp = fromUnit.value;

  fromUnit.value = toUnit.value;

  toUnit.value = temp;
}

// ========================================
// CLEAR UNIT HISTORY
// ========================================

function clearUnitHistory() {
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
// INITIALIZE
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  changeUnitType();

  displayHistory("historyContainer");
});
