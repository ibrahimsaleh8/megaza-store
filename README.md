# 🛒 [Megaza - E-commerce Website](https://megaza-store.vercel.app/)

**[Live Demo](https://megaza-store.vercel.app/)** 🚀  

Megaza is an e-commerce platform for selling men's fashion clothing. Built with modern web technologies, it offers a seamless shopping experience with powerful features for both users and admins.

---

## 🚀 Project Overview

Megaza provides a comprehensive online shopping experience with features like authentication, product management, and secure checkout. It is designed to be fast, scalable, and user-friendly.

---

## 🛠️ Project Technologies

### **Frontend:**
- ⚛️ Next.js + TypeScript  
- 🔄 React Query  
- 🐻 Zustand (State Management)  
- 📝 React Hook Form + Zod Validation  
- 🎨 Tailwind CSS  
- 🖌️ Shadcn UI  
- 🔔 React Toastify  
- 📡 Axios  
- ✨ Aos Animation  

### **Backend:**
- 🗄️ PostgreSQL  
- 🌿 Prisma ORM  
- 🔒 Bcrypt.js  
- 🛡️ JSON Web Token (JWT)  
- 📧 Nodemailer  
- ☁️ Cloudinary  
- 💳 Stripe  

---

## 📋 Project Features

### 🔑 **Authentication (Login / Register / Forgot Password)**
- **Register:** Create an account using a username, email, and password. A welcome email is sent upon successful registration.  
- **Login:** Secure login using email and password.  
- **Forgot Password:** Users can reset their password via an email reset link.  

---

### 📊 **Dashboard (User & Admin)**

#### 🧍‍♂️ **User Dashboard:**
- View orders with real-time status updates.  
- Update personal account information.  

#### 🛠️ **Admin Dashboard:**
- View total stats: Products, Orders, Customers, Categories.  
- Manage orders (view, update status).  
- Manage users (delete, update roles).  
- Manage products (add, delete, update).  
- Manage categories (add, update, delete).  
- Create and manage discount codes.  

---

### 🛍️ **Products Management**
- View all products with caching for faster performance.  
- Filter products by price or category.  
- Display discounted products separately.  
- Detailed product pages with optimized image loading.  
- Search products with debounce to enhance search performance.  

---

### 🛒 **Shopping Cart & Wishlist**
- **Cart:**
  - Add to Cart / Remove from Cart.  
  - Adjust product quantity with debounce for optimized updates.  
- **Wishlist:**
  - Add products to Wishlist with caching for instant updates.  
- **Technologies Used:** Next.js, React Query, Zustand, PostgreSQL  

---

### 💳 **Checkout & Payment**
- **Payment options:**
  - Pay on delivery.  
  - Pay by credit card (via Stripe).  
- Apply discount codes at checkout.  

---

### 📄 **Additional Pages**
- **About Us:** Information about the business.  
- **Contact Us:** Contact form and details.  
- **Terms & Conditions:** Legal policies and guidelines.  
- **FAQs:** Frequently asked questions.  
