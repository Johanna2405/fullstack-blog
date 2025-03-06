import { Link } from "react-router";

const PostCard = ({ post }) => {
  return (
    <Link to={`/posts/${post.id}`} className="block group">
      <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
        {/* Background Image */}
        <img
          src={post.cover}
          alt={post.title}
          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
        />

        {/* Darker Overlay with Explicit RGBA */}
        <div
          className="absolute inset-0 bg-black transition-all duration-300"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        />

        {/* Text Content */}
        <div className="absolute bottom-5 left-5 text-white">
          <h3 className="text-2xl font-semibold font-Snippet uppercase">
            {post.title}
          </h3>
          <p className="text-sm uppercase opacity-90">{post.author}</p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
