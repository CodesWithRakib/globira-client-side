import React, { useEffect } from "react";
import AuthImagePattern from "../components/AuthImagePattern";
import { AiFillProduct } from "react-icons/ai";
import useAxios from "../hooks/useAxios";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import Loading from "../components/Loading";

const UpdateProduct = () => {
  const [isUpdated, setIsUpdated] = React.useState(false);
  const [product, setProduct] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const { id } = useParams();
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsUpdated(true);
    const form = event.target;
    const formData = new FormData(form);
    const productInfo = Object.fromEntries(formData.entries());

    axiosSecure
      .put(`/api/products/${id}`, productInfo)
      .then((response) => {
        console.log(response);
        toast.success("Product updated successfully!");
        setIsUpdated(false);
        form.reset();
      })
      .catch((error) => {
        toast.error("Product update failed!");
        console.log(error);
        setIsUpdated(false);
      });
  };
  const {
    brandName,
    productName,
    category,
    description,
    price,
    mainQuantity,
    minimumQuantity,
    rating,
    productImage,
  } = product;

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get(`/api/products/${id}`)
      .then((response) => {
        setProduct(response);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Product id incorrect or not found!");
        navigate("/");
        console.log(error);
      });
  }, [id]);
  return loading ? (
    <Loading></Loading>
  ) : (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-lg space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <AiFillProduct className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Update Product</h1>
              <p className="text-base-content/60">
                Update your product details
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-2 ">
            <div className="form-control flex items-center justify-center gap-5 w-full">
              <div className="w-full">
                <legend className="fieldset-legend">Brand</legend>
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
                      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                      <path d="m9 12 2 2 4-4" />
                    </g>
                  </svg>
                  <input
                    type="text"
                    name="brandName"
                    defaultValue={brandName}
                    className={`  w-full `}
                    placeholder="Nike"
                    required
                  />
                </label>
                <div className="validator-hint hidden">
                  Enter valid brand name
                </div>
              </div>

              <div className="w-full">
                <legend className="fieldset-legend">Product Name</legend>

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
                      <path d="m15 11-1 9" />
                      <path d="m19 11-4-7" />
                      <path d="M2 11h20" />
                      <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
                      <path d="M4.5 15.5h15" />
                      <path d="m5 11 4-7" />
                      <path d="m9 11 1 9" />
                    </g>
                  </svg>
                  <input
                    type="text"
                    defaultValue={productName}
                    name="productName"
                    className={`  w-full `}
                    placeholder="Nike"
                    required
                  />
                </label>
                <div className="validator-hint hidden">
                  Enter valid product name
                </div>
              </div>
            </div>
            <fieldset className="form-control flex  items-center justify-center w-full">
              <div className="w-full">
                <legend className="fieldset-legend">Category</legend>
                <select
                  defaultValue={category}
                  className="select w-full"
                  name="category"
                  required
                >
                  <option defaultValue={"electronics-gadgets"}>
                    Electronics & Gadgets
                  </option>
                  <option defaultValue={"home-kitchen-appliances"}>
                    Home & Kitchen Appliances
                  </option>
                  <option defaultValue={"fashion-apparel"}>
                    Fashion & Apparel
                  </option>
                  <option defaultValue={"health-beauty"}>
                    Health & Beauty
                  </option>
                  <option defaultValue={"industrial-machinery-tools"}>
                    Industrial Machinery & Tools
                  </option>
                  <option defaultValue={"automotive-parts-accessories"}>
                    {" "}
                    Automotive Parts & Accessories
                  </option>
                  <option defaultValue={"office-supplies-stationery"}>
                    {" "}
                    Office Supplies & Stationery
                  </option>
                </select>
              </div>
            </fieldset>

            <div className="form-control flex items-center justify-center gap-5 w-full">
              <div className="w-full">
                <legend className="fieldset-legend">Product Image</legend>
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
                      <path d="M16 5h6" />
                      <path d="M19 2v6" />
                      <path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                      <circle cx="9" cy="9" r="2" />
                    </g>
                  </svg>
                  <input
                    type="text"
                    defaultValue={productImage}
                    name="productImage"
                    className={`  w-full `}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </label>
                <div className="validator-hint hidden">
                  Enter valid main quantity
                </div>
              </div>
            </div>
            <div className="form-control flex items-center justify-center gap-5 w-full">
              <div className="w-full">
                <legend className="fieldset-legend">Main Quantity</legend>
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
                      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                      <path d="M2 7h20" />
                      <path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7" />
                    </g>
                  </svg>
                  <input
                    type="number"
                    defaultValue={mainQuantity}
                    name="mainQuantity"
                    className={`  w-full `}
                    placeholder="1000"
                    required
                  />
                </label>
                <div className="validator-hint hidden">
                  Enter valid main quantity
                </div>
              </div>

              <div className="w-full">
                <legend className="fieldset-legend">Minimum Quantity</legend>

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
                      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
                      <path d="M12 9v4" />
                      <path d="M12 17h.01" />
                    </g>
                  </svg>
                  <input
                    type="number"
                    defaultValue={minimumQuantity}
                    name="minimumQuantity"
                    className={`  w-full `}
                    placeholder="500"
                    required
                  />
                </label>
                <div className="validator-hint hidden">
                  Enter valid minimum quantity
                </div>
              </div>
            </div>

            <div className="form-control flex items-center justify-center gap-5 w-full">
              <div className="w-full">
                <legend className="fieldset-legend">Price</legend>
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
                      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                      <path d="M12 18V6" />
                    </g>
                  </svg>
                  <input
                    type="number"
                    name="price"
                    defaultValue={price}
                    className={`  w-full `}
                    placeholder="product price"
                    required
                  />
                </label>
                <div className="validator-hint hidden">
                  Enter valid product price
                </div>
              </div>
              <div className="w-full">
                <legend className="fieldset-legend">Rating</legend>

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
                      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                    </g>
                  </svg>
                  <input
                    type="number"
                    name="rating"
                    defaultValue={rating}
                    className={`  w-full `}
                    min="1"
                    max="5"
                    step="1"
                    placeholder="1-5 rating"
                    required
                  />
                </label>
                <div className="validator-hint hidden">
                  Enter 1-5 only rating
                </div>
              </div>
            </div>

            <fieldset className="form-control flex  items-center justify-center w-full">
              <div className="w-full">
                <legend className="fieldset-legend">Description</legend>
                <textarea
                  name="description"
                  defaultValue={description}
                  className="textarea w-full h-24"
                  placeholder="Product description"
                ></textarea>
              </div>
            </fieldset>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isUpdated}
            >
              {isUpdated ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin">
                    Updating...
                  </Loader2>
                </>
              ) : (
                "Update"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* right side */}

      <AuthImagePattern
        title="Start Your Business Journey"
        subtitle="Create your free account to connect with verified buyers and suppliers.
Whether you’re sourcing or selling—your global growth starts here."
      />
    </div>
  );
};

export default UpdateProduct;
