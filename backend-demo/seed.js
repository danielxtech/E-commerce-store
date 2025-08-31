// backend-demo/seed.js

require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  { name: "Sample Phone", price: 299, image: null },
  { name: "Gaming Laptop", price: 1499, image: null},
  { name: "Iphone 16 pro", price: 1050, image: null}
];

(async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Sample products inserted!");
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
  }
})();
