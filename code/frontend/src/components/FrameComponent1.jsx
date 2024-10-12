import BlankBlock from "./BlankBlock";
import PropTypes from "prop-types";
import "./FrameComponent1.css";

const FrameComponent1 = ({ className = "" }) => {
  return (
    <div className={`facility-filter-parent ${className}`}>
      <div className="facility-filter">
        <div className="facility-filter-child" />
        <div className="rectangle-container">
          <div className="frame-child4" />
          <a className="facilities">Facilities</a>
          <div className="vector-wrapper1">
            <img className="vector-icon8" alt="" src="/vector-4.svg" />
          </div>
        </div>
        <div className="facility-filter-inner">
          <div className="frame-parent8">
            <div className="frame-parent9">
              <div className="basketball-court-wrapper">
                <b className="basketball-court">Basketball Court</b>
              </div>
              <div className="frame-child5" />
            </div>
            <b className="community-centre">Community Centre</b>
          </div>
        </div>
        <div className="playground-option">
          <b className="playground">Playground</b>
        </div>
      </div>
      <div className="dist-fliter-wrapper">
        <div className="dist-fliter">
          <div className="dist-fliter-child" />
          <div className="blank-block-parent">
            <BlankBlock />
            <div className="dist-km">Distance (Km)</div>
          </div>
          <div className="dist-title">
            <div className="dist-title-child" />
            <a className="distance">Distance</a>
          </div>
        </div>
      </div>
    </div>
  );
};

FrameComponent1.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent1;
