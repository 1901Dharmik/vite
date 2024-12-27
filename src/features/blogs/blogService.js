import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getBlogs = async (page, limit) => {
  const response = await axios.get(`${base_url}blog`, {
    params: { page, limit },
  });
  if (response.data) {
    return response.data;
  }
};

const getBlog = async (id) => {
  const response = await axios.get(`${base_url}blog/${id}`);
  if (response.data) {
    return response.data;
  }
};

const likeBlog = async (blogId) => {
  const response = await axios.put(`${base_url}blog/likes`, { blogId }, config);
  if (response.data) {
    return response.data;
  }
};
const dislikeBlog = async (blogId) => {
  const response = await axios.put(
    `${base_url}blog/dislikes`,
    { blogId },
    config
  );
  if (response.data) {
    return response.data;
  }
};

export const blogService = {
  getBlogs,
  getBlog,
  likeBlog,
  dislikeBlog,
};
