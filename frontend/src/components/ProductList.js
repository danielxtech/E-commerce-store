// frontend/src/components/ProductList.js

import React, { useState } from "react";

function ProductList({ products, onDelete, onEdit, isAdmin }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "25px",
        justifyContent: "center",
        padding: "20px",
        background:
          "linear-gradient(120deg, #7e9c07ff, #a9f003ff, #d1ff04ff, #bef04bff, #d3f15bff)",
        minHeight: "100vh",
        transition: "background 0.5s ease",
      }}
    >
      {products.map((p) => (
        <HoverCard
          key={p._id}
          product={p}
          onEdit={onEdit}
          onDelete={onDelete}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
}

function HoverCard({ product, onEdit, onDelete, isAdmin }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        borderRadius: "25px",
        padding: "15px",
        width: "280px",
        textAlign: "center",
        background: hovered
          ? "linear-gradient(145deg, #8acdf3ff, #0439aaff)"
          : "linear-gradient(145deg, #640303ff, #f30000ff)",
        transition: "all 0.5s ease",
        transform: hovered ? "scale(1.1) rotate(1deg)" : "scale(1) rotate(0deg)",
        boxShadow: hovered
          ? "15px 15px 30px rgba(0,0,0,0.3), -10px -10px 20px rgba(255,255,255,0.3)"
          : "5px 5px 15px rgba(0,0,0,0.1)",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={
          product.image
            ? `http://localhost:5000${product.image}`
            : "https://via.placeholder.com/300x150?text=No+Image"
        }
        alt={product.name}
        style={{
          width: "100%",
          height: "160px",
          borderRadius: "20px",
          transition: "transform 0.5s ease",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          objectFit: "scale-down",
        }}
      />
      <h3
        style={{
          fontSize: "24px",
          fontFamily: "Comic Sans MS, cursive, sans-serif",
          color: hovered ? "#0e0f0fff" : "#4df50bff",
          margin: "15px 0 5px 0",
          transition: "color 0.4s ease",
        }}
      >
        {product.name}
      </h3>
      <p
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          color: hovered ? "#4df50bff" : "#0e0f0fff",
          fontFamily: "cursive",
          marginBottom: "15px",
          transition: "color 0.4s ease",
        }}
      >
        {product.price} $
      </p>

      {isAdmin && (
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <button
            style={{
              padding: "5px 25px",
              fontSize: "14px",
              color: "#fff",
              background:
                "linear-gradient(45deg, #4c81f1ff, #0057faff, #0a93eeff)",
              border: "none",
              borderRadius: "15px",
              cursor: "pointer",
              boxShadow: "2px 2px 10px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
            }}
            onClick={() => onEdit(product)}
          >
            Edit
          </button>
          <button
            style={{
              padding: "5px 25px",
              fontSize: "14px",
              color: "#fff",
              background:
                "linear-gradient(45deg, #e64219ff, #ff0202ff, #cc3813ff)",
              border: "none",
              borderRadius: "15px",
              cursor: "pointer",
              boxShadow: "2px 2px 10px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            onClick={() => onDelete(product._id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductList;
