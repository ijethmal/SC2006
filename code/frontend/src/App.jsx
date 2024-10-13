import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import LoginWebpage from "./pages/LoginWebpage";
import UserProfile from "./pages/UserProfile";
import SettingWebPage from "./pages/SettingWebPage";
import CommunityWebPage from "./pages/CommunityWebPage";
import ExploreWebPage from "./pages/ExploreWebPage";
import GroupWebPage from "./pages/GroupWebPage";
import TestPage from "./pages/TestPage";

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
        metaDescription = "";
        break;
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/setting-web-page":
        title = "";
        metaDescription = "";
        break;
      case "/community-web-page":
        title = "";
        metaDescription = "";
        break;
      case "/explore-web-page":
        title = "";
        metaDescription = "";
        break;
      case "/group-web-page":
        title = "";
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
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/setting-web-page" element={<SettingWebPage />} />
      <Route path="/community-web-page" element={<CommunityWebPage />} />
      <Route path="/explore-web-page" element={<ExploreWebPage />} />
      <Route path="/group-web-page" element={<GroupWebPage />} />
      <Route path="/test-page" element={<TestPage />} />
    </Routes>
  );
}
export default App;
