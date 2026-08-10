# MERN E-Commerce drink Website

A full-stack e-commerce web application built using the MERN stack.  
The project includes user authentication, product browsing, cart management, checkout functionality, and a protected admin dashboard for product management.

## Live Demo

🌐 **Frontend:** https://e-commerce-website-fawn-two.vercel.app/

🌐 **Backend:** https://e-commerce-website-w1ee.onrender.com/

> The backend may take a few seconds to wake up when using Render's free hosting.

---

## Features

### User Features

- User registration and login
- JWT-based authentication
- Secure HTTP-only cookies
- Browse available products
- Product search
- Add products to cart
- Increase/decrease product quantity
- Remove products from cart
- Cart total calculation
- Checkout functionality
- Persistent user cart
- Responsive interface

###  Admin Features

The application includes a **protected admin route** that is accessible only to authorized administrators.

Admin functionality includes:

- Protected admin authentication
- Add new products
- Upload product images
- Manage product information
- Administrative access separated from normal users

## 🔐 Admin Demo Access

The project includes a protected admin dashboard with product management functionality.

### Admin Login

**Admin Panel:** https://e-commerce-website-fawn-two.vercel.app/admin

**Email:** `ita@gmail.com`  
**Password:** `sahil`


### Admin Features

- Protected admin authentication
- Add new products
- Upload product images
- Manage product information
- View and manage products
- Admin-only access

---

## Tech Stack

### Frontend

- React.js
- React Router
- Axios
- CSS
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Cookie Parser
- Multer
- CORS

### Deployment

- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database

---

## Project Structure

```text
e-commerce-website/
│
├── backend/
│   ├── database/
│   ├── upload/
│   ├── index.js
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── ...
│
├── package.json
└── README.md
