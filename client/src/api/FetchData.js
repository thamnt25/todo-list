import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
const TODO_API = `${API_BASE}/api/todos`;

async function getAllTodo() {
  try {
    const res = await axios.get(`${TODO_API}/`);
    return res;
  } catch (err) {
    console.error("Failed to get todos:", err);
    throw err;
  }
}

async function updateTodo(id, todo) {
  try {
    const res = await axios.put(`${TODO_API}/${id}`, {
      todo: todo,
    });
    return res;
  } catch (err) {
    console.error("Failed to update todo:", err);
    throw err;
  }
}

async function deleteTodo(id) {
  try {
    const res = await axios.delete(`${TODO_API}/${id}`);
    return res;
  } catch (err) {
    console.error("Failed to delete todo:", err);
    throw err;
  }
}

export { getAllTodo, updateTodo, deleteTodo };
