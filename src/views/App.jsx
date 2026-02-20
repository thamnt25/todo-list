import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import MainContainer from "./MainContainer";
import { useState, useEffect } from "react";
import { getAllTodo } from "../api/FetchData";

function App() {
  const [todoList, setTodoList] = useState([]);

  //Update todoList state when a todo item is updated
  function editTodoItem(id, updatedTodo) {
    setTodoList((prev) =>
      prev.map((item) => (item.id === id ? updatedTodo : item)),
    );
  }

   //Reset todoList state by filltering the item is deleted in database
  function deleteTodoItem(id) {
    setTodoList((prev) => prev.filter((item) => item.id !== id));
  }

  //Fetching data from Sqlite and set data into todoList react state
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
        onChange={editTodoItem}
        onDelete={deleteTodoItem}
      />
    </div>
  );
}

export default App;
