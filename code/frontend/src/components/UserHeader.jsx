import "./UserHeader.css";
const UserHeader = () => {
    // normally passing users data from parent component
    const userData = {
        id: "12345",
        name: "MrBeast",
        email: "mrbeast@gmail.com",
        location: "Boon Lay",
        password: "securePassword123",
        photoUrl:
            "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        groups: ["Basketball Hall 2", "Baking At 5:30", "Dancing In the Dark"],
        bio: "Hello I am MrBeast, I donate money for monkey",
        events: {
            "Birthday Party": 2024,
            "Charity Event": 2025,
            "Cooking Class": 2024,
        },
    };
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
