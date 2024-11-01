import React, { useState } from "react";
import "./InterestGroup.css";
const InterestGroup = (props) => {
    // how to use: past in dummy_interest_group object like that. can be taken by props.dummy_interest_group
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dummy_interest_group = {
        id: "group123",
        name: "Hiking Enthusiasts",
        activityType: "Outdoor",
        location: "Boon Lay",
        createdBy: "SpiderMan",
        members: {
            userId1: 1,
            userId2: 1,
            userId3: 1,
        },
        admins: {
            adminId1: 1,
            adminId2: 1,
        },
        events: {
            eventId1: 1,
            eventId2: 1,
        },
        imgUrl: "https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png",
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="container">
            <div className="img_container">
                <img
                    src={dummy_interest_group.imgUrl}
                    className="imgUrl"
                    alt="Interest Group"
                />
            </div>
            <div className="name" onClick={openModal}>
                {dummy_interest_group.name}
                {isModalOpen && (
                    <div className="modal" onClick={closeModal}>
                        <div
                            className="modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <span className="close" onClick={closeModal}>
                                &times;
                            </span>
                            <div className="group-details-container">
                                <div className="group-name">
                                    <div>
                                        <h3>{dummy_interest_group.name}</h3>
                                    </div>
                                    <div className="detail-img-container">
                                        <img
                                            className="detail-img"
                                            src={dummy_interest_group.imgUrl}
                                            alt="Group Image"
                                        />
                                    </div>
                                </div>
                                <div className="interest_details">
                                    <h3>Activity Type 🎍</h3>
                                    <p>{dummy_interest_group.activityType}</p>
                                </div>
                                <div className="interest_details">
                                    <h3>Location 🌸</h3>
                                    <p>{dummy_interest_group.location}</p>
                                </div>
                                <div className="interest_details">
                                    <h3>Created By 🗿</h3>
                                    <p>{dummy_interest_group.createdBy}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InterestGroup;
