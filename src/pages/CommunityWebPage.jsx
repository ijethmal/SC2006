import NaviBar from "../components/NaviBar";
import LocationChanger from "../components/LocationChanger";
import Poster from "../components/Poster";
import "./CommunityWebPage.css";

const CommunityWebPage = () => {
  return (
    <div className="community-web-page">
      <NaviBar />
      <main className="wallpaper-frame">
        <img className="wallpaper2-icon" alt="" src="/wallpaper2@2x.png" />
        <div className="location-changer-wrapper">
          <LocationChanger />
        </div>
        <Poster />
      </main>
    </div>
  );
};

export default CommunityWebPage;
