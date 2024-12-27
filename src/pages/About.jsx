import React, { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  User,
  ShoppingBag,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import Searchbar from "../components/Searchbar";
import DocumentationPage from "../components/documentation-page";
import Container from "../components/Container";
import PreLoader from "../components/PreLoader";
import ImageListPage from "../components/ImageList";

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

export default function OppoNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hoveredItem, setHoveredItem] = useState(null);
  const productState = useSelector((state) => state?.product?.product);
  const categoryState = useSelector((state) => state?.pCategory?.pCategories);
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getCategories());
  }, [dispatch]);

  // barosel
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);
  return (
    <>
      <PreLoader />
      {/* <DocumentationPage/> bg-[rgba(246,245,248,0.6)]*/}
      <Container>
  <div className="flex flex-col lg:flex-row gap-8 p-4 bg-white">
    <div className="lg:w-2/5 relative bg-gray-100/50 rounded-2xl">
      <div className="absolute top-4 right-4 bg-black text-white text-sm px-3 py-1 rounded-lg z-10">
        {selectedIndex + 1} / {productState?.length}
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {productState?.map((product) => {
            return (
              <div className="flex-[0_0_100%] min-w-0 relative">
                <div className="flex justify-center items-center">
                  <img
                    src={product?.images?.url}
                    alt="iPad Air"
                    className="w-[732px] p-28 h-[360px] lg:h-[460px] object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-[#e5e5e9] bg-transparent bg-opacity-85 backdrop:blur-xl rounded-full p-2"
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
      >
        <ChevronLeft strokeWidth={2.5} className="w-10 h-10 text-gray-700 hover:text-gray-900" />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#e5e5e9] bg-transparent bg-opacity-85 backdrop:blur-xl rounded-full p-2"
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
      >
        <ChevronRight strokeWidth={2.5} className="w-10 h-10 text-gray-700 hover:text-gray-900" />
      </button>
      <div className="flex justify-center pb-4">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 mx-1 rounded-full ${
              index === selectedIndex ? "bg-black" : "bg-gray-400"
            }`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
    <div className="lg:w-3/5 space-y-4">
      <h2 className="text-2xl font-bold text-gray-700">
        From ₹9317.00/mo. with Instant cashback§§ and No Cost EMI§ or ₹59900.00‡
      </h2>
      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
        Continue
      </button>
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Need a moment?</h3>
        <p className="text-sm text-gray-600 mb-2">
          Keep all your selections by saving this device to Your Saves, then
          come back anytime and pick up right where you left off.
        </p>
        <button
          variant="outline"
          className="text-blue-500 hover:bg-blue-50"
        >
          Save for later
        </button>
      </div>
    </div>
  </div>
</Container>

<Container>
  <ImageListPage/>
</Container>

    </>
  );
}
const psd = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
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
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search OPPO.com"
                  className="bg-gray-100 rounded-full py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <button className="ml-4 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200">
                <User className="h-6 w-6" />
              </button>
              <button className="ml-4 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200">
                <ShoppingBag className="h-6 w-6" />
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
};
