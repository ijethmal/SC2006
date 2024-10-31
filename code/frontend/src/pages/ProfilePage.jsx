import React from "react";
import "./ProfilePage.css";
import InterestsBar from "../components/InterestsBar";
import EventList from "../components/EventList";
import NaviBar from "../components/NaviBar";

const ProfilePage = () => {
    const userData = {
        name: "MrBeast",
        email: "mrbeast@gmail.com",
        location: "Boon Lay",
        photoUrl:
            "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        groups: ["Basketball Hall 2", "Baking At 5:30", "Dancing In the dark"],
        desc: "Hello I am MrBeast I donate money for monkey",
        interests: ["Cooking", "Baking", "Dancing"],
    };

    const events = [
        {
            time_start: "20-10-2024",
            details: "First person to arrive gets a free gift",
            attendees: "10",
            group: "Mr Beast group",
            facility: "Gym",
            photoUrl:
                "https://marketing-cdn.tickettailor.com/ZgP1j7LRO5ile62O_HowdoyouhostasmallcommunityeventA10-stepguide%2CMiniflagsattheevent.jpg?auto=format,compress",
        },
        {
            time_start: "20-10-2024",
            details: "First person to arrive gets a free gift",
            attendees: "10",
            group: "Mr Beast group",
            facility: "Gym",
            photoUrl:
                "https://marketing-cdn.tickettailor.com/ZgP1j7LRO5ile62O_HowdoyouhostasmallcommunityeventA10-stepguide%2CMiniflagsattheevent.jpg?auto=format,compress",
        },
        {
            time_start: "20-10-2024",
            details: "First person to arrive gets a free gift",
            attendees: "10",
            group: "Mr Beast group",
            facility: "Gym",
            photoUrl:
                "https://marketing-cdn.tickettailor.com/ZgP1j7LRO5ile62O_HowdoyouhostasmallcommunityeventA10-stepguide%2CMiniflagsattheevent.jpg?auto=format,compress",
        },{
            time_start: "20-10-2024",
            details: "First person to arrive gets a free gift",
            attendees: "10",
            group: "Mr Beast group",
            facility: "Gym",
            photoUrl:
                "https://marketing-cdn.tickettailor.com/ZgP1j7LRO5ile62O_HowdoyouhostasmallcommunityeventA10-stepguide%2CMiniflagsattheevent.jpg?auto=format,compress",
        },
    ];
    const interestGroup = {
        name: "Cooking",
        activityType: "Cooking",
        location: "Boon Lay",
        createdBy: "Mr Beast",
    };
    return (
        <div className="profilePage">
            <NaviBar className="nav"></NaviBar>
            <div className="profileWrapper">
                {/* // this part is profile heeader */}
                <div className="profile-header">
                    <div className="profileInfo">
                        <img
                            src={userData.photoUrl}
                            className="profile-picture"
                            alt="Profile"
                        />
                        <div className="profile-name">
                            {userData.name.toUpperCase()}
                        </div>
                        <div className="profile-tagline">{userData.desc}</div>
                        <div className="location">
                            <h3>🗺️ {userData.location}</h3>
                        </div>
                        <div className="profile-links">
                            🖥&nbsp;
                            <a
                                href="https://www.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "blue" }}
                            >
                                {userData.email}
                            </a>
                        </div>
                    </div>
                    <div
                    className="profileInterest">
                        <div className="interests-and-groups">
                        <div className="interests">
                            <h2>My Interests</h2>
                            <div className="interests-list">
                                <InterestsBar
                                    key={userData.interests}
                                    interest={userData.interests}
                                    name="Interests"
                                />
                            </div>
                        </div>
                        <div className="groups">
                            <h2>My Groups</h2>
                            <div className="interests-list">
                                <InterestsBar
                                    key={userData.groups}
                                    interest={userData.groups}
                                    name="Groups"
                                />
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                {/* This part for user body */}
                <div className="profile-body">
                    <div className="events">
                        <h2>Upcomming events</h2>
                        <div className="event-list">
                            <EventList events={events} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
