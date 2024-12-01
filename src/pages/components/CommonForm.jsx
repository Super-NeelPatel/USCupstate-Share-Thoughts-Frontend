import { useState } from "react";
import "./CommonForm.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="form-container ">
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
        />
        <label htmlFor="content" className="form-label">
          Content:
        </label>
        <textarea
          type="text"
          className="input-content input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </form>
      <button className="submit-btn">Submit</button>
    </div>
  );
};
export default CreatePost;
