import { React, useEffect, useState } from "react";
import "./EditPostForm.css";

const EditFormComponent = ({ existingData, onSave }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (existingData) {
      setTitle(existingData.title || "");
      setContent(existingData.content || "");
    }
  }, [existingData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedPost = { title, content };
    console.log(updatedPost);
    onSave(updatedPost);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">
        {existingData ? "Edit Post" : "Create Post"}
      </h2>
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
          onClick={(e) => handleSubmit(e)}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditFormComponent;
