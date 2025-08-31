// frontend/src/components/ProductForm.js

import React, { useState, useEffect, useRef } from "react";

function ProductForm({ onSubmit, initialData = {}, buttonText, disabled = false }) {
  const [name, setName] = useState(initialData.name || "");
  const [price, setPrice] = useState(initialData.price || "");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    setName(initialData.name || "");
    setPrice(initialData.price || "");
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (disabled) return; // block submission if not admin

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    if (image) formData.append("image", image);

    try {
      await onSubmit(formData);

      // Clear fields after successful submit
      setName("");
      setPrice("");
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("❌ Failed to save product:", err);
    } finally {
      setLoading(false);
    }
  };

return (
    <form
      onSubmit={handleSubmit}
      style={{
        margin: "20px auto",
        padding: "25px",
        maxWidth: "400px",
        borderRadius: "20px",
        background: "linear-gradient(145deg, #fbc2eb, #a6c1ee)",
        boxShadow: "5px 5px 20px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        fontFamily: "Arial, sans-serif",
        transition: "all 0.4s ease",
      }}
    >
      <input
        type="text"
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        disabled={disabled || loading}
        style={{
          padding: "12px 15px",
          borderRadius: "12px",
          border: "2px solid #ff6b81",
          outline: "none",
          fontSize: "16px",
          transition: "all 0.3s ease",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#6a11cb")}
        onBlur={(e) => (e.target.style.borderColor = "#ff6b81")}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        min="0"
        disabled={disabled || loading}
        style={{
          padding: "12px 15px",
          borderRadius: "12px",
          border: "2px solid #ff6b81",
          outline: "none",
          fontSize: "16px",
          transition: "all 0.3s ease",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#6a11cb")}
        onBlur={(e) => (e.target.style.borderColor = "#ff6b81")}
      />

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={(e) => setImage(e.target.files[0])}
        disabled={disabled || loading}
        style={{
          padding: "8px",
          borderRadius: "12px",
          border: "2px dashed #ff6b81",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.borderColor = "#6a11cb")}
        onMouseLeave={(e) => (e.target.style.borderColor = "#ff6b81")}
      />

      <button
        type="submit"
        disabled={disabled || loading}
        style={{
          padding: "12px 0",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#292827ff",
          border: "none",
          borderRadius: "15px",
          cursor: disabled || loading ? "not-allowed" : "pointer",
          background: "linear-gradient(45deg, #e21212ff, #fbc2eb, #6a11cb)",
          boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => !disabled && (e.target.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
      >
        {loading ? "Saving..." : buttonText}
      </button>

      {disabled && (
        <p
          style={{
            color: "gray",
            fontSize: "14px",
            marginTop: "5px",
            textAlign: "center",
          }}
        >
          🔒 Only admins can add or edit products.
        </p>
      )}
    </form>
  );
}

export default ProductForm;
