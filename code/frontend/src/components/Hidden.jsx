import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./Hidden.css";

const Hidden = ({ className = "" }) => {
  const navigate = useNavigate();

  const onHomeContainerClick = useCallback(() => {
    navigate("/community-web-page");
  }, [navigate]);

  const onExploreContainerClick = useCallback(() => {
    navigate("/explore-web-page");
  }, [navigate]);

  const onProfileContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onSettingContainerClick = useCallback(() => {
    navigate("/setting-web-page");
  }, [navigate]);

  return (
    <div className={`hidden ${className}`}>
      <div className="home-wrapper">
        <div className="home" onClick={onHomeContainerClick}>
          <img
            className="vector-icon4"
            loading="lazy"
            alt=""
            src="/vector.svg"
          />
          <div className="home-container">
            <b className="home1">Home</b>
          </div>
        </div>
      </div>
      <div className="explore-wrapper">
        <div className="explore" onClick={onExploreContainerClick}>
          <img
            className="vector-icon5"
            loading="lazy"
            alt=""
            src="/vector-1.svg"
          />
          <div className="explore-container">
            <b className="home1">Explore</b>
          </div>
        </div>
      </div>
      <div className="profile-wrapper">
        <div className="profile" onClick={onProfileContainerClick}>
          <img
            className="profile-icon"
            loading="lazy"
            alt=""
            src="/profile.svg"
          />
          <b className="profile1">Profile</b>
        </div>
      </div>
      <div className="setting1" onClick={onSettingContainerClick}>
        <img
          className="vector-icon6"
          loading="lazy"
          alt=""
          src="/vector-2.svg"
        />
        <div className="setting-wrapper">
          <b className="home1">Setting</b>
        </div>
      </div>
    </div>
  );
};

Hidden.propTypes = {
  className: PropTypes.string,
};

export default Hidden;
