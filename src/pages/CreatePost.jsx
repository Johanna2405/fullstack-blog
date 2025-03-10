import { useState } from "react";
import { motion } from "framer-motion";
import { createPost } from "../utils/api";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [cover, setCover] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !author.trim() || !cover.trim() || !content.trim()) {
      setError("All fields are required!");
      return;
    }

    setError("");
    setLoading(true);

    const newPost = {
      title,
      author,
      cover,
      content,
      date: new Date().toISOString(),
    };

    try {
      await createPost(newPost);
      setTitle("");
      setAuthor("");
      setCover("");
      setContent("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-xl mx-auto mt-16 p-6 rounded-xl bg-white bg-opacity-90 shadow-xl backdrop-blur-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2 }}
    >
      <h2 className="text-2xl font-extrabold text-gray-800 mb-4 text-center">
        Create a New Post
      </h2>
      {error && <p className="text-red-500 text-center mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Post Title"
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author Name"
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cover Image URL"
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
          value={cover}
          onChange={(e) => setCover(e.target.value)}
        />
        <textarea
          placeholder="Post Content"
          className="p-3 border rounded-lg h-40 focus:ring-2 focus:ring-blue-500 transition-all"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <motion.button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg font-bold hover:scale-105 transition-transform"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Create Post"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default CreatePost;
