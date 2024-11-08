import NaviBar from "../components/NaviBar";
import Poster from "../components/Poster";
import Event from "../components/Event";
import InterestGroup from "../components/InterestGroup";
import UserHeader from "../components/UserHeader";
import "./HomePage.css";
import { useEffect, useState } from "react";
import { getAllEvents } from "../api/EventService";
import { getAllGroups } from "../api/GroupService";
import { getUserByEmail } from "../api/UserService";

const HomePage = () => {
    const [events, setEvents] = useState([]);
    const [groups, setGroups] = useState([]);
    const [filterData, setFilterData] = useState({
        name: "",
        location: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFilterData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        getAllEvents().then((data) => {
            setEvents(data.content);
            console.log(data.content);
        });
        getAllGroups().then((data) => {
            setGroups(data.content);
        });
    }, []);

    // Function for filtering events by name and location
    const filterEvents = (events) => {
        return events.filter((event) => {
            // Check if isActiveSg is false
            if (event.isActiveSg !== false) {
                return false;
            }

            // Check if the name and location match filterData inputs
            const matchesName = filterData.name
                ? event.title.toLowerCase().includes(filterData.name.toLowerCase())
                : true; // Match all if no name filter
            const matchesLocation = filterData.location
                ? event.location.toLowerCase().includes(filterData.location.toLowerCase())
                : true; // Match all if no location filter

            return matchesName && matchesLocation;
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // No need to set state here; filtering will happen in the render
    };

    return (
        <div className="community-web-page">
            <NaviBar />
            <div className="page-wrapper">
                <UserHeader />
                <div className="info">
                    <div className="events-wrapper">
                        <div className="header_info">
                            <h1>🏝️ What's happening! 🏝️</h1>
                        </div>
                        <div className="filter">
                            <div className="filter_header">Display by</div>
                            <form onSubmit={handleSubmit}>
                                <div className="choices">
                                    <input
                                        type="text"
                                        name="name"
                                        value={filterData.name}
                                        placeholder="Name"
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
                                    <button
                                        type="submit"
                                        className="filter-button"
                                    >
                                        Find !!!
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Filter and map events */}
                        {filterEvents(events).map((event, index) => (
                            <Event event={event} key={index} />
                        ))}
                    </div>
                    <div className="interests-wrapper">
                        <h3>Interest Groups Near You🥳</h3>
                        {groups.map((group, index) => (
                            <InterestGroup group={group} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
