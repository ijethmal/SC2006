import "./UserHeader.css";
import { getUserByEmail } from "../api/UserService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../pages/UserContext";
const UserHeader = () => {
    const { user } = useUserContext();
    const navigate = useNavigate();
    console.log(user);
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
        getUserByEmail(user).then((data) => {
            setUserData(data);  
        });
    }, []);
    
    const handleLogout = () => {
        // Clear user data from context
        // Redirect to login page
        navigate("/");
    }

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
                <div className="user-header-details logout" onClick={handleLogout}>Log Out</div>
            </div>
        </div>
    );
};
export default UserHeader;
