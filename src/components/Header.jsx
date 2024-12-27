import { useState, useEffect, Fragment } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Disclosure,
  Transition,
  TransitionChild,
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import Search from "./Search";
import { GoHeart } from "react-icons/go";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../features/products/productSlice";
import { motion } from "framer-motion";
import triggerNotification from "./Toast";
import { ShiftingDropDown } from "../components/ShiftingDropDown";
// import logo from "/red-blur.png";
import { getCategories } from "../features/pcategory/pcategorySlice";
import {
  ChevronRight,
  X,
  ChevronDown,
  User,
  FileText,
  Star,
  LogOut,
  UserRound,
} from "lucide-react";
import { HiMenuAlt2 } from "react-icons/hi";
import Container from "./Container";
import Searchbar from "./Searchbar";
import { Icon } from "@iconify/react";

export default function Example() {
  const [open, setOpen] = useState(false);
  const authState = useSelector((state) => state.auth);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!authState.user);
  }, [authState.user]);

  // serch start
  const [isOpen, setIsOpen] = useState(false);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const isProductPage = location?.pathname?.startsWith("/product");
  const routes = useSelector((state) => state?.product?.product);
  const categoryState = useSelector((state) => state?.pCategory?.pCategories);
  const cartState = useSelector((state) => state?.auth?.user?.cart);

  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    if (cartState) {
      setCartLength(cartState.length);
    }
  }, [cartState]);
  // Function to filter unique products by product ID
  // const uniqueCartItems = cartState
  //   ? cartState.reduce((acc, current) => {
  //       const isProductInCart = acc.find(
  //         (item) => item.productId === current.productId
  //       );
  //       if (!isProductInCart) {
  //         acc.push(current);
  //       }
  //       return acc;
  //     }, [])
  //   : [];

  // // Calculate the count of unique products
  // const uniqueProductCount = uniqueCartItems.length;

  // cartState ends

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getCategories());
  }, [dispatch]);

  //search fuctionality
  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value) {
      const filtered = routes.filter((route) =>
        route.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRoutes(filtered);
    } else {
      setFilteredRoutes(routes);
    }
  };

  const handleRouteClick = (_id) => {
    setQuery("");
    setFilteredRoutes([]);
    navigate(`/product/${_id}`);
    // window.location.reload();
  };

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "q" && (event.ctrlKey || event.metaKey)) {
        setIsOpen((prevIsOpen) => !prevIsOpen);
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);
  // search ends

  // logout
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    triggerNotification("success", "Logged out successfully");
    navigate("/login");
  };

  // toggle menuitems for mobile
  const [accessoriesOpen, setAccessoriesOpen] = useState(false);
  const [aboutOppoOpen, setAboutOppoOpen] = useState(false);
  const [popularproductopen, setPopulerProductOpen] = useState(false);
  const toggleAccessories = () => setAccessoriesOpen(!accessoriesOpen);
  const toggleAboutOppo = () => setAboutOppoOpen(!aboutOppoOpen);
  const togglePopularProduct = () => setPopulerProductOpen(!popularproductopen);

  // scroll to hide/show header
  // const [showHeader, setShowHeader] = useState(true);
  // const [lastScrollY, setLastScrollY] = useState(0);

  // const controlHeader = () => {
  //   if (window.scrollY > lastScrollY) {
  //     // Scrolling down
  //     setShowHeader(false);
  //   } else {
  //     // Scrolling up
  //     setShowHeader(true);
  //   }
  //   setLastScrollY(window.scrollY);
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", controlHeader);
  //   return () => {
  //     window.removeEventListener("scroll", controlHeader);
  //   };
  // }, [lastScrollY]);
  return (
    <>
      <div
        className={`sticky-header  z-50 bg-white bg-opacity-65 backdrop-blur-2xl`}
        // className={`sticky top-0 bg-white z-50 bg-opacity-65 backdrop-blur-2xl`}
      >
        {/* Mobile menu */}

        <Dialog
          open={open}
          onClose={setOpen}
          className="relative z-50 lg:hidden "
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative flex w-full max-w-xs transform flex-col overflow-y-auto  pb-42 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <div className="max-w-md bg-white bg-opacity-75 backdrop-blur-xl min-h-screen flex flex-col ">
                {/* Header */}
                <nav className="flex justify-between items-center p-4 border-b ">
                  <div className="text-2xl font-medium">Sajivan Ayurveda</div>
                  <button>
                    <X onClick={() => setOpen(false)} className="h-6 w-6" />
                  </button>
                </nav>

                {/* Main content */}
                <main className="flex-1 overflow-y-auto pb-12">
                  <div className="p-4 space-y-4">
                    {/* Expandable sections */}
                    <div className="border-b border-dashed border-gray-400">
                      <button
                        onClick={toggleAccessories}
                        className="w-full flex items-center justify-between py-2"
                      >
                        <div className="flex items-center">
                          {/* First Icon */}
                          <span className="icon-[solar--card-2-bold-duotone] bg-[#808080] h-8 w-8 flex items-center justify-center mr-3"></span>

                          {/* Text */}
                          <h2 className="text-xl">Products</h2>
                        </div>

                        {/* Dropdown Icon */}
                        <span
                          className={`icon-[solar--alt-arrow-down-bold-duotone] bg-[#808080] h-8 w-8 flex items-center justify-center transform transition-transform ${
                            accessoriesOpen ? "rotate-180" : ""
                          }`}
                        ></span>
                      </button>
                      {accessoriesOpen && (
                        <div className="py-2 pl-3 space-y-2">
                          <div className="flex flex-row gap-4 mb-12 overflow-x-auto">
                            {routes?.map((item) => {
                              if (item?.tags == "special") {
                                return (
                                  <div
                                    key={item.name}
                                    className="group relative text-sm"
                                  >
                                    <Link
                                      onClick={() => setOpen(false)}
                                      to={`/product/${item._id}`}
                                    >
                                      <div className="overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75 h-28 w-28">
                                        <img
                                          src={item?.images[0]?.url}
                                          alt={item.title}
                                          className="h-28 w-28 object-fill object-center "
                                        />
                                      </div>

                                      <NavLink
                                        onClick={() => setOpen(false)}
                                        to={`/product/${item._id}`}
                                        className=" mt-2 mx-8 block font-medium text-gray-900 "
                                      >
                                        <span
                                          className="absolute inset-0 z-10"
                                          aria-hidden="true"
                                        />
                                        {item?.title}
                                      </NavLink>
                                    </Link>
                                  </div>
                                );
                              }
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="border-b border-dashed border-gray-400">
                      <button
                        onClick={togglePopularProduct}
                        className="w-full flex justify-between items-center py-2"
                      >
                        <div className="flex items-center">
                          <span class="icon-[solar--list-heart-bold-duotone] bg-[#808080] h-8 w-8 flex items-center justify-center mr-3"></span>
                          <h2 className="text-xl">Popular Kits</h2>
                        </div>
                        <span
                          class={`icon-[solar--alt-arrow-down-bold-duotone] bg-[#808080] h-8 w-8 transform transition-transform ${
                            popularproductopen ? "rotate-180" : ""
                          }`}
                        ></span>
                      </button>
                      {popularproductopen && (
                        <div className="py-2  space-y-2">
                          <div className="flex flex-row gap-4 mb-12 overflow-x-auto">
                            {routes?.map((item) => {
                              if (item?.tags == "popular") {
                                return (
                                  <div
                                    key={item._id}
                                    className="group relative text-sm"
                                  >
                                    <Link
                                      onClick={() => setOpen(false)}
                                      to={`/product/${item._id}`}
                                    >
                                      <div className="overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75 h-28 w-32">
                                        <img
                                          src={item?.images[0]?.url}
                                          alt={item.title}
                                          className="h-28 w-32 object-fill object-center "
                                        />
                                      </div>

                                      <NavLink
                                        onClick={() => setOpen(false)}
                                        to={`/product/${item?._id}`}
                                        className=" mt-2 mx-8 block font-medium text-gray-900 "
                                      >
                                        <span
                                          className="absolute inset-0 z-10"
                                          aria-hidden="true"
                                        />
                                        {item?.title}
                                      </NavLink>
                                    </Link>
                                  </div>
                                );
                              }
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="border-b border-dashed border-gray-400">
                      <button
                        onClick={toggleAboutOppo}
                        className="w-full flex justify-between items-center py-2"
                      >
                        <div className="flex items-center">
                          <span class="icon-[solar--widget-2-bold-duotone] bg-[#808080] h-8 w-8 flex items-center justify-center mr-3"></span>
                          <h2 className="text-xl">Category</h2>
                        </div>

                        <span
                          className={`icon-[solar--alt-arrow-down-bold-duotone] bg-[#808080] h-8 w-8 transform transition-transform ${
                            aboutOppoOpen ? "rotate-180" : ""
                          }`}
                        ></span>
                      </button>
                      {aboutOppoOpen && (
                        <div className="py-2  space-y-2">
                          <div className="flex flex-row gap-4 mb-12 overflow-x-auto">
                            {categoryState?.map((item) => (
                              <div
                                key={item._id}
                                className="group relative text-sm"
                              >
                                <Link
                                  onClick={() => setOpen(false)}
                                  to={`/category/${item.title}`}
                                >
                                  <div className="overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75 h-32 w-32">
                                    <img
                                      src={item?.images[0]?.url}
                                      alt={item.title}
                                      className="h-32 w-32 object-fill object-center "
                                    />
                                  </div>

                                  <NavLink
                                    onClick={() => setOpen(false)}
                                    to={`/category/${item.title}`}
                                    className=" mt-2 mx-8 block font-medium text-gray-900 "
                                  >
                                    <span
                                      className="absolute inset-0 z-10"
                                      aria-hidden="true"
                                    />
                                    {item?.title}
                                  </NavLink>
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Menu items */}
                    <div className="bg-transparent  rounded-lg p-4 space-y-4">
                      {[
                        "Home",
                        "Download Store APP",
                        "Support",
                        "Community",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex justify-between items-center py-2 border-b border-dashed border-gray-400"
                        >
                          <span className="text-lg">{item}</span>
                          <span class="icon-[solar--forward-bold-duotone] h-8 w-8 text-[#808080]"></span>
                        </div>
                      ))}
                    </div>

                    {/* User section */}
                    <div className="bg-transparent shadow-new-shadow rounded-3xl p-4">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className=" ">
                          <span
                            class="icon-[solar--user-circle-bold-duotone] h-14 w-14"
                            style={{ color: "#808080" }}
                          ></span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">
                            Hi, {authState?.user?.firstname || "Friend"}
                          </h3>
                          <div className="space-x-3 ">
                            <Link to="/signup" className="text-gray-600 underline">
                              Sign up
                            </Link>
                            <Link to="/login" className="text-gray-600 underline">
                              Sign in
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-6 ">
                        {isLoggedIn ? (
                          <>
                            <div className="flex justify-between items-center">
                              <Link to="/profile" onClick={() => setOpen(false)}>
                              <div className="flex items-center space-x-2">
                                <span
                                  class="icon-[solar--user-id-bold-duotone] h-8 w-8"
                                  style={{ color: "#808080" }}
                                ></span>
                                <span>Profile</span>
                              </div>
                              </Link>
                              <ChevronRight className="h-5 w-5" />
                            </div>
                            <div className="flex justify-between items-center">
                              <Link
                                to="/my-orders"
                                onClick={() => setOpen(false)}
                              >
                                <div className="flex items-center space-x-2">
                                  <span
                                    class="icon-[solar--clipboard-text-bold-duotone] h-8 w-8"
                                    style={{ color: "#808080" }}
                                  ></span>

                                  <span>Orders</span>
                                </div>
                              </Link>
                              <ChevronRight className="h-5 w-5" />
                            </div>
                            <div className="flex justify-between items-center">
                              <div
                                className="flex items-center space-x-2"
                                onClick={handleLogout}
                              >
                                <span class="icon-[solar--logout-3-bold-duotone] h-8 w-8 bg-[#808080] "></span>

                                <span>Logout</span>
                              </div>
                              <ChevronRight className="h-5 w-5" />
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </main>

                {/* Footer */}
                {/* <footer className="p-4">
                  <button className="w-full border border-black rounded-full py-2 px-4 text-center">
                    Download As A App
                  </button>
                </footer> */}
              </div>
            </DialogPanel>
          </div>
        </Dialog>
        {/* <Container className=""> */}
        <header className="relative z-50  ">
          {/* <p className="flex h-10 items-center justify-center bg-green-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
              Get free delivery on orders over $100
            </p> */}

          <nav
            aria-label="Top"
            className="  border-b border-gray-100 px-4 sm:px-6 lg:px-8"
          >
            <div className="">
              <div className="flex h-14 items-center">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="relative rounded-md bg-transparent p-2 text-gray-400 lg:hidden"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open menu</span>
                  <HiMenuAlt2
                    aria-hidden="true"
                    className="h-7 w-7 text-gray-400"
                  />
                </button>

                {/* Logo */}
                <div className="ml-4 flex lg:ml-0">
                  <Link to="/">
                    <span className="sr-only fixed">Sajivan Ayurveda</span>
                    <img
                      alt=""
                      // src={logo}
                      src={"/logo.png"}
                      className="h-[60px] w-auto"
                    />
                  </Link>
                  <span className=" text-xs mt-2 ">BETA</span>
                </div>

                {/* Flyout menus */}
                <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                  <div className="flex h-full space-x-8">
                    {/* {navigation.categories.map((category) => (
                        <Popover key={category.name} className="flex">
                          <div className="relative flex">
                            <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-green-600 data-[open]:text-green-600">
                              {category.name}
                            </PopoverButton>
                          </div>

                          <PopoverPanel
                            transition
                            className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                          >
                            Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 top-1/2 bg-white shadow"
                            />

                            <div className="relative bg-white">
                              <div className="mx-auto max-w-7xl px-8">
                                <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                  <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                    {category.featured.map((item) => (
                                      <div
                                        key={item.name}
                                        className="group relative text-base sm:text-sm"
                                      >
                                        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                          <img
                                            alt={item.imageAlt}
                                            src={item.imageSrc}
                                            className="object-cover object-center"
                                          />
                                        </div>
                                        <a
                                          href={item.href}
                                          className="mt-6 block font-medium text-gray-900"
                                        >
                                          <span
                                            aria-hidden="true"
                                            className="absolute inset-0 z-10"
                                          />
                                          {item.name}
                                        </a>
                                        <p aria-hidden="true" className="mt-1">
                                          Shop now
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                    {category.sections.map((section) => (
                                      <div key={section.name}>
                                        <p
                                          id={`${section.name}-heading`}
                                          className="font-medium text-gray-900"
                                        >
                                          {section.name}
                                        </p>
                                        <ul
                                          role="list"
                                          aria-labelledby={`${section.name}-heading`}
                                          className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                        >
                                          {section.items.map((item) => (
                                            <li
                                              key={item.name}
                                              className="flex"
                                            >
                                              <a
                                                href={item.href}
                                                className="hover:text-gray-800"
                                              >
                                                {item.name}
                                              </a>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </PopoverPanel>
                        </Popover>
                      ))} */}

                    <NavLink
                      to={"/"}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 ml-4"
                    >
                      Home
                    </NavLink>

                    <div className="navigation hide no-scrollbar">
                      <li>
                        <button className="btns text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-300">
                          Products
                          <svg
                            aria-hidden="true"
                            height="16"
                            viewBox="0 0 16 16"
                            version="1.1"
                            width="16"
                          >
                            <path d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z"></path>
                          </svg>
                        </button>
                        <div class="dropdown__wrapper">
                          <div class="dropdown  shadow-new-shadow">
                            <div className="list-items-with-description ">
                              {routes?.length ? (
                                routes.map((item) => {
                                  if (item?.tags == "special") {
                                    return (
                                      <li
                                        key={item._id}
                                        onClick={() =>
                                          handleRouteClick(item?._id)
                                        }
                                        className="cursor-pointer flex items-center space-x-3 p-2 hover:bg-gray-100 rounded"
                                      >
                                        <img
                                          src={item?.images?.[0]?.url || " "}
                                          className="h-12 w-12 rounded-xl"
                                          alt={item?.title || "Default Image"}
                                          // onError={(e) => {
                                          //   e.target.src = defaultImageUrl; // Fallback image on error
                                          // }}
                                        />
                                        <div className="item-title">
                                          <h3>{item?.title || "Untitled"}</h3>
                                          {/* <p>
                                            {item?.category || "No Category"}
                                          </p> */}
                                        </div>
                                      </li>
                                    );
                                  }
                                })
                              ) : (
                                <li className="text-center text-gray-500">
                                  No items available
                                </li>
                              )}
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button className="btns text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-300">
                          Popular Kits
                          <svg
                            aria-hidden="true"
                            height="16"
                            viewBox="0 0 16 16"
                            version="1.1"
                            width="16"
                          >
                            <path d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z"></path>
                          </svg>
                        </button>
                        <div class="dropdown__wrapper ">
                          <div class="dropdown  shadow-new-shadow">
                            <div class="list-items-with-description ">
                              {routes?.length > 0 ? (
                                routes?.map((item) => {
                                  if (item?.tags == "popular") {
                                    return (
                                      <Link
                                        to={`/product/${item?._id}`}
                                        key={item._id}
                                      >
                                        <li
                                          // onClick={() => handleRouteClick(item._id)}
                                          className="cursor-pointer flex items-center space-x-3 p-2 hover:bg-gray-100 rounded"
                                        >
                                          <img
                                            src={
                                              item?.images?.[0]?.url || " "
                                              // defaultImageUrl
                                            }
                                            className="h-12 w-12 rounded-xl"
                                            alt={item?.title || "Default Image"}
                                            // onError={(e) => {
                                            //   e.target.src = defaultImageUrl; // Fallback image on error
                                            // }}
                                          />
                                          <div className="item-title">
                                            <h3>{item?.title || "Untitled"}</h3>
                                            {/* <p>{item?.category || "No Category"}</p> */}
                                          </div>
                                        </li>
                                      </Link>
                                    );
                                  }
                                })
                              ) : (
                                <li className="text-center text-gray-500">
                                  No items available
                                </li>
                              )}
                            </div>
                            {/* <div className="border-t border-gray-200 mx-4 mt-3">
                                <div className="flex justify-center align-middle items-center my-3 bg-green-800 text-white text-md mx-48 p-2 border-2 border-gray-200 rounded-3xl hover:shadow-md">
                                  View All
                                </div>
                              </div> */}
                          </div>
                        </div>
                      </li>
                      <li>
                        <button className="btns text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-300">
                          Category
                          <svg
                            aria-hidden="true"
                            height="16"
                            viewBox="0 0 16 16"
                            version="1.1"
                            width="16"
                          >
                            <path d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z"></path>
                          </svg>
                        </button>
                        <div class="dropdown__wrapper ">
                          <div class="dropdown shadow-new-shadow">
                            <div class="list-items-with-description ">
                              {categoryState?.length > 0 ? (
                                categoryState?.map((item) => (
                                  <Link
                                    to={`/category/${item?.title}`}
                                    key={item._id}
                                  >
                                    <li
                                      // onClick={() => handleRouteClick(item._id)}
                                      className="cursor-pointer flex items-center space-x-3 p-2 hover:bg-gray-100 rounded"
                                    >
                                      <img
                                        src={
                                          item?.images?.[0]?.url || " "
                                          // defaultImageUrl
                                        }
                                        className="h-12 w-12 rounded-xl"
                                        alt={item?.title || "Default Image"}
                                        // onError={(e) => {
                                        //   e.target.src = defaultImageUrl; // Fallback image on error
                                        // }}
                                      />
                                      <div className="item-title">
                                        <h3>{item?.title || "Untitled"}</h3>
                                        {/* <p>{item?.category || "No Category"}</p> */}
                                      </div>
                                    </li>
                                  </Link>
                                ))
                              ) : (
                                <li className="text-center text-gray-500">
                                  No items available
                                </li>
                              )}
                            </div>
                            {/* <div className="border-t border-gray-200 mx-4 mt-3">
                                <div className="flex justify-center align-middle items-center my-3 bg-green-800 text-white text-md mx-48 p-2 border-2 border-gray-200 rounded-3xl hover:shadow-md">
                                  View All
                                </div>
                              </div> */}
                          </div>
                        </div>
                      </li>

                      <li>
                        <button className="btns text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-300">
                          Helpfull Links
                          <svg
                            aria-hidden="true"
                            height="16"
                            viewBox="0 0 16 16"
                            version="1.1"
                            width="16"
                          >
                            <path d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z"></path>
                          </svg>
                        </button>
                        <div class="dropdown__wrapper">
                          <div class="dropdown shadow-new-shadow">
                            <div className="list-items-with-description ">
                              <li className="cursor-pointer flex items-center space-x-3 p-2 hover:bg-gray-100 rounded">
                                <div className="item-title">
                                  <h3>{"Knowledge Center"}</h3>
                                  <p>{"Hindi"}</p>
                                </div>
                              </li>
                              <Link to="/knowledge-center/gujarati">
                                <li className="cursor-pointer flex items-center space-x-3 p-2 hover:bg-gray-100 rounded">
                                  <div className="item-title">
                                    <h3>{"Knowledge Center"}</h3>
                                    <p>{"Gujarati"}</p>
                                  </div>
                                </li>
                              </Link>
                              <Link to="/home-remedies/gujarati">
                                <li className="cursor-pointer flex items-center space-x-3 p-2 hover:bg-gray-100 rounded">
                                  <div className="item-title">
                                    <h3>{"Home Remedies"}</h3>
                                    <p>{"Hindi"}</p>
                                  </div>
                                </li>
                              </Link>
                              <Link to="/home-remedies/gujarati">
                                <li className="cursor-pointer flex items-center space-x-3 p-2 hover:bg-gray-100 rounded">
                                  <div className="item-title">
                                    <h3>{"Home Remedies"}</h3>
                                    <p>{"Gujarati"}</p>
                                  </div>
                                </li>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button className="btns text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-300">
                          Company
                          <svg
                            aria-hidden="true"
                            height="16"
                            viewBox="0 0 16 16"
                            version="1.1"
                            width="16"
                          >
                            <path d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z"></path>
                          </svg>
                        </button>
                        <div class="dropdown__wrapper">
                          <div class="dropdown shadow-new-shadow">
                            <div className="list-items-with-description ">
                              <Link to="/terms-condition">
                                <li className="cursor-pointer flex items-center space-x-3 p-2 py-2 hover:bg-gray-100 rounded">
                                  <div className="item-title">
                                    <h3>{"Terms & Conditions"}</h3>
                                    {/* <p>{"Gujarati"}</p> */}
                                  </div>
                                </li>
                              </Link>
                              <Link to="/privacy-policy">
                                <li className="cursor-pointer flex items-center space-x-3 p-2 py-2 hover:bg-gray-100 rounded">
                                  <div className="item-title">
                                    <h3>{"Privacy Policy"}</h3>
                                    {/* <p>{"Gujarati"}</p> */}
                                  </div>
                                </li>
                              </Link>
                              <Link to="/refunds-cancellation">
                                <li className="cursor-pointer flex items-center space-x-3 p-2 py-2 hover:bg-gray-100 rounded">
                                  <div className="item-title">
                                    <h3>{"Refund & Cancellation policy"}</h3>
                                    {/* <p>{"Gujarati"}</p> */}
                                  </div>
                                </li>
                              </Link>
                              <Link to="/about-us">
                                <li className="cursor-pointer flex items-center space-x-3 p-2 py-2 hover:bg-gray-100 rounded">
                                  <div className="item-title">
                                    <h3>{"About Us"}</h3>
                                    {/* <p>{"Gujarati"}</p> */}
                                  </div>
                                </li>
                              </Link>
                              <Link to="/contactus">
                                <li className="cursor-pointer flex items-center space-x-3 p-2 py-2 hover:bg-gray-100 rounded">
                                  <div className="item-title">
                                    <h3>{"Contact Us"}</h3>
                                    {/* <p>{"Gujarati"}</p> */}
                                  </div>
                                </li>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </li>
                      {/* <li>
                     <NavLink
                  to="./shop">
                        <div className=" pl-1 font-medium text-sm text-gray-700 hover:text-gray-800 imp" >
                            All Products
                        </div>
                        </NavLink>
                    </li>
                    <li>
                    <NavLink
                  to="./shufflehero">
                        <div className="pl-1 font-medium text-sm text-gray-700 hover:text-gray-800 imp" >
                           Pricing
                        </div>
                        </NavLink>
                    </li> */}
                    </div>
                    {/* <ShiftingDropDown /> */}
                  </div>
                </PopoverGroup>

                <div className="ml-auto flex items-center">
                  {/* Search */}
                  <div className="flex lg:ml-4 z-50">
                    {/* <Searchbar/> */}
                    <a
                      onClick={() => setIsOpen(true)}
                      className="p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Search</span>

                      <span class="icon-[solar--card-search-bold-duotone]  h-8 w-8 mt-2"></span>
                    </a>
                  </div>
                  {/* serach model */}

                  <div className="z-50">
                    <Transition show={isOpen} as={Fragment}>
                      <Dialog
                        className="z-50 fixed inset-0 pt-[20vh] p-4 overflow-y-auto"
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                      >
                        <TransitionChild
                          as="div"
                          enter="ease-out duration-300"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="ease-in"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <div className="fixed inset-0 bg-muted/40 backdrop-blur-sm" />
                        </TransitionChild>
                        <TransitionChild
                          as="div"
                          enter="transition ease-in-out"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="transition ease-in-out"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <Combobox
                            as="div"
                            className="relative rounded-2xl shadow-2xl ring-1 ring-black/5 max-w-md mx-auto bg-white divide-y divide-gray-100 overflow-hidden"
                            value={filteredRoutes}
                            onClose={() => setQuery("")}
                            onChange={(route) => {
                              handleRouteClick(route._id);
                              setIsOpen(false);
                            }}
                          >
                            <div className="flex items-center px-4">
                              <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
                              <ComboboxInput
                                aria-label="Search"
                                onChange={handleInputChange}
                                value={query}
                                className="w-full bg-transparent border-0 focus:ring-0 text-lg text-gray-800 placeholder:text-gray-400 h-12"
                                placeholder="Search for products..."
                              />
                              <button
                                className="ml-2 text-black"
                                onClick={() => setIsOpen(false)}
                              >
                                Cancel
                              </button>
                            </div>
                            {filteredRoutes?.length > 0 ? (
                              <ComboboxOptions className="py-4 text-lg max-h-84 overflow-auto">
                                {filteredRoutes &&
                                  filteredRoutes?.map((route) => (
                                    <ComboboxOption
                                      key={route._id}
                                      className={({ active }) =>
                                        `px-4 cursor-pointer ${
                                          active ? "bg-gray-100" : ""
                                        }`
                                      }
                                      value={route}
                                    >
                                      <div
                                        className="space-x-1 px-2 py-2  hover:bg-gray-100"
                                        onClick={() =>
                                          handleRouteClick(route?._id)
                                        }
                                      >
                                        <div className="flex">
                                          <img
                                            src={route?.images[0]?.url}
                                            className="h-12 w-12 rounded-lg"
                                            alt={route.title}
                                          />
                                          <span className="text-md font-medium text-gray-900 mx-2">
                                            {route.title}
                                          </span>
                                        </div>
                                      </div>
                                    </ComboboxOption>
                                  ))}
                              </ComboboxOptions>
                            ) : (
                              <p className="p-4 flex justify-center">
                                No Result Found
                              </p>
                            )}
                          </Combobox>
                        </TransitionChild>
                      </Dialog>
                    </Transition>
                  </div>

                  {/* Wishlist */}
                  <div className="flex lg:ml-6">
                    <NavLink
                      to="/wishlist"
                      className="p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Search</span>
                      {/* <GoHeart aria-hidden="true" className="h-6 w-6" /> */}

                      <span class="icon-[solar--hearts-bold-duotone] h-7 w-7 mt-2"></span>

                      {/* <GoHeartFill /> */}
                    </NavLink>
                  </div>

                  {/* Cart */}
                  <div className="mx-2 flow-root lg:ml-4">
                    <NavLink
                      to="/cart"
                      className="group -m-2 flex items-center p-2"
                    >
                      <span class="icon-[solar--bag-bold-duotone] h-7 w-7 text-gray-400  group-hover:text-gray-500"></span>
                      {/* <span class="icon-[solar--bag-smile-line-duotone] h-7 w-7 text-gray-400  group-hover:text-gray-500"></span> */}
                      {/* {cartState?.length} */}
                      <div className="relative">
                        {/* <span class="icon-[solar--bag-smile-line-duotone] h-7 w-7 text-gray-400  group-hover:text-gray-500"></span> */}
                        <span className="absolute -top-3.5 -right-1 bg-green-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                          {cartLength}{" "}
                          {/* {uniqueProductCount ? uniqueProductCount : 0} */}
                        </span>
                      </div>
                      {/* <span className="absolute mt-1 ml-[10px] text-xs font-medium text-gray-700 group-hover:text-gray-800">
                       
                        {uniqueProductCount ? uniqueProductCount : 0}
                      </span> */}
                      <span className="sr-only">items in cart, view bag</span>
                    </NavLink>
                  </div>

                  <Menu
                    as="div"
                    className="relative text-left ml-2 lg:block hidden"
                  >
                    <div>
                      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 px-3 py-2 text-sm font-semibold text-gray-400 hover:text-gray-500">
                        <span className="icon-[solar--user-bold-duotone] h-7 w-7"></span>
                      </MenuButton>
                    </div>

                    <MenuItems className="absolute right-0 z-10 mt-6 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                      <div className="py-1">
                        {isLoggedIn ? (
                          <>
                            <MenuItem>
                              <NavLink className="block w-full px-4 py-2 text-left text-md text-gray-700 data-[focus]:bg-green-600 data-[focus]:text-white">
                                Welcome{" "}
                                {authState.user.firstname +
                                  " " +
                                  authState.user.lastname}
                                <span className="text-[12px]">
                                  {" "}
                                  {authState.user.email}
                                </span>
                              </NavLink>
                            </MenuItem>
                            <MenuItem>
                              <NavLink
                                to="/profile"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-green-600 data-[focus]:text-white"
                              >
                                Profile
                              </NavLink>
                            </MenuItem>
                            <MenuItem>
                              <NavLink
                                to="/my-orders"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-green-600 data-[focus]:text-white"
                              >
                                Orders
                              </NavLink>
                            </MenuItem>
                            <MenuItem>
                              <button
                                onClick={handleLogout}
                                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-green-600 data-[focus]:text-white"
                              >
                                Log out
                              </button>
                            </MenuItem>
                          </>
                        ) : (
                          <>
                            <MenuItem>
                              <NavLink
                                to="/signup"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-green-600 data-[focus]:text-white"
                              >
                                Create account
                              </NavLink>
                            </MenuItem>
                            <MenuItem>
                              <NavLink
                                to="/login"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-green-600 data-[focus]:text-white"
                              >
                                Log in
                              </NavLink>
                            </MenuItem>
                          </>
                        )}
                      </div>
                    </MenuItems>
                  </Menu>
                </div>
              </div>
            </div>
          </nav>
        </header>
        {/* </Container> */}
      </div>
    </>
  );
}
