import React, { useState } from "react";
import AuthImagePattern from "../components/AuthImagePattern";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaGlobeAmericas } from "react-icons/fa";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";
import useAuth from "../hooks/useAuth";

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { logIn, setUser, logInWithGoogle } = useAuth();

  useTitle(`Login`);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const userInfo = Object.fromEntries(formData.entries());

    const { email, password } = userInfo;
    setIsLoggedIn(true);
    logIn(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);

        toast.success("Account logged in successfully!");
        setTimeout(() => {
          navigate(location.state?.from || "/");
        }, 2000);
        setIsLoggedIn(false);
      })
      .catch(() => {
        toast.error("Account login failed!");
        setIsLoggedIn(false);
      });
  };

  const handleGoogleLogin = () => {
    setIsLoggedIn(true);
    logInWithGoogle()
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        toast.success("Account logged in successfully!");
        setIsLoggedIn(false);
        setTimeout(() => {
          navigate(location.state?.from || "/");
        }, 2000);
      })
      .catch(() => {
        toast.error("Account login failed!");
        setIsLoggedIn(false);
      });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center group-hover:bg-amber-200
              transition-colors"
              >
                <FaGlobeAmericas className="w-6 h-6 text-amber-600" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          <div>
            <div onClick={handleGoogleLogin} className="my-6 space-y-4">
              <button className="btn bg-white text-black border-[#e5e5e5] w-full gap-2 hover:bg-amber-50 transition-colors flex items-center justify-center">
                <svg
                  aria-label="Google logo"
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Login with Google
              </button>
            </div>
            <div className="flex items-center w-full my-4">
              <hr className="w-full dark:text-gray-600" />
              <p className="px-3 dark:text-gray-600">OR</p>
              <hr className="w-full dark:text-gray-600" />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <p className="label-text font-medium">Email</p>
              <label className="input validator w-full relative">
                <svg
                  className="h-[2em] opacity-50 absolute left-3 top-1/2 -translate-y-1/2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  type="email"
                  name="email"
                  className="w-full pl-12"
                  placeholder="mail@site.com"
                  required
                />
              </label>
            </div>

            <div className="form-control">
              <p className="label-text font-medium">Password</p>

              <label className="input validator w-full relative">
                <svg
                  className="h-[2em] opacity-50 absolute left-3 top-1/2 -translate-y-1/2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full pl-12"
                  required
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeIcon className="size-5 text-base-content/40" />
                  ) : (
                    <EyeOffIcon className="size-5 text-base-content/40" />
                  )}
                </button>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              disabled={isLoggedIn}
            >
              {isLoggedIn && <Loader2 className="h-5 w-5 animate-spin" />}
              {isLoggedIn ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-amber-600 hover:underline">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Welcome back!"}
        subtitle={
          "Sign in to access your dashboard, manage orders, and grow your business with verified partners worldwide."
        }
      />
    </div>
  );
}

export default Login;
