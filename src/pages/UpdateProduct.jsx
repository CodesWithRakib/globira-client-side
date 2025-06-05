import React, { useEffect } from "react";
import AuthImagePattern from "../components/AuthImagePattern";
import { AiFillProduct } from "react-icons/ai";
import useAxios from "../hooks/useAxios";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import Loading from "../components/Loading";

const UpdateProduct = () => {
  const [isUpdated, setIsUpdated] = React.useState(false);
  const [product, setProduct] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const { id } = useParams();
  const axios = useAxios();

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsUpdated(true);
    const form = event.target;
    const formData = new FormData(form);
    const productInfo = Object.fromEntries(formData.entries());

    axios
      .put(`/api/products/${id}`, productInfo)
      .then((response) => {
        console.log(response.data);
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
    axios
      .get(`/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
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
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
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
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
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
                  <option disabled={true} selected>
                    Pick a category
                  </option>
                  <option>Electronics & Gadgets</option>
                  <option>Home & Kitchen Appliances</option>
                  <option>Fashion & Apparel</option>
                  <option>Health & Beauty</option>
                  <option>Industrial Machinery & Tools</option>
                  <option> Automotive Parts & Accessories</option>
                  <option> Office Supplies & Stationery</option>
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
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
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
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
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
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
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
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
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
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </g>
                  </svg>
                  <input
                    type="number"
                    name="rating"
                    defaultValue={rating}
                    className={`  w-full `}
                    min={1}
                    max={5}
                    placeholder="product rating"
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
