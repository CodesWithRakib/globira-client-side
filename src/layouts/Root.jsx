import React from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

const Root = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>

      <Toaster />
    </div>
  );
};

export default Root;
