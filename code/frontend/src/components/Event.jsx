import React, { useState } from "react";
import "./Event.css";
import { joinEvent } from "../api/EventService";
import { getUserByEmail, getUserNameById } from "../api/UserService";
import { useEffect } from "react";

const Event = (props) => {
    // to do in this function: get the event from props, if it's joined, then just show the button
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isJoined, setIsJoined] = useState(false); // for user joining part
    const [showPopup, setShowPopup] = useState(false);
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
    const [names, setNames] = useState([]);
    const dummy_event = props.event;
    // const dummy_event = {
    //     id: "12345",
    //     time: 1698787200000,
    //     title: "Play basketball",
    //     details: "This is a special event for all members!",
    //     attendees: ["John Doe", "Jane Smith", "Alice Johnson"],
    //     numAttendees: 10,
    //     group: "Community Group A",
    //     facility: "Gym",
    //     isActiveSg: true,
    //     eventUrl: "https://www.google.com",
    //     location: "Boon Lay",
    //     imgUrl: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x4.jpg",
    //     distance: 1.5,
    // };

    useEffect(() => {
        getUserByEmail("mrbeast@gmail.com").then((data) => {
            setUserData(data);
        });
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    

    useEffect(() => {
        const processName = async () => {
            const ids = Object.keys(dummy_event.attendees);

            try {
                // fetch all names
                const fetchedNames = await Promise.all(
                    ids.map(async (id) => {
                        const name = await getUserNameById(id);
                        return name;
                    })
                );

                // set state
                setNames(fetchedNames);
            } catch (error) {
                console.error("Error fetching names:", error);
            }
        };

        // call the function
        processName();
    }, [dummy_event.attendees]);

    function formatTimestamp(timestamp) {
        // Convert seconds to milliseconds if needed
        const date = new Date(timestamp * 1000); 
    
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
    
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");
    
        return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    }
    
    

    const handleJoinClick = async () => {
        setIsJoined(true);
        setShowPopup(true);
        const respone = await joinEvent(dummy_event.id, userData.id);
        setTimeout(() => {
            setShowPopup(false);
        }, 2000);
    };

    return (
        <div className="post-card">
            <div className="post-header" onClick={openModal}>
                <h3>{dummy_event.title}</h3>
                {isModalOpen && (
                    <div className="modal" onClick={closeModal}>
                        <div
                            className="modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <span className="close" onClick={closeModal}>
                                &times;
                            </span>
                            <div className="event-details-container">
                                <div className="event-modal-name">
                                    <div>
                                        <h2>{dummy_event.title}</h2>
                                    </div>
                                </div>
                                <div className="event-modal-details">
                                    <div>{dummy_event.details}</div>
                                </div>
                                <h3>Details</h3>
                                <div className="event-modal-user">
                                    Attendees:{" "}
                                    {names.join(", ") || "No attendees yet"}
                                </div>
                                <div className="event-modal-num-att">
                                    Number of Attendees:{" "}
                                    {dummy_event.numAttendees}
                                </div>
                                <div className="event-modal-group">
                                    Group: {dummy_event.group}
                                </div>
                                <div className="event-modal-facility">
                                    Facility: {dummy_event.facility}
                                </div>
                                <div className="event-modal-location">
                                    Location: {dummy_event.location}
                                </div>
                                <div className="event-modal-url">
                                    <a href={dummy_event.eventUrl}>
                                        Event URL : Click here
                                    </a>
                                </div>
                                <div className="joining">
                                    <button
                                        className="join-button"
                                        onClick={handleJoinClick}
                                        disabled={isJoined}
                                    >
                                        {isJoined ? "Joined" : "Join"}
                                    </button>

                                    <button
                                        className="join-close"
                                        onClick={closeModal}
                                    >
                                        Close
                                    </button>
                                </div>
                                {showPopup && (
                                    <div className="popup">
                                        <p>Joined successfully</p>
                                        <div className="progress-bar-container">
                                            <div className="progress-bar"></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="post-content">
                <p>{dummy_event.details}</p>
            </div>
            <div className="img-container">
                <img
                    className="post-image"
                    src={dummy_event.imgUrl}
                    alt="Post"
                />
            </div>

            <div className="post-footer">
                <div className="reactions">
                    🕰️ {formatTimestamp(dummy_event.time)}
                </div>
                <div className="comments"> 🗺️ {dummy_event.location} </div>
                <div className="shares">
                    🔗 {dummy_event.numAttendees} Attendees
                </div>
            </div>
        </div>
    );
};

export default Event;
