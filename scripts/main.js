import { loadTasks, saveTasks } from "./localStorage.js";
import { renderTasks } from "./render.js";

document.addEventListener("DOMContentLoaded", () => {

 
  // load tasks

 let tasks = loadTasks();

if (!tasks || tasks.length === 0) {
  showLoading();

  fetch("https://jsl-kanban-api.vercel.app/")
    .then(res => {
      if (!res.ok) throw new Error("Fetch failed");
      return res.json();
    })
    .then(data => {
      tasks = data.tasks;
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


  // edit task modal
 
  const taskModal = document.getElementById("task-modal");
  const taskForm = document.getElementById("task-form");

  const taskTitle = document.getElementById("task-title");
  const taskDesc = document.getElementById("task-desc");
  const taskStatus = document.getElementById("task-status");
  const deleteBtn = document.getElementById("delete-task-btn");
  const closeModalBtn = document.getElementById("close-modal-btn");

  let currentTaskId = null;

  /**
 * Opens edit modal 
 * @param {Object} task - Task object
 */
function openModal(task) {
  currentTaskId = task.id;

  taskTitle.value = task.title;
  taskDesc.value = task.description || "";
  taskStatus.value = task.status;

  taskModal.showModal();
}

document.addEventListener("openTask", (e) => {
  openModal(e.detail);
});


  closeModalBtn.addEventListener("click", () => {
    taskModal.close();
  });

  
  // save edit
  
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    
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

  
  // delete task
 
  deleteBtn.addEventListener("click", () => {
  const confirmDelete = confirm("Are you sure you want to delete this task?");

  if (!confirmDelete) return;

  tasks = tasks.filter(task => task.id !== currentTaskId);

  saveTasks(tasks);
  renderTasks(tasks);
  updateCounts(tasks);

  taskModal.close();
});

/**
 * Displays loading state in all task columns
 */

function showLoading() {
  document.querySelectorAll(".tasks-container").forEach(container => {
    container.innerHTML = "<p class='loading-text'>Loading...</p>";
  });
}

/**
 * Displays error message if fetch fails
 */

function showError() {
  document.querySelectorAll(".tasks-container").forEach(container => {
    container.innerHTML = "<p class='error-text'>Error 😢</p>";
  });
}




  // update counts
 

  /**
 * Updates column task counts
 * @param {Array} tasks - Array of task objects
 */

  function updateCounts(tasks) {
    const statuses = ["todo", "doing", "done"];

    statuses.forEach(status => {
      const count = tasks.filter(t => t.status === status).length;

      const column = document.querySelector(
        `.column-div[data-status="${status}"] .columnHeader`
      );

      if (column) {
  column.textContent = `${status.toUpperCase()} (${count})`;
}
    });
  }

  
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

