import "./GroupPage.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NaviBar from "../components/NaviBar";
import EventList from "../components/EventList";
import { getAllEventsByGroupID } from "../api/EventService";
import { useParams } from "react-router-dom";
import { getInterestGroupById } from "../api/GroupService";
const GroupPage = (props) => {
    const { groupId } = useParams();
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const [groupData, setGroupData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const data = await getInterestGroupById(groupId);
            setGroupData(data);
            console.log(data);
        };
        fetchData();
    }, [groupId]); // Include `groupId` as a dependency if it may change

    useEffect(() => {
        if (!groupData.id) return; // Exit if groupData.id is not set

        const fetchEvents = async () => {
            const data = await getAllEventsByGroupID(groupData.id);
            console.log(data);
            setEvents(data.data);
        };
        fetchEvents();
    }, [groupData.id]); // Run only when groupData.id is available

    return (
        <div className="group-page-container">
            <NaviBar />
            <div className="group-page-content">
                <div className="group-img-container">
                    <img
                        src={groupData.imgUrl}
                        alt="Group Image"
                        className="group-picture"
                    />
                </div>
                <div className="group-page-name">
                    <h1>{groupData.name}</h1>
                </div>
                <div className="group-page-info">
                    <div>Activity Type 🎍: </div>
                    <div>{groupData.activityType}</div>
                </div>
                <div className="group-page-info">
                    <div>Location 🌸: </div>
                    <div>{groupData.location}</div>
                </div>
                <div className="group-page-info">
                    <div>Created By 🗿: </div>
                    <div>{groupData.createdBy}</div>
                </div>

                <div className="all-events">
                    <EventList events={events} />
                </div>
                <div className="addNewEvent">
                    <button
                        className="purple-button"
                        onClick={
                            () =>
                                navigate("/submit-event", {
                                    state: { groupId: groupId },
                                }) // psss groupId through state
                        }
                    >
                        Add New Event
                    </button>
                </div>
            </div>
        </div>
    );
};
export default GroupPage;
