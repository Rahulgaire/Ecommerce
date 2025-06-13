#  MERN E-Commerce

A full-featured e-commerce web application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). The application allows users to browse products, place orders, and contact support. Admins can manage products and view inquiries.

---

## ⚙️ Features

### 🔐 Authentication
- Register/Login with JWT tokens
- Secure password hashing with bcrypt
- Cookies for token storage

### 🛍️ Product Management
- Create, Read, Update, Delete (CRUD) for products
- Cloudinary image upload via Multer

### 📦 Order Management
- Create and fetch orders
- Link orders to users (future enhancement)

### 📬 Contact Form
- Users can send messages using the contact form
- Nodemailer integration for email notifications

---

## 🧰 Tech Stack

| Category      | Tech                                      |
|---------------|--------------------------------------------|
| **Frontend**  | React.js, Tailwind CSS, Axios, React Router |
| **Backend**   | Node.js, Express.js, MongoDB, Mongoose      |
| **Uploads**   | Multer, Cloudinary                         |
| **Auth**      | JWT, bcryptjs                              |
| **Email**     | Nodemailer                                 |
| **Tooling**   | Vite, Nodemon, Postman                     |

---

## 🚀 Getting Started

### 🔧 1. Clone the Repository

\`\`\`bash
git clone https://github.com/your-username/mern-ecommerce-app.git
cd mern-ecommerce-app
\`\`\`

### 📦 2. Setup Backend

\`\`\`bash
cd server
npm install
\`\`\`

#### ✅ Configure Environment

Create a `.env` file inside `/server`:

\`\`\`bash
PORT=5000
MONGO_URL=your_mongodb_connection
JWT_SECRET=your_jwt_secret
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
\`\`\`

#### ▶️ Run Backend

\`\`\`bash
npm run dev / nodemon server.js
\`\`\`

### 🌐 3. Setup Frontend

\`\`\`bash
cd ../client
npm install
npm run dev
\`\`\`

---

## 🌍 API Endpoints Overview

### 👤 Auth

| Method | Endpoint          | Description         |
|--------|-------------------|---------------------|
| POST   | /auth/register    | Register a user     |
| POST   | /auth/login       | Login user          |

### 📦 Products

| Method | Endpoint               | Description            |
|--------|------------------------|------------------------|
| POST   | /products/add-product  | Add new product        |
| GET    | /products/all-products | Get all products       |
| PUT    | /products/edit/:id     | Edit product by ID     |
| DELETE | /products/:id          | Delete product by ID   |

### 📬 Contact

| Method | Endpoint      | Description              |
|--------|---------------|--------------------------|
| POST   | /contact      | Submit a contact message |


