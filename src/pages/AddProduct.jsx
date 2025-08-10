import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AuthImagePattern from "../components/AuthImagePattern";
import { AiFillProduct } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import useAxios from "../hooks/useAxios";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useTitle from "../hooks/useTitle";

const AddProduct = () => {
  const [isAdded, setIsAdded] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const axiosSecure = useAxios();
  const { user } = useAuth();
  useTitle(`Add Product`);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const productContent = {
    electronics: `
  Includes: 
- Device unit
- Charging cable
- User manual
- Warranty card`,
    home: `
  Includes:
- Appliance unit
- User manual
- Warranty card`,
    fashion: `
  Materials:
- Premium cotton/polyester blend
- Eco-friendly dyes`,
    industrial: `
  Includes:
- Main machine unit
- Instruction manual
- Safety gear (where applicable)`,
    health: `
  Includes:
- Skincare and wellness products
- Dermatologist tested items`,
    automotive: `
  Includes:
- Car parts and accessories
- Installation manuals`,
    office: `
  Includes:
- Stationery items like pens, papers, organizers
- Office supplies essentials`,
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "codeswithrakib");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUD_NAME
      }/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data.secure_url;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const onSubmit = async (data) => {
    const mainQuantity = Number(data.mainQuantity);
    const minimumQuantity = Number(data.minimumQuantity);

    // Validate quantities
    if (minimumQuantity > mainQuantity) {
      toast.error("Minimum selling quantity cannot exceed main quantity");
      return;
    }
    if (minimumQuantity < 1) {
      toast.error("Minimum selling quantity must be at least 1");
      return;
    }
    if (mainQuantity < 1) {
      toast.error("Main quantity must be at least 1");
      return;
    }

    setIsAdded(true);
    try {
      const productInfo = { ...data };
      productInfo.email = user.email;
      productInfo.sellerName = user.displayName;
      productInfo.sellerPhotoURL = user.photoURL;
      const selectedCategory = productInfo.category.split("-")[0];
      productInfo.productContent = productContent[selectedCategory] || "";

      let imageUrl = productInfo.productImage;
      if (data.productImageFile && data.productImageFile.length > 0) {
        try {
          imageUrl = await uploadImageToCloudinary(data.productImageFile[0]);
        } catch (error) {
          toast.error("Image upload failed: " + error.message);
          setIsAdded(false);
          return;
        }
      }
      productInfo.productImage = imageUrl;

      await axiosSecure.post("/api/products", productInfo);
      toast.success("Product added successfully!");
      reset();
      setPreviewImage(null);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setIsAdded(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left Side - Form */}
              <div className="p-8 md:p-12">
                <div className="max-w-md mx-auto">
                  {/* Header */}
                  <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
                      <AiFillProduct className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                      Add New Product
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                      Fill in the details to list your product
                    </p>
                  </div>

                  {/* Form */}
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                    noValidate
                  >
                    {/* Brand and Product Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Brand Name
                        </label>
                        <input
                          type="text"
                          {...register("brandName", {
                            required: "Brand Name is required",
                          })}
                          className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-colors ${
                            errors.brandName
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                          placeholder="Enter brand name"
                        />
                        {errors.brandName && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.brandName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Product Name
                        </label>
                        <input
                          type="text"
                          {...register("productName", {
                            required: "Product Name is required",
                          })}
                          className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-colors ${
                            errors.productName
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                          placeholder="Enter product name"
                        />
                        {errors.productName && (
                          <p className="text-xs text-red-500 mt-1">
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
                        className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-colors ${
                          errors.category
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select a category
                        </option>
                        <option value="electronics-gadgets">
                          Electronics & Gadgets
                        </option>
                        <option value="home-kitchen-appliances">
                          Home & Kitchen Appliances
                        </option>
                        <option value="fashion-apparel">
                          Fashion & Apparel
                        </option>
                        <option value="industrial-machinery-tools">
                          Industrial Machinery & Tools
                        </option>
                        <option value="health-beauty">Health & Beauty</option>
                        <option value="automotive-parts-accessories">
                          Automotive Parts & Accessories
                        </option>
                        <option value="office-supplies-stationery">
                          Office Supplies & Stationery
                        </option>
                      </select>
                      {errors.category && (
                        <p className="text-xs text-red-500 mt-1">
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
                        <label className="flex flex-col items-center justify-center w-full sm:w-48 h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                          <div className="flex flex-col items-center justify-center p-4">
                            <FiUpload className="w-10 h-10 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                              Click to upload or drag and drop
                            </p>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            {...register("productImageFile")}
                            onChange={handleImageChange}
                            className="hidden"
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
                        type="text"
                        {...register("productImage")}
                        className="mt-3 w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-colors"
                        placeholder="Or enter image URL"
                      />
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
                            min: { value: 1, message: "Minimum quantity is 1" },
                          })}
                          className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-colors ${
                            errors.mainQuantity
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                          placeholder="1000"
                        />
                        {errors.mainQuantity && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.mainQuantity.message}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Total available stock
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Minimum Selling Quantity
                        </label>
                        <input
                          type="number"
                          {...register("minimumQuantity", {
                            required: "Minimum quantity is required",
                            min: { value: 1, message: "Minimum quantity is 1" },
                          })}
                          className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-colors ${
                            errors.minimumQuantity
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                          placeholder="10"
                        />
                        {errors.minimumQuantity && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.minimumQuantity.message}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Minimum order quantity
                        </p>
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
                              message: "Price must be at least 0.01",
                            },
                          })}
                          className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-colors ${
                            errors.price
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                          placeholder="99.99"
                        />
                        {errors.price && (
                          <p className="text-xs text-red-500 mt-1">
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
                            min: { value: 1, message: "Rating minimum is 1" },
                            max: { value: 5, message: "Rating maximum is 5" },
                          })}
                          className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-colors ${
                            errors.rating
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                          placeholder="4"
                        />
                        {errors.rating && (
                          <p className="text-xs text-red-500 mt-1">
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
                        })}
                        rows="4"
                        className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-colors ${
                          errors.description
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                        placeholder="Detailed product description..."
                      ></textarea>
                      {errors.description && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.description.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isAdded}
                      className="w-full flex justify-center items-center py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    >
                      {isAdded ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Adding Product...
                        </>
                      ) : (
                        "Add Product"
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="hidden lg:block">
                <AuthImagePattern
                  title="Expand Your Product Line"
                  subtitle="List your products to reach thousands of potential buyers worldwide. Our platform connects you with the right customers for your business."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
