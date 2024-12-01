import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import BlogList from "./components/BlogList";

const HomePage = () => {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userId = "67469313b66e9f915aa2d535"; // Replace with logged-in user ID
  // console.log(posts[0]._id);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/posts/")
      .then((res) => {
        setPosts(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching posts. Please try again later.");
        setLoading(false);
        console.error(err);
      });
  }, []);

  const handleReply = (postId) => {
    navigate(`/post/reply/${postId}`);
  };

  const handleEdit = (postId) => {
    navigate(`/post/${postId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="homepage">
      <h1 className="heading">Latest Blog Posts</h1>
      <BlogList posts={posts} setPosts={setPosts} />
    </div>
  );
};

export default HomePage;
