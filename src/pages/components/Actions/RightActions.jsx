import { useNavigate } from "react-router-dom";
import "./RightActions.css";
const RightActions = ({ post, isCurrentOwner }) => {
  const navigate = useNavigate();
  console.log(isCurrentOwner);
  const goToReplyPage = () => {
    navigate("/post/reply", { state: post._id });
  };
  const goToEditPage = () => {
    navigate("/post/edit", { state: { post } });
  };

  return (
    <div className="right-actions">
      {isCurrentOwner && (
        <>
          <button id="edit-btn" className="btn" onClick={goToEditPage}>
            Edit
          </button>
          <button id="delete-btn" className="btn ">
            Delete
          </button>
        </>
      )}
      {!isCurrentOwner && (
        <button id="reply-btn" className="btn" onClick={goToReplyPage}>
          Reply
        </button>
      )}
    </div>
  );
};

export default RightActions;
