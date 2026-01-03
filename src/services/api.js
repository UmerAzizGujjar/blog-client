import axios from 'axios';

/**
 * API Configuration
 * Uses environment variable for backend URL
 * Local: http://localhost:5000/api
 * Production: https://blog-server-production-fa29.up.railway.app/api
 */
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('🔗 API URL:', API_URL); // Debug log to verify correct URL is loaded

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data)
};

// Blog API
export const blogAPI = {
  getAllBlogs: () => api.get('/blogs'),
  createBlog: (data) => api.post('/blogs', data),
  updateBlog: (id, data) => api.put(`/blogs/${id}`, data),
  deleteBlog: (id) => api.delete(`/blogs/${id}`),
  toggleLike: (id) => api.post(`/blogs/${id}/like`)
};

export default api;
