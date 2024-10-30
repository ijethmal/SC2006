import NaviBar from "../components/NaviBar";
import FrameComponent1 from "../components/FrameComponent1";
import "./ExploreWebPage.css";

const ExploreWebPage = () => {
  return (
    <div className="explore-web-page">
      <NaviBar />
      <main className="wallpaper-frame1">
        <img className="wallpaper2-icon1" alt="" src="/wallpaper2@2x.png" />
        <section className="search-bar-wrapper">
          <div className="search-bar">
            <img
              className="vector-icon3"
              loading="lazy"
              alt=""
              src="/vector-32.svg"
            />
            <div className="what-would-you-like-to-find-wrapper">
              <div className="what-would-you">
                What would you like to search
              </div>
            </div>
          </div>
        </section>
        <section className="frame-parent">
          <FrameComponent1 />
          <div className="result-bar-wrapper">
            <div className="result-bar">
              <img
                className="result-bar-child"
                alt=""
                src="/rectangle-25.svg"
              />
              <input className="result" placeholder="Result" type="text" />
            </div>
          </div>
          <div className="rectangle-parent">
            <div className="frame-child" />
            <div className="frame-child" />
            <div className="frame-child" />
          </div>
        </section>
        <img
          className="yoga-1-icon"
          loading="lazy"
          alt=""
          src="/yoga-1@2x.png"
        />
        <div className="yoga-class-5km">Yoga class (5km)</div>
        <img
          className="yoga-2-icon"
          loading="lazy"
          alt=""
          src="/yoga-21@2x.png"
        />
        <div className="yoga-class-5km1">Yoga class (5km)</div>
        <img
          className="yoga-3-icon"
          loading="lazy"
          alt=""
          src="/yoga-31@2x.png"
        />
        <div className="yoga-class-5km2">Yoga class (5km)</div>
      </main>
    </div>
  );
};

export default ExploreWebPage;
