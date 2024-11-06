import "./SubmitEventPage.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../api/EventService";
import { getAllGroups } from "../api/GroupService";
import { useLocation } from "react-router-dom";
import { getInterestGroupById } from "../api/GroupService";
import { addEventToGroup } from "../api/GroupService";

const SubmitEventPage = (props) => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const location = useLocation();
    const groupId = location.state?.groupId;

    const [group, setGroup] = useState({});
    const [eventData, setEventData] = useState({
        eventDate: "",
        eventTime: "",
        title: "",
        details: "",
        group: "",
        facility: "",
        isActiveSg: true,
        eventUrl: "",
        location: "",
        imgUrl: "",
    });

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const data = await getInterestGroupById(groupId);
                setGroup(data); // Set fetched group data
            } catch (error) {
                console.error("Error fetching group data:", error);
            }
        };

        if (groupId) {
            // Ensure groupId is defined before fetching
            fetchGroup();
        }
    }, [groupId]); // Add groupId as a dependency

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async () => {
        // Convert date and time to timestamp
        const datetimeString = `${eventData.eventDate}T${eventData.eventTime}:00`;
        const timestamp = new Date(datetimeString).getTime();

        // Create the event payload
        const eventPayload = {
            time: timestamp,
            title: eventData.title,
            details: eventData.details,
            facility: eventData.facility,
            isActiveSg: true,
            eventUrl: eventData.eventUrl,
            location: eventData.location,
            imgUrl: eventData.imgUrl,
        };

        console.log("Creating event with payload:", eventPayload);

        try {
            // Step 1: Create the event
            const response = await createEvent(eventPayload);

            if (response.status === 201) {
                const createdEvent = response.data; // Assuming `response.data` contains the created event details
                const eventId = createdEvent.id; // Assuming the event's ID is returned as `id`
                


                console.log(createdEvent)
                console.log(eventId)
                console.log(groupId)
                // Step 2: Add the event to the specified group
                try {
                    await addEventToGroup(groupId, eventId);
                    console.log("Event successfully added to group");

                    // Show success popup and navigate
                    setShowPopup(true);
                    setTimeout(() => {
                        setShowPopup(false);
                        navigate("/community-web-page");
                    }, 2000);
                } catch (error) {
                    console.error("Failed to add event to group:", error);
                }
            } else {
                console.error("Failed to create event");
            }
        } catch (error) {
            console.error("Error creating event:", error);
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
                        <div className="icon">🗽</div>
                        This event belongs to groups: {group.name}
                    </div>
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
