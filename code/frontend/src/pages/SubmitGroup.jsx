import "./SubmitGroup.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByEmail } from "../api/UserService";
import { createGroup } from "../api/GroupService";

const SubmitGroup = () => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [groupData, setGroupData] = useState({
        name: "",
        activityType: "",
        location: "",
        createdBy: "",
        imgUrl: "",
        members: {},
    });

    useEffect(() => {
        getUserByEmail("mrbeast@gmail.com").then((data) => {
            setGroupData((prevGroupData) => ({
                ...prevGroupData,
                createdBy: data.name, // Use the user ID from fetched data,
                members: { [data.id]: 1 },
            }));
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGroupData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const validateGroupData = (groupPayload) => {
        const { name, activityType, location, createdBy, imgUrl} = groupPayload;
    
        // Check if all required fields are filled
        if (!name || !activityType || !location || !createdBy || !imgUrl) {
          window.alert('Error creating: All fields must be filled');
          return false;
        }
    
        // Group name should be between 3 and 100 characters
        if (name.length < 3 || name.length > 100) {
          window.alert('Error creating: Group name must be between 3 and 100 characters');
          return false;
        }

    
        // Additional validations (e.g., activityType or location) can be added here if needed
    
        return true;
      };
    

    const handleSubmit = async () => {
        // Create object to send
        const groupPayload = {
            name: groupData.name,
            activityType: groupData.activityType,
            location: groupData.location,
            createdBy: groupData.createdBy,
            imgUrl: groupData.imgUrl,
            members: groupData.members,
        };

        // Validate group data
        if (!validateGroupData(groupPayload)) {
            return;
        }

        try {
            const response = await createGroup(groupPayload);
            if (response) {
                setShowPopup(true);
                setTimeout(() => {
                    setShowPopup(false);
                    navigate("/user-profile");
                }, 2000);
            }
        } catch (error) {
            console.error("Error creating group:", error);  
        }
    };

    return (
        <div className="submit-page-container">
            <div className="group-submit-container">
                <div className="header-group-submit">
                    <div className="text-submit">Submit New Group</div>
                    <div className="underline-text"></div>
                    {showPopup && (
                        <div className="popup-group-page">
                            <p>Group created successfully</p>
                            <div className="progress-bar-container-group-page">
                                <div className="progress-bar"></div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="inputs-field">
                    <div className="input-child">
                        <div className="icon">🏷️</div>
                        <input
                            type="text"
                            name="name"
                            value={groupData.name}
                            onChange={handleChange}
                            placeholder="Group Name"
                        />
                    </div>
                    <div className="input-child">
                        <div className="icon">🎯</div>
                        <input
                            type="text"
                            name="activityType"
                            value={groupData.activityType}
                            onChange={handleChange}
                            placeholder="Activity Type"
                        />
                    </div>
                    <div className="input-child">
                        <div className="icon">📍</div>
                        <input
                            type="text"
                            name="location"
                            value={groupData.location}
                            onChange={handleChange}
                            placeholder="Location"
                        />
                    </div>
                    <div className="input-child">
                        <div className="icon">🖼️</div>
                        <input
                            type="text"
                            name="imgUrl"
                            value={groupData.imgUrl}
                            onChange={handleChange}
                            placeholder="Image URL"
                        />
                    </div>
                </div>
                <div className="submit-group-container">
                    <div
                        className="submit"
                        onClick={handleSubmit}
                        style={{ cursor: "pointer" }}
                    >
                        Create Group 🚀
                    </div>
                    <div
                        className="submit"
                        onClick={() => navigate("/user-profile")}
                        style={{ cursor: "pointer" }}
                    >
                        Cancel ⛔
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmitGroup;
