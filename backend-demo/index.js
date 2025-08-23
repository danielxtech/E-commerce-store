// backend-demo/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/Product');
const path = require("path");
const multer = require("multer");

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",   // React app runs here
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

// ✅ Multer setup (before routes!)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // save inside backend-demo/uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
  },
});
const upload = multer({ storage });

// ✅ Serve uploads folder
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error(err));

// Routes

// GET all products
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// POST a product with image upload
app.post('/products', upload.single("image"), async (req, res) => {
  const { name, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const product = new Product({ name, price, image });
  await product.save();
  res.status(201).json(product);
});

// PUT update product
app.put('/products/:id', upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  // If a new image was uploaded, use it, else keep old one
  const updateData = {
    name,
    price,
  };
  if (req.file) {
    updateData.image = `/uploads/${req.file.filename}`;
  }

  const updated = await Product.findByIdAndUpdate(id, updateData, { new: true });
  if (!updated) return res.status(404).json({ message: 'Product not found' });
  res.json(updated);
});

// DELETE product
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ message: 'Product not found' });
  res.json({ message: 'Product deleted' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
