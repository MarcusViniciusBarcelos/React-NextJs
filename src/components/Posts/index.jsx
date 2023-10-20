import P from "prop-types";
import "./styles.css";
import { PostCard } from "../PostCard";

export const Posts = ({ posts = [] }) => {
  return (
    <div className="posts">
      {posts.map((post) => (
        <PostCard
          id={post.id}
          key={post.id}
          title={post.title}
          body={post.body}
          cover={post.cover}
        />
      ))}
    </div>
  );
};

Posts.propTypes = {
  posts: P.arrayOf(
    P.shape({
      id: P.number.isRequired,
      title: P.string.isRequired,
      body: P.string.isRequired,
      cover: P.string.isRequired,
    }),
  ),
};
