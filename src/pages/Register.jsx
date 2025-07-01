import React, { useState } from "react";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link, useLocation, useNavigate } from "react-router";
import { Loader2, EyeOffIcon, EyeIcon, GlobeLock } from "lucide-react";
import toast from "react-hot-toast";
import useAxios from "../hooks/useAxios";
import useTitle from "../hooks/useTitle";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, updateUser, setUser } = useAuth();
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [isSigningUp, setIsSigningUp] = useState(false);

  useTitle(`Register`);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password, name, photoURL } = data;

    // Password validation
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordPattern.test(password)) {
      toast.error(
        "Password must contain uppercase, lowercase, digit, and be at least 6 characters."
      );
      return;
    }

    try {
      setIsSigningUp(true);
      const userCredential = await createUser(email, password);
      const user = userCredential.user;
      setUser(user);

      await updateUser({ displayName: name, photoURL });
      toast.success("Account created & updated successfully!");

      // Save user to DB
      await axiosSecure.post("/api/users", { name, email, password, photoURL });

      reset();

      setTimeout(() => {
        navigate(state?.from || "/");
      }, 2000);
    } catch (error) {
      toast.error(error.message || "Account creation failed!");
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-amber-100/40 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                <GlobeLock className="size-6 text-amber-600" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div className="form-control">
              <p className="label-text font-medium">Name</p>
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
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>
                <input
                  type="text"
                  placeholder="Md. Rakib Islam"
                  className={`w-full pl-12 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  {...register("name", { required: "Name is required" })}
                />
              </label>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* PhotoURL */}
            <div className="form-control">
              <p className="label-text font-medium">PhotoURL</p>
              <label className="input validator w-full relative">
                <svg
                  className="h-[2em] opacity-50 absolute left-3 top-1/2 -translate-y-1/2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
                <input
                  type="text"
                  placeholder="https://example.com/photo.png"
                  className={`w-full pl-12 ${
                    errors.photoURL ? "border-red-500" : ""
                  }`}
                  {...register("photoURL", {
                    required: "Photo URL is required",
                  })}
                />
              </label>
              {errors.photoURL && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.photoURL.message}
                </p>
              )}
            </div>

            {/* Email */}
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
                  placeholder="mail@example.com"
                  className={`w-full pl-12 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
              </label>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
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
                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                  </g>
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`w-full pl-12 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    validate: (value) =>
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(value) ||
                      "Password must contain uppercase, lowercase, and digit",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeIcon className="size-5 text-base-content/40" />
                  ) : (
                    <EyeOffIcon className="size-5 text-base-content/40" />
                  )}
                </button>
              </label>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              disabled={isSigningUp}
            >
              {isSigningUp && <Loader2 className="h-5 w-5 animate-spin" />}
              {isSigningUp ? "Creating..." : "Create Account"}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="text-amber-600 hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}
      <AuthImagePattern
        title="Start Your Business Journey"
        subtitle="Create your free account to connect with verified buyers and suppliers. Whether you’re sourcing or selling—your global growth starts here."
      />
    </div>
  );
};

export default Register;
