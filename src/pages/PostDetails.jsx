import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getPostById, deletePost } from "../utils/api";
import DetailView from "../components/DetailView.jsx";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backendOffline, setBackendOffline] = useState(false); // State for offline rendering

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

  // Delete post (deactivated if backend is offline)
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

  // Update button (deactivated if backend is offline)
  const handleUpdate = () => {
    if (backendOffline) return;
    navigate(`/update/${id}`);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );

  return (
    <div className="flex w-screen">
      <DetailView
        post={
          backendOffline
            ? {
                title: "No Data",
                content: "No content available.",
                cover: "",
                date: new Date(),
              }
            : post
        }
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        backendOffline={backendOffline}
        error={error}
      />
    </div>
  );
};

export default PostDetails;
