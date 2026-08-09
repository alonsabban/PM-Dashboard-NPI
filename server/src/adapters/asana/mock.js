import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, "..", "..", "data", "asana-tasks.json");

function readTasks() {
  return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
}

function writeTasks(tasks) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(tasks, null, 2));
}

export async function listNpiTasks() {
  return readTasks();
}

export async function updateTask(id, fields) {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    throw new Error(`Task ${id} not found`);
  }
  tasks[index] = { ...tasks[index], ...fields };
  writeTasks(tasks);
  return tasks[index];
}
