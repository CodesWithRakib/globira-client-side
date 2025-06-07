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
        loader: () => fetch(`http://localhost:5000/api/products`),
      },
      {
        path: "/all-products",
        element: (
          <PrivateRoute>
            <AllProducts></AllProducts>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-product",
        element: (
          <PrivateRoute>
            <AddProduct></AddProduct>
          </PrivateRoute>
        ),
      },
      {
        path: "my-product",
        element: (
          <PrivateRoute>
            {" "}
            <MyProduct></MyProduct>{" "}
          </PrivateRoute>
        ),
        loader: () => fetch("http://localhost:5000/api/products"),
      },
      {
        path: "product-details/:id",
        element: (
          <PrivateRoute>
            {" "}
            <ProductDetails></ProductDetails>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "product-update/:id",
        element: (
          <PrivateRoute>
            <UpdateProduct></UpdateProduct>
          </PrivateRoute>
        ),
      },
      {
        path: "cart",
        element: <Cart></Cart>,
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            {" "}
            <Profile></Profile>{" "}
          </PrivateRoute>
        ),
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
