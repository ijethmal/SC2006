import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType, // returns the type of navigation action
  useLocation, // for current URL path
} from "react-router-dom";
import LoginWebpage from "./pages/LoginWebpage";
import UserProfile from "./pages/UserProfile";
import SettingWebPage from "./pages/SettingWebPage";
import CommunityWebPage from "./pages/CommunityWebPage";
import MapBoxSearch from "./pages/MapBoxSearch";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import Registration from "./pages/Registration";



function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "Main Page";
        break;
      case "/setting-web-page":
        title = "Settings 🔩";
        metaDescription = "";
        break;
      case "/community-web-page":
        title = "";
        metaDescription = "Community Page 👯";
        break;
      case "/explore-web-page":
        title = "Explore 🚗";
        metaDescription = "";
        break;
      case "/registration":
        title = "Registration 🤝";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<LoginWebpage />} />
      <Route path="/user-profile" element={<UserPage />} />
      <Route path="/setting-web-page" element={<SettingWebPage />} />
      <Route path="/community-web-page" element={<HomePage />} />
      <Route path="/explore-web-page" element={<MapBoxSearch />} />
      <Route path="/registration" element={<Registration />} />
      
      {/* <Route path="/test-page" element={<TestPage />} /> */}
      
    </Routes>
  );
}
export default App;
