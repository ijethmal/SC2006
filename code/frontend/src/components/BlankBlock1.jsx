import { useMemo } from "react";
import PropTypes from "prop-types";
import "./BlankBlock1.css";

const BlankBlock1 = ({
  className = "",
  propFlex,
  propWidth,
  propAlignSelf,
  yogaClass,
  yoga2,
  propAlignSelf1,
}) => {
  const blankBlockStyle = useMemo(() => {
    return {
      flex: propFlex,
    };
  }, [propFlex]);

  const frameDiv4Style = useMemo(() => {
    return {
      width: propWidth,
      alignSelf: propAlignSelf,
    };
  }, [propWidth, propAlignSelf]);

  const buttonRowStyle = useMemo(() => {
    return {
      alignSelf: propAlignSelf1,
    };
  }, [propAlignSelf1]);

  return (
    <div className={`blank-block1 ${className}`} style={blankBlockStyle}>
      <div className="frame-parent10" style={frameDiv4Style}>
        <div className="yoga-class-wrapper">
          <div className="yoga-class">{yogaClass}</div>
        </div>
        <img className="yoga-2-icon3" loading="lazy" alt="" src={yoga2} />
      </div>
      <div className="button-row" style={buttonRowStyle}>
        <div className="text-button1">
          <div className="text-button-item" />
          <div className="yoga-class">Leave Group</div>
        </div>
      </div>
    </div>
  );
};

BlankBlock1.propTypes = {
  className: PropTypes.string,
  yogaClass: PropTypes.string,
  yoga2: PropTypes.string,

  /** Style props */
  propFlex: PropTypes.any,
  propWidth: PropTypes.any,
  propAlignSelf: PropTypes.any,
  propAlignSelf1: PropTypes.any,
};

export default BlankBlock1;
