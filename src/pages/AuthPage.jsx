import { useNavigate } from "react-router-dom";
import { AuthContext } from "./auth-context";
import { useContext, useState, useEffect } from "react";
import "./AuthPage.css";

const AuthPage = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [animationClass, setAnimationClass] = useState("");

  const handleSign = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (auth.message) {
      setAnimationClass("show-auth-message");
      const timer = setTimeout(() => {
        setAnimationClass(""); // Reset animation class after 5 seconds
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [auth.message]);

  return (
    <div id="auth-page">
      <div className="description-container">
        <h1 className="hero-title">
          Share your journey,
          <br />
          express yourself, and
          <br /> connect with others <br />
          by <span className="highlight">writing your first blog.</span>
        </h1>
        <div className="feature-list">
          <p className="feature">Share Freely</p>
          <p className="feature">Track Your Impact</p>
          <p className="feature">Connect Meaningfully</p>
        </div>
      </div>
      <div id="actions-btn">
        <button className="btn signup-btn" onClick={handleSign}>
          Sign Up
        </button>
        <button className="btn login-btn" onClick={handleLogin}>
          Log In
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
