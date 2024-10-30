import PropTypes from "prop-types";
import "./BlankBlock.css";

const BlankBlock = ({ className = "" }) => {
  return <input className={`blank-block ${className}`} type="text" />;
};

BlankBlock.propTypes = {
  className: PropTypes.string,
};

export default BlankBlock;
