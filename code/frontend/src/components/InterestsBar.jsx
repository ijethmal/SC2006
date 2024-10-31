import React, { useState } from "react";
import "./InterestsBar.css";

function InterestsBar(props) {
    console.log(props.interest);
    const [interests, setInterests] = useState(props.interest );
    const [newInterest, setNewInterest] = useState("");

    const handleRemove = (interestToRemove) => {
        setInterests(interests.filter((interest) => interest !== interestToRemove));
    };

    const handleAddInterest = () => {
        if (newInterest && !interests.includes(newInterest)) {
            setInterests([...interests, newInterest]);
            setNewInterest(""); // Clear the input field
        }
    };

    return (
        <div className="interests-bar-container">
            <label className="interests-label">{props.name}</label>
            <div className="interests-bar">
                {interests.map((interest, index) => (
                    <div key={index} className="interest-button">
                        {interest}
                        <button
                            className="remove-button"
                            onClick={() => handleRemove(interest)}
                        >
                            x
                        </button>
                    </div>
                ))}
            </div>
            <div className="add-interest-container">
                <input
                    type="text"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    placeholder="Add interest"
                    className="add-interest-input"
                />
                <button onClick={handleAddInterest} className="add-button">+</button>
            </div>
        </div>
    );
}

export default InterestsBar;
