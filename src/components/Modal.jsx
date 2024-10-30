import React from "react";
import { useState } from "react";
import "./Modal.css";

function Modal({ closeModal }) {
    const [isHovered, setIsHovered] = useState(false);
    const [formData, setFormData] = useState({
        time_created: "",
        time_start: "",
        attendees: "",
        groupname: "",
        facilities: "",
        details: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    // id . time(created), time(happen), details, attendees, group, facility(location in facility)

    // write logic for handle submit here
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
    };

    return (
        <div className="modalBackground">
            <form onSubmit={handleSubmit}>
                <div className="modalContainer">
                    <div className="titleCloseBtn">
                        <button
                            onClick={() => {
                                closeModal(false);
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            style={{
                                padding: "10px",
                                backgroundColor: isHovered
                                    ? "lightblue"
                                    : "lightgray",
                                transition: "background-color 0.3s ease",
                            }}
                        >
                            ❌
                        </button>
                    </div>
                    <div className="title">
                        <div className="text">Submit New Event</div>
                        <div className="underline"></div>
                    </div>

                    <div className="body">
                        <div className="input">
                            <div>⏰</div>
                            <input
                                type="time_created"
                                placeholder="Time created"
                                name="time_created"
                                value={formData.time_created}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input">
                            <div>⏱️</div>
                            <input
                                type="time_start"
                                placeholder="Time start"
                                name="time_start"
                                value={formData.time_start}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input">
                            <div>🫂</div>
                            <input
                                type="attendees"
                                placeholder="Attendees"
                                name="attendees"
                                value={formData.attendees}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input">
                            <div>👥</div>
                            <input
                                type="group"
                                placeholder="Group Name"
                                name="groupname"
                                value={formData.groupname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input">
                            <div>📍</div>
                            <input
                                type="facilities"
                                placeholder="Facilities"
                                name="facilities"
                                value={formData.facilities}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input">
                            <div>📝</div>
                            <input
                                type="details"
                                placeholder="Details"
                                name="details"
                                value={formData.details}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="footer">
                        <button
                            onClick={() => {
                                closeModal(false);
                            }}
                            id="cancelBtn"
                        >
                            Cancel
                        </button>
                        <button type="submit">Create event</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Modal;
