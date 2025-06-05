import React, { use, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { FaShoppingCart, FaUser, FaUserPlus } from "react-icons/fa";
import { IoSunnySharp } from "react-icons/io5";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { AuthContext } from "../Auth/AuthProvider";
import { Loader } from "lucide-react";
import noImage from "/avatar.png";
import toast from "react-hot-toast";

function NavBar() {
  const { user, loading, logOut } = use(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Account logged out successfully!");
      })
      .catch(() => {
        toast.error("Account logout failed!");
      });
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);
  return loading ? (
    ""
  ) : (
    <div className="navbar bg-base-100 shadow-sm sticky top-0  z-50 py-4 justify-between ">
      <div className="flex gap-2 items-center ">
        <div className="dropdown   flex sm:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-10 w-52 p-2 shadow"
          >
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/categories"}>Categories</NavLink>
            </li>
            <li>
              <NavLink to={"/all-products"}>All Products</NavLink>
            </li>
            <li>
              <NavLink to={"/add-product"}>Add Product</NavLink>
            </li>

            <li>
              <NavLink to={"/my-product"}>My Product</NavLink>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-[#FF6600]">Globira</h2>
        </div>
      </div>
      <ul className="  gap-5 text-xl hidden lg:flex">
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/categories"}>Categories</NavLink>
        </li>
        <li>
          <NavLink to={"/all-products"}>All Products</NavLink>
        </li>
        <li>
          <NavLink to={"/add-product"}>Add Product</NavLink>
        </li>

        <li>
          <NavLink to={"/my-product"}>My Product</NavLink>
        </li>
      </ul>
      <div className="flex items-center gap-2">
        {theme === "dark" ? (
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-800 text-white  hover:bg-gray-700"
          >
            <BsFillMoonStarsFill />
          </button>
        ) : (
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 text-gray-800  hover:bg-gray-300"
          >
            <IoSunnySharp />
          </button>
        )}
        <NavLink
          to={"/cart"}
          className="text-xl hidden md:flex gap-2 items-center"
        >
          <FaShoppingCart />
          Cart
        </NavLink>
        <div className=" flex gap-2 items-center">
          {user ? (
            <div
              onClick={() => navigate("/profile")}
              className="relative group inline-block text-right"
            >
              <img
                src={user?.photoURL || noImage}
                onError={(e) => (e.target.src = noImage)}
                alt={user?.displayName}
                className="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
              />

              {/* Hover box */}
              <div className="absolute right-0 hidden group-hover:flex flex-col items-center justify-center bg-white border shadow-lg z-10 rounded-md w-40 py-5">
                <span className="font-semibold text-zinc-900">
                  {user?.displayName || "User"}
                </span>
                <button
                  onClick={handleLogout}
                  className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2 items-center justify-center text-base lg:text-xl font-medium">
              <NavLink
                to={"/login"}
                className="flex gap-2 bg-green-500 px-5 py-1 text-white rounded-4xl items-center"
              >
                <FaUser size={25} />
                Log In
              </NavLink>
              <NavLink
                to={"/register"}
                className="flex gap-2 items-center bg-[#FF6600] px-5 py-1 text-white rounded-4xl"
              >
                <FaUserPlus className="font-bold" size={25} />
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
