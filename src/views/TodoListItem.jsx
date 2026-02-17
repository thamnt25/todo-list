import { useState } from "react";
import delete_icon from "../../public/img/icon-cross.svg";
import check_icon from "../../public/img/icon-check.svg";
import { updateTodo, deleteTodo } from "../api/FetchData";

export default function TodoListItem({ todo, editTodoItem, deleteTodoItem }) {
  const [isHovering, setLiHover] = useState(false);
  const [isChecked, setCheckbox] = useState(todo.status);

  async function updateItem() {
    const updatedStatus = todo.status ? 0 : 1;
    const updatedTodo = { ...todo, status: updatedStatus };

    try {
      const res = await updateTodo(todo.id, updatedTodo);
      if (res.status === 200) {
        editTodoItem(todo.id, updatedTodo);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteItem() {
    //todo.status = todo.status ? 0 : 1;
    try {
      const res = await deleteTodo(todo.id);
      if (res.status === 204) {
        deleteTodoItem(todo.id);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function checkboxHandler() {
    updateItem();
    if (isChecked) {
      setCheckbox(0);
    } else {
      setCheckbox(1);
    }
  }

  return (
    <li
      onMouseEnter={() => setLiHover(true)}
      onMouseLeave={() => setLiHover(false)}
    >
      <div className="li-container li-todo">
        <div
          className="checkbox"
          style={{
            border: isHovering ? "1px solid #C058F3" : "2px solid #e3e4f1",
            background: isChecked
              ? "linear-gradient(to right, #55ddff, #c058f3)"
              : "white",
          }}
          onClick={checkboxHandler}
        >
          <img
            src={check_icon}
            style={{ display: isChecked ? "block" : "none" }}
          />
        </div>
        <span
          className={`todo-text ${isChecked ? "li-todo-checked" : "li-todo-unchecked"}`}
        >
          {todo.task}
        </span>
        <img
          src={delete_icon}
          style={isHovering ? { display: "block" } : { display: "none" }}
          onClick={deleteItem}
        />
      </div>
    </li>
  );
}
