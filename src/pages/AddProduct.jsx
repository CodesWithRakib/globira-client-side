import React, { use, useState } from "react";
import AuthImagePattern from "../components/AuthImagePattern";
import { AiFillProduct } from "react-icons/ai";
import useAxios from "../hooks/useAxios";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { AuthContext } from "../Auth/AuthProvider";

const AddProduct = () => {
  const [isAdded, setIsAdded] = useState(false);

  const axiosSecure = useAxios();
  const { user } = use(AuthContext);

  const productContent = {
    electronics: `Includes:
- Device unit
- Charging cable
- User manual
- Warranty card

Features:
- Latest Bluetooth/Wi-Fi connectivity
- Long-lasting battery life
- High-definition display

Care Instructions:
- Keep away from water and moisture
- Use original charger only
- Clean screen with microfiber cloth`,

    home: `Includes:
- Appliance unit
- User manual
- Warranty card

Features:
- Energy-efficient technology
- Easy-to-use controls
- Safety-certified

Care Instructions:
- Clean regularly with a soft cloth
- Follow manufacturer maintenance guidelines
- Keep away from flammable materials`,

    fashion: `Materials:
- Premium cotton/polyester blend
- Eco-friendly dyes

Features:
- Comfortable fit
- Breathable fabric
- Machine washable

Care Instructions:
- Machine wash cold with similar colors
- Do not bleach
- Tumble dry low or air dry`,

    industrial: `Includes:
- Main machine unit
- Instruction manual
- Safety gear (where applicable)

Features:
- Heavy-duty performance
- High precision and durability
- Suitable for industrial use

Safety Instructions:
- Always wear protective gear during operation
- Follow all safety instructions provided
- Keep out of reach of children
- Regular maintenance required for optimal performance`,

    health: `Includes:
- Skincare and wellness products
- Dermatologist tested items

Features:
- Natural ingredients
- Hypoallergenic formulas
- Suitable for sensitive skin

Care Instructions:
- Store in a cool, dry place
- Avoid direct sunlight
- Follow usage guidelines on packaging`,

    automotive: `Includes:
- Car parts and accessories
- Installation manuals where applicable

Features:
- Durable and OEM certified
- Designed for easy installation
- Warranty included on selected items

Safety Instructions:
- Professional installation recommended
- Follow safety guidelines during use
- Keep away from children`,

    office: `Includes:
- Stationery items like pens, papers, organizers
- Office supplies essentials

Features:
- Eco-friendly materials
- Durable and reliable
- Suitable for office and home use

Usage Tips:
- Store in a dry, organized place
- Recycle paper products responsibly`,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsAdded(true);
    const form = event.target;
    const formData = new FormData(form);
    const productInfo = Object.fromEntries(formData.entries());
    productInfo.email = user.email;
    productInfo.sellerName = user.displayName;
    productInfo.sellerPhotoURL = user.photoURL;

    const selectedCategory = productInfo.category.split("-")[0];
    productInfo.productContent = productContent[selectedCategory] || "";

    axiosSecure
      .post("/api/products", productInfo)
      .then(() => {
        toast.success("Product added successfully!");
        setIsAdded(false);
        form.reset();
      })
      .catch((error) => {
        toast.error("Product add failed!");
        console.log(error);
        setIsAdded(false);
      });
  };
  return (
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
              <h1 className="text-2xl font-bold mt-2">Add Product</h1>
              <p className="text-base-content/60">
                Add a new product to your store
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
                    className={`  w-full `}
                    placeholder="Brand Name"
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
                    name="productName"
                    className={`  w-full `}
                    placeholder="Product Name"
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
                  defaultValue="Pick a category"
                  className="select w-full"
                  name="category"
                  required
                >
                  <option value="" disabled>
                    Pick a category
                  </option>
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
                    name="productImage"
                    className={`  w-full `}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </label>
                <div className="validator-hint hidden">
                  Enter valid product image
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
                <legend className="fieldset-legend">
                  Minimum Selling Quantity
                </legend>

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
                    name="minimumQuantity"
                    className={`  w-full `}
                    placeholder="minimum  selling quantity "
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
                    className={`  w-full `}
                    min="1"
                    max="5"
                    step="1"
                    placeholder="maximum 1 - 5"
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
                  className="textarea w-full h-24"
                  placeholder="Product description"
                ></textarea>
              </div>
            </fieldset>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isAdded}
            >
              {isAdded ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Product"
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

export default AddProduct;
