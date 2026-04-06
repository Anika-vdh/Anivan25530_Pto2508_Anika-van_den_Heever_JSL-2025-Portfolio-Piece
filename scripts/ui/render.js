function renderTasks(tasks) {
  document.querySelectorAll(".tasks-container").forEach(container => {
    container.innerHTML = "";
  });

  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = "task-div";
    div.textContent = task.title;

 
    div.addEventListener("click", () => {
      console.log("task clicked"); // debug
      openModal(task);
    });

    const column = document.querySelector(
      `.column-div[data-status="${task.status}"] .tasks-container`
    );

    if (column) {
      column.appendChild(div);
    }
  });
}