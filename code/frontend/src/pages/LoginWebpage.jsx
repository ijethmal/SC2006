import TextButton from "../components/TextButton";
import "./LoginWebpage.css";

const LoginWebpage = () => {
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
          <b className="email">Email</b>
          <img className="mdipassword-icon" alt="" src="/mdipassword.svg" />
        </div>
        <div className="textbox">
          <div className="textbox-child" />
          <img className="mdipassword-icon" alt="" src="/mdipassword1.svg" />
          <b className="email">Password</b>
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
