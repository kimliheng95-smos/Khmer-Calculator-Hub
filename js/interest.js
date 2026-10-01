// ========================================
// INTEREST CALCULATOR
// ========================================

// ========================================
// GET TRANSLATION
// ========================================

function getInterestText(key, fallback) {
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
// CHANGE INTEREST TYPE
// ========================================

function changeInterestType() {
  const interestType = document.getElementById("interestType");

  const frequencyBox = document.getElementById("compoundFrequencyBox");

  if (!interestType || !frequencyBox) {
    return;
  }

  if (interestType.value === "compound") {
    frequencyBox.classList.remove("d-none");
  } else {
    frequencyBox.classList.add("d-none");
  }
}

// ========================================
// CALCULATE INTEREST
// ========================================

function calculateInterest() {
  // ========================================
  // GET INPUT VALUES
  // ========================================

  const principalInput = document.getElementById("principal");

  const rateInput = document.getElementById("interestRate");

  const timeInput = document.getElementById("interestTime");

  const type = document.getElementById("interestType").value;

  const principalValue = principalInput.value.trim();

  const rateValue = rateInput.value.trim();

  const timeValue = timeInput.value.trim();

  // ========================================
  // CHECK EMPTY
  // ========================================

  if (principalValue === "" || rateValue === "" || timeValue === "") {
    alert(getInterestText("enterAllValues", "Please enter all values."));

    return;
  }

  // ========================================
  // CONVERT TO NUMBER
  // ========================================

  const principal = Number(principalValue);
  const rate = Number(rateValue);
  const time = Number(timeValue);

  // ========================================
  // CHECK NUMBER
  // ========================================

  if (
    !Number.isFinite(principal) ||
    !Number.isFinite(rate) ||
    !Number.isFinite(time)
  ) {
    alert(getInterestText("validNumbers", "Please enter valid numbers."));

    return;
  }

  // ========================================
  // CHECK VALUE
  // ========================================

  if (principal <= 0 || rate < 0 || time <= 0) {
    alert(
      getInterestText(
        "invalidInterestValues",
        "Please enter valid interest values.",
      ),
    );

    return;
  }

  // ========================================
  // VARIABLES
  // ========================================

  let interest = 0;
  let totalAmount = 0;
  let frequency = 1;

  // ========================================
  // SIMPLE INTEREST
  // ========================================

  if (type === "simple") {
    /*
      Simple Interest:

      I = P × R × T

      P = Principal
      R = Rate / 100
      T = Time
    */

    interest = principal * (rate / 100) * time;

    totalAmount = principal + interest;
  }

  // ========================================
  // COMPOUND INTEREST
  // ========================================
  else {
    frequency = Number(document.getElementById("compoundFrequency").value);

    if (!Number.isFinite(frequency) || frequency <= 0) {
      alert(
        getInterestText(
          "validFrequency",
          "Please select a valid compound frequency.",
        ),
      );

      return;
    }

    /*
      Compound Interest:

      A = P(1 + r/n)^(nt)

      P = Principal
      r = Rate / 100
      n = Frequency
      t = Time
    */

    totalAmount =
      principal * Math.pow(1 + rate / 100 / frequency, frequency * time);

    interest = totalAmount - principal;
  }

  // ========================================
  // SHOW RESULT
  // ========================================

  document.getElementById("interestResult").classList.remove("d-none");

  // ========================================
  // DISPLAY INTEREST
  // ========================================

  document.getElementById("interestValue").textContent =
    "$" + interest.toFixed(2);

  // ========================================
  // DISPLAY TOTAL
  // ========================================

  document.getElementById("totalAmount").textContent =
    "$" + totalAmount.toFixed(2);

  // ========================================
  // RESULT TEXT
  // ========================================

  document.getElementById("interestResultText").textContent =
    getInterestText("interestEarned", "Interest") + ": $" + interest.toFixed(2);

  // ========================================
  // HISTORY TYPE NAME
  // ========================================

  let typeName;

  if (type === "simple") {
    typeName = "Simple Interest";
  } else {
    typeName = "Compound Interest";
  }

  // ========================================
  // SAVE TYPED HISTORY
  // ========================================

  const history = getHistory();

  const newCalculation = {
    id: Date.now(),

    calculator: "Interest Calculator",

    calculatorType: "interest",

    data: {
      type: type,
      typeName: typeName,
      principal: principal,
      rate: rate,
      time: time,
      frequency: frequency,
      interest: interest,
      totalAmount: totalAmount,
    },

    date: new Date().toLocaleString(),
  };

  history.unshift(newCalculation);

  // Keep latest 20
  if (history.length > 20) {
    history.pop();
  }

  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));

  // ========================================
  // DISPLAY HISTORY
  // ========================================

  displayHistory("historyContainer");
}

// ========================================
// CLEAR HISTORY
// ========================================

function clearInterestHistory() {
  const confirmClear = confirm(
    getInterestText(
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
  // INTEREST TYPE
  // ========================================

  const interestType = document.getElementById("interestType");

  if (interestType) {
    interestType.addEventListener("change", changeInterestType);
  }

  // ========================================
  // CALCULATE BUTTON
  // ========================================

  const calculateButton = document.getElementById("calculateInterestButton");

  if (calculateButton) {
    calculateButton.addEventListener("click", calculateInterest);
  }

  // ========================================
  // CLEAR HISTORY BUTTON
  // ========================================

  const clearButton = document.getElementById("clearInterestHistoryButton");

  if (clearButton) {
    clearButton.addEventListener("click", clearInterestHistory);
  }

  // ========================================
  // INITIAL STATE
  // ========================================

  changeInterestType();

  // ========================================
  // LOAD HISTORY
  // ========================================

  displayHistory("historyContainer");
});
