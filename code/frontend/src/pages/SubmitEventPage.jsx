import "./SubmitEventPage.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../api/EventService";
import { getAllGroups } from "../api/GroupService";

const SubmitEventPage = () => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [groups, setGroups] = useState([]);
    const [eventData, setEventData] = useState({
        eventDate: "",
        eventTime: "",
        title: "",
        details: "",
        attendees: {
            "Captain America": 1,
            "Black Adam": 1,
            "Thor": 1,
        },
        numAttendees: "",
        group: "",
        facility: "",
        isActiveSg: true,
        eventUrl: "",
        location: "",
        imgUrl: "",
    });

    useEffect(() => {
        getAllGroups().then((data) => {
            setGroups(data.content);
        });
    }, []);
    console.log(groups);
    

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async () => {
        // convert to timestamp
        const datetimeString = `${eventData.eventDate}T${eventData.eventTime}:00`;
        const timestamp = new Date(datetimeString).getTime();

        // create object to send
        const eventPayload = {
            time: timestamp,
            title: eventData.title,
            details: eventData.details,
            attendees: eventData.attendees,
            group: eventData.group,
            facility: eventData.facility,
            isActiveSg: eventData.isActiveSg,
            eventUrl: eventData.eventUrl,
            location: eventData.location,
            imgUrl: eventData.imgUrl,
        };

        try {
            const response = await createEvent(eventPayload);

            if (response.status === 201) {
                // if 201 then okay
                setShowPopup(true);
                setTimeout(() => {
                    setShowPopup(false);
                    navigate("/community-web-page");
                }, 2000);
            } else {
                console.error("Failed to create event");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="submit-page-container">
            <div className="event-submit-container">
                <div className="header-event-submit">
                    <div className="text-submit">Submit New Event</div>
                    <div className="underline-text"></div>
                    {showPopup && (
                        <div className="popup-event-page">
                            <p>Joined successfully</p>
                            <div className="progress-bar-container-event-page">
                                <div className="progress-bar"></div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="inputs-field">
                    <div className="input-child">
                        <div className="icon">📅</div>
                        <input
                            type="date"
                            name="eventDate"
                            value={eventData.eventDate}
                            onChange={handleChange}
                            placeholder="Select Date"
                        />
                    </div>
                    <div className="input-child">
                        <div className="icon">⏰</div>
                        <input
                            type="time"
                            name="eventTime"
                            value={eventData.eventTime}
                            onChange={handleChange}
                            placeholder="Select Time"
                        />
                    </div>
                    <div className="input-child">
                        <div className="icon">📕</div>
                        <input
                            type="text"
                            name="title"
                            value={eventData.title}
                            onChange={handleChange}
                            placeholder="Title"
                        />
                    </div>
                    <div className="input-child">
                        <div className="icon">📜</div>
                        <input
                            type="text"
                            name="details"
                            value={eventData.details}
                            onChange={handleChange}
                            placeholder="Details"
                        />
                    </div>
                    <div className="input-child">
                        <div className="icon">🗽</div>
                        <select
                            type="text"
                            name="group"
                            value="{eventData.group}"
                            onChange={(e) => handleGroupSelect(e.target.value)}
                        >
                            {groups.map((group, index) => {
                                return (
                                    <option key={index} value={group.name}>
                                        {group.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="input-child">
                        <div className="icon">🏡</div>
                        <input
                            type="text"
                            name="facility"
                            value={eventData.facility}
                            onChange={handleChange}
                            placeholder="Facility"
                        />
                    </div>
                    {/* <div className="input-child">
                        <div className="icon">🌞</div>
                        <input 
                            type="checkbox" 
                            name="isActiveSg" 
                            checked={eventData.isActiveSg} 
                            onChange={handleChange} 
                        />
                    </div> */}
                    <div className="input-child">
                        <div className="icon">🔗</div>
                        <input
                            type="text"
                            name="eventUrl"
                            value={eventData.eventUrl}
                            onChange={handleChange}
                            placeholder="Event Link"
                        />
                    </div>
                    <div className="input-child">
                        <div className="icon">📍</div>
                        <input
                            type="text"
                            name="location"
                            value={eventData.location}
                            onChange={handleChange}
                            placeholder="Location"
                        />
                    </div>
                    <div className="input-child">
                        <div className="icon">🩻</div>
                        <input
                            type="text"
                            name="imgUrl"
                            value={eventData.imgUrl}
                            onChange={handleChange}
                            placeholder="Image URL"
                        />
                    </div>
                </div>
                <div className="submit-event-container">
                    <div
                        className="submit"
                        onClick={handleSubmit}
                        style={{ cursor: "pointer" }}
                    >
                        Create !!! 🐱
                    </div>
                    <div
                        className="submit"
                        onClick={() => navigate("/community-web-page")}
                        style={{ cursor: "pointer" }}
                    >
                        Next Time 😿
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmitEventPage;
