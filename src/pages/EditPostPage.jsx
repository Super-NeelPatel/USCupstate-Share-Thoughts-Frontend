import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import "./EditPostPage.css";
import EditFormComponent from "./components/EditPostForm";
import axios from "axios";
import NavBar from "./components/navBar";
import { AuthContext } from "./auth-context";
import Spinner from "./components/Spinner";

const EditPostPage = () => {
  const auth = useContext(AuthContext);
  const USER_ID = auth.userId; //VICT
  const location = useLocation();
  const navigate = useNavigate();
  const { post } = location.state;
  const [loading, setLoading] = useState(false);

  const oldData = location.state?.post || { title: "", content: "" };

  const handleSave = async (updatedPost) => {
    console.log("Saving updated Post: ", updatedPost);

    console.log(oldData._id);
    try {
      setLoading(true);
      await axios.patch(
        `https://blog-site-frontend-dlxl.onrender.com/api/posts/post/${oldData._id}`,
        {
          title: updatedPost.title,
          content: updatedPost.content,
          user: USER_ID,
        },
        {
          headers: {
            Authorization: `Berear ${localStorage.getItem("token")}`,
          },
        }
      );
      // Navigate back to the previous page after saving
      setLoading(false);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <NavBar />
      <div>
        <EditFormComponent existingData={oldData} onSave={handleSave} />
      </div>
      {loading && <Spinner />}
    </>
  );
};

export default EditPostPage;
