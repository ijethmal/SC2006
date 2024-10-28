import TextButton from "../components/TextButton";
import "./LoginWebpage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// login test
import { login } from "../api/UserService.js";

const LoginWebpage = () => {
  // State to hold email and password in an object (loginData)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Get the navigate function from useNavigate

  // Handle input change for email and password
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    //console.log(name, value);
    setLoginData({
      ...loginData, // Spread existing data
      [name]: value, // Update the relevant field (email or password)
    });
  };

  // Handle form submission or login button click. note: made it async
  const handleLogin = async () => {
    console.log(loginData);
    try {
      const response = await login(loginData.email, loginData.password);
      console.log("Response:");
      console.log(response);
      if (response.data && response.data === "Login successful") {
        navigate("/community-web-page"); 
      } else {
        alert(response.data || "Invalid email or password");
      }
    } catch (error) {
      console.log("Error:");
      console.log(error);
      alert("Error logging in");
    }
  };

  return (
    <div className="login-webpage">
      <img className="mesh-wallpaper-icon" alt="" src="/mesh-wallpaper.svg" />
      <div className="white-frame" />
      <div className="register">
        <div className="dont-have-an">{`Don’t have an account? `}</div>
        <div className="register1 hover-effect">Register</div>
      </div>
      <div className="emailandpass">
        <div className="textbox">
          <div className="textbox-child" />
          <input
            type="email"
            name="email"
            value={loginData.email}
            //onChange={handleInputChange}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            placeholder="Email"
            className="email"
          />
          <img className="mdipassword-icon" alt="" src="/mdipassword.svg" />
        </div>
        <div className="textbox">
          <div className="textbox-child" />
          <img className="mdipassword-icon" alt="" src="/mdipassword1.svg" />
          <input
            type="password"
            name="password"
            value={loginData.password}
            //placeholder="Enter your password"
            //onChange={handleInputChange}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            placeholder="Password"
            className="email"
          />
        </div>
      </div>
      <img className="login-webpage-child" alt="" src="/ellipse-3@2x.png" />
      <div className="gatherhub">GatherHub</div>
      <TextButton onClick={handleLogin} />
      <div className="rmb">
        <input className="rmb-child" type='checkbox'/>
        <div className="dont-have-an">Remember me</div>
      </div>
      <div className="forget-password">
        <span className="span">{` `}</span>
        <span className='hover-effect'>Fortget password</span>
        <span className="span">?</span>
      </div>
    </div>
  );
};

export default LoginWebpage;
