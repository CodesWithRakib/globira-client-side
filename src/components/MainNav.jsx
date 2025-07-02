import React, { useEffect, useState, useCallback } from "react";
import noImage from "/avatar.png";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { IoSunnySharp } from "react-icons/io5";
import { FaShoppingCart, FaUser, FaUserPlus } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { motion, AnimatePresence } from "motion/react";

const MainNav = () => {
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
    <nav className="navbar sticky top-0 z-40 bg-amber-700 dark:bg-gray-900 text-white dark:text-gray-100 border-b border-amber-800 dark:border-gray-700 h-16 md:h-20 px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between">
      {/* Left Side - Logo and Mobile Menu */}
      <div className="flex items-center">
        <div className="md:hidden mr-2">
          <button
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-6 flex flex-col items-center">
              <motion.span
                className="block h-0.5 w-6 bg-white rounded-full mb-1.5"
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 8 : 0,
                }}
              />
              <motion.span
                className="block h-0.5 w-6 bg-white rounded-full mb-1.5"
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
              />
              <motion.span
                className="block h-0.5 w-6 bg-white rounded-full"
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -8 : 0,
                }}
              />
            </div>
          </button>
        </div>
        <div
          onClick={() => navigate("/")}
          className="text-xl font-bold text-white cursor-pointer select-none"
        >
          <span className="text-amber-300">G</span>lobira
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-amber-700 dark:bg-gray-800 shadow-lg border-t border-amber-800 dark:border-gray-700"
          >
            <ul className="flex flex-col py-2">
              {filteredLinks.map((link) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 text-sm font-medium ${
                        isActive
                          ? "bg-amber-600/30 dark:bg-gray-700 text-amber-300"
                          : "hover:bg-amber-600/20 dark:hover:bg-gray-700/50"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <ul className="hidden md:flex gap-6 lg:gap-8 text-sm font-medium">
        {filteredLinks.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `pb-1 transition-colors duration-200 ${
                  isActive
                    ? "text-amber-300 border-b-2 border-amber-300"
                    : "hover:text-amber-300"
                }`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-amber-600/30 dark:hover:bg-gray-700/50 transition flex items-center justify-center"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? (
            <IoSunnySharp size={18} className="text-amber-300" />
          ) : (
            <BsFillMoonStarsFill size={18} className="text-white" />
          )}
        </button>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `relative flex items-center justify-center gap-1 p-2 rounded-full hover:bg-amber-600/30 dark:hover:bg-gray-700/50 transition ${
              isActive ? "text-amber-300" : ""
            }`
          }
          aria-label="Cart"
        >
          <FaShoppingCart size={18} />
          <span className="hidden sm:inline text-sm ml-1">Cart</span>
          <span className="absolute -top-1 -right-1 bg-amber-300 text-amber-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
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
                className="w-8 h-8 rounded-full border-2 border-amber-300 hover:border-amber-200 transition-all"
              />
            </button>
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-56 bg-amber-700 dark:bg-gray-800 rounded-md shadow-lg z-50 border border-amber-800 dark:border-gray-700"
                  onMouseEnter={() => setIsProfileOpen(true)}
                  onMouseLeave={() => setIsProfileOpen(false)}
                >
                  <div className="px-4 py-3 border-b border-amber-800 dark:border-gray-700">
                    <p className="text-sm font-medium text-white truncate">
                      {user?.displayName || "User"}
                    </p>
                    <p className="text-xs text-amber-200 dark:text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setIsProfileOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-white dark:text-gray-300 hover:bg-amber-600/30 dark:hover:bg-gray-700 transition-colors"
                    >
                      Your Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-amber-200 dark:text-amber-300 hover:bg-amber-600/20 dark:hover:bg-amber-900/20 transition-colors"
                    >
                      <FiLogOut className="mr-2" />
                      Sign out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `flex items-center gap-1 px-3 py-2 rounded-full text-sm transition-colors ${
                  isActive
                    ? "bg-emerald-700 text-white"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`
              }
            >
              <FaUser size={14} />
              <span className="hidden sm:inline">Log In</span>
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `flex items-center gap-1 px-3 py-2 rounded-full text-sm transition-colors ${
                  isActive
                    ? "bg-amber-500 text-white"
                    : "bg-amber-600 hover:bg-amber-500 text-white"
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
};

export default MainNav;
