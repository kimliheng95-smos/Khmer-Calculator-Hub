// ========================================
// AGE CALCULATOR
// ========================================

function calculateAge() {
  const birthDateInput = document.getElementById("birthDate").value;

  // Check empty date
  if (birthDateInput === "") {
    alert("Please enter your date of birth.");

    return;
  }

  const birthDate = new Date(birthDateInput);

  const today = new Date();

  // Check future date
  if (birthDate > today) {
    alert("Date of birth cannot be in the future.");

    return;
  }

  // ========================================
  // CALCULATE AGE
  // ========================================

  let years = today.getFullYear() - birthDate.getFullYear();

  let months = today.getMonth() - birthDate.getMonth();

  let days = today.getDate() - birthDate.getDate();

  // Fix negative days
  if (days < 0) {
    months--;

    const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);

    days += previousMonth.getDate();
  }

  // Fix negative months
  if (months < 0) {
    years--;

    months += 12;
  }

  // ========================================
  // DISPLAY RESULT
  // ========================================

  document.getElementById("ageResult").classList.remove("d-none");

  document.getElementById("years").textContent = years;

  document.getElementById("months").textContent = months;

  document.getElementById("days").textContent = days;

  document.getElementById("ageMessage").textContent =
    "You are " +
    years +
    " years, " +
    months +
    " months and " +
    days +
    " days old.";

  // ========================================
  // SAVE HISTORY
  // ========================================

  saveHistory(
    "Age Calculator",
    "Age: " + years + " years, " + months + " months, " + days + " days",
  );

  // Refresh history
  displayHistory("historyContainer");
}

// ========================================
// CLEAR AGE HISTORY
// ========================================

function clearAgeHistory() {
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
