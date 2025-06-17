import React, { use } from "react";
import AuthImagePattern from "../components/AuthImagePattern";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaGlobeAmericas } from "react-icons/fa";
import { AuthContext } from "../Auth/AuthProvider";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";

function Login() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const { logIn, setUser, logInWithGoogle } = use(AuthContext);

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
          navigate(`${location.state ? location.state : "/"}`);
        }, 2000);
        setIsLoggedIn(false);
      })
      .catch(() => {
        toast.error("Account login failed!");
        setIsLoggedIn(false);
      });
  };

  const handleGoogleLogin = () => {
    // Simulate a Google login flow
    setIsLoggedIn(true);
    logInWithGoogle()
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        toast.success("Account logged in successfully!");
        setIsLoggedIn(false);
        setTimeout(() => {
          navigate(`${location.state ? location.state : "/"}`);
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
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
              >
                <FaGlobeAmericas className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          <div>
            <div onClick={handleGoogleLogin} className="my-6 space-y-4">
              <button className="btn bg-white text-black border-[#e5e5e5] w-full">
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
              <label className="input validator w-full">
                <svg
                  className="h-[2em] opacity-50"
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
                  className={`  w-full `}
                  placeholder="mail@site.com"
                  required
                />
              </label>
              <div className="validator-hint hidden">
                Enter valid email address
              </div>
            </div>

            <div className="form-control">
              <p className="label-text font-medium">Password</p>

              <label className="input validator w-full">
                <svg
                  className="h-[2em] opacity-50"
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
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
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
                  className={`  w-full `}
                  required
                  placeholder="Password"
                  minLength="8"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
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
              className="btn btn-primary w-full"
              disabled={isLoggedIn}
            >
              {isLoggedIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Login in...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="link link-primary">
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
