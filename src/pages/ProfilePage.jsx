import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ProfilePage.css";

const USER_ID = "67469313b66e9f915aa2d535"; //NEEL
const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/posts/getUserStats/${USER_ID}`
        );
        console.log(response.data);
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
    <div>
      <div className="loading">{isLoading && <p>Loading</p>}</div>
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
  );
};

export default ProfilePage;
