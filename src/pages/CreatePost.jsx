import axios from "axios";
import { useState } from "react";
import "./CreatePost.css";
import { useNavigate } from "react-router-dom";

const USER_ID = "67469313b66e9f915aa2d535";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:8000/api/posts/create`, {
        title,
        content,
        user: USER_ID,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add-new-blog-container ">
      <h1>Create New Blog</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="title" className="form-label">
          Title:{" "}
        </label>
        <input
          type="text"
          className="input-title input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="content" className="form-label">
          Content:
        </label>
        <textarea
          type="text"
          className="input-content input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
      </form>
      <button className="submit-btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};
export default CreatePost;
