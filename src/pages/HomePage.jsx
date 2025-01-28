import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./auth-context";
import BlogList from "./components/BlogList";
import NavBar from "./components/navBar";
import Spinner from "./components/Spinner";

const HomePage = () => {
  const auth = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://blog-site-frontend-dlxl.onrender.com/api/posts/", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        setPosts(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err.status === 401) {
          auth.logout();
          navigate("/");
        }
        console.log(err.status);
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
    return <Spinner />;
  }

  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "5rem",
          fontSize: "3rem",
          color: "red",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="homepage">
        {posts && posts.length > 0 ? (
          <>
            <h1 className="heading">Latest Blog Posts</h1>
            <BlogList posts={posts} setPosts={setPosts} />
          </>
        ) : (
          <p
            style={{
              textAlign: "center",
              marginTop: "5rem",
              fontSize: "3rem",
              color: "rgb(44, 62, 80)",
            }}
          >
            There is no post yet. Start creating your first post.
          </p>
        )}
      </div>
    </>
  );
};

export default HomePage;
