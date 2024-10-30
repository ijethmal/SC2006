import NaviBar from "../components/NaviBar";
import EventItems from "../components/EventItems";
import "./GroupWebPage.css";

const GroupWebPage = () => {
  return (
    <div className="group-web-page">
      <div className="navi-bar-parent">
        <NaviBar />
        <div className="frame-wrapper">
          <div className="frame-group">
            <div className="cook-2-wrapper">
              <img
                className="cook-2-icon"
                loading="lazy"
                alt=""
                src="/cook-21@2x.png"
              />
            </div>
            <div className="frame-container">
              <div className="description-parent">
                <i className="description">Description</i>
                <div className="unlock-the-secrets">
                  "Unlock the secrets of gourmet cooking with our interactive,
                  hands-on classes. Learn from expert chefs as you craft
                  mouthwatering dishes and elevate your everyday meals. Our
                  classes offer personalized tips, techniques, and recipes that
                  will turn your kitchen into a culinary haven. Join us now and
                  start your culinary journey!
                </div>
              </div>
              <div className="class-availablity-wrapper">
                <div className="class-availablity">
                  <div className="class-availablity-child" />
                  <div className="rectangle-group">
                    <div className="rectangle-div" />
                    <div className="class-availbility">Class Availbility</div>
                  </div>
                  <div className="class-availablity-inner">
                    <div className="frame-div">
                      <div className="frame-wrapper1">
                        <div className="frame-parent1">
                          <div className="frame-wrapper2">
                            <div className="frame-parent2">
                              <div className="ellipse-parent">
                                <div className="ellipse-div" />
                                <div className="frame-child1" />
                              </div>
                              <div className="frame-child2" />
                            </div>
                          </div>
                          <div className="every-tuesday-1800-2000-parent">
                            <div className="every-tuesday-1800">
                              Every Tuesday 1800 - 2000
                            </div>
                            <div className="every-thursday-1800">
                              Every Thursday 1800 - 2000
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="join">
                        <div className="join-child" />
                        <div className="join1">Join</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="group-web-page-inner">
        <div className="frame-parent3">
          <div className="upcoming-events-wrapper">
            <a className="upcoming-events">Upcoming Events</a>
          </div>
          <div className="event-items-parent">
            <EventItems
              cookingShowcase19="Cooking Showcase (1/9)"
              yoga2="/yoga-22@2x.png"
            />
            <EventItems
              cookingShowcase19="Chalet @Sentosa (1/9)"
              propTextDecoration="unset"
              yoga2="/yoga-311@2x.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupWebPage;
