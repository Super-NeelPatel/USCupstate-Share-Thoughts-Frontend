import { useNavigate } from "react-router-dom";
import "./RightActions.css";
const RightActions = ({ post }) => {
  const navigate = useNavigate();

  const goToReplyPage = () => {
    navigate("/post/reply", { state: post._id });
  };

  return (
    <div className="right-actions">
      <button id="reply-btn" className="btn" onClick={goToReplyPage}>
        Reply
      </button>
      <button id="edit-btn" className="btn">
        Edit
      </button>
      <button id="delete-btn" className="btn ">
        Delete
      </button>
    </div>
  );
};

export default RightActions;
