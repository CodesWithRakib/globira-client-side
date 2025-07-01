import {
  CalendarIcon,
  ClockIcon,
  PhoneIcon,
  UserIcon,
  TruckIcon,
} from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import useAuth from "../hooks/useAuth";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { format, formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";

const offers = [
  "🚚 Free Shipping on orders over $50!",
  "🎉 Mega Offer: 20% off electronics today!",
  "🔥 Hot Deal: Buy 2 Get 1 Free on selected items",
  "💳 Special: 10% cashback with credit card payment",
];

const TopBar = () => {
  const [now, setNow] = useState(new Date());
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [isHoveringOffer, setIsHoveringOffer] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isHoveringOffer) {
      const offerTimer = setInterval(() => {
        setCurrentOfferIndex((prev) => (prev + 1) % offers.length);
      }, 5000);
      return () => clearInterval(offerTimer);
    }
  }, [isHoveringOffer]);

  const todayDate = format(now, "EEE, MMM d");
  const currentTime = format(now, "h:mm a");

  const handleOfferClick = useCallback((index) => {
    setCurrentOfferIndex(index);
    // Optional: Navigate to deals page or specific offer
    // navigate('/deals');
  }, []);

  return (
    <div className="bg-amber-700 dark:bg-gray-900 text-white dark:text-gray-200 text-xs md:text-sm py-2 px-4 md:px-8 lg:px-16 xl:px-24 flex flex-wrap justify-between items-center select-none shadow-sm border-b border-amber-800 dark:border-gray-700 relative z-50">
      {/* Left section */}
      <div className="flex items-center gap-3 py-1">
        <div
          className="flex items-center gap-1 group"
          data-tooltip-id="date-tooltip"
          data-tooltip-content={`Today is ${format(now, "EEEE, MMMM do")}`}
        >
          <CalendarIcon className="w-4 h-4 text-amber-300 dark:text-amber-400 group-hover:text-amber-200 transition-colors" />
          <span className="group-hover:text-amber-200 transition-colors">
            {todayDate}
          </span>
        </div>
        <div
          className="flex items-center gap-1 group"
          data-tooltip-id="time-tooltip"
          data-tooltip-content={`Updated ${formatDistanceToNow(now)} ago`}
        >
          <ClockIcon className="w-4 h-4 text-amber-300 dark:text-amber-400 group-hover:text-amber-200 transition-colors" />
          <span className="group-hover:text-amber-200 transition-colors">
            {currentTime}
          </span>
        </div>
      </div>

      {/* Middle section */}
      <div className="hidden sm:flex items-center justify-center flex-1 px-4 py-1 max-w-2xl mx-2">
        <div
          className="relative w-full flex items-center justify-center"
          onMouseEnter={() => setIsHoveringOffer(true)}
          onMouseLeave={() => setIsHoveringOffer(false)}
          aria-live="polite"
        >
          <TruckIcon className="w-4 h-4 text-amber-300 dark:text-amber-400 mr-2 flex-shrink-0" />

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
                  className="font-medium text-amber-300 dark:text-amber-400 hover:text-amber-200 dark:hover:text-amber-200 transition-colors w-full"
                >
                  {offers[currentOfferIndex]}
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex ml-2 space-x-1">
            {offers.map((_, index) => (
              <button
                key={index}
                onClick={() => handleOfferClick(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentOfferIndex
                    ? "bg-amber-300 dark:bg-amber-400"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
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
          className="flex items-center gap-1 group cursor-pointer"
          data-tooltip-id="user-tooltip"
          data-tooltip-content={user ? "View profile" : "Login or register"}
          onClick={() => navigate(user ? "/profile" : "/login")}
        >
          <UserIcon className="w-4 h-4 text-white dark:text-gray-300 group-hover:text-amber-300 dark:group-hover:text-amber-300 transition-colors" />
          <span className="group-hover:text-amber-300 dark:group-hover:text-amber-300 transition-colors">
            Hello,{" "}
            {user?.displayName ? user.displayName.split(" ")[0] : "Guest"}
          </span>
        </button>
        <button
          className="flex items-center gap-1 group cursor-pointer"
          data-tooltip-id="support-tooltip"
          data-tooltip-content="Contact support"
          onClick={() => (window.location.href = "tel:+880171234567")}
        >
          <PhoneIcon className="w-4 h-4 text-white dark:text-gray-300 group-hover:text-amber-300 dark:group-hover:text-amber-300 transition-colors" />
          <span className="hidden md:inline group-hover:text-amber-300 dark:group-hover:text-amber-300 transition-colors">
            Support: +880 171 234 567
          </span>
          <span className="md:hidden group-hover:text-amber-300 dark:group-hover:text-amber-300 transition-colors">
            Support
          </span>
        </button>
      </div>

      <Tooltip
        id="date-tooltip"
        place="bottom"
        className="!text-xs !bg-gray-800 !py-1 !px-2 !rounded"
      />
      <Tooltip
        id="time-tooltip"
        place="bottom"
        className="!text-xs !bg-gray-800 !py-1 !px-2 !rounded"
      />
      <Tooltip
        id="user-tooltip"
        place="bottom"
        className="!text-xs !bg-gray-800 !py-1 !px-2 !rounded"
      />
      <Tooltip
        id="support-tooltip"
        place="bottom"
        className="!text-xs !bg-gray-800 !py-1 !px-2 !rounded"
      />
    </div>
  );
};

export default TopBar;
