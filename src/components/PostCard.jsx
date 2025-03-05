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

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-60 transition-all duration-300" />

        {/* Text Content */}
        <div className="absolute bottom-5 left-5 text-white">
          <h3 className="text-2xl font-semibold">{post.title}</h3>
          <p className="text-sm uppercase opacity-90">{post.author}</p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
