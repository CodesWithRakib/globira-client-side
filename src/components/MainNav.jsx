import React, { useEffect, useState, useCallback, memo } from "react";
import noImage from "/avatar.png";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { IoSunnySharp } from "react-icons/io5";
import { FaShoppingCart, FaUser, FaUserPlus } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const MainNav = memo(() => {
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const handleLogout = useCallback(() => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully!");
        navigate("/login");
      })
      .catch(() => {
        toast.error("Logout failed!");
      });
  }, [logOut, navigate]);

  useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/categories", name: "Categories" },
    { path: "/products", name: "Products" },
    { path: "/add-product", name: "Add Product", private: true },
    { path: "/my-products", name: "My Products", private: true },
    { path: "/all-products", name: "All Products", private: true },
  ];

  const filteredLinks = navLinks.filter((link) => !link.private || user);
  const cartCount = 9;

  return (
    <nav className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-blue-200 dark:border-blue-800 text-gray-800 dark:text-gray-100 h-16 md:h-18 px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between shadow-md">
      {/* Left Side - Logo and Mobile Menu */}
      <div className="flex items-center">
        <div className="md:hidden mr-2">
          <button
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-6 flex flex-col items-center">
              <span
                className={`block h-0.5 w-6 bg-blue-600 dark:bg-blue-400 rounded-full mb-1.5 transition-transform duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-blue-600 dark:bg-blue-400 rounded-full mb-1.5 transition-opacity duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-blue-600 dark:bg-blue-400 rounded-full transition-transform duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
        <div
          onClick={() => navigate("/")}
          className="text-xl font-bold cursor-pointer select-none flex items-center"
        >
          <span className="text-blue-600 dark:text-blue-400">G</span>
          <span className="text-gray-800 dark:text-gray-100 ml-0.5">
            lobira
          </span>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-t border-blue-200 dark:border-blue-800 transition-all duration-300">
          <ul className="flex flex-col py-2">
            {filteredLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "bg-blue-600 dark:bg-blue-800 text-white"
                        : "hover:bg-blue-50 dark:hover:bg-blue-900"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-6 lg:gap-8 text-sm font-medium">
        {filteredLinks.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `pb-1 transition-colors duration-200 ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                    : "hover:text-blue-600 dark:hover:text-blue-400"
                }`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200 flex items-center justify-center"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? (
            <IoSunnySharp size={18} className="text-blue-400" />
          ) : (
            <BsFillMoonStarsFill size={18} className="text-blue-600" />
          )}
        </button>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `relative flex items-center justify-center gap-1 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200 ${
              isActive ? "text-blue-600 dark:text-blue-400" : ""
            }`
          }
          aria-label="Cart"
        >
          <FaShoppingCart size={18} />
          <span className="hidden sm:inline text-sm ml-1">Cart</span>
          <span className="absolute -top-1 -right-1 bg-blue-600 dark:bg-blue-800 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount > 9 ? "9+" : cartCount}
          </span>
        </NavLink>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              onMouseEnter={() => setIsProfileOpen(true)}
              onMouseLeave={() => setIsProfileOpen(false)}
              className="flex items-center gap-2 focus:outline-none"
              aria-label="User profile"
              aria-expanded={isProfileOpen}
              aria-haspopup="true"
            >
              <img
                src={user?.photoURL || noImage}
                onError={(e) => {
                  e.target.src = noImage;
                }}
                alt={user?.displayName || "User"}
                className="w-8 h-8 rounded-full border-2 border-blue-600 dark:border-blue-400 hover:border-blue-500 dark:hover:border-blue-300 transition-all duration-200"
              />
            </button>

            {isProfileOpen && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-md shadow-lg z-50 border border-blue-200 dark:border-blue-800 transition-opacity duration-200"
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                <div className="px-4 py-3 border-b border-blue-100 dark:border-blue-800">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-xs text-blue-900 dark:text-blue-200 truncate">
                    {user?.email}
                  </p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setIsProfileOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
                  >
                    Your Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-blue-900 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
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
              className={({ isActive }) =>
                `flex items-center gap-1 px-3 py-2 rounded-full text-sm transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-600 dark:bg-blue-800 text-white"
                    : "bg-blue-600 dark:bg-blue-800 hover:bg-blue-700 dark:hover:bg-blue-700 text-white"
                }`
              }
            >
              <FaUser size={14} />
              <span className="hidden sm:inline">Log In</span>
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `flex items-center gap-1 px-3 py-2 rounded-full text-sm transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                    : "border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900"
                }`
              }
            >
              <FaUserPlus size={14} />
              <span className="hidden sm:inline">Register</span>
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
});

export default MainNav;
