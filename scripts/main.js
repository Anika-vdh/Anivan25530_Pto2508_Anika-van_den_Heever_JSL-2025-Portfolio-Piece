// ==========================
// GLOBAL STATE
// ==========================
let currentTaskId = null;

// ==========================
// LOCAL STORAGE
// ==========================
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const data = localStorage.getItem("tasks");
  return data ? JSON.parse(data) : [];
}

// ==========================
// RENDER TASKS
// ==========================
function renderTasks(tasks) {
  document.querySelectorAll(".tasks-container").forEach(container => {
    container.innerHTML = "";
  });

  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = "task-div";
    div.textContent = task.title;
    div.addEventListener("click", () => {
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

// ==========================
// UPDATE COUNTS
// ==========================
function updateCounts(tasks) {
  const statuses = ["todo", "doing", "done"];

  statuses.forEach(status => {
    const count = tasks.filter(t => t.status === status).length;

    const header = document.querySelector(
      `.column-div[data-status="${status}"] .columnHeader`
    );

    if (header) {
      header.textContent = `${status.toUpperCase()} (${count})`;
    }
  });
}

function openModal(task) {
  const modal = document.getElementById("task-modal");
  const titleInput = document.getElementById("task-title");
  const statusSelect = document.getElementById("task-status");

  currentTaskId = task.id;

  titleInput.value = task.title;
  statusSelect.value = task.status;

  modal.showModal();
}

// ==========================
// INIT APP
// ==========================
document.addEventListener("DOMContentLoaded", () => {

  let tasks = loadTasks();

  if (!Array.isArray(tasks) || tasks.length === 0) {
    tasks = [
      { id: 1, title: "Launch Epic Career 🚀", status: "todo" },
      { id: 2, title: "Conquer React ⚛️", status: "todo" },
      { id: 3, title: "Understand Databases ⚙️", status: "todo" },
      { id: 4, title: "Crush Frameworks 🖼️", status: "todo" },
      { id: 5, title: "Master JavaScript 💛", status: "doing" },
      { id: 6, title: "Never Give Up 🏆", status: "doing" },
      { id: 7, title: "Explore ES6 Features 🚀", status: "done" },
      { id: 8, title: "Have fun 🥳", status: "done" }
    ];

    saveTasks(tasks);

    const form = document.getElementById("task-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const titleInput = document.getElementById("task-title");
  const statusSelect = document.getElementById("task-status");

  let tasks = loadTasks();

  tasks = tasks.map(task => {
    if (task.id === currentTaskId) {
      return {
        ...task,
        title: titleInput.value,
        status: statusSelect.value
      };
    }
    return task;
  });

  saveTasks(tasks);
  renderTasks(tasks);
  updateCounts(tasks);

  document.getElementById("task-modal").close();
});
const deleteBtn = document.getElementById("delete-task-btn");

deleteBtn.addEventListener("click", () => {
  let tasks = loadTasks();

  tasks = tasks.filter(task => task.id !== currentTaskId);

  saveTasks(tasks);
  renderTasks(tasks);
  updateCounts(tasks);

  document.getElementById("task-modal").close();
});
  }

  renderTasks(tasks);
  updateCounts(tasks);

  // ==========================
  // ADD TASK
  // ==========================
  const addBtn = document.getElementById("add-new-task-btn");
  const newTaskModal = document.querySelector(".modal-overlay");

  addBtn.addEventListener("click", () => {
    newTaskModal.showModal();
  });

  const newTaskForm = document.getElementById("new-task-modal-window");

  newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const titleInput = document.getElementById("title-input");
    const descInput = document.getElementById("desc-input");
    const statusSelect = document.getElementById("select-status");

    let tasks = loadTasks();

    const newTask = {
      id: Date.now(),
      title: titleInput.value,
      description: descInput.value,
      status: statusSelect.value
    };

    tasks.push(newTask);

    saveTasks(tasks);
    renderTasks(tasks);
    updateCounts(tasks);

    newTaskForm.reset();
    newTaskModal.close();
  });

  // ==========================
  // DARK MODE
  // ==========================
  const toggle = document.getElementById("theme-toggle");

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // ==========================
  // HIDE SIDEBAR
  // ==========================
  const hideBtn = document.querySelector(".hide-sidebar-btn");
  const sidebar = document.querySelector(".side-bar");

  hideBtn.addEventListener("click", () => {
    sidebar.style.display = "none";
  });

  // ==========================
  // CLOSE MODAL
  // ==========================
  const cancelAddBtn = document.getElementById("cancel-add-btn");

  cancelAddBtn.addEventListener("click", () => {
    newTaskModal.close();
  });

});
localStorage.removeItem("tasks")