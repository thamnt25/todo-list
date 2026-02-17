import TodoListItem from "./TodoListItem";
import { useState } from "react";
import { updateTodo, deleteTodo } from "../api/FetchData";

const MainContainer = ({ todoList, editTodoItem, deleteTodoItem }) => {
  const [filter, setfilter] = useState("all");
  const fillterList = todoList.filter((item) => {
    if (filter === "active") return item.status === 0;
    if (filter === "completed") return item.status === 1;
    return true;
  });

  async function clearAllComplete() {
    const completedTodos = todoList.filter((item) => item.status === 1);
    try {
      for (const item of completedTodos) {
        const res = await deleteTodo(item.id);
        if (res.status === 204) {
          deleteTodoItem(item.id);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="list-container">
      <ul>
        {fillterList.map((item) => (
          <TodoListItem
            key={item.id}
            todo={item}
            editTodoItem={editTodoItem}
            deleteTodoItem={deleteTodoItem}
          />
        ))}
      </ul>
      <div
        className="li-container li-tab"
        style={{ display: todoList.length ? "flex" : "none" }}
      >
        <span>
          {fillterList.filter((item) => item.status === 0).length} left
        </span>
        <div className="todo-filter">
          <input
            type="radio"
            name="filter"
            id="all"
            value="all"
            className="btn btn--bold"
            checked={filter === "all"}
            onChange={(e) => setfilter(e.target.value)}
          />
          <label htmlFor="all">All</label>

          <input
            type="radio"
            name="filter"
            id="active"
            value="active"
            checked={filter === "active"}
            onChange={(e) => setfilter(e.target.value)}
          />
          <label htmlFor="active">Active</label>

          <input
            type="radio"
            name="filter"
            id="completed"
            value="completed"
            checked={filter === "completed"}
            onChange={(e) => setfilter(e.target.value)}
          />
          <label htmlFor="completed">Completed</label>
        </div>
        <button onClick={clearAllComplete}>Clear completed</button>
      </div>
    </div>
  );
};

export default MainContainer;
