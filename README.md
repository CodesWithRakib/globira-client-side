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

| Home Page                     | Product Details                     | Dashboard                               |
| ----------------------------- | ----------------------------------- | --------------------------------------- |
| ![Home](screenshots/home.png) | ![Details](screenshots/details.png) | ![Dashboard](screenshots/dashboard.png) |

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

## 🧑‍💻 Features

### 🌐 Public

- Home Page
- Browse by Categories
- View All Products (with search/filter/pagination)
- Product Details

### 🔐 Auth (Firebase)

- Register/Login
- Protected Routes

### 🙍‍♂️ Authenticated Users

- My Products
- Add New Product
- Update Product
- Submit 1 Review per Product
- Cart Page

---

## 🌙 UI Features

- Light & Dark Theme toggle
- Fully responsive (Mobile, Tablet, Desktop)
- Marquee banners and custom animations
- Star-based product rating & reviews

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

## ⚙️ Installation

```bash
# Clone repo
https://github.com/yourusername/globira.git

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
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx
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
