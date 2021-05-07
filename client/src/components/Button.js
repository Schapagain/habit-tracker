import classNames from "classnames";

const Button = ({ text, icon, className, onClick }) => {
  const mainClass = classNames(
    className,
    `flex bg-gray-300 text-white bg-gray-600 rounded-xl p-3 mx-auto m-3
        hover:bg-calypso hover:shadow-2xl
        transition duration-500 transform ease-in-out box-shadow`
  );
  return (
    <a
      className={mainClass}
      href="!#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {icon && <p className="mx-2 my-auto">{icon}</p>}
      <p>{text}</p>
    </a>
  );
};

Button.defaultProps = {
  onClick: () => {},
};

export default Button;
