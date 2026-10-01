// ========================================
// GRADE CALCULATOR
// ========================================

// ========================================
// GET TRANSLATION
// ========================================

function getGradeText(key, fallback) {
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
// CALCULATE GRADE
// ========================================

function calculateGrade() {
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
  // SAVE TYPED HISTORY
  // ========================================

  const history = getHistory();

  const newCalculation = {
    id: Date.now(),

    calculator: "Grade Calculator",

    calculatorType: "grade",

    data: {
      score: score,
      maxScore: maxScore,
      percentage: percentage,
      grade: grade,
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
// CLEAR GRADE HISTORY
// ========================================

function clearGradeHistory() {
  const confirmClear = confirm(
    getGradeText(
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
  