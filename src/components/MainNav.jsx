import React, { useEffect, useState } from "react";
import noImage from "/avatar.png";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { IoSunnySharp } from "react-icons/io5";
import { FaShoppingCart, FaUser, FaUserPlus } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const MainNav = () => {
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

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
    <div className="navbar sticky top-0 z-40 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 h-[80px] px-4 sm:px-6 flex items-center justify-between py-0">
      {/* Left Side - Logo & Mobile Menu */}
      <div className="flex items-center gap-2">
        <div className="dropdown flex sm:hidden">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle  hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
            aria-label="Mobile menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
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
            className="menu menu-sm dropdown-content bg-white dark:bg-gray-800 rounded-box z-50 mt-10 w-52 p-2 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <li>
              <NavLink to="/" className="hover:text-[#FF6600]">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/categories" className="hover:text-[#FF6600]">
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink to="/all-products" className="hover:text-[#FF6600]">
                All Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-product" className="hover:text-[#FF6600]">
                Add Product
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-product" className="hover:text-[#FF6600]">
                My Product
              </NavLink>
            </li>
          </ul>
        </div>

        <div
          onClick={() => navigate("/")}
          className="text-xl font-bold text-[#FF6600] cursor-pointer select-none"
        >
          Globira
        </div>
      </div>

      {/* Center - Navigation Links */}
      <ul className="hidden lg:flex gap-8 text-sm font-semibold tracking-wide">
        {[
          { path: "/", name: "Home" },
          { path: "/categories", name: "Categories" },
          { path: "/all-products", name: "All Products" },
          { path: "/add-product", name: "Add Product" },
          { path: "/my-product", name: "My Product" },
        ].map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `pb-1 transition-colors duration-200 ${
                  isActive
                    ? "text-[#FF6600] border-b-2 border-[#FF6600]"
                    : "hover:text-[#FF6600]"
                }`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Right Side - Actions */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center justify-center"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? (
            <IoSunnySharp size={18} className="text-yellow-300" />
          ) : (
            <BsFillMoonStarsFill size={18} className="text-gray-600" />
          )}
        </button>

        {/* Cart */}
        <NavLink
          to="/cart"
          className="relative flex items-center justify-center gap-1 hover:text-[#FF6600] transition"
          aria-label="Cart"
        >
          <FaShoppingCart size={18} />
          <span className="hidden md:inline text-sm">Cart</span>
          <span className="absolute -top-2 -right-2 bg-[#FF6600] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            9+
          </span>
        </NavLink>

        {/* User Profile */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              onMouseEnter={() => setIsProfileOpen(true)}
              onMouseLeave={() => setIsProfileOpen(false)}
              className="flex items-center gap-2 focus:outline-none"
              aria-label="User profile"
              aria-expanded={isProfileOpen}
            >
              <img
                src={user?.photoURL || noImage}
                onError={(e) => (e.target.src = noImage)}
                alt={user?.displayName || "User"}
                className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-[#FF6600] transition-all"
              />
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-700"
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email}
                  </p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setIsProfileOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Your Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <FiLogOut className="mr-2" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <NavLink
              to="/login"
              className="flex items-center gap-1 bg-green-500 hover:bg-green-600 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm text-white transition-colors"
            >
              <FaUser size={14} />
              <span>Log In</span>
            </NavLink>
            <NavLink
              to="/register"
              className="flex items-center gap-1 bg-[#FF6600] hover:bg-[#e65c00] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm text-white transition-colors"
            >
              <FaUserPlus size={14} />
              <span>Register</span>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainNav;
