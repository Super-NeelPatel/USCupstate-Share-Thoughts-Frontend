import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import NavBar from "./pages/components/navBar";
import HomePage from "./pages/HomePage";
import GetSinglePostPage from "./pages/GetSinglePostPage";
import ReplyToPostPage from "./pages/ReplyToPostPage";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Home Page */}
          <Route path="/post" element={<GetSinglePostPage />} />
          <Route path="/post/reply" element={<ReplyToPostPage />} />
          {/* <Route path="/post/:postId" element={<EditPost />} />
          <Route path="/create" element={<CreatePost />} /> Create Post */}
          <Route path="*" element={<NotFoundPage />} /> {/* 404 Page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
