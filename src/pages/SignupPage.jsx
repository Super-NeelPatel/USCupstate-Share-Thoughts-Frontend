// src/pages/Signup.js
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";
import axios from "axios";
const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
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

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://blog-site-frontend-dlxl.onrender.com/api/users/signup",
        formData,
        {
          headers: {
            Authorization: `Berear ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = res.data;
      if (data.data.token) {
        console.log("Navigating to login page...");
        navigate("/login");
      } else {
        setMessage(data.message || "An error occurred. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred. Please try again.");
    }
  };
  return (
    <div className="sign-form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <label htmlFor="name" className="label label-name">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />
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
        <button type="submit" onSubmit={handleSignUp}>
          Sign Up
        </button>
        <button
          type="submit"
          className="log-in-btn"
          onClick={() => navigate("/login")}
        >
          Log In
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
