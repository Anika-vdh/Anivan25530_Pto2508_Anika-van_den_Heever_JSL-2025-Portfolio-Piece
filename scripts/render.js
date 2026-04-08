/**
 * Renders all tasks columns
 * @param {Array} tasks 
 */

export function renderTasks(tasks) {
 
  document.querySelectorAll(".tasks-container").forEach(container => {
    container.innerHTML = "";
  });

  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = "task-div";
    div.innerHTML = `
    <strong>${task.title}</strong>
    ${task.description ? `<small>${task.description}</small>` : ""}
`;

    // OPEN MODAL ON CLICK
    div.addEventListener("click", () => {
    document.dispatchEvent(new CustomEvent("openTask", { detail: task }));
    });

    // Find correct column
    const column = document.querySelector(
      `.column-div[data-status="${task.status}"] .tasks-container`
    );

    if (column) {
      column.appendChild(div);
    } else {
      console.error("Column not found for status:", task.status);
    }
  });
}