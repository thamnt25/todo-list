import delete_icon from "../../public/img/icon-cross.svg";
import check_icon from "../../public/img/icon-check.svg";

export default function TodoListItem() {
  return (
    <li>
      <div className="li-container li-todo">
        <div className="checkbox"></div>
        <span className="todo-text">Complete online java script course</span>
        <span>Tomorow</span>
        <img src={delete_icon} />
      </div>
    </li>
  );
}
