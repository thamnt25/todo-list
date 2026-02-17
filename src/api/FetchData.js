import axios from "axios";

async function getAllTodo() {
  try {
    const res = await axios.get("http://localhost:3000/api/todos/");
    return res;
  } catch (err) {
    console.error("Failed to get todos:", err);
    throw err;
  }
}

async function updateTodo(id, todo) {
  try {
    const res = await axios.put(`http://localhost:3000/api/todos/${id}`, {
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
    const res = await axios.delete(`http://localhost:3000/api/todos/${id}`);
    return res;
  } catch (err) {
    console.error("Failed to delete todo:", err);
    throw err;
  }
}

export { getAllTodo, updateTodo, deleteTodo };
