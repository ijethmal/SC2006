import "./UserPage.css";
import NaviBar from "../components/NaviBar";
import UserHeader from "../components/UserHeader";
import EventList from "../components/EventList";
import InterestGroup from "../components/InterestGroup";
import { getAllEvents } from "../api/EventService";

const UserPage = () => {
    // calling api here
    


    const userData = {
        id: "12345",
        name: "MrBeast",
        email: "mrbeast@gmail.com",
        location: "Boon Lay",
        password: "securePassword123",
        photoUrl:
            "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        groups: ["Basketball Hall 2", "Baking At 5:30", "Dancing In the Dark"],
        bio: "Hello I am MrBeast, I donate money for monkey",
        events: {
            "Birthday Party": 2024,
            "Charity Event": 2025,
            "Cooking Class": 2024,
        },
    };

    const userGroups = {}

    return (
        <div className="user-web-page">
            <NaviBar />
            <div className="page-wrapper">
                <UserHeader />
                <div className="avt-info">
                    <div className="img-wrapper">
                        <img
                            src={userData.photoUrl}
                            className="profile-picture"
                            alt="Profile"
                        />
                    </div>

                    <div className="name-info">
                        <div className="profile-name">
                            {userData.name.toUpperCase()}
                        </div>
                        <div className="bio">
                            <i>{userData.bio}</i>
                        </div>
                    </div>
                </div>
                <div className="location-email">
                    <div className="location">
                        <h3>🗺️ {userData.location}</h3>
                    </div>
                    <div className="profile-links">
                        <h3>
                            🖥&nbsp;
                            <a
                                href="https://mail.google.com/mail/u/0/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {userData.email}
                            </a>
                        </h3>
                    </div>
                    <button className="purple-button">Settings ⚙️</button>
                </div>
                
                {/* SHOWING CURRENT INTERSETS GROUPS AND CURRENT EVENTS */}
                <div className="events_groups">
                    <div className="events">
                        <h2>My upcomming events !</h2>
                        <EventList events={userData.events} />
                    </div>
                    <div className="groups">
                        <h2>My current groups</h2>
                        <InterestGroup/>
                        <InterestGroup/>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UserPage;
