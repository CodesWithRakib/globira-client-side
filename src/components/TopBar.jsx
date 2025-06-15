import {
  CalendarIcon,
  ClockIcon,
  PhoneIcon,
  UserIcon,
  TruckIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { format, formatDistanceToNow } from "date-fns";

const TopBar = () => {
  const [now, setNow] = useState(new Date());
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const { user } = useAuth();

  // Offers to cycle through
  const offers = [
    "🚚 Free Shipping on orders over $50!",
    "🎉 Mega Offer: 20% off electronics today!",
    "🔥 Hot Deal: Buy 2 Get 1 Free on selected items",
    "💳 Special: 10% cashback with credit card payment",
  ];

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Cycle through offers every 5 seconds
  useEffect(() => {
    const offerTimer = setInterval(() => {
      setCurrentOfferIndex((prev) => (prev + 1) % offers.length);
    }, 5000);
    return () => clearInterval(offerTimer);
  }, [offers.length]);

  // Format date using date-fns
  const todayDate = format(now, "EEE, MMM d");

  // Format time using date-fns
  const currentTime = format(now, "h:mm a");

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-xs md:text-sm py-2 px-4 md:px-6 flex flex-wrap justify-between items-center select-none shadow-sm border-b border-gray-200 dark:border-gray-700 relative z-50">
      {/* Left section: Date & Time */}
      <div className="flex items-center gap-2 py-1">
        <div className="flex items-center gap-1">
          <CalendarIcon
            className="w-4 h-4 text-orange-600 dark:text-orange-400"
            data-tooltip-id="date-tooltip"
            data-tooltip-content={`Today is ${format(now, "EEEE, MMMM do")}`}
          />
          <span>{todayDate}</span>
        </div>
        <div className="flex items-center gap-1 ml-3 md:ml-4">
          <ClockIcon
            className="w-4 h-4 text-orange-600 dark:text-orange-400"
            data-tooltip-id="time-tooltip"
            data-tooltip-content={`Updated ${formatDistanceToNow(now)} ago`}
          />
          <span>{currentTime}</span>
        </div>
      </div>

      {/* Middle section: Offers */}
      <div className="hidden sm:flex items-center justify-center flex-1 px-4 py-1 max-w-2xl mx-2">
        <div className="relative w-full flex items-center justify-center">
          <TruckIcon className="w-4 h-4 text-orange-600 dark:text-orange-400 mr-2 flex-shrink-0" />

          <div className="relative w-full overflow-hidden h-6">
            <div
              className="absolute top-0 left-0 w-full flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentOfferIndex * 100}%)` }}
            >
              {offers.map((offer, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full text-center font-medium text-orange-600 dark:text-orange-400 px-4"
                >
                  {offer}
                </div>
              ))}
            </div>
          </div>

          <div className="flex ml-2 space-x-1">
            {offers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentOfferIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentOfferIndex
                    ? "bg-orange-600 dark:bg-orange-400"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Go to offer ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right section: User & Support */}
      <div className="flex items-center gap-4 md:gap-6 py-1">
        <div
          className="flex items-center gap-1 group cursor-pointer"
          data-tooltip-id="user-tooltip"
          data-tooltip-content={user ? "View profile" : "Login or register"}
        >
          <UserIcon className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-orange-500 dark:group-hover:text-orange-300 transition-colors" />
          <span className="group-hover:text-orange-500 dark:group-hover:text-orange-300 transition-colors">
            Hello,{" "}
            {user?.displayName ? user.displayName.split(" ")[0] : "Guest"}
          </span>
        </div>
        <div
          className="flex items-center gap-1 group cursor-pointer"
          data-tooltip-id="support-tooltip"
          data-tooltip-content="Contact support"
        >
          <PhoneIcon className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-orange-500 dark:group-hover:text-orange-300 transition-colors" />
          <span className="hidden md:inline group-hover:text-orange-500 dark:group-hover:text-orange-300 transition-colors">
            Support: +880 171 234 567
          </span>
          <span className="md:hidden group-hover:text-orange-500 dark:group-hover:text-orange-300 transition-colors">
            Support
          </span>
        </div>
      </div>

      {/* Tooltips */}
      <Tooltip id="date-tooltip" place="bottom" className="!text-xs" />
      <Tooltip id="time-tooltip" place="bottom" className="!text-xs" />
      <Tooltip id="user-tooltip" place="bottom" className="!text-xs" />
      <Tooltip id="support-tooltip" place="bottom" className="!text-xs" />
    </div>
  );
};

export default TopBar;
