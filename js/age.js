// ========================================
// AGE CALCULATOR
// ========================================

async function calculateAge() {
  const birthDateInput = document.getElementById("birthDate").value;

  const language =
    typeof window.currentLanguage !== "undefined"
      ? window.currentLanguage
      : "en";

  // ========================================
  // CHECK EMPTY DATE
  // ========================================

  if (birthDateInput === "") {
    alert(
      language === "kh"
        ? "សូមបញ្ចូលថ្ងៃខែឆ្នាំកំណើតរបស់អ្នក។"
        : "Please enter your date of birth.",
    );

    return;
  }

  // ========================================
  // CREATE CALENDAR DATE
  // ========================================

  const parts = birthDateInput.split("-");

  const birthYear = Number(parts[0]);
  const birthMonth = Number(parts[1]);
  const birthDay = Number(parts[2]);

  const birthDate = new Date(birthYear, birthMonth - 1, birthDay);

  // ========================================
  // GET TODAY
  // ========================================

  const today = new Date();

  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();

  // ========================================
  // CHECK FUTURE DATE
  // ========================================

  const birthDateNumber = birthYear * 10000 + birthMonth * 100 + birthDay;

  const todayNumber = todayYear * 10000 + (todayMonth + 1) * 100 + todayDay;

  if (birthDateNumber > todayNumber) {
    alert(
      language === "kh"
        ? "ថ្ងៃខែឆ្នាំកំណើតមិនអាចជាកាលបរិច្ឆេទនៅថ្ងៃអនាគតបានទេ។"
        : "Date of birth cannot be in the future.",
    );

    return;
  }

  // ========================================
  // CALCULATE AGE
  // ========================================

  let years = todayYear - birthDate.getFullYear();

  let months = todayMonth - birthDate.getMonth();

  let days = todayDay - birthDate.getDate();

  // ========================================
  // FIX NEGATIVE DAYS
  // ========================================

  if (days < 0) {
    months--;

    const previousMonth = new Date(todayYear, todayMonth, 0);

    days += previousMonth.getDate();
  }

  // ========================================
  // FIX NEGATIVE MONTHS
  // ========================================

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

  // ========================================
  // RESULT MESSAGE
  // ========================================

  if (language === "kh") {
    document.getElementById("ageMessage").textContent =
      `អ្នកមានអាយុ ${years} ឆ្នាំ ${months} ខែ និង ${days} ថ្ងៃ។`;
  } else {
    document.getElementById("ageMessage").textContent =
      `You are ${years} years, ${months} months and ${days} days old.`;
  }

  // ========================================
  // ========================================
  // SAVE HISTORY (Firestore if logged in)
  // ========================================

  if (typeof window.saveHistory === "function") {
    try {
      await window.saveHistory({
        calculatorType: "age",
        calculatorName: "Age Calculator",
        data: { years, months, days },
        resultText: language === "kh" ? `អាយុ ${years} ឆ្នាំ ${months} ខែ ${days} ថ្ងៃ` : `${years} years, ${months} months, ${days} days`,
      });
    } catch (err) {
      console.error("Age Calculator saveHistory error:", err);
    }
  } else {
    console.error("saveHistory is not available on window");
  }

  if (typeof window.displayHistory === "function") {
    await window.displayHistory("historyContainer");
  }
}

// ========================================
// CLEAR AGE HISTORY
// ========================================

async function clearAgeHistory() {
  const language =
    typeof window.currentLanguage !== "undefined"
      ? window.currentLanguage
      : "en";

  const confirmClear = confirm(
    language === "kh"
      ? "តើអ្នកប្រាកដថាចង់លុបប្រវត្តិការគណនាទាំងអស់មែនទេ?"
      : "Are you sure you want to clear all calculation history?",
  );

  if (!confirmClear) {
    return;
  }

  const HISTORY_KEY = window.HISTORY_KEY || "calculatorHistory";
  localStorage.removeItem(HISTORY_KEY);

  if (typeof window.clearHistory === "function") {
    window.clearHistory();
  }
  if (typeof window.displayHistory === "function") {
    window.displayHistory("historyContainer");
  }
}

// ========================================
// GLOBAL (onclick="calculateAge()")
// ========================================

window.calculateAge = calculateAge;
window.clearAgeHistory = clearAgeHistory;

// ========================================
// LOAD HISTORY
// ========================================

document.addEventListener("DOMContentLoaded", async function () {
  if (typeof window.displayHistory === "function") {
    window.displayHistory("historyContainer");
  }
});
