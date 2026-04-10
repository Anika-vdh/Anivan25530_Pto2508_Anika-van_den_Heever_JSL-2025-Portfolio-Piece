const API_URL = "https://jsl-kanban-api.vercel.app/api/boards";

export async function fetchTasks() {
  const res = await fetch(API_URL);

  if (!res.ok) throw new Error("Fetch failed");

  const data = await res.json();

  const board = data[0]; 

  const tasks = [];

  board.columns.forEach(column => {
    column.tasks.forEach(task => {
      tasks.push({
        id: task.id,
        title: task.title,
        description: task.description,
        status: column.name.toLowerCase()
      });
    });
  });

  return tasks;
}