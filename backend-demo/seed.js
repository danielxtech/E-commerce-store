// backend-demo/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const  image  = require('./models/Product');

const products = [
  { name: "Laptop Dell XPS 15", price: 1200, image: "https://picsum.photos/200?random=1" },
  { name: "iPhone 15", price: 800, image: "https://picsum.photos/200?random=2" },
  { name: "Samsung Galaxy S25 Ultra", price: 1195, image: "https://picsum.photos/200?random=3" },
  { name: "Smart Watch", price: 70, image: "https://picsum.photos/200?random=4" },
  { name: "Apple AirPods Pro", price: 249, image: "https://picsum.photos/200?random=5" },
  {name: "Power Bank 20000mAh",price: 59,image: "https://picsum.photos/200?random=6"},
  { name: "Samsung Galaxy Watch 6", price: 320, image: "https://picsum.photos/200?random=7" },
  {name: "iPhone 15 Pro Max", price: 1199,image: "https://picsum.photos/200?random=8"},
  {name: "Samsung Galaxy S24 Ultra",price: 1099,image: "https://picsum.photos/200?random=9"},
  {name: "Google Pixel 8 Pro",price: 999,image: "https://picsum.photos/200?random=10"},
  {name: "OnePlus 12",price: 899,image: "https://picsum.photos/200?random=11"},
  {name: "Xiaomi 14 Pro",price: 799,image: "https://picsum.photos/200?random=12"},
  {name: "AirPods Pro 2",price: 249,image: "https://picsum.photos/200?random=13"},
  {name: "Samsung Galaxy Buds2 Pro",price: 199,image: "https://picsum.photos/200?random=14"},
  {name: "iPhone 15 Silicone Case",price: 49,image: "https://picsum.photos/200?random=15"},
  {name: "Anker 20W Fast Charger", price: 25, image: "https://picsum.photos/200?random=16"},
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");
    await Product.deleteMany(); // clear old data
    await Product.insertMany(products);
    console.log("✅ Sample products inserted!");
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
