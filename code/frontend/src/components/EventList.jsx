import React from "react";
import "./EventList.css";

function EventList(props) {
    const events = props.events;
    return (
        <div className="event-list">
            {events.map((event, index) => (
                <div key={index} className="event-card">
                    <img src={event.photoUrl} alt="Event" className="event-image" />
                    <div className="event-content">
                        <h3 className="event-title">{event.group}</h3>
                        <p><strong>Date:</strong> {event.time_start}</p>
                        <p><strong>Details:</strong> {event.details}</p>
                        <p><strong>Attendees:</strong> {event.attendees}</p>
                        <p><strong>Facility:</strong> {event.facility}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default EventList;