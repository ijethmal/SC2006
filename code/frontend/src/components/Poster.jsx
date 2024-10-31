import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import "./Poster.css";
import "./Card.css";
import Card from "./Card";
import Modal from "./Modal";
import EventList from "./EventList";

const Poster = ({ className = "" }) => {
    const [openModal, setOpenModal] = useState(false);
    // const [events, setEvents] = useState([]);
    // setting this event to be static for now

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
            details: "Giving me 10000 dollars for free",
            attendees: "10",
            group: "Mr Bean group",
            facility: "Gym",
            photoUrl:
                "https://marketing-cdn.tickettailor.com/ZgP1j7LRO5ile62O_HowdoyouhostasmallcommunityeventA10-stepguide%2CMiniflagsattheevent.jpg?auto=format,compress",
        },
        {
            time_start: "20-10-2024",
            details: "Ben 10 goes into 10 Ben",
            attendees: "10",
            group: "Mr Ben group",
            facility: "Gym",
            photoUrl:
                "https://marketing-cdn.tickettailor.com/ZgP1j7LRO5ile62O_HowdoyouhostasmallcommunityeventA10-stepguide%2CMiniflagsattheevent.jpg?auto=format,compress",
        }
    ];
    // const addCard = () => {
    //     setCards([...cards, <Card key={cards.length} />]);
    // };

    return (
        <div className={`poster ${className}`}>
            <div className="group-page-bg" />
            <div className="group-interests-near-you-wrapper">
                <div className="group-interests-near">
                    Group interests near you 👐
                </div>
            </div>
            <div className="scroll-container">
                <EventList events={events} />
            </div>

            <button
                className="button"
                onClick={() => {
                    setOpenModal(true);
                }}
            >
                <h3>Create Event 🔥🔥🔥</h3>
            </button>
            {openModal && <Modal closeModal={setOpenModal} />}
        </div>
    );
};

Poster.propTypes = {
    className: PropTypes.string,
};

export default Poster;
