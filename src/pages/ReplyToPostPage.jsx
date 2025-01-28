import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Post from "./components/Post";
import ReplyToPost from "./components/ReplyToPost";
import NavBar from "./components/navBar";
const ReplyToPostPage = () => {
  const location = useLocation();
  const postId = location.state;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);
  console.log(postId);
  //   console.log(postId);

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://blog-site-frontend-dlxl.onrender.com/api/posts/${postId}`,
          {
            headers: {
              Authorization: `Berear ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data.post);
        setPost(response.data.post);
        setError(null);
      } catch (err) {
        setError(err.message || "Something went wrong!"); // Set error state
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSinglePost();
  }, []);

  if (loading) return <div style={{ color: "green" }}>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!post) return <div>No post found.</div>;

  return (
    <>
      <NavBar />
      <Post post={post} showActions={false} />
      <ReplyToPost post={post} />
    </>
  );
};

export default ReplyToPostPage;
