import { fetchTasks } from "./api.js";
import { loadTasks, saveTasks } from "./storage.js";
import { renderTasks } from "./render.js";
import { showLoading, showError, updateCounts } from "./ui.js";
import { setupModal } from "./modal.js";

document.addEventListener("DOMContentLoaded", () => {

  // load tasks
  let tasks = loadTasks();

setupModal(tasks, saveTasks, renderTasks, updateCounts);

  if (!tasks.length) {
    showLoading();

    fetchTasks()
      .then(fetchedTasks => {
        tasks = fetchedTasks;
        saveTasks(tasks);
        renderTasks(tasks);
        updateCounts(tasks);
      })
      .catch(() => {
        showError();
      });

  } else {
    renderTasks(tasks);
    updateCounts(tasks);
  }

  // add new task modal
  const addBtn = document.getElementById("add-new-task-btn");
  const newTaskModal = document.querySelector(".modal-overlay");

  addBtn.addEventListener("click", () => {
    newTaskModal.showModal();
  });

  const cancelAddBtn = document.getElementById("cancel-add-btn");
  cancelAddBtn.addEventListener("click", () => {
    newTaskModal.close();
  });

  // create task
  const newTaskForm = document.getElementById("new-task-modal-window");

  newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title-input").value;
    const description = document.getElementById("desc-input").value;
    const status = document.getElementById("select-status").value;

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

  // theme toggle
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

  // sidebar toggle
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

  const mobileMenuBtn = document.getElementById("mobile-menu-btn");

  mobileMenuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
  });

});