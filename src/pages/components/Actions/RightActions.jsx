import { useNavigate } from "react-router-dom";
import "./RightActions.css";

import ConfirmDeleteModal from "../ConfirmDeleteModal";
import { useState } from "react";

const RightActions = ({ post, posts, setPosts, isCurrentOwner }) => {
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const goToReplyPage = () => {
    navigate("/post/reply", { state: post._id });
  };
  const goToEditPage = () => {
    navigate("/post/edit", { state: { post } });
  };
  const onDeleteButton = () => {
    setShowDeleteModal(true);
  };
  return (
    <div className="right-actions">
      {isCurrentOwner && (
        <>
          <button id="edit-btn" className="btn" onClick={goToEditPage}>
            Edit
          </button>
          <button id="delete-btn" className="btn" onClick={onDeleteButton}>
            Delete
          </button>
        </>
      )}
      {!isCurrentOwner && (
        <button id="reply-btn" className="btn" onClick={goToReplyPage}>
          Reply
        </button>
      )}
      {showDeleteModal && (
        <ConfirmDeleteModal
          isPostBeignDeleted={true}
          id={post._id}
          setShowDeleteModal={setShowDeleteModal}
          posts={posts}
          setPosts={setPosts}
        />
      )}
    </div>
  );
};

export default RightActions;
