import Hidden from "./Hidden";
import PropTypes from "prop-types";
import "./NaviBar.css";

const NaviBar = ({ className = "" }) => {
  return (
    <div className={`navi-bar ${className}`}>
      <div className="gatherhub-wrapper">
        <a className="gatherhub1">GatherHub</a>
      </div>
      <Hidden />
    </div>
  );
};

NaviBar.propTypes = {
  className: PropTypes.string,
};

export default NaviBar;
