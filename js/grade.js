// ========================================
// GRADE CALCULATOR
// ========================================

// ========================================
// GET TRANSLATION
// ========================================

function getGradeText(key, fallback) {
  if (
    window.translations &&
    window.currentLanguage &&
    window.translations[window.currentLanguage] &&
    window.translations[window.currentLanguage][key]
  ) {
    return window.translations[window.currentLanguage][key];
  }

  return fallback;
}

// ========================================
// CALCULATE GRADE
// ========================================

async function calculateGrade() {
  // ========================================
  // GET INPUT VALUES
  // ========================================

  const scoreInput = document.getElementById("score");
  const maxScoreInput = document.getElementById("maxScore");

  const scoreValue = scoreInput.value.trim();
  const maxScoreValue = maxScoreInput.value.trim();

  // ========================================
  // CHECK EMPTY INPUT
  // ========================================

  if (scoreValue === "" || maxScoreValue === "") {
    alert(
      getGradeText(
        "enterScoreMaximum",
        "Please enter score and maximum score.",
      ),
    );

    return;
  }

  // ========================================
  // CONVERT TO NUMBER
  // ========================================

  const score = Number(scoreValue);
  const maxScore = Number(maxScoreValue);

  // ========================================
  // VALIDATE NUMBER
  // ========================================

  if (!Number.isFinite(score) || !Number.isFinite(maxScore)) {
    alert(
      getGradeText(
        "validScoreMaximum",
        "Please enter valid score and maximum score.",
      ),
    );

    return;
  }

  // ========================================
  // VALIDATE SCORE
  // ========================================

  if (score < 0 || maxScore <= 0) {
    alert(
      getGradeText(
        "validScoreMaximum",
        "Please enter valid score and maximum score.",
      ),
    );

    return;
  }

  // ========================================
  // SCORE CANNOT BE GREATER
  // ========================================

  if (score > maxScore) {
    alert(
      getGradeText(
        "scoreGreaterMaximum",
        "Score cannot be greater than maximum score.",
      ),
    );

    return;
  }

  // ========================================
  // CALCULATE PERCENTAGE
  // ========================================

  const percentage = (score / maxScore) * 100;

  // ========================================
  // CALCULATE GRADE
  // ========================================

  let grade;

  if (percentage >= 90) {
    grade = "A";
  } else if (percentage >= 80) {
    grade = "B";
  } else if (percentage >= 70) {
    grade = "C";
  } else if (percentage >= 60) {
    grade = "D";
  } else {
    grade = "F";
  }

  // ========================================
  // SHOW RESULT
  // ========================================

  document.getElementById("gradeResult").style.display = "block";

  document.getElementById("percentage").textContent =
    percentage.toFixed(2) + "%";

  document.getElementById("grade").textContent =
    getGradeText("gradeLabel", "Grade") + ": " + grade;

  // ========================================
  // ========================================
  // SAVE HISTORY (Firestore if logged in)
  // ========================================

  if (typeof window.saveHistory === "function") {
    try {
      await window.saveHistory({
        calculatorType: "grade",
        calculatorName: "Grade Calculator",
        data: { score, maxScore, percentage, grade },
        resultText: `Score: ${score} | Grade: ${grade}`,
      });
    } catch (err) {
      console.error("Grade Calculator saveHistory error:", err);
    }
  } else {
    console.error("saveHistory is not available on window");
  }

  if (typeof window.displayHistory === "function") {
    await window.displayHistory("historyContainer");
  }
if (typeof window.displayHistory === "function") window.displayHistory("historyContainer");
}

// ========================================
// CLEAR GRADE HISTORY
// ========================================

async function clearGradeHistory() {
  const confirmClear = confirm(
    getGradeText(
      "confirmClearHistory",
      "Are you sure you want to clear all calculation history?",
    ),
  );

  if (!confirmClear) {
    return;
  }

  if (typeof window.clearHistory === "function") {
    await window.clearHistory();
  }

  if (typeof window.displayHistory === "function") window.displayHistory("historyContainer");
}

// ========================================
// LOAD HISTORY
// ========================================

document.addEventListener("DOMContentLoaded", async function () {
  if (typeof window.displayHistory === "function") window.displayHistory("historyContainer");
});

// GLOBAL
window.calculateGrade = calculateGrade;
window.clearGradeHistory = clearGradeHistory;

document.addEventListener("DOMContentLoaded", async function () {
  const calcBtn = document.getElementById("calculateGradeButton");
  if (calcBtn) calcBtn.addEventListener("click", calculateGrade);
  const clearBtn = document.getElementById("clearGradeHistoryButton");
  if (clearBtn) clearBtn.addEventListener("click", clearGradeHistory);
  
  if (typeof window.displayHistory === "function") window.displayHistory("historyContainer");
});
