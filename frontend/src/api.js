//frontend/src/api.js

import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });


API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // store it after login
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
},
(error) => Promise.reject(error));

export const signup = (data) => API.post("/signup", data);

export const login = (data) => API.post("/login", data);

export const getProducts = () => API.get("/products");

export const createProduct = (data) => 
  API.post("/products", data, { headers: { "Content-Type": "multipart/form-data" } });
  
export const updateProduct = (id, data) =>
  API.put(`/products/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } });

export const deleteProduct = (id) => API.delete(`/products/${id}`);

export default API;