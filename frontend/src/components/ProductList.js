//frontend/ src/components/ProductList.js
import React from "react";

function ProductList({ products, onDelete, onEdit }) {
  return (
    <div style={{ lineheight:"5px",display: "flex",flexWrap:"wrap", alignitems: "stretch",gap: "20px" }}>
      {products.map((p) => (
        <div
          key={p._id}
          style={{
            border: "1px solid #303030ff",
            borderRadius: "20px",
            padding: "10px",
            width: "200px",
            textAlign: "center",
            alignitems: "stretch",
            lineheight:"500px",
            backgroundcolor: "DodgerBlue",
          }}
        >
          <img
            src={`http://localhost:5000${p.image}`}
            alt={p.name}
            style={{ width: "100%", height: "150px", objectFit: "scale-down" }}
          />
          <h3 style={{fontSize:"22px",fontFamily:"initial"}}>{p.name}</h3>
          <p style={{fontSize:"20px"}}>${p.price}</p>
          <button style={{fontSize:"15px",color:"blue", margin: "17px"}} onClick={() => onEdit(p)}>Edit</button>
          <button style={{fontSize:"15px",color:"red" , margin: "17px"}} onClick={() => onDelete(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
