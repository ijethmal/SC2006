import NaviBar from "../components/NaviBar";
import Poster from "../components/Poster";
import "./CommunityWebPage.css";

const CommunityWebPage = () => {
  return (
    <div className="community-web-page">
      <NaviBar />
      <main className="wallpaper-frame">
        
        {/* <div className="location-changer-wrapper">
          <LocationChanger />
        </div> */}
        

        <Poster />
      </main>
    </div>
  );
};

export default CommunityWebPage;
