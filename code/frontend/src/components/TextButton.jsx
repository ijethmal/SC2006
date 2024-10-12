import PropTypes from "prop-types";
import "./TextButton.css";

const TextButton = ({ className = "" }) => {
  return (
    <div className={`text-button ${className}`}>
      <div className="text-button-child" />
      <div className="type-here">Login</div>
    </div>
  );
};

TextButton.propTypes = {
  className: PropTypes.string,
};

export default TextButton;
