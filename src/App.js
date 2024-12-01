import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import NavBar from "./pages/components/navBar";
import HomePage from "./pages/HomePage";
import GetSinglePostPage from "./pages/GetSinglePostPage";
import ReplyToPostPage from "./pages/ReplyToPostPage";
import EditPostPage from "./pages/EditPostPage";
import CreatePost from "./pages/CreatePost";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Home Page */}
          <Route path="/post" element={<GetSinglePostPage />} />
          <Route path="/post/reply" element={<ReplyToPostPage />} />
          <Route path="/post/edit" element={<EditPostPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} /> {/* 404 Page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
