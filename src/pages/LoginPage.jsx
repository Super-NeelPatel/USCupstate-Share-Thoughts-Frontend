import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./auth-context";
import "./LoginPage.css";
import WarningModal from "./components/WarningModal";

const Login = () => {
  const auth = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [animationClass, setAnimationClass] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://blog-site-frontend-dlxl.onrender.com/api/users/login",
        formData
      );
      console.log(res.data);
      const { token, userId, email } = res.data;
      auth.login(userId, token);
      localStorage.setItem("token", token); //Storing token
      navigate("/home");
      setFormData({ email: "", password: "" }); // Clear form data
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An error occurred. Please try again.";
      setMessage(errorMessage);
    }
  };
  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className="label label-email">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
        <label htmlFor="password" className="label label-password">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
        <button type="submit">Login</button>
        <button
          type="submit"
          className="sign-in-btn"
          onClick={() => navigate("/signup")}
        >
          Sign In
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
