import NaviBar from "../components/NaviBar";
import ProfileInnerAlignment from "../components/ProfileInnerAlignment";
import "./UserProfile.css";

const UserProfile = () => {
  return (
    <div className="user-profile">
      <NaviBar />
      <main className="content1">
        <section className="profile-header">
          <img
            className="placeholder-one-icon"
            alt="backgrond picture"
            src="/placeholder-one@2x.png"
          />
          <img
            className="avatar"
            loading="lazy"
            alt="avatar of user"
            src="/frame-7@2x.png"
          />
        </section>
        <ProfileInnerAlignment />
      </main>
    </div>
  );
};

export default UserProfile;
