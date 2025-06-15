import React, { useEffect, useState } from "react";
import noImage from "/avatar.png";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { IoSunnySharp } from "react-icons/io5";
import { FaShoppingCart, FaUser, FaUserPlus } from "react-icons/fa";

const MainNav = () => {
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Account logged out successfully!");
        navigate("/login");
      })
      .catch(() => {
        toast.error("Account logout failed!");
      });
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <div className="navbar sticky top-0 z-50 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 h-[100px] px-6 flex items-center justify-between py-4">
      <div className="flex items-center gap-4">
        <div className="dropdown flex sm:hidden">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-10 w-52 p-2 shadow-lg"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/categories">Categories</NavLink>
            </li>
            <li>
              <NavLink to="/all-products">All Products</NavLink>
            </li>
            <li>
              <NavLink to="/add-product">Add Product</NavLink>
            </li>
            <li>
              <NavLink to="/my-product">My Product</NavLink>
            </li>
          </ul>
        </div>

        <div
          onClick={() => navigate("/")}
          className="text-xl font-semibold text-[#FF6600] cursor-pointer select-none"
        >
          Globira
        </div>
      </div>

      <ul className="hidden lg:flex gap-8 text-sm font-semibold tracking-wide">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-[#FF6600] border-b-2 border-[#FF6600] pb-1"
                : "hover:text-[#FF6600] transition"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive
                ? "text-[#FF6600] border-b-2 border-[#FF6600] pb-1"
                : "hover:text-[#FF6600] transition"
            }
          >
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/all-products"
            className={({ isActive }) =>
              isActive
                ? "text-[#FF6600] border-b-2 border-[#FF6600] pb-1"
                : "hover:text-[#FF6600] transition"
            }
          >
            All Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/add-product"
            className={({ isActive }) =>
              isActive
                ? "text-[#FF6600] border-b-2 border-[#FF6600] pb-1"
                : "hover:text-[#FF6600] transition"
            }
          >
            Add Product
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/my-product"
            className={({ isActive }) =>
              isActive
                ? "text-[#FF6600] border-b-2 border-[#FF6600] pb-1"
                : "hover:text-[#FF6600] transition"
            }
          >
            My Product
          </NavLink>
        </li>
      </ul>

      <div className="flex items-center gap-2 ">
        {theme === "dark" ? (
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition flex items-center justify-center"
            aria-label="Switch to light mode"
          >
            <BsFillMoonStarsFill size={18} />
          </button>
        ) : (
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition flex items-center justify-center"
            aria-label="Switch to dark mode"
          >
            <IoSunnySharp size={18} />
          </button>
        )}

        <NavLink
          to="/cart"
          className="relative flex items-center justify-center gap-2 mr-2  md:text-lg hover:text-[#FF6600] transition"
          aria-label="Cart"
        >
          <FaShoppingCart size={18} />
          <span className="hidden md:inline text-sm">Cart</span>
          <span className="absolute -top-3 -right-4 bg-[#FF6600] text-white text-xs font-bold rounded-full px-1 py-1">
            9+
          </span>
        </NavLink>

        {/* User login or profile */}
        {user ? (
          <div className="relative group inline-block text-right">
            <img
              onClick={() => navigate("/profile")}
              src={user?.photoURL || noImage}
              onError={(e) => (e.target.src = noImage)}
              alt={user?.displayName || "User"}
              className="w-8 h-8 rounded-full cursor-pointer border border-gray-300 hover:border-gray-400 transition"
              tabIndex={0}
            />

            <div className="absolute right-0 hidden group-hover:flex flex-col items-center justify-center bg-white dark:bg-gray-800 border shadow-lg z-20 rounded-md w-40  mt-2 text-gray-900 dark:text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto overflow-hidden">
              <span className="font-semibold p-5">
                {user?.displayName || "User"}
              </span>

              <button
                onClick={handleLogout}
                className="mt-2 px-4 py-1 bg-red-500 hover:bg-red-600 text-white  text-sm w-full"
              >
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 items-center text-sm md:text-base font-medium">
            <NavLink
              to="/login"
              className="flex gap-1 bg-green-500 px-5 py-1 rounded-3xl text-sm text-white items-center hover:bg-green-600 transition"
            >
              <FaUser size={18} />
              Log In
            </NavLink>
            <NavLink
              to="/register"
              className="flex gap-1 bg-[#FF6600] px-5 py-1 text-sm rounded-3xl text-white items-center hover:bg-[#e65c00b0] transition"
            >
              <FaUserPlus size={18} />
              Register
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainNav;
