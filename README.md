# 📦 Product Management Web App

![React](https://img.shields.io/badge/React-blue?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-green?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-black?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-red?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-darkred?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-red?style=for-the-badge&logo=postman&logoColor=white)

A **Full-Stack MERN Application** for managing products with authentication and role-based access control.  
Admins can add, update, and delete products (with image uploads), while normal users and visitors can view the catalog.

---

## 🚀 Features

- 🔑 **Authentication & Authorization**
  - Signup & Login with JWT authentication
  - Role-based access control (`admin`, `user`, `visitor`)
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
