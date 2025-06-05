import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center py-4 h-[calc(100vh-441px)]">
      <Loader className="w-20 h-20 animate-spin"></Loader>
    </div>
  );
};

export default Loading;
