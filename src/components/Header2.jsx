import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, User, ShoppingBag, ChevronDown, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
const navItems = [
  {
    name: "Products",
    // dropdownContent: [{ name: "Reno Series", href: "/smartphones/reno" }],
  },
  {
    name: "Popular Kits",
    // href: "/tablets",
    // dropdownContent: [
    //   { name: "OPPO Pad", href: "/tablets/oppo-pad" },
    //   { name: "OPPO Pad Air", href: "/tablets/oppo-pad-air" },
    // ],
  },
  {
    name: "Category",
    // href: "/about",
    // dropdownContent: [
    //   { name: "Our Story", href: "/about/story" },
    //   { name: "Press & Events", href: "/about/press" },
    // ],
  },
  {
    name: "Helpfull Links",
    dropdownContent: [
      { name: "Knowledge Center hindi", Link: "/knowledge-center/hindi" },
      { name: "Knowledge Center gujarati", Link: "/knowledge-center/gujarati" },
      { name: "Home Remedies hindi", Link: "/home-remedies/hindi" },
      { name: "Home Remedies gujarati", Link: "/home-remedies/gujarati" },
    ],
  },
  {
    name: "Company",
    // href: "/accessories",
    dropdownContent: [
      { name: "Cases & Protection", href: "/accessories/cases" },
      { name: "Chargers & Cables", href: "/accessories/chargers" },
    ],
  },
];

export default function Header2() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hoveredItem, setHoveredItem] = useState(null);
  const productState = useSelector((state) => state?.product?.product);
  const categoryState = useSelector((state) => state?.pCategory?.pCategories);
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="font-bold text-2xl">
                <img
                  alt=""
                  src="./images/logo.png"
                  className="h-[60px] w-auto"
                />
              </Link>
            </div>

            <div className="hidden mt-5 sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-b-2 mb-4 border-transparent text-gray-600 hover:border-black hover:text-black inline-flex items-center px-1 pt-1 text-medium font-normal"
              >
                Home
              </Link>
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    to={item.href}
                    className="border-b-2 border-transparent text-gray-600 hover:border-black hover:text-black inline-flex items-center px-1 pt-1 text-medium font-normal"
                  >
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="sm:ml-6 mt-4 lg:mt-0 sm:flex sm:items-center">
            <div className="flex items-center">
           
              <button className="ml-4 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200">
                <Search className="h-6 w-6" />
              </button>
              <button className="ml-4 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200">
                <Heart className="h-6 w-6" />
              </button>
              <button className="ml-4 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200">
                <ShoppingBag className="h-6 w-6" />
              </button>
              <button className="ml-4 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200">
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {hoveredItem && (
        <div
          className="absolute left-0 w-full bg-gray-100 shadow-lg"
          onMouseEnter={() => setHoveredItem(hoveredItem)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-6 gap-8">
              {navItems
                .find((item) => item?.name === hoveredItem)
                ?.dropdownContent?.map((subItem) => (
                  <Link
                    key={subItem.name}
                    to={subItem.Link}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {subItem.name}
                  </Link>
                ))}
              {/* Merge productState into the dropdown */}
              {hoveredItem === "Products" &&
                productState?.map((product) => {
                  if (product?.tags == "special") {
                    return (
                      <>
                        <div className="flex">
                          <Link
                            key={product._id}
                            to={`/product/${product._id}`}
                          >
                            <div className="flex flex-col items-center">
                              <div className="bg-gray-100 p-4 rounded-lg mb-2">
                                <img
                                  src={product?.images[0]?.url}
                                  alt={product.name}
                                  width={200}
                                  height={200}
                                  className="w-full h-auto"
                                />
                              </div>
                              <h3 className="text-sm font-medium text-center">
                                {product?.title}
                              </h3>
                            </div>
                          </Link>
                        </div>
                      </>
                    );
                  }
                })}
              {hoveredItem === "Popular Kits" &&
                productState?.map((product) => {
                  if (product?.tags == "popular") {
                    return (
                      <Link
                        key={product._id}
                        to={`/product/${product._id}`}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        {product.title}
                      </Link>
                    );
                  }
                })}
              {hoveredItem === "Category" &&
                categoryState?.map((category) => {
                  return (
                    <Link
                      key={category?._id}
                      to={`/category/${category?.title}`}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      {category?.title}
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
