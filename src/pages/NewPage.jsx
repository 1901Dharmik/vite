
import { useEffect, useState } from "react";
import {
  Heart,
  Grid,
  Grid3X3,
  Table,
  List,
  Star,
  ShoppingCart,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";
import Containers from "../components/Container";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const pageTransition = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
export default function NewPage() {
  const [layout, setLayout] = useState("3-col");

  const getGridClass = () => {
    switch (layout) {
      case "1-col":
        return "grid-cols-1";
      case "2-col":
        return "grid-cols-1 md:grid-cols-2 css-line-clamp-3";
      case "3-col":
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case "4-col":
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    }
  };

  const dispatch = useDispatch();
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [tag, setTag] = useState(null);
  const [category, setCategory] = useState(null);
  const [brand, setBrand] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);

  const productState = useSelector((state) => state.product.product);
  console.log("Product state", productState);
  

  useEffect(() => {
    getProducts();
  }, [sort, tag, brand, category, minPrice, maxPrice]);

  useEffect(() => {
    let newBrand = [];
    let newCategory = [];
    let newTags = [];
    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      newBrand.push(element.brand);
      newCategory.push(element.category);
      newTags.push(element.tags);
    }
    setBrands(newBrand);
    setCategories(newCategory);
    setTags(newTags);
  }, [productState]);

  const getProducts = () => {
    dispatch(
      getAllProducts({ sort, tag, brand, category, minPrice, maxPrice })
    );
  };

  const getRandomProducts = (num) => {
    const shuffled = [...productState].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const randomProducts = getRandomProducts(2);

  const resetFilters = () => {
    setTag(null);
    setCategory(null);
    setBrand(null);
    setMinPrice(null);
    setMaxPrice(null);
    setSort(null);
  };

  const handleTagClick = (selectedTag) => {
    setTag(tag === selectedTag ? null : selectedTag);
  };

  const handleCategoryClick = (selectedCategory) => {
    setCategory(category === selectedCategory ? null : selectedCategory);
  };

  const cancelCategoryFilter = () => {
    setCategory(null);
  };

  const handleBrandClick = (selectedBrand) => {
    setBrand(brand === selectedBrand ? null : selectedBrand);
  };

  return (
    <Containers>
      <div className="bg-gray-100">
        <div className="container mx-auto p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Sidebar */}

            {/* Sidebar content */}
            <div className="w-full md:w-1/4 rounded-xl">
              <div className="bg-white p-4 rounded-xl mb-4">
                <h2 className="text-xl font-semibold mb-4">
                  Shop By Categories
                </h2>
                <ul className="mb-8">
                  <li className="mb-2">Digestive Care</li>
                  <li className="mb-2">Piles Care</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-xl mb-4">
                <h3 className="text-xl font-semibold mb-4">Filter By</h3>
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Price</h4>
                  <div className="flex gap-2">
                    <input
                      placeholder="From"
                      className="w-1/2 border border-gray-300 rounded p-2"
                    />
                    <input
                      placeholder="To"
                      className="w-1/2 border border-gray-300 rounded p-2"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium mb-2">Availability</h4>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="in-stock"
                      className="form-checkbox"
                    />
                    <label htmlFor="in-stock" className="ml-2">
                      In stock (22)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="out-of-stock"
                      className="form-checkbox"
                    />
                    <label htmlFor="out-of-stock" className="ml-2">
                      Out of stock (1)
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium mb-4">Product Tags</h4>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "Popular",
                      "Special",
                      "Special",
                      "Special",
                      "Special",
                      "Special",
                    ].map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100  px-3 py-1.5 rounded-xl text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Product Brands</h4>
                  <div>Sajivan Ayurveda</div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="w-full md:w-3/4">
              <div className="flex justify-between items-center mb-4 bg-white p-2 rounded-xl px-2">
                <div className="flex items-center">
                  <span className="mx-2 font-medium text-lg">All Products</span>
                  <span className="mx-2">Sort By:</span>
                  <select
                    className="border border-gray-300 rounded-xl p-2 w-[220px]"
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="az">Alphabetically, A-Z</option>
                    <option value="za">Alphabetically, Z-A</option>
                    <option value="low-high">Price, low to high</option>
                    <option value="high-low">Price, high to low</option>
                  </select>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    className="border border-gray-300 bg-white text-gray-700 py-2 px-4 rounded-xl"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </button>

                  <div className="flex gap-2">
                    <button
                      className={`p-2 rounded ${
                        layout === "1-col"
                          ? "bg-gray-200 rounded-xl"
                          : "border border-gray-300 rounded-xl"
                      }`}
                      onClick={() => setLayout("1-col")}
                    >
                      <List className="h-4 w-4" />
                    </button>
                    <button
                      className={`p-2 rounded ${
                        layout === "2-col"
                          ? "bg-gray-200 rounded-xl"
                          : "border border-gray-300 rounded-xl"
                      }`}
                      onClick={() => setLayout("2-col")}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      className={`p-2 rounded ${
                        layout === "3-col"
                          ? "bg-gray-200 rounded-xl"
                          : "border border-gray-300 rounded-xl"
                      }`}
                      onClick={() => setLayout("3-col")}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </button>
                    <button
                      className={`p-2 rounded ${
                        layout === "4-col"
                          ? "bg-gray-200 rounded-xl"
                          : "border border-gray-300 rounded-xl"
                      }`}
                      onClick={() => setLayout("4-col")}
                    >
                      <Table className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className={`grid ${getGridClass()} gap-4`}>
                {productState?.map((product) => (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={pageTransition}
                    key={product._id}
                  >
                    <Link to={`/product/${product._id}`}>
                      <div
                        className={`${
                          layout === "1-col" || layout === "2-col"
                            ? "grid grid-cols-3"
                            : ""
                        } rounded-xl overflow-hidden bg-white hover:shadow-new-shadow`}
                      >
                        <div className="p-3 flex-shrink-0 w-full  col-span-1">
                          <div className="relative">
                            <img
                              src={product?.images[0]?.url}
                              alt="Product"
                              className={`w-full h-48 object-cover rounded-lg
                              ${layout === "1-col" ? "h-60" : ""}`}
                            />
                            <button className="absolute top-2 right-2 p-1 bg-white rounded-full">
                              <Heart className="h-4 w-4 text-gray-500" />
                            </button>
                          </div>
                        </div>
                        <div className="p-3 flex-grow w-full col-span-2">
                          <div className="text-sm text-orange-800 mb-1">
                            Sajivan Ayurveda
                          </div>
                          <h3 className="text-lg font-semibold mb-1">
                            {product?.title}
                          </h3>
                          <p
                            className={`description ${
                              layout === "1-col" ? "block" : "hidden"
                            }`}
                            dangerouslySetInnerHTML={{
                              __html: product?.description,
                            }}
                          ></p>
                          {/* <p className={`text-sm ${
                          layout === "2-col" ? "block  " : "hidden"
                        }`}>{ReactHtmlParser(product?.description)}</p> */}

                          <div className="flex items-center mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className="text-yellow-400 text-lg"
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <div className="font-bold">₹ {product?.price}</div>
                          <li
                            className={`flex list-none my-1
                          ${layout === "4-col" ? "hidden" : "block"}`}
                          >
                            <span className="font-light text-[15px] text-green-800  ml-1">
                              Care For
                            </span>
                            {product?.care_for.map((item, index) => {
                              return (
                                <span
                                  key={item}
                                  className="text-[15px] font-light pl-2 mb-4 truncate"
                                >
                                  {item}
                                  {index !== item?.care_for?.length - 1 && ", "}
                                </span>
                              );
                            })}
                          </li>
                          {/* <div className="flex justify-end items-end max-w-xs gap-2">
                            <button
                              className="flex-1 bg-[#318e4c] text-white p-2 rounded-full "
                              onClick={() => console.log("Add to Wishlist")}
                            >
                              Wishlist
                            </button>
                            <button
                              className="flex-1 bg-[#206c43] text-white p-2 rounded-full"
                              onClick={() => console.log("Add to Cart")}
                            >
                              Add to Cart
                            </button>
                          </div> */}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Containers>
  );
}
