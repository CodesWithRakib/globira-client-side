import {
  CalendarIcon,
  ClockIcon,
  PhoneIcon,
  UserIcon,
  TruckIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const TopBar = () => {
  const [now, setNow] = useState(new Date());

  const { user } = useAuth();
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const todayDate = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const currentTime = now.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-xs md:text-sm py-2 px-6 flex justify-between items-center select-none shadow-sm border-b border-gray-200 dark:border-gray-700 h-[80px]">
      {/* Left section: Date & Time */}
      <div className="flex items-center gap-2">
        <CalendarIcon className="w-4 h-4 text-orange-600 dark:text-orange-400" />
        <span>{todayDate}</span>
        <ClockIcon className="w-4 h-4 text-orange-600 dark:text-orange-400 ml-4" />
        <span>{currentTime}</span>
      </div>

      {/* Middle section: Offers */}
      <div className="hidden sm:flex items-center gap-2 font-semibold text-orange-600 dark:text-orange-400">
        <TruckIcon className="w-4 h-4" />
        <span>Free Shipping on orders over $50!</span>
        <span>🎉 Mega Offer: 20% off electronics today! 🔥</span>
      </div>

      {/* Right section: User & Support */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <UserIcon className="w-4 h-4 cursor-pointer hover:text-orange-500 dark:hover:text-orange-300" />
          <span className="cursor-pointer hover:text-orange-500 dark:hover:text-orange-300">
            Hello, {user?.displayName ? user.displayName : "Guest"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <PhoneIcon className="w-4 h-4 cursor-pointer hover:text-orange-500 dark:hover:text-orange-300" />
          <span className="cursor-pointer hover:text-orange-500 dark:hover:text-orange-300">
            Support: +880 171 234 567
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
