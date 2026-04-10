export function setupModal(tasks, saveTasks, renderTasks, updateCounts) {
  const taskModal = document.getElementById("task-modal");
  const taskForm = document.getElementById("task-form");

  const taskTitle = document.getElementById("task-title");
  const taskDesc = document.getElementById("task-desc");
  const taskStatus = document.getElementById("task-status");
  const deleteBtn = document.getElementById("delete-task-btn");
  const closeModalBtn = document.getElementById("close-modal-btn");

  let currentTaskId = null;

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

  deleteBtn.addEventListener("click", () => {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    tasks = tasks.filter(task => task.id !== currentTaskId);

    saveTasks(tasks);
    renderTasks(tasks);
    updateCounts(tasks);

    taskModal.close();
  });
}