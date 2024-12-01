import { useState } from "react";
import "./ConfirmDeleteModal.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//isPostBeiggnDeleted should be true false, if it is false that means we are deleting reply
const ConfirmDeleteModal = ({
  isPostBeignDeleted,
  id,
  setShowDeleteModal,
  posts,
  setPosts,
}) => {
  const onConfirmDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/posts/${id}` //delete req for post
      );

      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      setShowDeleteModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="confirm-delete-modal">
        <p>
          Are you sure you want to delete this{" "}
          {isPostBeignDeleted ? "post" : "reply"}?
        </p>
        <div className="actions-btn">
          <button
            className="cancel-btn"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
          <button className="confirm-btn" onClick={() => onConfirmDelete(id)}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
