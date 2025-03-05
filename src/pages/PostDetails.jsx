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
      navigate("/");
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
    <div className="flex flex-col gap-8 min-h-screen bg-[linear-gradient(to_top,rgb(30,35,42),transparent),url('https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-no-repeat bg-top pt-12 justify-start items-center">
      <DetailView
        post={backendOffline ? offlinePostTemplate : post}
        onDelete={handleDelete}
        backendOffline={backendOffline}
        error={error}
        handleUpdatePost={handleUpdatePost}
        entries={entries}
        setSelectedEntry={setPost}
      />
    </div>
  );
};

export default PostDetails;
