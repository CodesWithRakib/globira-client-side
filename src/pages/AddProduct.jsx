import React, { useState } from "react";
import AuthImagePattern from "../components/AuthImagePattern";
import { AiFillProduct } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import useAxios from "../hooks/useAxios";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import useAuth from "../hooks/useAuth";

const AddProduct = () => {
  const [isAdded, setIsAdded] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const axiosSecure = useAxios();

  const { user } = useAuth();

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
    formData.append("upload_preset", "codeswithrakib"); // replace with your preset name

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
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsAdded(true);

    const form = event.target;
    const formData = new FormData(form);
    const productInfo = Object.fromEntries(formData.entries());

    // Add user info
    productInfo.email = user.email;
    productInfo.sellerName = user.displayName;
    productInfo.sellerPhotoURL = user.photoURL;

    // Add product content based on category
    const selectedCategory = productInfo.category.split("-")[0];
    productInfo.productContent = productContent[selectedCategory] || "";

    let imageUrl = productInfo.productImage; // From text input

    // If a file was selected for upload
    const fileInput = form.querySelector("input[type='file']");
    if (fileInput.files[0]) {
      try {
        imageUrl = await uploadImageToCloudinary(fileInput.files[0]);
      } catch (error) {
        toast.error("Image upload failed." + error);
        setIsAdded(false);
        return;
      }
    }

    productInfo.productImage = imageUrl;

    // POST to backend
    try {
      await axiosSecure.post("/api/products", productInfo);
      toast.success("Product added successfully!");
      form.reset();
      setPreviewImage(null);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setIsAdded(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-50 dark:bg-gray-900">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-lg space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="size-14 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-3">
                <AiFillProduct className="size-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Add New Product
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Fill in the details to list your product
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Brand and Product Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  name="brandName"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  placeholder="Enter brand name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  placeholder="Enter product name"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                name="category"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                required
              >
                <option value="">Select a category</option>
                <option value="electronics-gadgets">
                  Electronics & Gadgets
                </option>
                <option value="home-kitchen-appliances">
                  Home & Kitchen Appliances
                </option>
                <option value="fashion-apparel">Fashion & Apparel</option>
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
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Product Image
              </label>
              <div className="flex items-center gap-4">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FiUpload className="w-8 h-8 text-gray-400" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Click to upload or drag and drop
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
                {previewImage && (
                  <div className="w-32 h-32 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
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
                name="productImage"
                className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="Or enter image URL"
              />
            </div>

            {/* Quantities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Main Quantity
                </label>
                <input
                  type="number"
                  name="mainQuantity"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  placeholder="1000"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Minimum Selling Quantity
                </label>
                <input
                  type="number"
                  name="minimumQuantity"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  placeholder="10"
                  min="1"
                  required
                />
              </div>
            </div>

            {/* Price and Rating */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  placeholder="99.99"
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  name="rating"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  placeholder="4"
                  min="1"
                  max="5"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                required
                name="description"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="Detailed product description..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isAdded}
              className="w-full flex justify-center items-center py-3 px-4 bg-primary dark:bg-amber-800 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
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
      <AuthImagePattern
        title="Expand Your Product Line"
        subtitle="List your products to reach thousands of potential buyers worldwide. 
Our platform connects you with the right customers for your business."
      />
    </div>
  );
};

export default AddProduct;
