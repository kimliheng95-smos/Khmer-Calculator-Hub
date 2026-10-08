// ========================================
// GPA CALCULATOR
// ========================================

// ========================================
// GET TRANSLATION
// ========================================

function getGPAText(key, fallback) {
  const lang =
    typeof window.currentLanguage !== "undefined"
      ? window.currentLanguage
      : "en";
  const t = window.translations;
  if (t && t[lang] && t[lang][key]) {
    return t[lang][key];
  }
  return fallback;
}

// ========================================
// ADD SUBJECT
// ========================================

async function addSubject() {
  const subjects = document.getElementById("subjects");

  const subjectRow = document.createElement("div");

  subjectRow.className = "subject-row";

  subjectRow.innerHTML = `
    <div class="row g-3 align-items-center">

      <div class="col-md-5">
        <input
          type="text"
          class="form-control subject-name"
          placeholder="${getGPAText("subjectName", "Subject name")}"
        />
      </div>

      <div class="col-md-3">
        <input
          type="number"
          class="form-control subject-credit"
          placeholder="${getGPAText("credit", "Credit")}"
          min="1"
          step="1"
        />
      </div>

      <div class="col-md-4">
        <select class="form-select subject-grade">

          <option value="">
            ${getGPAText("selectGrade", "Select Grade")}
          </option>

          <option value="4">A</option>
          <option value="3">B</option>
          <option value="2">C</option>
          <option value="1">D</option>
          <option value="0">F</option>

        </select>
      </div>

    </div>
  `;

  subjects.appendChild(subjectRow);
}

// ========================================
// CALCULATE GPA
// ========================================

async function calculateGPA() {
  const names = document.querySelectorAll(".subject-name");
  const credits = document.querySelectorAll(".subject-credit");
  const grades = document.querySelectorAll(".subject-grade");

  let totalCredits = 0;
  let totalPoints = 0;

  const subjectsData = [];

  // ========================================
  // LOOP THROUGH SUBJECTS
  // ========================================

  for (let i = 0; i < credits.length; i++) {
    const name = names[i].value.trim();
    const creditInput = credits[i].value;
    const grade = grades[i].value;

    // Skip completely empty subject
    if (name === "" && creditInput === "" && grade === "") {
      continue;
    }

    // ========================================
    // VALIDATE CREDIT + GRADE
    // ========================================

    if (creditInput === "" || grade === "") {
      alert(
        getGPAText(
          "completeSubject",
          "Please complete subject credit and grade.",
        ),
      );

      return;
    }

    const credit = Number(creditInput);

    if (!Number.isFinite(credit) || credit <= 0) {
      alert(getGPAText("validCredit", "Please enter a valid credit."));

      return;
    }

    const gradePoint = Number(grade);

    // ========================================
    // CALCULATE
    // ========================================

    totalCredits += credit;

    totalPoints += credit * gradePoint;

    subjectsData.push({
      name: name,
      credit: credit,
      grade: gradePoint,
    });
  }

  // ========================================
  // CHECK SUBJECTS
  // ========================================

  if (subjectsData.length === 0) {
    alert(getGPAText("enterSubject", "Please enter at least one subject."));

    return;
  }

  if (totalCredits === 0) {
    alert(getGPAText("validCredit", "Please enter a valid credit."));

    return;
  }

  // ========================================
  // CALCULATE GPA
  // ========================================

  const gpa = totalPoints / totalCredits;

  const roundedGPA = gpa.toFixed(2);

  // ========================================
  // SHOW RESULT
  // ========================================

  document.getElementById("gpaResult").style.display = "block";

  document.getElementById("gpaValue").textContent = roundedGPA;

  // ========================================
  // GPA MESSAGE
  // ========================================

  let message = "";

  if (gpa >= 3.5) {
    message = getGPAText("excellentResult", "Excellent Result");
  } else if (gpa >= 3.0) {
    message = getGPAText("veryGoodResult", "Very Good Result");
  } else if (gpa >= 2.0) {
    message = getGPAText("goodResult", "Good Result");
  } else {
    message = getGPAText("keepImproving", "Keep Improving");
  }

  document.getElementById("gpaMessage").textContent = message;

  // ========================================
  // ========================================
  // SAVE HISTORY (Firestore if logged in)
  // ========================================

  if (typeof window.saveHistory === "function") {
    try {
      await window.saveHistory({
        calculatorType: "gpa",
        calculatorName: "GPA Calculator",
        data: { subjects: typeof subjectsData !== 'undefined' ? subjectsData : [], totalCredits: typeof totalCredits !== 'undefined' ? totalCredits : 0, totalPoints: typeof totalPoints !== 'undefined' ? totalPoints : 0, gpa, message: typeof message !== 'undefined' ? message : '' },
        resultText: `GPA: ${gpa}`,
      });
    } catch (err) {
      console.error("GPA Calculator saveHistory error:", err);
    }
  } else {
    console.error("saveHistory is not available on window");
  }

  if (typeof window.displayHistory === "function") {
    await window.displayHistory("historyContainer");
  }
}

// ========================================
// CLEAR GPA HISTORY
// ========================================

async function clearGPAHistory() {
  const confirmClear = confirm(
    getGPAText(
      "confirmClearHistory",
      "Are you sure you want to clear all calculation history?",
    ),
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
// GLOBAL (onclick handlers)
// ========================================

window.addSubject = addSubject;
window.calculateGPA = calculateGPA;
window.clearGPAHistory = clearGPAHistory;

// ========================================
// LOAD HISTORY
// ========================================

document.addEventListener("DOMContentLoaded", async function () {
  if (typeof window.displayHistory === "function") {
    window.displayHistory("historyContainer");
  }
});
