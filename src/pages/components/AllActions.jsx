import LeftActions from "./Actions/LeftActions";
import RightActions from "./Actions/RightActions";
import "./AllActions.css";

const AllActions = ({ post, posts, setPosts, isCurrentOwner }) => {
  return (
    <div className="all-actions">
      <LeftActions post={post} posts={posts} setPosts={setPosts} />
      <RightActions
        post={post}
        posts={posts}
        setPosts={setPosts}
        isCurrentOwner={isCurrentOwner}
      />
    </div>
  );
};

export default AllActions;
