// ========================================
// GPA CALCULATOR
// ========================================

// ========================================
// GET TRANSLATION
// ========================================

function getGPAText(key, fallback) {
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
// ADD SUBJECT
// ========================================

function addSubject() {
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

function calculateGPA() {
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
  // SAVE TYPED HISTORY
  // ========================================

  const history = getHistory();

  const newCalculation = {
    id: Date.now(),

    calculator: "GPA Calculator",

    calculatorType: "gpa",

    data: {
      subjects: subjectsData,
      totalCredits: totalCredits,
      totalPoints: totalPoints,
      gpa: gpa,
      message: message,
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
  // REFRESH HISTORY
  // ========================================

  displayHistory("historyContainer");
}

// ========================================
// CLEAR GPA HISTORY
// ========================================

function clearGPAHistory() {
  const confirmClear = confirm(
    getGPAText(
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
// LOAD HISTORY
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  displayHistory("historyContainer");
});
