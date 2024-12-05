import React, { useContext } from "react";
import "./BlogList.css";
import Post from "./Post";
import { AuthContext } from "../auth-context";
const BlogList = ({ posts, setPosts }) => {
  const auth = useContext(AuthContext);
  const CURRENT_OWNER = auth.userId; // Replce with logged in user id
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
        {/* {CURRENT_OWNER &&
          posts.map((post) => (
            <>
              <Post
                key={post._id}
                post={post}
                posts={posts}
                setPosts={setPosts}
                showActions={true}
                isCurrentOwner={CURRENT_OWNER === post.user._id ? true : false} //When we have owner of the post we should only show edit and delete button and hide reply button and vice versa show reply button to only people who is not owner
              />
            </>
          ))} */}
      </div>
    </ul>
  );
};

export default BlogList;
