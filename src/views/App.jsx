import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import MainContainer from "./MainContainer";
import { useState, useEffect } from "react";
import { getAllTodo } from "../api/FetchData";

function App() {
  const [todoList, setTodoList] = useState([]);

  function editTodoItem(id, updatedTodo) {
    setTodoList((prev) =>
      prev.map((item) => (item.id === id ? updatedTodo : item)),
    );
  }

  function deleteTodoItem(id) {
    setTodoList((prev) => prev.filter((item) => item.id !== id));
  }

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await getAllTodo();
      if (res.status === 200) {
        setTodoList(res.data.todo);
      }
    };
    fetchTodos();
  }, []);

  return (
    <div className="app-container">
      <Header setTodoList={setTodoList} />
      <MainContainer
        todoList={todoList}
        editTodoItem={editTodoItem}
        deleteTodoItem={deleteTodoItem}
      />
    </div>
  );
}

export default App;
