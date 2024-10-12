import { useMemo } from "react";
import PropTypes from "prop-types";
import "./FrameComponent.css";

const FrameComponent = ({
  className = "",
  propGap,
  propHeight,
  propPadding,
  propAlignSelf,
  propWidth,
  cookingClassZoneH,
  propGap1,
  propWidth1,
  cook2,
  propMinWidth,
  discoverTheJoyOfCookingWith,
  andHaveFun,
  wwwChefMClassesnet,
  frameDivAlignItems,
  frameDivJustifyContent,
}) => {
  const frameDivStyle = useMemo(() => {
    return {
      gap: propGap,
      height: propHeight,
      padding: propPadding,
      alignItems: frameDivAlignItems,
    };
  }, [propGap, propHeight, propPadding, frameDivAlignItems]);

  const frameDiv1Style = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      width: propWidth,
      justifyContent: frameDivJustifyContent,
    };
  }, [propAlignSelf, propWidth, frameDivJustifyContent]);

  const frameDiv2Style = useMemo(() => {
    return {
      gap: propGap1,
    };
  }, [propGap1]);

  const frameDiv3Style = useMemo(() => {
    return {
      width: propWidth1,
    };
  }, [propWidth1]);

  const discoverTheJoyContainerStyle = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  return (
    <div className={`poster-inner ${className}`}>
      <div className="frame-parent4" style={frameDivStyle}>
        <div className="cooking-class-zone-h-wrapper" style={frameDiv1Style}>
          <b className="cooking-class-zone">{cookingClassZoneH}</b>
        </div>
        <div className="frame-parent5" style={frameDiv2Style}>
          <div className="cook-2-container" style={frameDiv3Style}>
            <img className="cook-2-icon1" loading="lazy" alt="" src={cook2} />
          </div>
          <div className="line-div" />
          <div
            className="discover-the-joy-container"
            style={discoverTheJoyContainerStyle}
          >
            <p className="discover-the-joy">{discoverTheJoyOfCookingWith}</p>
            <p className="discover-the-joy">{andHaveFun}</p>
            <p className="discover-the-joy">&nbsp;</p>
            <p className="wwwchefmclassesnet">{wwwChefMClassesnet}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
  cookingClassZoneH: PropTypes.string,
  cook2: PropTypes.string,
  discoverTheJoyOfCookingWith: PropTypes.string,
  andHaveFun: PropTypes.string,
  wwwChefMClassesnet: PropTypes.string,

  /** Style props */
  propGap: PropTypes.any,
  propHeight: PropTypes.any,
  propPadding: PropTypes.any,
  propAlignSelf: PropTypes.any,
  propWidth: PropTypes.any,
  propGap1: PropTypes.any,
  propWidth1: PropTypes.any,
  propMinWidth: PropTypes.any,
  frameDivAlignItems: PropTypes.any,
  frameDivJustifyContent: PropTypes.any,
};

export default FrameComponent;
