import React, { useState } from "react";
import "./Registration.css";

function Registration() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        location: "",
        password: "",
        photoUrl: "",
        bio: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(form);
    };

    return (
        <div className="registration-container">
            <div className="form-container">
                <h1 className="title">
                    <i>GatherHub</i>
                </h1>
                <h2 className="subtitle">
                    <u>Registration</u>
                </h2>
                <p className="description">
                    Create an account and start connecting
                </p>
                <form onSubmit={handleSubmit} className="registration-form">
                    <div className="input-group">
                        <span className="icon">👤</span>
                        <input
                            type="text"
                            name="name"
                            placeholder="Username"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <span className="icon">📧</span>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <span className="icon">📍</span>
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={form.location}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <span className="icon">🔒</span>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <span className="icon">🌐</span>
                        <input
                            type="url"
                            name="photoUrl"
                            placeholder="Your Photo"
                            value={form.photoUrl}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <span className="icon">📖</span>
                        <input
                            type="text"
                            name="bio"
                            placeholder="Write a short bio about yourself"
                            value={form.bio}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="terms">
                        <input type="checkbox" name="agree" />
                        <label>
                            I agree to the terms and conditions by the app
                        </label>
                    </div>
                    <button type="submit" className="submit-btn">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Registration;
