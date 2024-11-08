import "./UserPage.css";
import NaviBar from "../components/NaviBar";
import UserHeader from "../components/UserHeader";
import EventList from "../components/EventList";
import InterestGroup from "../components/InterestGroup";
import { getAllEventsByUserID } from "../api/EventService";
import { getAllGroupsByUserId } from "../api/GroupService";
import { getUserByEmail } from "../api/UserService";
import { useState, useEffect } from "react";

const UserPage = () => {
    const isUserPage = true;

    // calling api here
    const [events, setEvents] = useState([]);
    const [groups, setGroups] = useState([]);
    const [userData, setUserData] = useState({
        id: "",
        name: "",
        email: "",
        location: "",
        photoUrl: "",
        groups: [],
        bio: "",
        events: [],
    });

    useEffect(() => {
        getUserByEmail("mrbeast@gmail.com").then((data) => {
            setUserData(data);
        });
    }, []);
    useEffect(() => {
        if (userData?.id) {
            getAllGroupsByUserId(userData.id).then((data) => {
                setGroups(data);
            });
        }
    }, [userData]);
    useEffect(() => {
        if (userData?.id) {
            getAllEventsByUserID(userData.id).then((data) => {
                setEvents(data);
            });
        }
    }, [userData]);

   

    // const userData = {
    //     name: "MrBeast",
    //     email: "mrbeast@gmail.com",
    //     location: "Boon Lay",
    //     password: "securePassword123",
    //     photoUrl:
    //         "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
    //     groups: ["Basketball Hall 2", "Baking At 5:30", "Dancing In the Dark"],
    //     bio: "Hello I am MrBeast, I donate money for monkey",
    //     events: {
    //         "Birthday Party": 2024,
    //         "Charity Event": 2025,
    //         "Cooking Class": 2024,
    //     },
    // };

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
                        <EventList events={events} isUserPage={isUserPage}/>
                    </div>
                    <div className="groups">
                        <h2>My current groups</h2>
                        {groups.map((group, index) => {
                            return <InterestGroup group={group} key={index} isUserPage={isUserPage}/>;
                        })}
                        <div className="submit-group">
                            <a
                                className="purple-button anchor" 
                                href="/submit-group"
                            >
                                Create Group 🛠️
                                
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UserPage;
