// frontend/src/App.js
import React, { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./api";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  const handleAdd = async (product) => {
    const res = await createProduct(product);
    setProducts([...products, res.data]);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter((p) => p._id !== id));
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleUpdate = async (updatedData) => {
    const res = await updateProduct(editingProduct._id, updatedData);
    setProducts(
      products.map((p) => (p._id === res.data._id ? res.data : p))
    );
    setEditingProduct(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{fontFamily:"c",fontSize:"50px"}}>📦 Product Management</h1>

      {editingProduct ? (
        <>
          <h2 style={{fontFamily:"c", fontSize:"30px"}}>Edit Product</h2>
          <ProductForm
            onSubmit={handleUpdate}
            initialData={editingProduct}
            buttonText="Update"
          />
        </>
      ) : (
        <>
          <h2 style={{fontFamily:"c",fontSize:"30px"}}>Add Product</h2>
          <ProductForm onSubmit={handleAdd} buttonText="Add" />
        </>
      )}

      <h2 style={{fontFamily:"c",fontSize:"30px"}}>Product List</h2>
      <ProductList
        products={products}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;
