# 📦 Product Management Web App

A **Full-Stack MERN Application** for managing products with authentication and role-based access control.  
Admins can add, update, and delete products (with image uploads), while normal users and visitors can view the catalog.

---

## 🚀 Features

- 🔑 **Authentication & Authorization**
  - Signup & Login with JWT authentication
  - Role-based access control (`admin`, `visitor`)
- 📦 **Product Management**
  - Create, update, delete products (admin only)
  - Upload product images (Multer + Express)
- 👀 **Public Product Catalog**
  - Visitors can browse products without login
- 🎨 **Modern Frontend**
  - React UI with styled components
  - Interactive product cards with hover animations
- 🗄 **Database**
  - MongoDB for storing users and products
- 🌐 **API**
  - RESTful API built with Express & Mongoose
  - CORS enabled for frontend-backend communication

---

## 🛠 Tech Stack

**Frontend**
- React.js (Hooks, Components)
- Axios (API calls)

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- Multer (file uploads)
- JWT + bcrypt (auth & security)

---

## ⚙️ Steps to Run the Project

You need to run **two terminals** at the same time.

```bash

🖥️ Terminal 1 — Backend

cd backend-demo
node index.js


🖥️ Terminal 2 — Frontend

cd frontend
npm start
