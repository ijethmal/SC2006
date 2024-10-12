import FrameComponent from "./FrameComponent";
import PropTypes from "prop-types";
import "./Poster.css";

const Poster = ({ className = "" }) => {
  return (
    <div className={`poster ${className}`}>
      <div className="group-page-bg" />
      <div className="group-interests-near-you-wrapper">
        <div className="group-interests-near">Group Interests near you</div>
      </div>
      <FrameComponent
        cookingClassZoneH="Cooking class Zone H"
        cook2="/cook-2@2x.png"
        discoverTheJoyOfCookingWith={`"Discover the joy of cooking with our hands-on classes, where you'll master delicious recipes in no time! Join us `}
        andHaveFun={` and have fun!"`}
        wwwChefMClassesnet="www.ChefMClasses.net"
      />
      <div className="frame-parent6">
        <div className="yoga-class-zone-f-wrapper">
          <b className="yoga-class-zone">Yoga class Zone F</b>
        </div>
        <div className="frame-parent7">
          <div className="yoga-2-wrapper">
            <img
              className="yoga-2-icon1"
              loading="lazy"
              alt=""
              src="/yoga-2@2x.png"
            />
          </div>
          <div className="frame-child3" />
          <div className="find-your-inner-container">
            <p className="find-your-inner">
              "Find your inner peace and strength with our rejuvenating yoga
              classes. Join us to elevate your mind, body, and spirit!"
            </p>
            <p className="find-your-inner">&nbsp;</p>
            <p className="wwwyogabliss101com">www.YogaBliss101.com</p>
          </div>
        </div>
      </div>
      <FrameComponent
        propGap="23.3px"
        propHeight="2.6px"
        propPadding="0px 0px 0px"
        propAlignSelf="unset"
        propWidth="568px"
        cookingClassZoneH="Volunteering Zone A"
        propGap1="7.1px"
        propWidth1="258.3px"
        cook2="/yoga-3@2x.png"
        propMinWidth="211px"
        discoverTheJoyOfCookingWith={`"Make a difference in your community—join our volunteer team today `}
        andHaveFun="and be the change you want to see!”"
        wwwChefMClassesnet="www.CommunityHelpers.org"
        frameDivAlignItems="flex-end"
        frameDivJustifyContent="flex-end"
      />
      <div className="create-group-button-wrapper">
        <div className="create-group-button">
          <div className="create-group-button-child" />
          <div className="create-new-group">Create new group</div>
        </div>
      </div>
    </div>
  );
};

Poster.propTypes = {
  className: PropTypes.string,
};

export default Poster;
