// backend-demo/seedAdmin.js

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new User({
      username: "admin5",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin created:", admin);
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error seeding admin:", err);
    mongoose.disconnect();
  }
};

seedAdmin();

