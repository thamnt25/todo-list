import iconCheck from "../../public/img/icon-check.svg";

const Header = () => {
  return (
    <div className="w-100 header">
      <h1 className="title">TO DO</h1>
      <div className="input-header">
        <div className="checkbox"></div>
        <input
          type="text"
          id="fname"
          name="fname"
          placeholder="Creat a new todo..."
        />
      </div>
    </div>
  );
};

export default Header;
