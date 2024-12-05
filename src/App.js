import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import GetSinglePostPage from "./pages/GetSinglePostPage";
import ReplyToPostPage from "./pages/ReplyToPostPage";
import EditPostPage from "./pages/EditPostPage";
import CreatePost from "./pages/CreatePost";
import ProfilePage from "./pages/ProfilePage";
import Signup from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import AuthPage from "./pages/AuthPage";

import { AuthContext } from "./pages/auth-context";

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  // Check for token in localStorage when the app loads
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    if (storedToken) {
      setToken(storedToken);
      setUserId(storedUserId);
    }
  }, [token]);

  // login function to set token and userId
  const login = useCallback((id, token) => {
    setToken(token);
    setUserId(id);
    localStorage.setItem("token", token); // Save token to localStorage
    localStorage.setItem("userId", id); // Save userId to localStorage
  }, []);

  // logout function to clear token and userId
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("userId"); // Remove userId from localStorage
  }, []);

  const isLoggedIn = !!token; // Derive isLoggedIn from the token

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, userId, login, logout }}>
      <Router>
        <div>
          <Routes>
            {isLoggedIn ? (
              <>
                <Route path="/home" element={<HomePage />} /> {/* Home Page */}
                <Route path="/post" element={<GetSinglePostPage />} />
                <Route path="/post/reply" element={<ReplyToPostPage />} />
                <Route path="/post/edit" element={<EditPostPage />} />
                <Route path="/create" element={<CreatePost />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
              </>
            ) : (
              <>
                <Route path="/" element={<AuthPage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
