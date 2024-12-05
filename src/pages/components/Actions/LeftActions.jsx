import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import "./LeftActions.css";
import { useContext } from "react";
import { AuthContext } from "../../auth-context";

const LeftActions = ({ post, posts, setPosts }) => {
  const auth = useContext(AuthContext);
  const USER_ID = auth.userId;
  const navigate = useNavigate();
  const handleShowReplies = async (postId) => {
    navigate("/post", { state: postId });
  };

  const handleLike = async (postId) => {
    console.log("working");
    try {
      // Call the backend to toggle like
      const res = await axios.post(
        `http://localhost:8000/api/posts/${postId}/like`,
        { user: USER_ID },
        {
          headers: {
            Authorization: `Berear ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update the local state to reflect the new likes array
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, likes: res.data.post.likes } : post
        )
      );
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };
  return (
    <div className="left-actions">
      <button className="like-btn" onClick={() => handleLike(post._id)}>
        <FontAwesomeIcon
          icon={post.likes.includes(USER_ID) ? solidHeart : regularHeart}
          color={post.likes.includes(USER_ID) ? "red" : "gray"}
          className="heart-icon"
        />
        <span>{post.likes.length}</span>
      </button>
      <button
        className="show-replies-btn"
        onClick={() => handleShowReplies(post._id)}
      >
        <span>💬 {post.replies.length}</span>
      </button>
    </div>
  );
};

export default LeftActions;
