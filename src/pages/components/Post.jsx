import React from "react";
import "./Post.css";
import AllActions from "./AllActions";
const Post = ({ post, posts, setPosts, showActions }) => {
  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="single-item">
      <div>
        <div className="title-container">
          <p className="title">{post.title}</p>
          <p className="date">{formatDate(post.createdAt)}</p>
        </div>
        <h2>
          {" "}
          <span></span>
        </h2>
        <h3 className="content">{post.content}</h3>
        <h4 className="name">Author: {post.user.name}</h4>
      </div>
      {showActions && (
        <AllActions post={post} posts={posts} setPosts={setPosts} />
      )}
    </div>
  );
};

export default Post;
