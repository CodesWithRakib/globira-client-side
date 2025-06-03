import React, { use } from "react";
import { AuthContext } from "../Auth/AuthProvider";

const NavBar = () => {
  const { name } = use(AuthContext);
  return <div className="bg-red-700">NavBar {name}</div>;
};

export default NavBar;
