// ========================================
// GRADE CALCULATOR
// ========================================

function calculateGrade() {
  // Get input values
  const score = Number(document.getElementById("score").value);

  const maxScore = Number(document.getElementById("maxScore").value);

  // Validate
  if (score < 0 || maxScore <= 0) {
    alert("Please enter valid score and maximum score.");

    return;
  }

  // Score cannot be greater than maximum score
  if (score > maxScore) {
    alert("Score cannot be greater than maximum score.");

    return;
  }

  // Calculate percentage
  const percentage = (score / maxScore) * 100;

  // Calculate grade
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

  // Show result
  document.getElementById("gradeResult").style.display = "block";

  document.getElementById("percentage").textContent =
    percentage.toFixed(2) + "%";

  document.getElementById("grade").textContent = "Grade: " + grade;

  // ========================================
  // SAVE HISTORY
  // ========================================

  saveHistory(
    "Grade Calculator",
    "Grade: " + grade + " | " + percentage.toFixed(2) + "%",
  );

  // Refresh history
  displayHistory("historyContainer");
}

// ========================================
// CLEAR GRADE HISTORY
// ========================================

function clearGradeHistory() {
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
