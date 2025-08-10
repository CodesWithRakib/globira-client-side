import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  CalendarIcon,
  ClockIcon,
  PhoneIcon,
  UserIcon,
  TruckIcon,
  HomeIcon,
  ShoppingCartIcon,
  PackageIcon,
  PlusCircleIcon,
  ListIcon,
  Grid3X3Icon,
  HandshakeIcon,
  UserCircleIcon,
  XIcon,
  MenuIcon,
  ChevronDownIcon,
  LogOutIcon,
  SunIcon,
  MoonIcon,
  HeartIcon,
  SettingsIcon,
  HelpCircleIcon,
  BellIcon,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { format, formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "motion/react";
import { throttle } from "lodash";
import toast from "react-hot-toast";
import noImage from "/avatar.png";
const offers = [
  { id: 1, text: "🚚 Free Shipping on orders over $50!", action: "/products" },
  {
    id: 2,
    text: "🎉 Mega Offer: 20% off electronics today!",
    action: "/categories/electronics",
  },
  {
    id: 3,
    text: "🔥 Hot Deal: Buy 2 Get 1 Free on selected items",
    action: "/products",
  },
  {
    id: 4,
    text: "💳 Special: 10% cashback with credit card payment",
    action: "/products",
  },
];
const NavBar = () => {
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState(
    () =>
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [now, setNow] = useState(new Date());
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [isHoveringOffer, setIsHoveringOffer] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isWishlistPage, setIsWishlistPage] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const offerRef = useRef(null);
  // Check mobile status on resize
  useEffect(() => {
    const handleResize = throttle(() => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    }, 200);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);
  // Rotate offers when not hovering
  useEffect(() => {
    if (!isHoveringOffer) {
      const offerTimer = setInterval(() => {
        setCurrentOfferIndex((prev) => (prev + 1) % offers.length);
      }, 5000);
      return () => clearInterval(offerTimer);
    }
  }, [isHoveringOffer]);
  // Scroll handler
  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 10);
    }, 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // Click outside profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // Theme handling
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.add("transition-colors", "duration-300");
  }, [theme]);
  // Fetch cart count from localStorage
  useEffect(() => {
    const fetchCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartCount(cart.length);
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    };
    fetchCartCount();
    // Update cart count when localStorage changes
    const handleStorageChange = (e) => {
      if (e.key === "cart") {
        fetchCartCount();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    // Custom event for cart updates (for same-tab updates)
    window.addEventListener("cartUpdated", fetchCartCount);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", fetchCartCount);
    };
  }, []);
  // Fetch wishlist data from localStorage
  useEffect(() => {
    const fetchWishlistData = () => {
      try {
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setWishlistItems(wishlist);
        setWishlistCount(wishlist.length);
      } catch (error) {
        console.error("Error fetching wishlist data:", error);
      }
    };
    fetchWishlistData();
    // Update wishlist when localStorage changes
    const handleStorageChange = (e) => {
      if (e.key === "wishlist") {
        fetchWishlistData();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    // Custom event for wishlist updates (for same-tab updates)
    const handleWishlistUpdate = () => {
      fetchWishlistData();
    };
    window.addEventListener("wishlistUpdated", handleWishlistUpdate);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
    };
  }, []);
  // Check if current page is wishlist
  useEffect(() => {
    setIsWishlistPage(window.location.pathname === "/wishlist");
  }, []);
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);
  const handleLogout = useCallback(() => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully!");
        navigate("/login");
        setIsProfileOpen(false);
      })
      .catch(() => {
        toast.error("Logout failed!");
      });
  }, [logOut, navigate]);
  const handleOfferClick = useCallback(
    (index) => {
      setCurrentOfferIndex(index);
      if (offers[index]?.action) {
        navigate(offers[index].action);
      }
    },
    [navigate]
  );
  const navLinks = [
    { path: "/", name: "Home", icon: HomeIcon },
    { path: "/categories", name: "Categories", icon: Grid3X3Icon },
    { path: "/products", name: "Products", icon: PackageIcon },
    {
      path: "/add-product",
      name: "Add Product",
      icon: PlusCircleIcon,
      private: true,
    },
    {
      path: "/my-products",
      name: "My Products",
      icon: ListIcon,
      private: true,
    },
    {
      path: "/all-products",
      name: "All Products",
      icon: PackageIcon,
      private: true,
    },
  ];
  const filteredLinks = navLinks.filter((link) => !link.private || user);
  const todayDate = format(now, "EEE, MMM d");
  const currentTime = format(now, "h:mm a");
  // Responsive offer text
  const getOfferText = (text) => {
    if (isMobile && text.length > 30) {
      return `${text.substring(0, 27)}...`;
    }
    return text;
  };
  return (
    <div
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg"
          : "bg-white dark:bg-gray-900"
      }`}
    >
      {/* TopBar - Hidden on mobile for space */}
      <div className="hidden sm:block bg-blue-600 dark:bg-blue-900 text-xs md:text-sm py-2 w-full">
        <div className="container mx-auto p-4  flex flex-wrap justify-between items-center select-none">
          {/* Left section */}
          <div className="flex items-center gap-4 py-1">
            <div
              className="flex items-center gap-1.5 group cursor-pointer"
              data-tooltip-id="date-tooltip"
            >
              <CalendarIcon className="w-4 h-4 text-white" />
              <span className="text-white font-medium">{todayDate}</span>
            </div>
            <div
              className="flex items-center gap-1.5 group cursor-pointer"
              data-tooltip-id="time-tooltip"
            >
              <ClockIcon className="w-4 h-4 text-white" />
              <span className="text-white font-medium">{currentTime}</span>
            </div>
          </div>
          {/* Middle section - offer carousel */}
          <div className="flex-1 flex items-center justify-center px-4 py-1 max-w-2xl mx-2 min-w-0">
            <div
              ref={offerRef}
              className="relative w-full flex items-center justify-center"
              onMouseEnter={() => setIsHoveringOffer(true)}
              onMouseLeave={() => setIsHoveringOffer(false)}
            >
              <TruckIcon className="w-4 h-4 text-white mr-2 flex-shrink-0" />
              <div className="relative w-full overflow-hidden h-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentOfferIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-0 left-0 w-full text-center"
                  >
                    <button
                      onClick={() => handleOfferClick(currentOfferIndex)}
                      className="font-medium text-white hover:text-blue-200 transition-colors w-full"
                    >
                      {getOfferText(offers[currentOfferIndex].text)}
                    </button>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="flex ml-2 space-x-1.5">
                {offers.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleOfferClick(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentOfferIndex ? "bg-white" : "bg-blue-300"
                    }`}
                    aria-label={`Go to offer ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Right section */}
          <div className="flex items-center gap-4 md:gap-6 py-1">
            <button
              className="flex items-center gap-1.5 group cursor-pointer"
              onClick={() => navigate(user ? "/profile" : "/login")}
            >
              <UserIcon className="w-4 h-4 text-white" />
              <span className="text-white font-medium truncate max-w-[120px]">
                Hello,{" "}
                {user?.displayName ? user.displayName.split(" ")[0] : "Guest"}
              </span>
            </button>
            <button
              className="flex items-center gap-1.5 group cursor-pointer"
              onClick={() => (window.location.href = "tel:+8801767476724")}
            >
              <PhoneIcon className="w-4 h-4 text-white" />
              <span className="hidden md:inline text-white font-medium">
                Support: +880 176 747 6724
              </span>
              <span className="md:hidden text-white font-medium">Support</span>
            </button>
          </div>
        </div>
      </div>
      {/* Main Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 ">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and mobile menu button */}
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <XIcon className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
              </button>
              <div
                onClick={() => navigate("/")}
                className="ml-2 md:ml-0 text-xl font-bold cursor-pointer flex items-center"
              >
                <span className="text-blue-600 dark:text-blue-400">G</span>
                <span className="text-gray-800 dark:text-gray-100 ml-0.5">
                  lobira
                </span>
              </div>
            </div>
            {/* Center - Desktop navigation */}
            <nav className="hidden lg:flex mx-4 flex-1 justify-center">
              <div className="flex items-center space-x-1 lg:space-x-2">
                {filteredLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                        isActive
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                      }`
                    }
                  >
                    {link.icon && <link.icon className="w-4 h-4" />}
                    <span>{link.name}</span>
                  </NavLink>
                ))}
              </div>
            </nav>
            {/* Right side - Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={`Switch to ${
                  theme === "dark" ? "light" : "dark"
                } mode`}
              >
                {theme === "dark" ? (
                  <SunIcon className="w-5 h-5 text-yellow-400" />
                ) : (
                  <MoonIcon className="w-5 h-5 text-blue-600" />
                )}
              </button>
              {/* Wishlist */}
              <div className="relative">
                <NavLink
                  to="/wishlist"
                  className={({ isActive }) =>
                    `p-2 rounded-full relative transition-all duration-300 ${
                      isActive || wishlistCount > 0
                        ? "text-red-500"
                        : "text-gray-600 dark:text-gray-300"
                    } hover:bg-gray-100 dark:hover:bg-gray-800`
                  }
                  data-tooltip-id="wishlist-tooltip"
                  data-tooltip-content={`${wishlistCount} items in wishlist`}
                  data-tooltip-place="bottom"
                >
                  <motion.div
                    animate={{
                      scale: wishlistCount > 0 ? [1, 1.1, 1] : 1,
                      rotate: wishlistCount > 0 ? [0, -5, 5, 0] : 0,
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: wishlistCount > 0 ? Infinity : 0,
                      repeatType: "reverse",
                    }}
                  >
                    <HeartIcon
                      className="w-5 h-5"
                      fill={wishlistCount > 0 ? "currentColor" : "none"}
                    />
                  </motion.div>
                  {/* Animated count badge */}
                  <AnimatePresence>
                    {wishlistCount > 0 && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute top-3 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md border-2 border-white dark:border-gray-900"
                      >
                        {wishlistCount > 99 ? "99+" : wishlistCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </NavLink>
              </div>
              {/* Cart */}
              <div className="relative">
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `p-2 rounded-full relative transition-all duration-300 ${
                      isActive || cartCount > 0
                        ? "text-blue-600"
                        : "text-gray-600 dark:text-gray-300"
                    } hover:bg-gray-100 dark:hover:bg-gray-800`
                  }
                  data-tooltip-id="cart-tooltip"
                  data-tooltip-content={`${cartCount} items in cart`}
                  data-tooltip-place="bottom"
                >
                  <ShoppingCartIcon className="w-5 h-5" />
                  {/* Animated count badge */}
                  <AnimatePresence>
                    {cartCount > 0 && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute top-3 -right-1 bg-blue-600 dark:bg-blue-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md border-2 border-white dark:border-gray-900"
                      >
                        {cartCount > 99 ? "99+" : cartCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </NavLink>
              </div>
              {/* User profile or auth buttons */}
              {user ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-1 focus:outline-none"
                  >
                    <img
                      src={user?.photoURL || noImage}
                      onError={(e) => {
                        e.target.src = noImage;
                      }}
                      alt={user?.displayName || "User"}
                      className="w-8 h-8 rounded-full border-2 border-blue-600 dark:border-blue-400"
                    />
                  </button>
                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                      >
                        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                            {user?.displayName || "User"}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                            {user?.email}
                          </p>
                        </div>
                        <div className="py-1">
                          <NavLink
                            to="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            Your Profile
                          </NavLink>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                          >
                            Sign out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden md:flex gap-2">
                  <NavLink
                    to="/login"
                    className="px-3 py-1.5 rounded-full text-sm bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-800"
                  >
                    Log In
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="px-3 py-1.5 rounded-full text-sm border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    Register
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-4 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                {filteredLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-3 py-3 rounded-md text-base font-medium ${
                        isActive
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
                {!user && (
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                    <NavLink
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex-1 text-center px-4 py-2 rounded-md bg-blue-600 dark:bg-blue-700 text-white"
                    >
                      Log In
                    </NavLink>
                    <NavLink
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex-1 text-center px-4 py-2 rounded-md border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400"
                    >
                      Register
                    </NavLink>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Tooltips */}
      <Tooltip
        id="date-tooltip"
        place="bottom"
        content={`Today is ${format(now, "EEEE, MMMM do")}`}
      />
      <Tooltip
        id="time-tooltip"
        place="bottom"
        content={`Updated ${formatDistanceToNow(now)} ago`}
      />
    </div>
  );
};
export default NavBar;
