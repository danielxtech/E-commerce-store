import React, { useState, useEffect } from "react";

function ProductForm({ onSubmit, initialData, buttonText }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPrice(initialData.price);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    if (image) formData.append("image", image);

    onSubmit(formData);

    setName("");
    setPrice("");
    setImage(null);
  };

  return  (
   <form onSubmit={handleSubmit} style={{ marginBottom: "20px" , fontFamily:"revert-layer" }}>
      <input
        type="text"
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <br></br>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <br></br>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit">{buttonText}</button>
    </form>
  );  
}

export default ProductForm;
