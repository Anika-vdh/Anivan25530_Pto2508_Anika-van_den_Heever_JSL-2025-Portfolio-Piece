/**
 * Retrieves tasks from localStorage
 * @returns {Array} tasks array
 */
export function loadTasks() {
  const data = localStorage.getItem("tasks");
  return data ? JSON.parse(data) : [];
}

/**
 * Stores tasks in localStorage
 * @param {Array} tasks - Array of task objects
 */

export function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}