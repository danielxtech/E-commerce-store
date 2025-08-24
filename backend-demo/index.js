// backend-demo/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/Product');
const path = require("path");
const multer = require("multer");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const auth = require('./middleware/auth');

const app = express();
//app.use(express.json());
app.use(express.static("public"));

app.use(cors({
  origin: "http://localhost:3000",   // React app runs here
  methods: ["GET", "POST", "PUT", "DELETE"],
 allowedHeaders: ["Content-Type", "Authorization"]
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
  .catch(err => console.error("DB connection error:",err));

// Routes

// GET all products
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// POST a product with image upload
app.post('/products',auth("admin"), upload.single("image"), async (req, res) => {
  const { name, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const product = new Product({ name, price, image });
  await product.save();
  res.status(201).json(product);
});

app.post('/products',auth("admin"), upload.single("image"), async (req, res) => {
  try {
    const { name, price } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null; // ← fix with backticks
    const product = new Product({ name, price, image });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /signup
app.post('/signup', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: "Missing fields" });

    const exists = await User.findOne({ $or: [{ username }, { email }] });
    if (exists) return res.status(409).json({ message: "Username or email already used" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hash, role: role || "user" });

    res.status(201).json({ id: user._id, username: user.username, email: user.email, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /login
app.post('/login', async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    if (!usernameOrEmail || !password) return res.status(400).json({ message: "Missing fields" });

    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
    });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT update product
/*app.put('/products/:id', upload.single("image"), async (req, res) => {
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
});*/

app.put('/products/:id',auth("admin"), upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    const updateData = { name, price };
    if (req.file) updateData.image = `/uploads/${req.file.filename}`; // ← fix
    const updated = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE product
/*app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ message: 'Product not found' });
  res.json({ message: 'Product deleted' });
});*/

app.delete('/products/:id',auth("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Optional: global 404
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
