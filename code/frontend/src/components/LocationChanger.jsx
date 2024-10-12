import PropTypes from "prop-types";
import "./LocationChanger.css";

const LocationChanger = ({ className = "" }) => {
  return (
    <div className={`location-changer ${className}`}>
      <div className="outerframe" />
      <div className="bukit-batok-parent">
        <a className="bukit-batok">Bukit Batok</a>
        <img
          className="carbonlocation-filled-icon"
          loading="lazy"
          alt=""
          src="/carbonlocationfilled.svg"
        />
      </div>
      <div className="vector-frame">
        <img
          className="vector-icon7"
          loading="lazy"
          alt=""
          src="/vector-31.svg"
        />
      </div>
    </div>
  );
};

LocationChanger.propTypes = {
  className: PropTypes.string,
};

export default LocationChanger;
