import "./UserHeader.css";
import { getUserByEmail } from "../api/UserService";
import { useState, useEffect } from "react";
const UserHeader = () => {
    // normally passing users data from parent component
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
    
    return (
        <div className="user-header">
            <div className="user-header-container">
                <div className="user-header-avatar">
                    <img
                        src={userData.photoUrl}
                        className="imgUrl"
                        alt="User Avatar"
                    />
                </div>
                <div className="user-header-details">{userData.name}</div>
                <div className="user-header-details">Log Out</div>
            </div>
        </div>
    );
};
export default UserHeader;
