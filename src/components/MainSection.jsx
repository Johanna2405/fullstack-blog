import { useEffect, useState } from "react";
import PostCard from "./PostCard";

const MainSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="container mx-auto py-10 px-5">
      <h2 className="text-4xl font-bold text-center mb-8">Latest Articles</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center">No posts available.</p>
      )}
    </section>
  );
};

export default MainSection;
