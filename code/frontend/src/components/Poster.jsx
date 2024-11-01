import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import "./Poster.css";
import "./Card.css";
import Card from "./Card";
import Modal from "./Modal";
import EventList from "./EventList";

const Poster = ({ className = "" }) => {
    // ----------------- Dummy Data -----------------
    const events = [
        {
            time_start: "20-10-2024",
            details: "First person to arrive gets a free gift",
            attendees: "10",
            group: "Mr Beast group",
            facility: "Gym",
            photoUrl:
                "https://marketing-cdn.tickettailor.com/ZgP1j7LRO5ile62O_HowdoyouhostasmallcommunityeventA10-stepguide%2CMiniflagsattheevent.jpg?auto=format,compress",
            location: "Boon Lay",
            distance: "2",
            activityType: "Running",
        },
        {
            time_start: "20-10-2024",
            details: "Giving me 10000 dollars for free",
            attendees: "10",
            group: "Mr Bean group",
            facility: "Gym",
            photoUrl:
                "https://marketing-cdn.tickettailor.com/ZgP1j7LRO5ile62O_HowdoyouhostasmallcommunityeventA10-stepguide%2CMiniflagsattheevent.jpg?auto=format,compress",
            location: "Boona Vista",
            distance: "1",
            activityType: "Cooking",
        },
        {
            time_start: "20-10-2024",
            details: "Ben 10 goes into 10 Ben",
            attendees: "10",
            group: "Mr Ben group",
            facility: "Gym",
            photoUrl:
                "https://marketing-cdn.tickettailor.com/ZgP1j7LRO5ile62O_HowdoyouhostasmallcommunityeventA10-stepguide%2CMiniflagsattheevent.jpg?auto=format,compress",
            location: "Chinese Garden",
            distance: "1",
            activityType: "Running",
        },
    ];
    //----------------------------------------------

    const [openModal, setOpenModal] = useState(false);
    // const [events, setEvents] = useState([]);
    // setting this event to be static for now
    const [filters, setFilters] = useState(events);
    const [filterData, setFilterData] = useState({
        distance: "",
        groupName: "",
        activityType: "",
        location: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFilterData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // function for filtering events:
    const filterEvents = (events, formData) => {
        return events.filter((event) => {
            const { distance, groupName, activityType, location } = formData;

            const allFiltersEmpty =
                !distance && !groupName && !activityType && !location;

            if (allFiltersEmpty) {
                return events;
            }

            const matchesDistance = distance
                ? parseFloat(event.distance) >= parseFloat(distance)
                : false;
            const matchesGroupName = groupName
                ? event.group.toLowerCase().includes(groupName.toLowerCase())
                : false;
            const matchesActivityType = activityType
                ? event.activityType
                      .toLowerCase()
                      .includes(activityType.toLowerCase())
                : false;
            const matchesLocation = location
                ? event.location.toLowerCase().includes(location.toLowerCase())
                : false;

            return (
                matchesDistance ||
                matchesGroupName ||
                matchesActivityType ||
                matchesLocation
            );
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setFilters(filterEvents(events, filterData));
        setFilterData({
            distance: "",
            groupName: "",
            activityType: "",
            location: "",
        });
    };

    // const addCard = () => {
    //     setCards([...cards, <Card key={cards.length} />]);
    // };

    return (
        <div className={`poster ${className}`}>
            <div className="poster-header">
                Group interests near you 👐
            </div>
            <div className="filter">
                <div>Display by</div>
                <form onSubmit={handleSubmit}>
                    <div className="choices">
                        <input
                            type="text"
                            name="distance"
                            value={filterData.distance}
                            placeholder="Distance"
                            onChange={handleInputChange}
                            className="inputs"
                        />
                        <input
                            type="text"
                            name="groupName"
                            value={filterData.groupName}
                            placeholder="Group Name"
                            onChange={handleInputChange}
                            className="inputs"
                        />
                        <input
                            type="text"
                            name="activityType"
                            value={filterData.activityType}
                            placeholder="Activity Type"
                            onChange={handleInputChange}
                            className="inputs"
                        />
                        <input
                            type="text"
                            name="location"
                            value={filterData.location}
                            placeholder="Location"
                            onChange={handleInputChange}
                            className="inputs"
                        />
                        <button type="submit" className="filter-button">
                            Find !!!
                        </button>
                    </div>
                </form>
            </div>
            <div className="scroll-container">
                <EventList events={filters} />
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
