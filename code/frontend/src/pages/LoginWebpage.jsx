import TextButton from "../components/TextButton";
import "./LoginWebpage.css";
import { useState } from "react";

const LoginWebpage = () => {

  // State to hold email and password in an object (loginData)
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Handle input change for email and password
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData, // Spread existing data
      [name]: value // Update the relevant field (email or password)
    });
  };

  return (
    <div className="login-webpage">
      <img className="mesh-wallpaper-icon" alt="" src="/mesh-wallpaper.svg" />
      <div className="white-frame" />
      <div className="register">
        <div className="dont-have-an">{`Don’t have an account? `}</div>
        <div className="register1">Register</div>
      </div>
      <div className="emailandpass">
        <div className="textbox">
          <div className="textbox-child" />
          <input type="email" name="email" value={loginData.email} placeholder="Enter your email" onChange={handleInputChange} className="email"/>
          <img className="mdipassword-icon" alt="" src="/mdipassword.svg" />
        </div>
        <div className="textbox">
          <div className="textbox-child" />
          <img className="mdipassword-icon" alt="" src="/mdipassword1.svg" />
          <input type="password" name="password" value={loginData.password} placeholder="Enter your password" onChange={handleInputChange} className="email"/>
        </div>
      </div>
      <img className="login-webpage-child" alt="" src="/ellipse-3@2x.png" />
      <div className="gatherhub">GatherHub</div>
      <TextButton />
      <div className="rmb">
        <div className="rmb-child" />
        <div className="dont-have-an">Remember me</div>
      </div>
      <div className="forget-password">
        <span>Forget</span>
        <span className="span">{` `}</span>
        <span>password</span>
        <span className="span">?</span>
      </div>
    </div>
  );
};

export default LoginWebpage;
