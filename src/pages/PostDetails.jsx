import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getPostById, getAllPosts, updatePost, deletePost } from "../utils/api";
import DetailView from "../components/DetailView.jsx";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backendOffline, setBackendOffline] = useState(false);

  // Fetch post by ID
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (err) {
        setError("⚠️ Backend not reachable.");
        setBackendOffline(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // Fetch all posts for pagination
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const data = await getAllPosts();
        setEntries(data);
      } catch (err) {
        console.error("⚠️ Failed to fetch all posts.");
      }
    };
    fetchAllPosts();
  }, []);

  const handleUpdatePost = async (updatedPost) => {
    try {
      await updatePost(updatedPost.id, updatedPost);
      setPost(updatedPost);
    } catch (err) {
      alert("Failed to update post.");
    }
  };

  const handleDelete = async () => {
    if (backendOffline) return;
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await deletePost(id);
      navigate("/home");
    } catch (err) {
      alert("Failed to delete post.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );

  return (
    <DetailView
      post={backendOffline ? offlinePostTemplate : post}
      onDelete={handleDelete}
      backendOffline={backendOffline}
      error={error}
      handleUpdatePost={handleUpdatePost}
      entries={entries}
      setSelectedEntry={setPost}
    />
  );
};

export default PostDetails;
