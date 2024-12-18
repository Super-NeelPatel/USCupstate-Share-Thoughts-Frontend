import { useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmDeletePostModal = ({
  postToDelete,
  setShowDeleteModal,
  postReplies,
  setPostReplies,
  setPostToDelete,
  onPostDeleted,
}) => {
  const navigate = useNavigate();

  const cancelDelete = () => {
    setShowDeleteModal(false);
    console.log(postToDelete._id);
  };

  const confirmDelete = async (postToDelete) => {
    console.log(postReplies);
    try {
      await axios.delete(
        `http://localhost:8000/api/posts/post/${postToDelete._id}`,
        {
          headers: {
            Authorization: `Berear ${localStorage.getItem("token")}`,
          },
        }
      );
      setPostReplies((prevReplies) => {
        prevReplies.filter((prevReply) => prevReply._id !== postToDelete._id);
      });
      setPostToDelete(null);
      onPostDeleted();
      // navigate("/");
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <p>Are you sure you want to delete this post?</p>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={cancelDelete}>
            Cancel
          </button>
          <button
            className="confirm-btn"
            onClick={() => confirmDelete(postToDelete)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletePostModal;
