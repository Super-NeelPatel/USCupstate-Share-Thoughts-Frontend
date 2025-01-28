import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./ProfilePage.css";
import NavBar from "./components/navBar";
import { AuthContext } from "./auth-context";
import Spinner from "./components/Spinner";

const ProfilePage = () => {
  const auth = useContext(AuthContext);
  const USER_ID = auth.userId;
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://blog-site-frontend-dlxl.onrender.com/api/posts/getUserStats/${USER_ID}`,
          {
            headers: {
              Authorization: `Berear ${localStorage.getItem("token")}`,
            },
          }
        );
        setUserData(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserPosts();
  }, []);

  return (
    <>
      <NavBar />

      <div>
        <div className="loading">{isLoading && <Spinner />}</div>
        {!isLoading && userData && (
          <div className="stats-container">
            <h1 id="name">{userData.user.name}</h1>
            <div className="stats">
              <p>
                Likes: <span>{userData.totalLikesUserHas}</span>
              </p>
              <p>
                Posts: <span>{userData.totalPostsUserHas}</span>
              </p>
              <p>
                Replies: <span>{userData.totalRepliesUserHas}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
