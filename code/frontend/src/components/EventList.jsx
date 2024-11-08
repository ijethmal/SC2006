import React from "react";
import "./EventList.css";
import { useState } from "react";
import {leaveEvent} from "../api/EventService";
import { getUserByEmail } from "../api/UserService";
import { useEffect } from "react";
import { joinEvent } from "../api/EventService";

function EventList(props) {
    const isUserPage = props.isUserPage || false;
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

    // passing a list of events as props    
    // const events = [
    //     {
    //         id: "12345",
    //         time: 1698787200000,
    //         title: "Play basketball",
    //         details: "This is a special event for all members!",
    //         attendees: {
    //             "Kyrie Irving": 1,
    //             "Luka Doncic": 1,
    //         },
    //         numAttendees: 10,
    //         group: "Community Group A",
    //         facility: "Gym",
    //         isActiveSg: true,
    //         eventUrl: "https://www.google.com",
    //         location: "Boon Lay",
    //         imgUrl: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x4.jpg",
    //     },
    // ];
    const events = props.events;

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);

        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); 
        const year = date.getFullYear();

        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    const handleLeaveEvent = async (event_id) => {
        const respone = await leaveEvent(event_id, userData.id);
        if (respone) {
            alert("Left event successfully");
        }
        else{
            alert("Error leaving event");
        }
    }

    const handleJoinEvent = async (event_id) => {
        const response = await joinEvent(event_id, userData.id);
        if (response) {
            alert("Joined event successfully");
        }
        else{
            alert("Error joining event");
        }         
    }


    return (
        <div className="event-list">
            {events.map((event, index) => (
                <div key={index} className="event-card">
                    <img
                        src={event.imgUrl}
                        alt="Event"
                        className="event-image"
                    />
                    <div className="event-content">
                        <h3 className="event-title">{event.title}</h3>
                        <p>
                            <strong>Date:</strong> {formatTimestamp(event.time)}
                        </p>
                        <p>
                            <strong>Details:</strong> {event.details}
                        </p>
                        <p>
                            <strong>Attendees:</strong> {event.numAttendees}
                        </p>
                        <p>
                            <strong>Facility:</strong> {event.facility}
                        </p>
                        <div className="leavebutton">
                            <button className="join-event-group-button" value={event.id} onClick={() => {handleJoinEvent(event.id)}}>{isUserPage ? "Joined 🐱" : "Join 🐱"}</button>
                            {isUserPage && <button className="leave-button" value={event.id} onClick={() => {handleLeaveEvent(event.id)}}>Leave 😿</button> }
                        </div>
                    </div>
                    
                </div>
            ))}
        </div>
    );
}

export default EventList;
