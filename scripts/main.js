let currentTaskId = null;

// ==========================
// RENDER
// ==========================
function renderTasks(tasks) {
  document.querySelectorAll(".tasks-container").forEach(c => c.innerHTML = "");

  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = "task-div";
    div.textContent = task.title;

    div.onclick = () => openModal(task);

    const column = document.querySelector(
      `.column-div[data-status="${task.status}"] .tasks-container`
    );

    column.appendChild(div);
  });
}

// ==========================
// OPEN MODAL
// ==========================
function openModal(task) {
  currentTaskId = task.id;

  document.getElementById("task-title").value = task.title;
  document.getElementById("task-status").value = task.status;

  document.getElementById("task-modal").showModal();
}

// ==========================
// STORAGE
// ==========================
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

// ==========================
// INIT
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  let tasks = loadTasks();

  if (tasks.length === 0) {
    tasks = [
      { id: 1, title: "Launch Epic Career 🚀", status: "todo" },
      { id: 2, title: "Conquer React ⚛️", status: "todo" },
      { id: 3, title: "Master JavaScript 💛", status: "doing" },
      { id: 4, title: "Explore ES6 Features 🚀", status: "done" }
    ];
    saveTasks(tasks);
  }

  renderTasks(tasks);

  // OPEN NEW TASK MODAL
  document.getElementById("add-new-task-btn").onclick = () => {
    document.querySelector(".modal-overlay").showModal();
  };

  // CREATE TASK
  document.getElementById("new-task-modal-window").onsubmit = (e) => {
    e.preventDefault();

    let tasks = loadTasks();

    tasks.push({
      id: Date.now(),
      title: document.getElementById("title-input").value,
      status: document.getElementById("select-status").value
    });

    saveTasks(tasks);
    renderTasks(tasks);

    document.querySelector(".modal-overlay").close();
  };

  // EDIT TASK
  document.getElementById("task-form").onsubmit = (e) => {
    e.preventDefault();

    let tasks = loadTasks();

    tasks = tasks.map(t =>
      t.id === currentTaskId
        ? { ...t, title: task-title.value, status: task-status.value }
        : t
    );

    saveTasks(tasks);
    renderTasks(tasks);

    document.getElementById("task-modal").close();
  };

  // DELETE TASK
  document.getElementById("delete-task-btn").onclick = () => {
    let tasks = loadTasks();

    tasks = tasks.filter(t => t.id !== currentTaskId);

    saveTasks(tasks);
    renderTasks(tasks);

    document.getElementById("task-modal").close();
  };
});

// ==========================
// DARK MODE TOGGLE
// ==========================
const toggle = document.getElementById("theme-toggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});


const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
}