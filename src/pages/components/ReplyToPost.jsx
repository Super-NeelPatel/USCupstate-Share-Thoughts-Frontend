import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReplyToPost.css";
import { AuthContext } from "../auth-context";
import Spinner from "./Spinner";
import WarningModal from "./WarningModal";

//ID TO APPLY CREATION OF THE POST
// const USER_ID = "67469313b66e9f915aa2d535"; //NEEL

const ReplyToPost = ({ post }) => {
  const auth = useContext(AuthContext);
  const USER_ID = auth.userId;
  const [userName, setUserName] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const navigate = useNavigate();

  const triggerWarningModal = () => {
    setShowWarningModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!replyContent) {
      setError("Reply field should not be empty.");
      triggerWarningModal();
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `http://localhost:8000/api/posts/post/reply`,
        {
          content: replyContent,
          post: post._id,
          user: USER_ID,
        },
        {
          headers: {
            Authorization: `Berear ${localStorage.getItem("token")}`,
          },
        }
      );
      setError(null);
      setUserName("");
      setReplyContent("");
      navigate("/home");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="reply-form-container">
        {showWarningModal && (
          <WarningModal
            message={error}
            onClose={() => setShowWarningModal(false)}
          />
        )}
        <form className="reply-form" onSubmit={handleSubmit}>
          <h3 className="form-title">Reply to Post</h3>
          <div className="input-container">
            <textarea
              className="textarea-field replyContent"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write your reply here"
            />
          </div>

          <button className="submit-button" type="submit">
            {loading ? "Submiting..." : "Submit Reply"}
          </button>
        </form>
      </div>
      {loading && <Spinner />}
    </>
  );
};

export default ReplyToPost;
