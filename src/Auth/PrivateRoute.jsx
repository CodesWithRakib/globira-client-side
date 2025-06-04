import React, { use } from "react";
import { AuthContext } from "./AuthProvider";
import { useLocation } from "react-router";
import Loading from "../components/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const { pathname } = useLocation();

  if (loading) {
    return <Loading></Loading>;
  }

  if (user && user.email) {
    return children;
  }

  return <Navigate to={"/login"} state={pathname}></Navigate>;
};

export default PrivateRoute;
