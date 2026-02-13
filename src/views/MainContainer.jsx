import TodoListItem from "./TodoListItem";

const MainContainer = () => {
  return (
    <div className="list-container">
      <ul>
        <TodoListItem />
        <TodoListItem />
        <TodoListItem />
        <TodoListItem />
        <li>
          <div className="li-container li-tab">
            <span>5 items left</span>
            <div className="tab">
              <div>All</div>
              <div>Active</div>
              <div>Completed</div>
            </div>
            <div>Clear Completed</div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MainContainer;
