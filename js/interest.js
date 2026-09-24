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
  const principalInput = document.getElementById("principal").value.trim();

  const rateInput = document.getElementById("interestRate").value.trim();

  const timeInput = document.getElementById("interestTime").value.trim();

  const type = document.getElementById("interestType").value;

  // ========================================
  // CHECK EMPTY
  // ========================================

  if (principalInput === "" || rateInput === "" || timeInput === "") {
    alert(getInterestText("enterAllValues", "Please enter all values."));

    return;
  }

  // ========================================
  // CONVERT TO NUMBER
  // ========================================

  const principal = Number(principalInput);

  const rate = Number(rateInput);

  const time = Number(timeInput);

  // ========================================
  // CHECK NUMBER
  // ========================================

  if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
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

  let interest = 0;

  let totalAmount = 0;

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
    const frequency = Number(
      document.getElementById("compoundFrequency").value,
    );

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
  // HISTORY NAME
  // ========================================

  let typeName;

  if (type === "simple") {
    typeName = "Simple Interest";
  } else {
    typeName = "Compound Interest";
  }

  // ========================================
  // SAVE HISTORY
  // ========================================

  saveHistory(
    "Interest Calculator",

    typeName +
      " | Principal: $" +
      principal.toFixed(2) +
      " | Rate: " +
      rate.toFixed(2) +
      "%" +
      " | Time: " +
      time +
      " years" +
      " | Interest: $" +
      interest.toFixed(2) +
      " | Total: $" +
      totalAmount.toFixed(2),
  );

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
