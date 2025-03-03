import axios from "axios";

const API_URL = "http://localhost:3000/posts";

// CREATE - Create a new post
export const createPost = async (postData) => {
  try {
    const response = await axios.post(API_URL, postData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create post");
  }
};

// READ - Fetch single post
export const getPostById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Post not found");
  }
};

// UPDATE - Update a post
export const updatePost = async (id, postData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, postData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update post");
  }
};

// DELETE - Delete a post
export const deletePost = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return { success: true };
  } catch (error) {
    throw new Error("Failed to delete post");
  }
};
