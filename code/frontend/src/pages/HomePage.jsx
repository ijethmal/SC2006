import NaviBar from "../components/NaviBar";
import Poster from "../components/Poster";
import Event from "../components/Event";
import InterestGroup from "../components/InterestGroup";
import UserHeader from "../components/UserHeader";
import "./HomePage.css";
import { useState } from "react";

const HomePage = () => {
    const [filterData, setFilterData] = useState({
        distance: "",
        groupName: "",
        activityType: "",  // only eventfinda or activesg
        location: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFilterData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // still need to fix this function
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

    return (
        <div className="community-web-page">
            <NaviBar />
            <div className="page-wrapper">
                {/* Hardcode userheader */}
                <UserHeader /> 
                <div className="info">
                    <div className="events-wrapper">
                        <h1 className="header_info">
                            <h1>🏝️ What's happening! 🏝️</h1>
                        </h1>
                        <div className="filter">
                            <div className="filter_header">Display by</div>
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
                                    <button
                                        type="submit"
                                        className="filter-button"
                                    >
                                        Find !!!
                                    </button>
                                </div>
                            </form>
                        </div>


                        {/* This one for mapping events can pass props here: dummy_event */}
                        <Event />
                        <Event />
                        <Event />
                    </div>
                    <div className="interests-wrapper">
                        <h3>Interest Groups Near You🥳</h3>
                        {/* can pass props here: dummy_interest_group */}
                        <InterestGroup />
                        <InterestGroup />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
