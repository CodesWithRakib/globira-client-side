import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import AuthImagePattern from "../components/AuthImagePattern";
import { AiFillProduct } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import useAxios from "../hooks/useAxios";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import Loading from "../components/Loading";

const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = "codeswithrakib";
const UpdateProduct = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const { id } = useParams();
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(`/api/products/${id}`);
        setProduct(response.data);
        setPreviewImage(response.data.productImage);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Product not found or invalid ID");
        navigate("/my-products");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, axiosSecure, navigate]);

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
      toast.dismiss();
      toast.success("Image uploaded!");
    } catch (err) {
      toast.dismiss();
      toast.error("Image upload failed");
      console.error(err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!product) return;

    setIsUpdating(true);
    const form = event.target;
    const formData = new FormData(form);

    const productInfo = {
      ...Object.fromEntries(formData.entries()),
      productImage: previewImage,
    };

    try {
      const response = await axiosSecure.put(
        `/api/products/${id}`,
        productInfo
      );
      if (response.data.result.modifiedCount > 0) {
        toast.success("Product updated successfully!");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <Loading />;
  if (!product)
    return <div className="text-center py-10">Product not found</div>;

  const {
    brandName,
    productName,
    category,
    description,
    price,
    mainQuantity,
    minimumQuantity,
    rating,
  } = product;

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-lg space-y-6">
          <div className="text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="size-14 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-3">
                <AiFillProduct className="size-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Update Product
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Modify your product details
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  name="brandName"
                  defaultValue={brandName}
                  required
                  className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  defaultValue={productName}
                  required
                  className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                name="category"
                defaultValue={category}
                required
                className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              >
                <option value="electronics-gadgets">
                  Electronics & Gadgets
                </option>
                <option value="home-kitchen-appliances">
                  Home & Kitchen Appliances
                </option>
                <option value="fashion-apparel">Fashion & Apparel</option>
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
                value={previewImage || ""}
                onChange={(e) => setPreviewImage(e.target.value)}
                className="mt-2 w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="Or enter image URL"
                required
                readOnly={previewImage?.startsWith(
                  "https://res.cloudinary.com"
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Main Quantity
                </label>
                <input
                  type="number"
                  name="mainQuantity"
                  defaultValue={mainQuantity}
                  min="1"
                  required
                  className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Minimum Quantity
                </label>
                <input
                  type="number"
                  name="minimumQuantity"
                  defaultValue={minimumQuantity}
                  min="1"
                  required
                  className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  defaultValue={price}
                  min="0.01"
                  step="0.01"
                  required
                  className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  name="rating"
                  defaultValue={rating}
                  min="1"
                  max="5"
                  required
                  className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                defaultValue={description}
                rows="4"
                className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="Detailed product description..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isUpdating}
              className="w-full flex justify-center items-center py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
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

      <AuthImagePattern
        title="Manage Your Products"
        subtitle="Update your product details to keep your listings accurate and appealing to potential buyers."
      />
    </div>
  );
};

export default UpdateProduct;
