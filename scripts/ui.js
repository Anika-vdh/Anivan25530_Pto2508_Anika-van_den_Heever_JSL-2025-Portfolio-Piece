export function showLoading() {
  document.querySelectorAll(".tasks-container").forEach(container => {
    container.innerHTML = "<p class='loading-text'>Loading...</p>";
  });
}

export function showError() {
  document.querySelectorAll(".tasks-container").forEach(container => {
    container.innerHTML = "<p class='error-text'>Error 😢</p>";
  });
}

export function updateCounts(tasks) {
  const labels = {
    todo: "TODO",
    doing: "DOING",
    done: "DONE"
  };

  Object.keys(labels).forEach(status => {
    const count = tasks.filter(t => t.status === status).length;

    const column = document.querySelector(
      `.column-div[data-status="${status}"] .columnHeader`
    );

    if (column) {
      column.textContent = `${labels[status]} (${count})`;
    }
  });
}