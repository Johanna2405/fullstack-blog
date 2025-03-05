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

        // Sort posts from newest to oldest
        const sortedPosts = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="container mx-auto py-24 px-5" id="stories">
      <h2 className="font-Snippet text-4xl text-lightBeige uppercase tracking-wider text-center mb-16">
        Latest Articles
      </h2>
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
