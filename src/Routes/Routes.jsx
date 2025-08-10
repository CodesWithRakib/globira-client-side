import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import Categories from "../pages/Categories";
import AllProducts from "../pages/AllProducts";
import AddProduct from "../pages/AddProduct";
import MyProduct from "../pages/MyProduct";
import Cart from "../pages/Cart";
import Profile from "../pages/Profile";
import UpdateProduct from "../pages/UpdateProduct";
import ProductDetails from "../pages/ProductDetails";
import PrivateRoute from "../Auth/PrivateRoute";
import CategoryProducts from "../pages/CategoryProducts";
// Footer imports remain the same
import AboutUs from "../pages/Footer/AboutUs";
import Solutions from "../pages/Footer/Solutions";
import Blog from "../pages/Footer/Blog";
import Faq from "../pages/Footer/Faq";
import ShippingPolicy from "../pages/Footer/ShippingPolicy";
import Returns from "../pages/Footer/Returns";
import Privacy from "../pages/Footer/Privacy";
import Terms from "../pages/Footer/Terms";
import Cookies from "../pages/Footer/Cookies";
import Products from "../pages/Footer/Products";
import Contact from "../pages/Footer/Contact";
import AllOffers from "../pages/AllOffers";
import ViewAllPartners from "../pages/ViewAllPartners";
import AllTestimonials from "../pages/AllTestimonials";
import B2BBenefitsPage from "../pages/B2BBenefitsPage";
import WishList from "../pages/WishList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage message="Something went wrong!" />,
    children: [
      // Public routes
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // Protected product routes
      {
        path: "product/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "category/:category",
        element: (
          <PrivateRoute>
            <CategoryProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "all-products",
        element: (
          <PrivateRoute>
            <AllProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <PrivateRoute>
            <Categories />
          </PrivateRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "my-products",
        element: (
          <PrivateRoute>
            <MyProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "update-product/:id",
        element: (
          <PrivateRoute>
            <UpdateProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <PrivateRoute>
            <WishList />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/b2b-benefits",
        element: <B2BBenefitsPage />,
      },
      {
        path: "/partners",
        element: <ViewAllPartners />,
      },
      {
        path: "/testimonials",
        element: <AllTestimonials />,
      },
      {
        path: "/all-offers",
        element: <AllOffers />,
      },

      // Footer pages (static, public)
      { path: "about", element: <AboutUs /> },
      { path: "products", element: <Products /> },
      { path: "solutions", element: <Solutions /> },
      { path: "contact", element: <Contact /> },
      { path: "blog", element: <Blog /> },
      { path: "faq", element: <Faq /> },
      { path: "shipping", element: <ShippingPolicy /> },
      { path: "returns", element: <Returns /> },
      { path: "privacy", element: <Privacy /> },
      { path: "terms", element: <Terms /> },
      { path: "cookies", element: <Cookies /> },
    ],
  },
  {
    path: "*",
    element: <ErrorPage message="Page not found" />,
  },
]);

export default router;
