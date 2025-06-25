# 🛒 Globira - B2B Wholesale Marketplace

Globira is a full-stack B2B wholesale marketplace where users can browse, list, and manage products efficiently. Inspired by platforms like Alibaba, this platform ensures secure transactions and a user-friendly experience for wholesale traders.

📚 **[Jump to Table of Contents](#-table-of-contents)**

![Globira Screenshot](https://i.ibb.co/6Jtj4wc9/b11a11-globira-site-web-app-home.png)

---

## 📖 Table of Contents

- [🚀 Live Site](#-live-site)
- [📸 Screenshots](#-screenshots)
- [📂 Project Structure](#-project-structure)
- [✨ Features](#-features)
- [🎨 UI Highlights](#-ui-highlights)
- [📦 Packages Used](#-packages-used)
- [🛠️ Tech Stack](#-tech-stack)
- [⚙️ Installation & Setup](#-installation--setup)
- [🔒 Environment Variables](#-environment-variables)
- [📤 Image Upload](#-image-upload)
- [🚀 Deployment](#-deployment)
- [🧪 Testing](#-testing)
- [🔧 Future Improvements](#-future-improvements)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📫 Contact](#-contact)
- [🧑‍🎓 Author](#-author)

---

## 🚀 Live Site

🔗 **[Globira Web App](https://b11a11-globira-site.web.app/)**

---

## 📸 Screenshots

| 🏠 Home Page                                                            | 📄 Product Details                                                               | ➕ Add Product                                                                |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| ![Home](https://i.ibb.co/6Jtj4wc9/b11a11-globira-site-web-app-home.png) | ![Details](https://i.ibb.co/mr04jVHn/b11a11-globira-site-web-app-categories.png) | ![Add](https://i.ibb.co/C5cMnTZN/b11a11-globira-site-web-app-add-product.png) |

| 📦 My Products                                                                          | 🛍️ All Products                                             | 🔐 Login Page                                                             |
| --------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------- |
| ![My Products](https://i.ibb.co/S4nmsYvp/b11a11-globira-site-web-app-add-product-1.png) | ![All Products](https://i.ibb.co/7tLg3NJJ/all-products.png) | ![Login](https://i.ibb.co/SXDKTztr/b11a11-globira-site-web-app-login.png) |

| 📝 Register Page                                                                |
| ------------------------------------------------------------------------------- |
| ![Register](https://i.ibb.co/M5BMC30L/b11a11-globira-site-web-app-register.png) |

---

## 📂 Project Structure

### 🖥️ Frontend

- React 19 + Tailwind CSS v4
- Firebase Authentication
- Product browsing, detail view, management (add/update)
- Responsive layout with dark mode support
- Search, filter, and pagination features
- Toast notifications and animation

### 🗄️ Backend

- Express.js + MongoDB
- JWT-based authentication with secure APIs
- Cloudinary image upload support
- Vercel-ready serverless architecture
- Cookie-based token storage

---

## ✨ Features

### 🔐 Authentication & Security

- Firebase authentication (email/password & Google)
- JWT stored in cookies
- Protected routes via backend middleware

### 🛍️ Product Management

- Browse by categories
- Product details with review support
- Add, update, delete own products
- Pagination, search, filter
- One review per user

---

## 🎨 UI Highlights

- Light/Dark mode toggle
- Responsive design for mobile and desktop
- Image sliders, rating stars, marquee banners
- Clean transitions and animations
- Feedback via custom toasts and alerts

---

## 📦 Packages Used

### ✅ Frontend

- `@tailwindcss/vite`, `tailwindcss`
- `axios`, `firebase`, `react`, `react-dom`, `react-icons`
- `react-hot-toast`, `react-fast-marquee`, `react-rating`, `react-tooltip`
- `react-router`, `sweetalert2`, `swiper`, `motion`, `date-fns`

### ✅ Backend

- `express`, `mongodb`, `cors`, `dotenv`
- `cookie-parser`, `bcryptjs`, `jsonwebtoken`, `cloudinary`

---

## 🛠️ Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-0EA5E9?style=flat&logo=tailwind-css)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express)

---

## ⚙️ Installation & Setup

### 📥 Clone Repositories

```bash
# Clone Frontend
git clone https://github.com/Programming-Hero-Web-Course4/b11a11-client-side-CodesWithRakib.git
cd b11a11-client-side-CodesWithRakib
npm install
npm run dev

# Clone Backend
git clone https://github.com/Programming-Hero-Web-Course4/b11a11-server-side-CodesWithRakib.git
cd b11a11-server-side-CodesWithRakib
npm install
npm run dev
```
````

---

## 🔒 Environment Variables

### 🔹 Client (.env)

```env
VITE_API_KEY=your_firebase_key
VITE_AUTH_DOMAIN=your_firebase_auth
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_storage_bucket
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
VITE_API_URL=https://backend-eta-five-56.vercel.app
VITE_CLOUD_NAME=your_cloudinary_name
```

### 🔹 Server (.env)

```env
PORT=5000
MONGO_URI=mongodb+srv://your_mongo_uri
JWT_SECRET=your_secret
CLOUDINARY_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

---

## 📤 Image Upload

- Users can upload product images using Cloudinary
- Supported on both **Add** and **Update** product forms
- Upload triggered through a secure backend API

---

## 🚀 Deployment

### 🔹 Frontend (Firebase)

```bash
npm run build
firebase deploy
```

### 🔹 Backend (Vercel Serverless)

- Routes inside `/api/` folder
- Export handlers using CommonJS/ES6
- Follow [Vercel Docs](https://vercel.com/docs/functions) for structure

---

## 🧪 Testing

- Backend routes tested via Postman
- Firebase test users used for auth
- UI feedback tested via forms, toasts, and edge cases

---

## 🔧 Future Improvements

- Stripe Payment Integration
- Admin Dashboard
- Seller Verification Process
- Order Management System

---

## 🤝 Contributing

Contributions, suggestions, and forks are welcome!

- Check [Issues](https://github.com/codeswithrakib/globira/issues)
- Submit a PR or feedback

Please follow the [contribution guidelines](CONTRIBUTING.md) for collaboration.

---

## 📄 License

Licensed under the **MIT License** — see the [LICENSE](LICENSE) file.

---

## 📫 Contact

📧 Email: [codeswithrakib@gmail.com](mailto:codeswithrakib@gmail.com)
🔗 LinkedIn: [Rakib Islam](https://linkedin.com/in/codeswithrakib)

---

## 🧑‍🎓 Author

Made with 💻 by **Md. Rakib Islam**
Globira Project © 2025

---
