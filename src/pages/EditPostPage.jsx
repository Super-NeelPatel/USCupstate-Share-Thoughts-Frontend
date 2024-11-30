import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import "./EditPostPage.css";
import EditFormComponent from "./components/EditPostForm";
import axios from "axios";

const EditPostPage = () => {
  const USER_ID = "674692abb66e9f915aa2d527"; //VICT
  const location = useLocation();
  const navigate = useNavigate();
  const { post } = location.state;
  console.log(post);

  const oldData = location.state?.post || { title: "", content: "" };

  const handleSave = async (updatedPost) => {
    console.log("Saving updated Post: ", updatedPost);

    // Here you would send a PUT/PATCH request to your backend to save the updated post.
    // Example:
    // await axios.put(`http://localhost:8000/api/posts/${oldData.id}`, updatedPost);
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
