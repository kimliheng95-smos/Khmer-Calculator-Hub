// ========================================
// CALCULATION HISTORY SYSTEM
// ========================================

const HISTORY_KEY = "calculatorHistory";

// ========================================
// GET HISTORY
// ========================================

function getHistory() {
  const history = localStorage.getItem(HISTORY_KEY);

  if (!history) {
    return [];
  }

  try {
    return JSON.parse(history);
  } catch (error) {
    console.error("Cannot read calculation history:", error);

    return [];
  }
}

// ========================================
// SAVE HISTORY
// ========================================

function saveHistory(calculator, result) {
  const history = getHistory();

  const newCalculation = {
    id: Date.now(),

    calculator: calculator,

    result: result,

    date: new Date().toLocaleString(),
  };

  history.unshift(newCalculation);

  // Keep latest 20
  if (history.length > 20) {
    history.pop();
  }

  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

// ========================================
// DELETE ONE HISTORY
// ========================================

function deleteHistory(id) {
  let history = getHistory();

  history = history.filter(function (item) {
    return item.id !== id;
  });

  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

// ========================================
// CLEAR ALL HISTORY
// ========================================

function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}

// ========================================
// DISPLAY HISTORY
// ========================================

function displayHistory(containerId) {
  const container = document.getElementById(containerId);

  if (!container) {
    return;
  }

  const history = getHistory();

  // No history
  if (history.length === 0) {
    container.innerHTML = `
      <div class="text-center py-4">

        <i
          class="bi bi-clock-history fs-1 text-secondary"
        ></i>

        <p
          class="mt-2 mb-0 text-secondary"
        >
          No calculation history yet.
        </p>

      </div>
    `;

    return;
  }

  // Display history
  container.innerHTML = history
    .map(function (item) {
      return `
            <div
              class="history-item border rounded p-3 mb-2"
            >

              <div
                class="d-flex justify-content-between align-items-start gap-3"
              >

                <div>

                  <div class="history-calculator">
                    ${item.calculator}
                  </div>

                  <div class="history-result mt-1">
                    ${item.result}
                  </div>

                  <small
                    class="history-date text-secondary"
                  >
                    ${item.date}
                  </small>

                </div>


                <button
                  type="button"
                  class="btn btn-sm btn-outline-danger"
                  onclick="deleteHistoryItem(${item.id}, '${containerId}')"
                  title="Delete"
                >

                  <i class="bi bi-trash"></i>

                </button>

              </div>

            </div>
          `;
    })
    .join("");
}

// ========================================
// DELETE + REFRESH
// ========================================

function deleteHistoryItem(id, containerId) {
  deleteHistory(id);

  displayHistory(containerId);
}
