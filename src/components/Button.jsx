import PropTypes from "prop-types";

const Button = ({ text, onClick, className, type = "submit" }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${className} hover:cursor-pointer px-4 py-1.5 bg-color-1 rounded-full`}
    >
      <h6 className="font-bold">{text}</h6>
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.node,
  type: PropTypes.string,
};

export default Button;
