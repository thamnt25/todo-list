import axios from "axios";
import todo from "../../model/todo.js";

const Header = ({ setTodoList }) => {

  //Insert new todo item in database and push new todo object in todolist by setting state
  async function createNewTodo(formData) {
    const query = formData.get("ftask")?.toString().trim();
    const body = todo(query);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/todos/",
        { todo: body },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      //Checking if insert successfull in database then update todolist state
      if (response.status === 201) {
        setTodoList((prev) => [...prev, response.data.todo]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-100 header">
      <h1 className="title">TO DO</h1>
      <form className="input-header" action={createNewTodo}>
        <input
          type="text"
          id="ftask"
          name="ftask"
          placeholder="Creat a new todo..."
        />
        <button className="btn btn-outline-primary" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-lg"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
            />
          </svg>
          Add
        </button>
      </form>
    </div>
  );
};

export default Header;
