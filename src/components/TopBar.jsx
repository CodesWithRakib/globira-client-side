import {
  CalendarIcon,
  ClockIcon,
  PhoneIcon,
  UserIcon,
  TruckIcon,
} from "lucide-react";
import React, { useEffect, useState, useCallback, memo } from "react";
import useAuth from "../hooks/useAuth";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { format, formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router";

const offers = [
  "🚚 Free Shipping on orders over $50!",
  "🎉 Mega Offer: 20% off electronics today!",
  "🔥 Hot Deal: Buy 2 Get 1 Free on selected items",
  "💳 Special: 10% cashback with credit card payment",
];

// Memoized component to prevent unnecessary re-renders
const TopBar = memo(() => {
  const [now, setNow] = useState(new Date());
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [isHoveringOffer, setIsHoveringOffer] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Rotate offers every 5 seconds when not hovering
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

  // Memoized click handler
  const handleOfferClick = useCallback((index) => {
    setCurrentOfferIndex(index);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-blue-200 dark:border-blue-800 text-xs md:text-sm py-2 px-4 sm:px-6 lg:px-8 xl:px-12 w-full flex flex-wrap justify-between items-center select-none shadow-sm relative z-50">
      {/* Left section */}
      <div className="flex items-center gap-4 py-1">
        <div
          className="flex items-center gap-1.5 group cursor-pointer"
          data-tooltip-id="date-tooltip"
          data-tooltip-content={`Today is ${format(now, "EEEE, MMMM do")}`}
        >
          <CalendarIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors" />
          <span className="text-gray-800 dark:text-gray-200 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors font-medium">
            {todayDate}
          </span>
        </div>
        <div
          className="flex items-center gap-1.5 group cursor-pointer"
          data-tooltip-id="time-tooltip"
          data-tooltip-content={`Updated ${formatDistanceToNow(now)} ago`}
        >
          <ClockIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors" />
          <span className="text-gray-800 dark:text-gray-200 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors font-medium">
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
          <TruckIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
          <div className="relative w-full overflow-hidden h-6">
            <div className="absolute top-0 left-0 w-full text-center transition-opacity duration-300">
              <button
                onClick={() => handleOfferClick(currentOfferIndex)}
                className="font-medium text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100 transition-colors w-full"
              >
                {offers[currentOfferIndex]}
              </button>
            </div>
          </div>
          <div className="flex ml-2 space-x-1.5">
            {offers.map((_, index) => (
              <button
                key={index}
                onClick={() => handleOfferClick(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentOfferIndex
                    ? "bg-blue-600 dark:bg-blue-400"
                    : "bg-blue-200 dark:bg-blue-700 hover:bg-blue-400 dark:hover:bg-blue-500"
                }`}
                aria-label={`Go to offer ${index + 1}`}
                aria-current={index === currentOfferIndex ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4 md:gap-6 py-1">
        <button
          className="flex items-center gap-1.5 group cursor-pointer"
          data-tooltip-id="user-tooltip"
          data-tooltip-content={user ? "View profile" : "Login or register"}
          onClick={() => navigate(user ? "/profile" : "/login")}
        >
          <UserIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors" />
          <span className="text-gray-800 dark:text-gray-200 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors font-medium">
            Hello,{" "}
            {user?.displayName ? user.displayName.split(" ")[0] : "Guest"}
          </span>
        </button>
        <button
          className="flex items-center gap-1.5 group cursor-pointer"
          data-tooltip-id="support-tooltip"
          data-tooltip-content="Contact support"
          onClick={() => (window.location.href = "tel:+880171234567")}
        >
          <PhoneIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors" />
          <span className="hidden md:inline text-gray-800 dark:text-gray-200 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors font-medium">
            Support: +880 176 747 6724
          </span>
          <span className="md:hidden text-gray-800 dark:text-gray-200 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors font-medium">
            Support
          </span>
        </button>
      </div>

      {/* Tooltips */}
      <Tooltip
        id="date-tooltip"
        place="bottom"
        className="!text-xs !bg-blue-800 dark:!bg-blue-900 !text-white !py-1.5 !px-3 !rounded-md shadow-lg !opacity-90"
      />
      <Tooltip
        id="time-tooltip"
        place="bottom"
        className="!text-xs !bg-blue-800 dark:!bg-blue-900 !text-white !py-1.5 !px-3 !rounded-md shadow-lg !opacity-90"
      />
      <Tooltip
        id="user-tooltip"
        place="bottom"
        className="!text-xs !bg-blue-800 dark:!bg-blue-900 !text-white !py-1.5 !px-3 !rounded-md shadow-lg !opacity-90"
      />
      <Tooltip
        id="support-tooltip"
        place="bottom"
        className="!text-xs !bg-blue-800 dark:!bg-blue-900 !text-white !py-1.5 !px-3 !rounded-md shadow-lg !opacity-90"
      />
    </div>
  );
});

export default TopBar;
