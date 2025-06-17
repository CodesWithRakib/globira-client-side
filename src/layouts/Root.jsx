import React from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

const Root = () => {
  const { loading } = useAuth();
  return loading ? (
    <Loading></Loading>
  ) : (
    <div>
      <NavBar></NavBar>
      <div className="min-h-[calc(100vh-441px)] bg-[#010313]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
      <Toaster />
    </div>
  );
};

export default Root;
