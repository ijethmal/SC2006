import React, { useState } from "react";
import "./Registration.css";
import { register } from "../api/UserService.js";
import axios from "axios";

function Registration() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        location: "",
        password: "",
        photoUrl: "",
        bio: ""
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const validate = (form) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/; // Password should contain lowercase, uppercase, special character, and be at least 8 characters long
       


        // Case 1: Check if any required field is empty
        if (!form.name || !form.email || !form.password || !form.bio) {
            alert("Please fill in all fields!") // Show error if any field is empty
            return false;
        }

        // Case 2: Name (username) must be between 4 and 20 characters
        if (form.name.length < 4 || form.name.length > 20) {
            setMessage('Username must be from 4 characters to 20 characters'); // Show error if name length is invalid
            return false;
        }

        // case 3: user name must be unique
        // if (form.name == "MrBeast") {
        //     window.alert('User already exist'); // Show error if name is already taken
        //     return false;
        //   }
         
        // Case 4: Email must be in valid format
        if (!emailRegex.test(form.email)) {
            window.alert('Error registering'); // Show error if email format is invalid
            return false;
          }

        
    
         // Case 7: Validate password format
        if (!passwordRegex.test(form.password)) {
            window.alert('Password not secure enough. Should have at least a special character and uppercase character'); // Show error if password format is invalid
            return false;
        }

        if (form.bio.length > 200) {
            window.alert('Please type in shorter bio'); // Show error if bio is too long
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission here
        
        console.log(form);
        if (!validate(form)) {
            return;
        }


        try {
            const response = await register(form);
            if (response.status != 500) {
                alert("Registration successful 🎉. Please check your email to verify user account.");
            } else {
                alert(response.data || "Invalid email or password");
            }
        }
        catch (error) {
            console.log("Error:");
            console.log(error);
            alert("Email existed. Please try another email");
        }
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
};

export default Registration;
