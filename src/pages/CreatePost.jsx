import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/navBar";
import { AuthContext } from "./auth-context";
import Spinner from "./components/Spinner";
import WarningModal from "./components/WarningModal";

const CreatePost = () => {
  const auth = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

  const navigate = useNavigate();

  const triggerWarningModal = () => {
    setShowWarningModal(true);
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();

    if (title.trim().length < 5 || content.trim().length === 0) {
      triggerWarningModal();
      return;
    }
    try {
      setLoading(true);
      await axios.post(
        `https://blog-site-frontend-dlxl.onrender.com/api/posts/create`,
        { title, content, user: auth.userId },

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLoading(false);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <NavBar />
      {showWarningModal && (
        <WarningModal
          message={
            "Title should be atleast 5 characters long.\nAnd Content should not be empty."
          }
          onClose={() => setShowWarningModal(false)}
        />
      )}
      ;
      <div className="form-container">
        <h2 className="form-title">Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label htmlFor="content" className="form-label">
            Content:
          </label>

          <textarea
            id="content"
            className="form-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>

          <button
            type="submit"
            className="form-submit-button"
            onClick={handleSubmit}
          >
            Create New
          </button>
        </form>
      </div>
      {loading && <Spinner />}
    </>
  );
};
export default CreatePost;
