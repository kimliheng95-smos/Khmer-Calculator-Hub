// ========================================
// GPA CALCULATOR
// ========================================

// ADD SUBJECT
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
          placeholder="Subject name"
        />
      </div>

      <div class="col-md-3">
        <input
          type="number"
          class="form-control subject-credit"
          placeholder="Credit"
          min="1"
        />
      </div>

      <div class="col-md-4">
        <select class="form-select subject-grade">

          <option value="">
            Select Grade
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
  const credits = document.querySelectorAll(".subject-credit");

  const grades = document.querySelectorAll(".subject-grade");

  let totalCredits = 0;
  let totalPoints = 0;

  for (let i = 0; i < credits.length; i++) {
    const credit = Number(credits[i].value);

    const grade = grades[i].value;

    // Skip empty subject
    if (credit <= 0 || grade === "") {
      continue;
    }

    totalCredits += credit;

    totalPoints += credit * Number(grade);
  }

  // Check if no valid subject
  if (totalCredits === 0) {
    alert("Please enter subject credit and grade.");

    return;
  }

  // Calculate GPA
  const gpa = totalPoints / totalCredits;

  const roundedGPA = gpa.toFixed(2);

  // Show result
  document.getElementById("gpaResult").style.display = "block";

  document.getElementById("gpaValue").textContent = roundedGPA;

  // GPA message
  let message = "";

  if (gpa >= 3.5) {
    message = "Excellent Result";
  } else if (gpa >= 3.0) {
    message = "Very Good Result";
  } else if (gpa >= 2.0) {
    message = "Good Result";
  } else {
    message = "Keep Improving";
  }

  document.getElementById("gpaMessage").textContent = message;

  // ========================================
  // SAVE HISTORY
  // ========================================

  saveHistory("GPA Calculator", "GPA: " + roundedGPA);

  // Refresh history
  displayHistory("historyContainer");
}

// ========================================
// CLEAR GPA HISTORY
// ========================================

function clearGPAHistory() {
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
