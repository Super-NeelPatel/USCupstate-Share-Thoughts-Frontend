import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./GetSinglePostPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import Post from "./components/Post";
import ConfirmDeleteModal from "./components/ConfirmDelete";

// ID TO MAKE DELETE WORKS
// const USER_ID = "67469313b66e9f915aa2d535"; // NEEL
const USER_ID = "674692abb66e9f915aa2d527"; // VICT

const GetSinglePostPage = () => {
  const location = useLocation();
  const postId = location.state; // Ensure `state` is passed correctly from the previous page
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [postReplies, setPostReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Format date helper function
  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDeleteClick = (postId) => {
    setPostToDelete(postId);
    setShowDeleteModal(true);
  };

  const checkIfUserOwnsTheReply = (reply) => {
    return reply.user && reply.user._id === USER_ID; // Check if reply user matches current user
  };

  // Fetch post and replies
  const fetchPostAndReplies = useCallback(async () => {
    if (!postId) {
      setError("Post ID is missing.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const [postResponse, repliesResponse] = await Promise.all([
        axios.get(`http://localhost:8000/api/posts/${postId}`),
        axios.get(`http://localhost:8000/api/posts/post/${postId}/getReplies`),
      ]);

      setPost(postResponse.data.post); // Ensure post data is properly set
      setPostReplies(repliesResponse.data.postReplies.replies || []);
    } catch (err) {
      console.error("Error fetching data:", err.message);
      setError("Failed to load the post or replies. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [postId]);

  const goBackToAllPostPage = () => {
    navigate("/");
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchPostAndReplies();
  }, [fetchPostAndReplies]);

  // Handle post deletion
  const handlePostDeleted = () => {
    setShowDeleteModal(false);
    navigate("/"); // Redirect to "All Posts" page after deletion
  };

  // Render loading state
  if (loading) {
    return <p>Loading post and replies...</p>;
  }

  // Render error state
  if (error) {
    return <p className="error-message">{error}</p>;
  }

  // Render fallback if post is null
  if (!post) {
    return <p>The post has been deleted or is unavailable.</p>;
  }

  return (
    <div>
      <button className="go-back-btn" onClick={goBackToAllPostPage}>
        🔙
      </button>
      <Post post={post} showActions={false} />
      <div className="replies-container">
        {postReplies && postReplies.length > 0 ? (
          postReplies.map((reply) => (
            <div key={reply._id} className="reply">
              <h2 className="title">
                {reply.title}
                <span className="date">{formatDate(reply.createdAt)}</span>
              </h2>
              <h3 className="content">{reply.content}</h3>
              <h4 className="name">Author: {reply.user?.name || "Unknown"}</h4>
              <div className="delete-btn-container">
                {checkIfUserOwnsTheReply(reply) && (
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteClick(reply)}
                  >
                    DELETE
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-reply">No replies yet.</p>
        )}
      </div>
      {showDeleteModal && (
        <ConfirmDeleteModal
          postToDelete={postToDelete}
          setShowDeleteModal={setShowDeleteModal}
          setPostToDelete={setPostToDelete}
          postReplies={postReplies}
          setPostReplies={setPostReplies}
          onPostDeleted={handlePostDeleted} // Trigger on successful post deletion
        />
      )}
    </div>
  );
};

export default GetSinglePostPage;
