import React from "react";
import { NavLink, useNavigate } from "react-router";
import { FaShoppingCart } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { IoPersonAddOutline } from "react-icons/io5";

function NavBar() {
  const navigate = useNavigate();
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown flex sm:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Logo</h2>
        </div>
      </div>
      <ul className="navbar-center flex gap-5 text-xl">
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/categories"}>Categories</NavLink>
        </li>
        <li>
          <NavLink to={"/all-products"}>All Products</NavLink>
        </li>
        <li>
          <NavLink to={"/add-product"}>Add Product</NavLink>
        </li>

        <li>
          <NavLink to={"/my-product"}>My Product</NavLink>
        </li>
      </ul>
      <div className="navbar-end gap-2">
        <NavLink to={"/cart"} className="text-2xl flex gap-2 items-center">
          <FaShoppingCart />
          Cart
        </NavLink>
        <div className=" flex gap-2 items-center">
          <div className="flex gap-2 items-center text-2xl">
            <NavLink to={"/login"} className="flex gap-2 items-center">
              <CiUser />
              Log In
            </NavLink>
            <NavLink to={"/register"} className="flex gap-2 items-center">
              <IoPersonAddOutline />
              Register
            </NavLink>
          </div>

          <div
            onClick={() => navigate("/profile")}
            className="relative group inline-block text-right"
          >
            <img
              // src={user?.photoURL}
              // alt={user?.displayName}
              className="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
            />

            {/* Hover box */}
            <div className="absolute right-0 hidden group-hover:flex flex-col items-center justify-center bg-white border shadow-lg z-10 rounded-md w-40 py-5">
              <span className="font-semibold text-zinc-900">
                {/* {user?.displayName || "User"} */}
              </span>
              <button
                // onClick={handleLogout}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
