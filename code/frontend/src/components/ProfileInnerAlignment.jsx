import BlankBlock1 from "./BlankBlock1";
import PropTypes from "prop-types";
import "./ProfileInnerAlignment.css";

const ProfileInnerAlignment = ({ className = "" }) => {
  return (
    <section className={`profile-inner-alignment ${className}`}>
      <div className="dp-name-wrapper">
        <div className="dp-name">
          <h1 className="susan">Susan</h1>
          <div className="group-wrapper">
            <input className="group" type="checkbox" />
          </div>
        </div>
      </div>
      <div className="frame-parent11">
        <div className="blank-block-wrapper">
          <div className="blank-block2">
            <div className="bukit-batok1">
              <div className="carbonlocation-filled-wrapper">
                <img
                  className="carbonlocation-filled-icon1"
                  alt=""
                  src="/carbonlocationfilled1.svg"
                />
              </div>
              <div className="bukit-batok2">Bukit Batok</div>
            </div>
          </div>
        </div>
        <div className="interest-header-parent">
          <div className="interest-header">
            <i className="interests">Interests</i>
          </div>
          <div className="blank-block3">
            <div className="interest-block">
              <div className="gym">Gym</div>
            </div>
            <div className="interest-block">
              <div className="gym">Yoga</div>
            </div>
            <div className="interest-block2">
              <div className="gym2">Cooking</div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-inner-alignment-inner">
        <div className="frame-parent12">
          <div className="group-container">
            <i className="group1">
              <p className="groups">Groups</p>
            </i>
          </div>
          <div className="blank-block-group">
            <BlankBlock1 yogaClass="Yoga class" yoga2="/yoga-23@2x.png" />
            <BlankBlock1
              propFlex="0.9548"
              propWidth="unset"
              propAlignSelf="stretch"
              yogaClass="Cooking class"
              yoga2="/cook-1@2x.png"
              propAlignSelf1="stretch"
            />
          </div>
        </div>
      </div>
      <div className="whitespace-wrapper">
        <div className="whitespace" />
      </div>
    </section>
  );
};

ProfileInnerAlignment.propTypes = {
  className: PropTypes.string,
};

export default ProfileInnerAlignment;
