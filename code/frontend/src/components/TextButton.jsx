import PropTypes from "prop-types";
import "./TextButton.css";

const TextButton = ({ className = "", onClick }) => {
  return (
    <div className={`text-button ${className}`} onClick={onClick}> {/* Add onClick */}
      <div className="text-button-child" />
      <div className="type-here">Login</div>
    </div>
  );
};

TextButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func, // Define onClick as a prop
};

export default TextButton;