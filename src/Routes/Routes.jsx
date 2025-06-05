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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "categories",
        element: <Categories></Categories>,
      },
      {
        path: "/all-products",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/add-product",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "my-product",
        element: <MyProduct></MyProduct>,
      },
      {
        path: "product-details/:id",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: "product-update/:id",
        element: <UpdateProduct></UpdateProduct>,
      },
      {
        path: "cart",
        element: <Cart></Cart>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default router;
