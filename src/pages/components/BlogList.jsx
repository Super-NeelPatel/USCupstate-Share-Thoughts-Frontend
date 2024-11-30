import React from "react";
import "./BlogList.css";
import Post from "./Post";
const BlogList = ({ posts, setPosts }) => {
  console.log(posts);
  return (
    <ul className="list-blogs">
      <div>
        {posts.map((post) => (
          <>
            <Post
              key={post._id}
              post={post}
              posts={posts}
              setPosts={setPosts}
              showActions={true}
            />
            {/* <ListItem
              key={post._id}
              post={post}
              posts={posts}
              setPosts={setPosts}
            /> */}
          </>
        ))}
      </div>
    </ul>
  );
};

export default BlogList;
