import { useMemo } from "react";
import PropTypes from "prop-types";
import "./EventItems.css";

const EventItems = ({
  className = "",
  cookingShowcase19,
  propTextDecoration,
  yoga2,
}) => {
  const cookingShowcase19Style = useMemo(() => {
    return {
      textDecoration: propTextDecoration,
    };
  }, [propTextDecoration]);

  return (
    <div className={`event-items ${className}`}>
      <div className="event-items-child" />
      <a className="cooking-showcase-19" style={cookingShowcase19Style}>
        {cookingShowcase19}
      </a>
      <div className="event-activities">
        <img className="yoga-2-icon2" loading="lazy" alt="" src={yoga2} />
      </div>
    </div>
  );
};

EventItems.propTypes = {
  className: PropTypes.string,
  cookingShowcase19: PropTypes.string,
  yoga2: PropTypes.string,

  /** Style props */
  propTextDecoration: PropTypes.any,
};

export default EventItems;
