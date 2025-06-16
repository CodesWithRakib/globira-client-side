# Globira - B2B Wholesale Marketplace

Globira is a full-stack B2B wholesale marketplace inspired by platforms like Alibaba. It allows users to explore categorized products, manage personal inventories, and handle transactions securely.

---

## 📖 Table of Contents

- [Live Site](#-live-site)
- [Screenshots](#-screenshots)
- [Project Structure](#-project-structure)
- [Features](#-features)
- [UI Features](#-ui-features)
- [Packages Used](#-packages-used)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Image Upload](#-image-upload)
- [Deployment](#-deployment)
- [Testing](#-testing)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)
- [Author](#-author)

---

## 🚀 Live Site

> [Globira Site](https://b11a11-globira-site.web.app/)

---

## 📸 Screenshots

| 🏠 Home Page                                                            | 📄 Product Details                                                                  | 📊 Add Product                                                                        |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| ![Home](https://i.ibb.co/6Jtj4wc9/b11a11-globira-site-web-app-home.png) | ![Categories](https://i.ibb.co/mr04jVHn/b11a11-globira-site-web-app-categories.png) | ![Add Product](https://i.ibb.co/C5cMnTZN/b11a11-globira-site-web-app-add-product.png) |

| 📦 My Products                                                                          | 🛍️ All Products                                             | 🔐 Login Page                                                             |
| --------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------- |
| ![My Products](https://i.ibb.co/S4nmsYvp/b11a11-globira-site-web-app-add-product-1.png) | ![All Products](https://i.ibb.co/7tLg3NJJ/all-products.png) | ![Login](https://i.ibb.co/SXDKTztr/b11a11-globira-site-web-app-login.png) |

| 📝 Register Page                                                                     |
| ------------------------------------------------------------------------------------ |
| ![Register Page](https://i.ibb.co/M5BMC30L/b11a11-globira-site-web-app-register.png) |

---

## 📂 Project Structure

### Frontend

- Built with **React 19** and **Tailwind CSS v4** (with dark mode support)
- Firebase authentication (login/register)
- Category browsing, product listing, detailed product view
- Product management: Add, update, and view personal products
- Responsive design
- Pagination, searching, filtering
- Toast notifications and interactive animations

### Backend

- Built with **Express.js** and **MongoDB**
- JWT-based authentication & secure routes
- Serverless-ready structure (compatible with Vercel)
- CORS and environment variable management

---

---

## ✨ Key Features

### 🔓 Authentication & Security

- Firebase authentication (email/password & Google)
- JWT token system stored in cookies
- Secure API with protected routes

### 🛍️ Product Features

- Browse by category
- Product details page with reviews
- Add, update, and manage own products
- Filter, search, and paginate products
- Rate and review products (1 per user)

### 🎨 UI Highlights

- Dark/Light mode toggle
- Responsive layout (mobile, tablet, desktop)
- Marquee banners, custom icons & transitions
- Rating stars, image sliders, and toast notifications

---

## 📦 Packages Used

### Frontend:

- `@tailwindcss/vite`
- `axios`
- `date-fns`
- `firebase`
- `lucide-react`
- `motion`
- `react`, `react-dom`
- `react-hot-toast`
- `react-icons`
- `react-fast-marquee`
- `react-rating`, `react-rating-stars-component`
- `react-router`
- `sweetalert2`
- `swiper`

### Backend:

- `express`
- `mongodb`
- `cors`
- `dotenv`
- `cookie-parser`
- `bcryptjs`
- `jsonwebtoken`
- `cloudinary`

---

## 🛠️ Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-0EA5E9?style=flat&logo=tailwind-css)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express)

---

## ⚙️ Installation & Setup

### 🔧 Clone Repositories

```bash
# Clone Frontend
git clone https://github.com/Programming-Hero-Web-Course4/b11a11-client-side-CodesWithRakib.git

# Clone Backend
git clone https://github.com/Programming-Hero-Web-Course4/b11a11-server-side-CodesWithRakib.git

# Frontend Setup
npm install
npm run dev

# Backend Setup
npm install
npm run dev
```

> 🔐 Set up your `.env` files both in client and backend.

---

## 🔒 Environment Variables

### Frontend

```
VITE_API_KEY=your_firebase_key
VITE_AUTH_DOMAIN=your_firebase_auth
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_storage_bucket
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
VITE_API_URL=https://backend-eta-five-56.vercel.app
VITE_CLOUD_NAME=your_cloudinary_name

```

### Backend

```
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret
CLOUDINARY_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
```

---

## 🔒 Protected Routes

🔹JWT token is issued on login and stored in cookies

🔹Backend verifies token on each protected request using middleware

🔹Logout clears the token from cookies securely

## 📸 Image Upload

- Uploads to Cloudinary using a secure API call.
- Supported on Add/Update Product forms.

---

## 🚀 Deployment

### 🔹 Frontend

Deployed on **Firebase Hosting**

```bash
npm run build
firebase deploy
```

### 🔹 Backend

Deployed as **serverless functions** on **Vercel**

Ensure:

- All routes are inside `/api/` folder
- Export handlers correctly for serverless

More info: [Vercel Docs](https://vercel.com/docs/functions)

---

## 🧪 Testing

- Manual testing using Postman (for backend routes)
- Firebase Authentication test accounts
- Form validations and toast feedback on UI

---

## 🔧 Future Improvements

- Stripe payment integration
- Admin dashboard
- Seller verification
- Order tracking system

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check [issues page](https://github.com/yourusername/globira/issues) or submit a pull request.

Please follow the [contribution guidelines](CONTRIBUTING.md) for a smooth experience.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📫 Contact

For any query or support:
📧 Email: [rakib.dev@email.com](mailto:rakib.dev@email.com)
🔗 LinkedIn: [Rakib Islam](https://linkedin.com/in/codeswithrakib)

---

## 🧑‍🎓 Author

**Md. Rakib Islam**
Globira Project © 2025
