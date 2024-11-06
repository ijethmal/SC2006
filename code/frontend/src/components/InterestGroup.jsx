import React, { useState , useEffect} from "react";
import "./InterestGroup.css";
import { joinGroup, leaveGroup } from "../api/GroupService";
import { getUserByEmail } from "../api/UserService";
const InterestGroup = (props) => {
    // how to use: past in dummy_interest_group object like that. can be taken by props.dummy_interest_group
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const dummy_interest_group = {
    //     id: "idgroup123",
    //     name: "Hiking Enthusiasts",
    //     activityType: "Outdoor",
    //     location: "Boon Lay",
    //     createdBy: "SpiderMan",
    //     members: {
    //         "userId1": 1,
    //         "userId2": 1,
    //     },
    //     admins: {
    //         "adminId1": 1,
    //         "adminId2": 1,
    //     },
    //     events: {
    //         "eventId1": 1,
    //     },
    //     imgUrl: "https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png",
    // };
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


    const dummy_interest_group = props.group;
   
    

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleJoinGroup = async () => {
        const response = await joinGroup(dummy_interest_group.id, userData.id);
        if (response) {
            alert("Joined group successfully");
        }
        else{
            alert("Error joining group");
        }
    }

    const handleLeaveGroup = async () => {
        const response = await leaveGroup(dummy_interest_group.id, userData.id);
        if (response) {
            alert("Left group successfully");
        }
        else{
            alert("Error leaving group");
        }
    }

    return (
        <div className="interest-group-container">
            <div className="img_container-interest-group">
                <img
                    src={dummy_interest_group.imgUrl}
                    className="imgUrl-interest-group"
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
                                <div className="joined-button">
                                    <button className="purple-button" onClick={handleJoinGroup}>Join Group</button>
                                    <button className="red-button" onClick={handleLeaveGroup}>Leave Group</button>
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
