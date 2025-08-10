import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import AuthImagePattern from "../components/AuthImagePattern";
import { AiFillProduct } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import useAxios from "../hooks/useAxios";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import useTitle from "../hooks/useTitle";

const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = "codeswithrakib";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxios();
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useTitle(`Update Product`);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(`/api/products/${id}`);
        const product = response.data;
        reset(product);
        setPreviewImage(product.productImage);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Product not found or invalid ID");
        navigate("/my-products");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, axiosSecure, navigate, reset]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      toast.loading("Uploading image...");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setPreviewImage(data.secure_url);
      setValue("productImage", data.secure_url);
      toast.dismiss();
      toast.success("Image uploaded!");
    } catch (err) {
      toast.dismiss();
      toast.error("Image upload failed");
      console.error(err);
    }
  };

  const onSubmit = async (data) => {
    setIsUpdating(true);
    data.productImage = previewImage;
    try {
      const response = await axiosSecure.put(`/api/products/${id}`, data);
      if (response.data.result?.modifiedCount > 0) {
        toast.success("Product updated successfully!");
      } else {
        toast.error("No changes made or update failed");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left Column - Form */}
              <div className="p-8 md:p-12">
                <div className="max-w-md mx-auto">
                  <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
                      <AiFillProduct className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                      Update Product
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                      Modify your product details below
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Brand and Product Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Brand Name
                        </label>
                        <input
                          {...register("brandName", {
                            required: "Brand name is required",
                          })}
                          className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-colors
                            ${
                              errors.brandName
                                ? "border-red-500"
                                : "border-gray-300 dark:border-gray-600"
                            }`}
                          placeholder="Enter brand name"
                        />
                        {errors.brandName && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.brandName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Product Name
                        </label>
                        <input
                          {...register("productName", {
                            required: "Product name is required",
                          })}
                          className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-colors
                            ${
                              errors.productName
                                ? "border-red-500"
                                : "border-gray-300 dark:border-gray-600"
                            }`}
                          placeholder="Enter product name"
                        />
                        {errors.productName && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.productName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        {...register("category", {
                          required: "Category is required",
                        })}
                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-colors
                          ${
                            errors.category
                              ? "border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                      >
                        <option value="">Select a category</option>
                        <option value="electronics-gadgets">
                          Electronics & Gadgets
                        </option>
                        <option value="home-kitchen-appliances">
                          Home & Kitchen Appliances
                        </option>
                        <option value="fashion-apparel">
                          Fashion & Apparel
                        </option>
                        <option value="health-beauty">Health & Beauty</option>
                        <option value="industrial-machinery-tools">
                          Industrial Machinery & Tools
                        </option>
                        <option value="automotive-parts-accessories">
                          Automotive Parts & Accessories
                        </option>
                        <option value="office-supplies-stationery">
                          Office Supplies & Stationery
                        </option>
                      </select>
                      {errors.category && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.category.message}
                        </p>
                      )}
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Product Image
                      </label>
                      <div className="flex flex-col sm:flex-row gap-5">
                        <label
                          htmlFor="productImageUpload"
                          className="flex flex-col items-center justify-center w-full sm:w-48 h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                        >
                          <div className="flex flex-col items-center justify-center p-4">
                            <FiUpload className="w-10 h-10 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                              Click to upload or drag and drop
                            </p>
                          </div>
                          <input
                            type="file"
                            id="productImageUpload"
                            className="hidden"
                            onChange={handleImageChange}
                            accept="image/*"
                          />
                        </label>
                        {previewImage && (
                          <div className="w-full sm:w-40 h-40 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 shadow-sm">
                            <img
                              src={previewImage}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                      <input
                        {...register("productImage", {
                          required: "Image URL is required",
                          validate: (value) =>
                            !!value || "Image URL is required",
                        })}
                        value={previewImage || ""}
                        onChange={(e) => setPreviewImage(e.target.value)}
                        className={`mt-3 w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-colors
                          ${
                            errors.productImage
                              ? "border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                        placeholder="Or enter image URL"
                        readOnly={previewImage?.startsWith(
                          "https://res.cloudinary.com"
                        )}
                      />
                      {errors.productImage && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.productImage.message}
                        </p>
                      )}
                    </div>

                    {/* Quantities */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Main Quantity
                        </label>
                        <input
                          type="number"
                          {...register("mainQuantity", {
                            required: "Main quantity is required",
                            min: { value: 1, message: "Minimum 1" },
                            valueAsNumber: true,
                          })}
                          className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-colors
                            ${
                              errors.mainQuantity
                                ? "border-red-500"
                                : "border-gray-300 dark:border-gray-600"
                            }`}
                          placeholder="1000"
                          min="1"
                        />
                        {errors.mainQuantity && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.mainQuantity.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Minimum Quantity
                        </label>
                        <input
                          type="number"
                          {...register("minimumQuantity", {
                            required: "Minimum quantity is required",
                            min: { value: 1, message: "Minimum 1" },
                            valueAsNumber: true,
                          })}
                          className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-colors
                            ${
                              errors.minimumQuantity
                                ? "border-red-500"
                                : "border-gray-300 dark:border-gray-600"
                            }`}
                          placeholder="10"
                          min="1"
                        />
                        {errors.minimumQuantity && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.minimumQuantity.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Price and Rating */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Price ($)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          {...register("price", {
                            required: "Price is required",
                            min: {
                              value: 0.01,
                              message: "Minimum price is 0.01",
                            },
                            valueAsNumber: true,
                          })}
                          className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-colors
                            ${
                              errors.price
                                ? "border-red-500"
                                : "border-gray-300 dark:border-gray-600"
                            }`}
                          placeholder="99.99"
                          min="0.01"
                        />
                        {errors.price && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.price.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Rating (1-5)
                        </label>
                        <input
                          type="number"
                          {...register("rating", {
                            required: "Rating is required",
                            min: { value: 1, message: "Minimum rating is 1" },
                            max: { value: 5, message: "Maximum rating is 5" },
                            valueAsNumber: true,
                          })}
                          className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-colors
                            ${
                              errors.rating
                                ? "border-red-500"
                                : "border-gray-300 dark:border-gray-600"
                            }`}
                          placeholder="4"
                          min="1"
                          max="5"
                        />
                        {errors.rating && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.rating.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        {...register("description", {
                          required: "Description is required",
                          minLength: {
                            value: 10,
                            message: "Minimum 10 characters",
                          },
                        })}
                        rows="4"
                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-colors
                          ${
                            errors.description
                              ? "border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                        placeholder="Detailed product description..."
                      />
                      {errors.description && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.description.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isUpdating}
                      className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm hover:shadow-md flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    >
                      {isUpdating ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Updating Product...
                        </>
                      ) : (
                        "Update Product"
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Right Column - Image Pattern */}
              <div className="hidden lg:block">
                <AuthImagePattern
                  title="Manage Your Products"
                  subtitle="Update your product details to keep your listings accurate and appealing to potential buyers."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
