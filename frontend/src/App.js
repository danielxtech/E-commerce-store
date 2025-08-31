// frontend/src/App.js

import React, { useEffect, useState } from "react";
import axiosInstance from "./utils/axiosInstance";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import LoginForm from "./components/LoginForm";

function App() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null); // null = viewer
  const [editingProduct, setEditingProduct] = useState(null);

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleAdd = async (formData) => {
    await axiosInstance.post("/products", formData);
    fetchProducts();
  };

  const handleUpdate = async (formData) => {
    await axiosInstance.put(`/products/${editingProduct._id}`, formData);
    setEditingProduct(null);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/products/${id}`);
    fetchProducts();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div
      style={{
        padding: "30px",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        fontFamily: "Arial, sans-serif",
        transition: "background 0.5s ease",
      }}
    >
      <header style={{ marginBottom: "30px", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "36px",
            marginBottom: "10px",
            color: "#6a11cb",
            transition: "color 0.4s ease",
          }}
        >
          📦 Product Management
        </h1>

        {user ? (
          <>
            <p style={{ fontSize: "18px", color: "#333" }}>
              Logged in as: <b>{user.username}</b> ({user.role})
            </p>
            <button
              onClick={handleLogout}
              style={{
                marginTop: "15px",
                padding: "10px 20px",
                borderRadius: "15px",
                border: "none",
                background: "linear-gradient(45deg, #e21515, #860408)",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "10px 5px 15px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              🚪 Logout
            </button>
          </>
        ) : (
          <div style={{ marginTop: "15px" }}>
            <LoginForm
              onLogin={(user) => {
                setUser(user);
                fetchProducts();
              }}
            />
          </div>
        )}
      </header>

      {/* Admin-only section */}
      {isAdmin && (
        <section style={{ marginBottom: "40px" }}>
          {editingProduct ? (
            <>
              <h2 style={{ fontSize: "28px", color: "#ff6b6b", marginBottom: "15px" }}>
                ✏️ Edit Product
              </h2>
              <ProductForm
                onSubmit={handleUpdate}
                initialData={editingProduct}
                buttonText="Update Product"
              />
            </>
          ) : (
            <>
              <h2 style={{ fontSize: "28px", color: "#2575fc", marginBottom: "15px" }}>
                ➕ Add Product
              </h2>
              <ProductForm
                onSubmit={handleAdd}
                initialData={{}}
                buttonText="Add Product"
              />
            </>
          )}
        </section>
      )}

      {/* Product List - visible to everyone */}
      <section>
        <h2 style={{ fontSize: "26px", color: "#2575fc", marginBottom: "20px" }}>
          🛒 Product List
        </h2>
        <ProductList
          products={products}
          onDelete={isAdmin ? handleDelete : null}
          onEdit={isAdmin ? setEditingProduct : null}
          isAdmin={isAdmin}
        />
      </section>
    </div>
  );
}

export default App;
