import React from "react";
import "./BlogList.css";
import Post from "./Post";
const BlogList = ({ posts, setPosts }) => {
  const CURRENT_OWNER = "67469313b66e9f915aa2d535"; // Replce with logged in user id
  return (
    <ul className="list-blogs">
      <div>
        {posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            posts={posts}
            setPosts={setPosts}
            showActions={true}
            isCurrentOwner={CURRENT_OWNER === post.user._id ? true : false} //When we have owner of the post we should only show edit and delete button and hide reply button and vice versa show reply button to only people who is not owner
          />
        ))}
      </div>
    </ul>
  );
};

export default BlogList;
