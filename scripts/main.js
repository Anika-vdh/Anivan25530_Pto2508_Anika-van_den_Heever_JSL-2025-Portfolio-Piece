import { loadTasks, saveTasks } from "./localStorage.js";
import { renderTasks } from "./render.js";

document.addEventListener("DOMContentLoaded", () => {

  // ==========================
  // LOAD TASKS
  // ==========================
  let tasks = loadTasks();

  if (!Array.isArray(tasks) || tasks.length === 0) {
    tasks = [
      { id: 1, title: "Launch Epic Career 🚀", description: "", status: "todo" },
      { id: 2, title: "Conquer React ⚛️", description: "", status: "todo" },
      { id: 3, title: "Understand Databases ⚙️", description: "", status: "todo" },
      { id: 4, title: "Crush Frameworks 🖼️", description: "", status: "todo" },
      { id: 5, title: "Master JavaScript 💛", description: "", status: "doing" },
      { id: 6, title: "Never Give Up 🏆", description: "", status: "doing" },
      { id: 7, title: "Explore ES6 Features 🚀", description: "", status: "done" },
      { id: 8, title: "Have fun 🥳", description: "", status: "done" }
    ];

    saveTasks(tasks);
  }

  renderTasks(tasks);
  updateCounts(tasks);

  // ==========================
  // ADD TASK MODAL
  // ==========================
  const addBtn = document.getElementById("add-new-task-btn");
  const newTaskModal = document.querySelector(".modal-overlay");

  addBtn.addEventListener("click", () => {
    newTaskModal.showModal();
  });

  const cancelAddBtn = document.getElementById("cancel-add-btn");
  cancelAddBtn.addEventListener("click", () => {
    newTaskModal.close();
  });

  // ==========================
  // CREATE TASK
  // ==========================
  const newTaskForm = document.getElementById("new-task-modal-window");

  newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title-input").value;
    const description = document.getElementById("desc-input").value;
    const status = document.getElementById("select-status").value;

    let tasks = loadTasks();

    const newTask = {
      id: Date.now(),
      title,
      description,
      status
    };

    tasks.push(newTask);

    saveTasks(tasks);
    renderTasks(tasks);
    updateCounts(tasks);

    newTaskForm.reset();
    newTaskModal.close();
  });

  // ==========================
  // EDIT TASK MODAL
  // ==========================
  const taskModal = document.getElementById("task-modal");
  const taskForm = document.getElementById("task-form");

  const taskTitle = document.getElementById("task-title");
  const taskDesc = document.getElementById("task-desc");
  const taskStatus = document.getElementById("task-status");
  const deleteBtn = document.getElementById("delete-task-btn");
  const closeModalBtn = document.getElementById("close-modal-btn");

  let currentTaskId = null;

  window.openModal = function (task) {
    currentTaskId = task.id;

    taskTitle.value = task.title;
    taskDesc.value = task.description || "";
    taskStatus.value = task.status;

    taskModal.showModal();
  };

  closeModalBtn.addEventListener("click", () => {
    taskModal.close();
  });

  // ==========================
  // SAVE EDIT
  // ==========================
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let tasks = loadTasks();

    tasks = tasks.map(task => {
      if (task.id === currentTaskId) {
        return {
          ...task,
          title: taskTitle.value,
          description: taskDesc.value,
          status: taskStatus.value
        };
      }
      return task;
    });

    saveTasks(tasks);
    renderTasks(tasks);
    updateCounts(tasks);

    taskModal.close();
  });

  // ==========================
  // DELETE TASK
  // ==========================
  deleteBtn.addEventListener("click", () => {
    let tasks = loadTasks();

    tasks = tasks.filter(task => task.id !== currentTaskId);

    saveTasks(tasks);
    renderTasks(tasks);
    updateCounts(tasks);

    taskModal.close();
  });

  // ==========================
  // UPDATE COUNTS
  // ==========================
  function updateCounts(tasks) {
    const statuses = ["todo", "doing", "done"];

    statuses.forEach(status => {
      const count = tasks.filter(t => t.status === status).length;

      const column = document.querySelector(
        `.column-div[data-status="${status}"] .columnHeader`
      );

      column.textContent = `${status.toUpperCase()} (${count})`;
    });
  }

  // ==========================
  // THEME TOGGLE + LOGO
  // ==========================
  const toggle = document.getElementById("theme-toggle");
  const logo = document.getElementById("logo");

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    logo.src = "./assets/logo-dark.svg";
  }

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    localStorage.setItem("theme", isDark ? "dark" : "light");

    logo.src = isDark
      ? "./assets/logo-dark.svg"
      : "./assets/logo-light.svg";
  });

  // ==========================
  // SIDEBAR TOGGLE
  // ==========================
  const hideBtn = document.querySelector(".hide-sidebar-btn");
  const showBtn = document.getElementById("show-sidebar-btn");
  const sidebar = document.querySelector(".side-bar");

  hideBtn.addEventListener("click", () => {
    sidebar.classList.add("hidden");
    showBtn.style.display = "block";
  });

  showBtn.addEventListener("click", () => {
    sidebar.classList.remove("hidden");
    showBtn.style.display = "none";
  });

});