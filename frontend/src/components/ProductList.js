
import React, { useState } from "react";

function ProductList({ products, onDelete, onEdit }) {
  return (
    <div
      style={{
        lineHeight: "5px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "stretch",
        gap: "20px",
      }}
    >
      {products.map((p) => (
        <HoverCard key={p._id} product={p} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}


function HoverCard({ product, onEdit, onDelete }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        border: "1px solid #413e3e",
        borderRadius: "20px",
        padding: "10px",
        width: "300px",
        textAlign: "center",
        backgroundColor: "#ffffffff",
        transition: "transform 0.5s ease, box-shadow 0.6s ease",
        transform: hovered ? "scale(1.1)" : "scale(1)",
        boxShadow: hovered
          ? "20px 20px 20px rgba(0,0,0,0.2)"
          : "20px 20px 20px rgba(0,0,0,0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={`http://localhost:5000${product.image}`}
        alt={product.name}
        style={{ width: "100%", height: "150px", objectFit: "scale-down" }}
      />
      <h3 style={{ fontSize: "22px", fontFamily: "initial" }}>
        {product.name}
      </h3>
      <p style={{ padding:"15px",fontSize: "30px",fontFamily:"cursive" }}>${product.price}</p>
      <button
        style={{padding:"2px 30px",fontSize: "14px", color: "blue", margin: "23px" }}
        onClick={() => onEdit(product)}
      >
        Edit
      </button>
      <button
        style={{ padding:"2px 30px",fontSize: "13px", color: "red", margin: "23px" }}
        onClick={() => onDelete(product._id)}
      >
        Delete
      </button>
    </div>
  );
}

export default ProductList;
