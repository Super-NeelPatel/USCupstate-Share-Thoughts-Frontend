import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReplyToPost.css";

//ID TO APPLY CREATION OF THE POST
// const USER_ID = "67469313b66e9f915aa2d535"; //NEEL
const USER_ID = "674692abb66e9f915aa2d527"; // VICT

const ReplyToPost = ({ post }) => {
  const [userName, setUserName] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !replyContent) {
      setError("Both fields are required.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`http://localhost:8000/api/posts/post/reply`, {
        content: replyContent,
        post: post._id,
        user: USER_ID,
      });
      setError(null);
      setUserName("");
      setReplyContent("");
      navigate("/");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reply-form-container">
      <form className="reply-form" onSubmit={handleSubmit}>
        <h3 className="form-title">Reply to Post</h3>
        {error && <p className="error-message">{error}</p>}

        <div className="input-container">
          <label className="input-label" htmlFor="userName">
            Your Name:
          </label>
          <input
            className="input-field"
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="input-container">
          <label className="input-label" htmlFor="replyContent">
            Reply:
          </label>
          <textarea
            className="textarea-field"
            id="replyContent"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write your reply here"
          />
        </div>

        <button className="submit-button" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Reply"}
        </button>
      </form>
    </div>
  );
};

export default ReplyToPost;
