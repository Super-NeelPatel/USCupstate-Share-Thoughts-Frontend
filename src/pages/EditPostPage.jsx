import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import "./EditPostPage.css";
import EditFormComponent from "./components/EditPostForm";
import axios from "axios";

const EditPostPage = () => {
  const USER_ID = "67469313b66e9f915aa2d535"; //VICT
  const location = useLocation();
  const navigate = useNavigate();
  const { post } = location.state;
  console.log(post);

  const oldData = location.state?.post || { title: "", content: "" };

  const handleSave = async (updatedPost) => {
    console.log("Saving updated Post: ", updatedPost);

    console.log(oldData._id);
    try {
      await axios.patch(`http://localhost:8000/api/posts/post/${oldData._id}`, {
        title: updatedPost.title,
        content: updatedPost.content,
        user: USER_ID,
      });
      // Navigate back to the previous page after saving
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <EditFormComponent existingData={oldData} onSave={handleSave} />
    </div>
  );
};

export default EditPostPage;
