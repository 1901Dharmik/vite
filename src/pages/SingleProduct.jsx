import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Modal } from "flowbite-react";
import ProductCard from "../components/ProductCard";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { addToWishlist } from "../features/products/productSlice";

// import watch from "../images/watch.jpg";
import moment from "moment";
import Container from "../components/Container";
import {
  addRating,
  getAllProducts,
  getAProduct,
} from "../features/products/productSlice";
import Marquee from "../components/Marquee";
import "../components/EmbalCarousel/EmbalaCarousel";
import "../components/EmbalCarousel/embala.css";
import EmblaCarousel from "../components/EmbalCarousel/EmbalaCarousel";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Star,
  Home,
  Share2,
  RefreshCcw,
  MoreVertical,
  MessageCircle,
  ShoppingCart,
  Headset,
  ChevronDown,
  X,
  Calendar,
  Clock,
  Utensils,
  Plus,
  Minus,
  HeartIcon,
  ArrowRight,
} from "lucide-react";
import ProductCarousel from "../components/ProductCarousel";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addProdToCart, getUserCart } from "../features/users/userSlice";
import AllProducts from "../components/AllProduct";
import Heart from "../components/Heart";
import triggerNotification from "../components/Toast";
import Tittle from "../components/Title";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Abc from "../components/Abc";

const SingleProduct = () => {
  const [color, setColor] = useState(null);
  // console.log("color", color);
  const [quantity, setQuantity] = useState(1);
  // console.log("quantity", quantity);
  const [alreadyAdded, setAlreadyAdded] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productState = useSelector((state) => state?.product?.singalproduct);
  const productsState = useSelector((state) => state?.product?.product);
  const isError = useSelector((state) => {
    return state.product.isError;
  });

  const isLoading = useSelector((state) => {
    return state.product.isLoading;
  });
  const cartState = useSelector((state) => state?.auth?.user?.cart);
  // console.log("productState", productState);
  // console.log("productsState", productsState);

  const getProductId = location.pathname.split("/")[2];
  useEffect(() => {
    dispatch(getAProduct(getProductId));
    dispatch(getUserCart());
    dispatch(getAllProducts());
  }, [getProductId]);

  // console.log("Cart state ", cartState);

  // const uploadCart = () => {
  //   // dispatch(addProdToCart({productId:productState?._id,quantity,color,price:productState?.price}));
  //   if (color == null) {
  //     toast.success("Please Select Color");
  //     return false;
  //   } else {
  //     dispatch(
  //       addProdToCart({
  //         productId: productState?._id,
  //         quantity,
  //         color,
  //         price: productState?.price,
  //       })
  //     );
  //     navigate('/cart');
  //     //  toast.success("cart Added True");
  //   }
  // };

  // const uploadCart = () => {
  //   dispatch(
  //     addProdToCart({
  //       productId: productState?._id,
  //       quantity,
  //       price: productState?.price,
  //     })
  //   );
  //   toast.success("cart Added True");
  // };

  const uploadCart = async () => {
    try {
      setLoading(true); // Show loading when starting
      await dispatch(
        addProdToCart({
          productId: productState?._id,
          price: productState?.price,
          quantity,
        })
      );

      // Show success notification
      triggerNotification("success", "Product Added successfully!");

      // Update the cart and close the drawer after the cart is updated
      await dispatch(getUserCart());

      setIsDrawerOpen(true); // Open the drawer
    } catch (error) {
      // Show error if cart update fails
      triggerNotification("error", "Failed to add product to cart");
    } finally {
      setLoading(false); // Hide loading after updating
    }
  };

  // Loading state to show spinner or loading message
  const [loading, setLoading] = useState(false);
  // console.log(getProductId);

  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };

  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.productId?._id) {
        setAlreadyAdded(true);
      }
    }
  }, []);

  const props = {
    width: 594,
    height: 600,
    zoomWidth: 600,

    img: productState?.images[0]?.url ? productState?.images[0]?.url : "watch",
  };

  const [orderedProduct, setorderedProduct] = useState(true);
  const copyToClipboard = (text) => {
    // console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    triggerNotification("success", "Copy To Clipboard");
  };
  // console.log("product state here", productState);
  const closeModal = () => {};

  const [populerProduct, setPopulerProduct] = useState();
  useEffect(() => {
    let data = [];
    for (let index = 0; index < productsState?.length; index++) {
      const element = productsState[index];
      if (element?.tags == "popular") {
        data.push(element);
      }
      setPopulerProduct(data);
    }
  }, [productState]);

  const [prodByCat, setProdByCat] = useState();
  useEffect(() => {
    let data2 = [];
    for (let index = 0; index < productsState?.length; index++) {
      const element = productsState[index];
      if (element?.category == "New Cat") {
        data2.push(element);
      }
      setProdByCat(data2);
    }
  }, [productState]);

  // console.log("hi", prodByCat);
  // console.log(populerProduct);
  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);

  const addratingToProduct = () => {
    if (star === null) {
      toast.error("please select Star");
      return false;
    } else if (comment === null) {
      toast.error("please select Comment");
      return false;
    } else {
      dispatch(
        addRating({ star: star, comment: comment, prodId: getProductId })
      );
      setTimeout(() => {
        dispatch(getAProduct(getProductId));
      }, 100);
    }
    return false;
  };
  // console.log(productState?.ratings);

  const getRandomProducts = (num) => {
    const shuffled = [...productsState].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const randomProducts = getRandomProducts(4);
  const OPTIONS = { loop: "true" };
  const slides = productState?.images;
  const images = productState?.images;

  // back navigation
  const handleBack = () => {
    navigate(-1); // Equivalent to router.back()
  };

  // scrollable
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    // Ensure ref is set correctly after the component mounts
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0; // Optionally reset scroll position
    }
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };
  const painPoints = [
    "If you need a permanent solution for your painful joints after chikungunya recovery.",
    "If you are suffering from any kind of joint pain or muscle pain that is unbearable.",
    "If you are facing any discomfort while doing your routine activities due to any kind of pain in the body.",
    "If you are facing discomfort in walking due to joint pains that are common in winters & colder places.",
    "If you want to permanently cure your discomfort due to pain with the help of Ayurveda.",
  ];

  // carousel.jsx
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainViewportRef, embla] = useEmblaCarousel({ skipSnaps: false });
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!embla || !emblaThumbs) return;
      embla.scrollTo(index);
    },
    [embla, emblaThumbs]
  );

  const onSelect = useCallback(() => {
    if (!embla || !emblaThumbs) return;
    setSelectedIndex(embla.selectedScrollSnap());
    emblaThumbs.scrollTo(embla.selectedScrollSnap());
  }, [embla, emblaThumbs, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
  }, [embla, onSelect]);

  // Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => setIsDrawerOpen(true);
  //tabs
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Description" },
    { id: "reviews", label: "Reviews", count: 157 },
    { id: "support", label: "Support" },
  ];
  // const userCartState = useSelector((state) => state?.cart);
  const BuyNow = async () => {
    try {
      setLoading(true);

      // Check if product already exists in cartState
      const isProductInCart =
        Array.isArray(cartState) &&
        cartState.some((item) => item.productId._id === productState?._id);

      // If product is not in cart, add it first
      if (!isProductInCart) {
        await dispatch(
          addProdToCart({
            productId: productState?._id,
            price: productState?.price,
            quantity,
          })
        );

        // Update cart state after adding product
        await dispatch(getUserCart());
      }

      // Redirect to checkout
      navigate("/checkout"); // Assuming you're using react-router-dom
    } catch (error) {
      triggerNotification("error", "Failed to process buy now request");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Meta title={productState?.title} />
      {/* <BreadCrumb title={productState?.title}  sticky top-[57px] top-[64px]/> */}

      <div className="">
        {/* <Container> */}

        <div className="grid grid-cols-1 lg:grid-cols-7  bg-gray-50">
          <div className="md:sticky md:top-20 lg:top-28 2xl:top-40 h-fit  col-span-3 lg:mt-0 mt-16 ">
            <div className="relative w-full max-w-[400px] lg:max-w-[400px] xl:max-w-[550px] mx-auto">
              <div className="overflow-hidden" ref={mainViewportRef}>
                <div className="flex gap-4">
                  {images?.map((src, index) => (
                    <div
                      className="flex-[0_0_100%] min-w-0 flex justify-center items-center"
                      key={index}
                    >
                      <img
                          //  onClick={() => setIsOpenModel(true)}
                        src={
                          src?.url ||
                          "https://sajivanayurveda.in/wp-content/uploads/2023/01/My-project-1-1-e1675763027728.png"
                        }
                        alt={`Product image ${index + 1}`}
                        className="w-[400px] h-[400px] lg:w-[400px] lg:h-[400px] 2xl:w-[550px] 2xl:h-[550px]  object-contain rounded-xl "
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 "
                onClick={() => embla?.scrollPrev()}
              >
                <span class="icon-[solar--round-alt-arrow-right-bold-duotone] h-14 w-14 bg-gray-800 mt-1.5 opacity-70 backdrop-blur-xl rotate-180"></span>
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 "
                onClick={() => embla?.scrollNext()}
              >
                <span class="icon-[solar--round-alt-arrow-right-bold-duotone] h-14 w-14 bg-gray-800 mt-1.5 opacity-70 backdrop-blur-xl"></span>
                {/* <ChevronRight className="h-4 w-4" /> */}
              </button>
              {/* Image counter */}
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm">
                {selectedIndex + 1} / {images?.length}
              </div>
            </div>
            <div
              className="mt-4 overflow-hidden w-full max-w-[400px] mx-auto "
              ref={thumbViewportRef}
            >
              <div className="flex px-4 gap-2">
                {images?.map((src, index) => (
                  <button
                    key={index}
                    className={`flex-[0_0_20%] min-w-0 relative ${
                      index === selectedIndex
                        ? "border-2 border-gray-400 rounded-xl"
                        : ""
                    }`}
                    onClick={() => onThumbClick(index)}
                  >
                    <img
                      src={src?.url}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-18 w-20 aspect-square objeci-cover rounded-xl p-[2px]"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 px-4 lg:px-0 pt-12 col-span-4 bg-white sm:pl-0 lg:pl-12 ">
            <h1 class="mt-8 text-2xl font-semibold text-gray-900 sm:text-3xl dark:text-white">
              {productState?.title}
            </h1>
            <p class="mb-6 mt-3 font-normal text-[#212529] text-[16px] dark:text-gray-400">
              {/* {productState?.description} */}

              <p
                className="pr-1 lg:pr-12"
                dangerouslySetInnerHTML={{
                  __html: productState?.description,
                }}
              ></p>
            </p>

            <div className="flex justify-center sm:justify-start py-6">
              <div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 ">
                  {[
                    {
                      icon: (
                        <span class="icon-[ph--plant-duotone] text-3xl"></span>
                      ),
                      title: "Plant Based & Vegan",
                    },
                    {
                      icon: <img src="/images/gmp.png" className="h-8 w-8" />,
                      title: "GMP Certified",
                    },
                    {
                      icon: (
                        <img
                          src="/images/no-preservatives.png"
                          className="h-8 w-8"
                        />
                      ),
                      title: "No Preservatives",
                    },
                    {
                      icon: (
                        <img
                          src="/images/icons8-guarantee-80.png"
                          className="h-8 w-8"
                        />
                      ),
                      title: "Ayush Certified",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-2">
                        {item.icon}
                      </div>
                      <p className="text-sm font-medium">{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div class="mt-6 sm:items-center sm:gap-4 sm:flex">
              <p class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {/* Rs. {productState?.price}/- */}
                Rs. {new Intl.NumberFormat("en-IN").format(productState?.price)}
                /-
              </p>

              <div class="flex items-center gap-2 mt-2 sm:mt-0">
                <div class="flex items-center gap-1">
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    {/* <p className="mb-0 t-review">( 2 Reviews )</p> */}
                  </div>
                </div>
                <p class="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                  ({productState?.totalrating}.0)
                </p>
                <a
                  href="#"
                  class="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                >
                  {productState?.ratings?.length} Reviews
                </a>
              </div>
            </div>

            <div class="mt-6 sm:gap-6 sm:items-center sm:flex sm:mt-8">
              {/* <div className="flex justify-center align-middle">
                  {alreadyAdded === false && (
                    <>
                      <h3 className="product-heading mx-2">Quantity :</h3>
                      <div className="">
                        <input
                          type="number"
                          name=""
                          min={1}
                          max={10}
                          onChange={(e) => setQuantity(e.target.value)}
                          value={quantity}
                          className="form-control"
                          style={{ width: "70px" }}
                          id=""
                        />
                      </div>
                    </>
                  )}
                </div> */}
              <div className=" sm:gap-6 sm:items-start sm:justify-between sm:align-middle sm:flex ">
                <div className="flex items-center">
                  <>
                    <h3 className="product-heading mr-6">Quantity :</h3>

                    {/* Decrement Button */}
                    <button
                      className="px-3 py-1 bg-gray-100 rounded"
                      onClick={() =>
                        setQuantity((prev) => Math.max(1, prev - 1))
                      } // Prevent going below 1
                    >
                      -
                    </button>

                    {/* Input Field */}
                    <div className="mx-2">
                      <input
                        type="number"
                        min={1}
                        max={10}
                        readOnly
                        onChange={(e) => setQuantity(Number(e.target.value))} // Ensure the value is a number
                        value={quantity}
                        className="form-control rounded-lg focus:outline-none "
                        style={{
                          width: "70px",
                          height: "40px",
                          textAlign: "center",
                        }} // Center align the text
                      />
                    </div>

                    {/* Increment Button */}
                    <button
                      className="px-3 py-1 bg-gray-100 rounded"
                      onClick={() =>
                        setQuantity((prev) => Math.min(10, prev + 1))
                      } // Prevent going beyond 10
                    >
                      +
                    </button>
                  </>
                </div>
              </div>
              <div className="flex space-x-4 my-8 lg:my-0">
                {/* <button
                  onClick={(e) => {
                    addToWish(productState?._id);
                  }}
                  className="flex items-center gap-2 px-6 py-2.5 text-white bg-black rounded-2xl duration-150 hover:bg-black/80 active:bg-black"
                  role="button"
                >
                  
                  Add to favorites
                </button> */}

                <button
                  onClick={() => {
                    uploadCart();
                  }}
                  // onClick={() => {
                  //   alreadyAdded ? navigate("/cart") : uploadCart();
                  // }}
                  className="flex items-center gap-2 px-6 py-2.5 text-white bg-black rounded-2xl duration-150 hover:bg-black/80 active:bg-black"
                >
                  {
                    // alreadyAdded && alreadyAdded ? "G0 To Cart" : "Add To Cart"
                    "Add To Cart"
                  }
                </button>
                <button
                  onClick={BuyNow}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 text-white bg-primary-500 rounded-2xl duration-150 hover:bg-primary-500/80 active:bg-primary-700"
                  role="button"
                >
                  Buy Now
                </button>
              </div>
            </div>

            <hr class="my-3 md:my-8 border-gray-200 dark:border-gray-800" />

            <ul className="product-details">
              <div className=" mx-auto lg:p-0 my-6 ">
                <div className="space-y-6">
                  {/* Care For Section */}
                  <div className="flex flex-col sm:flex-row">
                    <h3 className="text-lg font-semibold w-full sm:w-1/4 mb-2 sm:mb-0">
                      Care For
                    </h3>
                    <div className="w-full sm:w-3/4 flex flex-wrap gap-2">
                      {productState?.care_for.map((item) => (
                        <span
                          key={item}
                          className="p-2 px-3 bg-green-100 text-green-800 rounded-xl text-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row">
                    <h3 className="text-lg font-semibold w-full sm:w-1/4 mb-2 sm:mb-0 ">
                      Category
                    </h3>

                    {/* <Badge variant="secondary">
                      {productState?.category}
                      </Badge>
                  */}
                    {productState?.category?.map((category, index) => (
                      <p onClick={() => navigate(`/category/${category}`)}
                        key={index}
                        className="p-2 mx-1 px-3 bg-lime-100 text-lime-800 rounded-xl text-sm cursor-pointer"
                      >
                        {category}
                      </p>
                    ))}
                  </div>
                  {/* copy link */}
                  <div className="flex flex-col sm:flex-row">
                    <h3 className="text-lg font-semibold w-full sm:w-1/4 mb-2 sm:mb-0 ">
                      Link
                    </h3>

                    <p
                      onClick={() => {
                        copyToClipboard(window.location.href);
                      }}
                      className="text-[15px] text-green-600 hover:text-green-800 underline font-light pt-[4px] cursor-pointer"
                    >
                      <a href="#"></a>
                      Copy Product Link
                    </p>
                  </div>
                  {/* dosage Section */}
                  <div className="flex flex-col sm:flex-row">
                    <h3 className="text-lg font-semibold w-full sm:w-1/4 mb-2 sm:mb-0 ">
                      Dosage
                    </h3>

                    {productState?.dosage.map((item) => {
                      return (
                        <p className="w-full sm:w-3/4 text-gray-600 pr-16">
                          {item}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            </ul>

            <div className="d-flex gap-10 flex-column my-6">
              <h3 className="product-heading my-2">
                <b>Shipping & Returns :</b>
              </h3>
              <p className="product-data">
                Free shipping and returns available on all orders! <br /> We
                ship all IND domestic orders within <b>5-10 business days!</b>
              </p>
            </div>
          </div>
        </div>

        <Container>
          <div className="mt-12">
            <div className="">
              <nav className="-mb-px px-4 flex lg:justify-center lg:items-center">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 text-center border-b-2 font-medium text-sm lg:text-lg ${
                      activeTab === tab.id
                        ? "border-black text-black"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.label}
                    {tab.count && (
                      <span className="ml-2 bg-gray-100 text-gray-700 py-0.5 px-2 rounded-full text-xs">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            <div className="mt-8">
              {activeTab === "reviews" && (
                <div className="">
                  <Container class1=" reviews-wrapper home-wrapper-2">
                    <div className="bg-gray-100">
                      <div className="mx-4 pb-6">
                        <Tittle
                          name="Customer Reviews"
                          head="Select Wide Range Of Ayurvedic Products"
                        />
                        <div className="review-inner-wrapper  p-3">
                          <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="review-head d-flex justify-content-between align-items-end ">
                              <div>
                                <h4 className="mb-2 font-medium text-lg">
                                  Customer Reviews
                                </h4>

                                <div className="d-flex align-items-center gap-10">
                                  <ReactStars
                                    count={5}
                                    size={24}
                                    value={4}
                                    edit={false}
                                    activeColor="#ffd700"
                                  />
                                  <p className="mb-0">Based on 2 Reviews</p>
                                </div>
                              </div>
                              {orderedProduct && (
                                <div>
                                  <a
                                    className="text-dark text-decoration-underline"
                                    href=""
                                  >
                                    Write a Review
                                  </a>
                                </div>
                              )}
                            </div>
                            <div className="review-form py-4">
                              <h4>Write a Review</h4>
                              <div>
                                <ReactStars
                                  count={5}
                                  size={24}
                                  value={4}
                                  edit={true}
                                  activeColor="#ffd700"
                                  onChange={(e) => {
                                    setStar(e);
                                  }}
                                />
                              </div>
                              <div>
                                <textarea
                                  name=""
                                  id=""
                                  className="w-150 form-control border border-gray-300 rounded-md p-2  focus:outline-none"
                                  cols="30"
                                  rows="4"
                                  placeholder="Comments"
                                  onChange={(e) => {
                                    setComment(e.target.value);
                                  }}
                                ></textarea>
                              </div>
                              <div className="d-flex justify-content-end mt-3">
                                <button
                                  className="button border-0"
                                  type="button"
                                  onClick={addratingToProduct}
                                >
                                  Submit Review
                                </button>
                              </div>
                            </div>
                          </div>

                          {/*  */}
                          <div className="motion my-4">
                            <Marquee>
                              {productState &&
                                productState?.ratings?.map((item, index) => {
                                  return (
                                    <div class="w-[500px] flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                                      <div class="p-2 md:p-5">
                                        <div className="flex items-center justify-center gap-3 mb-4">
                                          <ReactStars
                                            count={5}
                                            size={28}
                                            value={item?.star}
                                            edit={false}
                                            activeColor="#ffd700"
                                          />
                                        </div>

                                        <div className="flex justify-center items-center align-middle">
                                          <p class="mt-2 text-wrap  line-clamp-[5]">
                                            {/* {item?.comment?.split(' ').slice(0, 22).join(' ')}... */}
                                            {item?.comment}
                                          </p>
                                        </div>
                                        <div className="relative bottom-0">
                                          <h3 class="mt-2 text-md font-bold text-gray-800 dark:text-white">
                                            Posted By :{" "}
                                            {item?.postedby?.firstname +
                                              " " +
                                              item?.postedby?.lastname}
                                          </h3>
                                          <p className="font-normal text-sm leading-8 ">
                                            {moment(item?.createdAt).format(
                                              "MMMM Do YYYY, h:mm:ss a"
                                            )}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                            </Marquee>
                          </div>
                          {/* <div className="reviews mt-4">
                  {productState &&
                    productState?.ratings?.map((item, index) => {
                      return (
                        <div className="review" key={index}>
                          <div className="d-flex gap-10 align-items-center">
                            <h6 className="mb-0">{}</h6>
                            <ReactStars
                              count={5}
                              size={24}
                              value={item?.star}
                              edit={false}
                              activeColor="#ffd700"
                            />
                          </div>
                          <p className="mt-3">{item?.comment}</p>
                          <p className="">
                            Posted By :{" "}
                            {item?.postedby?.firstname +
                              " " +
                              item?.postedby?.lastname}
                          </p>
                        </div>
                      );
                    })}
                </div> */}
                        </div>
                        <Container>
                          <Swiper
                            style={{
                              "--swiper-pagination-color": "#206c43",
                              // "cursor": "pointer"
                            }}
                            slidesPerView={1}
                            spaceBetween={10}
                            grabCursor={true}
                            freeMode={true}
                            loop={true}
                            breakpoints={{
                              640: { slidesPerView: 1 },
                              768: { slidesPerView: 2 },
                              1024: { slidesPerView: 3 },
                            }}
                            navigation
                            pagination={{ clickable: true }}
                            modules={[Navigation, Pagination, FreeMode]}
                            className="mySwiper my-8  px-2 lg:px-0"
                          >
                            {[...Array(4)]?.map((_, index) => (
                              <SwiperSlide key={index}>
                                <div className="max-w-xl mx-auto p-4 bg-image2 rounded-lg ">
                                  <div className="pt-6">
                                    <div className="flex items-start space-x-4">
                                      <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800">
                                          Jayvion Simon
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                          Posted 15 Sep 2024 2:27 am
                                        </p>
                                        <div className="flex items-center mt-1 mb-2">
                                          {[...Array(5)]?.map((_, i) => (
                                            <Star
                                              key={i}
                                              className={`w-5 h-5 ${
                                                i < 4
                                                  ? "text-yellow-400 fill-yellow-400"
                                                  : "text-gray-300"
                                              }`}
                                            />
                                          ))}
                                        </div>
                                        <p className="text-gray-700 mb-3">
                                          Occaecati est et illo quibusdam
                                          accusamus qui. Incidunt aut et
                                          molestiae ut facere aut. Est quidem
                                          iusto praesentium excepturi harum
                                          nihil tenetur facilis. Ut omnis
                                          voluptates nihil accusantium doloribus
                                          eaque debitis.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </Container>
                      </div>
                    </div>
                  </Container>
                </div>
              )}
              {activeTab === "description" && (
                <div className="space-x-4">
                  <Container>
                    <div className="container mx-auto px-4 pb-8 bg-white">
                      <Tittle
                        name="Who Should Use This Product"
                        head="Select Wide Range Of Ayurvedic Products"
                      />
                      <div className="flex flex-col md:flex-row items-center">
                        <div className="w-full md:w-1/2 pr-0 md:pr-8">
                          {productState?.who_should_use?.map((point, index) => (
                            <div key={index} className="mb-6 flex items-start">
                              <span className="text-4xl font-bold text-gray-200 mr-4">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <p className="text-gray-700 mt-2">{point}</p>
                            </div>
                          ))}
                        </div>
                        <div className="w-full md:w-1/2 mt-8 md:mt-0">
                          <img
                            src="https://sajivanayurveda.in/wp-content/uploads/2023/01/stomach-gas-transformed-1-e1673515265669.jpeg"
                            alt="Person with stomach pain"
                            // width={400}
                            // height={400}
                            className="rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="fixed bottom-4 right-4 bg-black text-white p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                          />
                        </svg>
                      </div>
                    </div>
                  </Container>
                  <Container> </Container>
                </div>
              )}
            </div>
          </div>
        </Container>
        {/* </Container> */}

        {/* pto cure */}

        <Container>
          <h3 className="my-6 text-2xl font-semibold">Releted Products</h3>
          <div>
            <div className="grid grid-cols-4 gap-2 mx-2">
              {productsState &&
                productsState
                  .filter(
                    (item) =>
                      item?._id !== getProductId &&
                      item?.category === productState?.category // Filter by category and exclude current product
                  )
                  .map((item) => <ProductCard item={item} key={item._id} />)}
            </div>
          </div>
        </Container>

        {/* <div className="fixed bottom-4 md:bottom-0 right-0 left-0 max-h-12 lg:max-h-16 z-[20]">
          <footer className=" bg-white border-t">
            <div className="flex">
              <button className="flex-1 py-2 text-center">
                <div className="w-6 h-6 mx-auto">Qty</div>
                <span className="text-lg">{quantity}</span>
              </button>
              <button className="flex-1 py-2 text-center">
                <div className="w-6 h-6 mx-auto">Price</div>
                <span className="text-lg">{productState?.price || "₹800"}</span>
              </button>

              <button
                onClick={() => {
                  alreadyAdded ? navigate("/cart") : uploadCart();
                }}
                className="flex-1  py-2 bg-green-500 text-white"
              >
                <span className="text-medium">Add to Cart</span>
              </button>
              <button className="flex-1 py-2 bg-green-700 text-white">
                <span className="text-medium">Check Now</span>
              </button>
            </div>
          </footer>
        </div> */}

        {/* scroll nav bar */}
        {/* <div className="flex items-center justify-between h-12 p- bg-gray-50 fixed top-[57px] md:bottom-0 right-0 left-0 lg:px-10">
      <button 
        onClick={() => scroll('left')} 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-1 z-10"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-6 h-6 text-gray-600" />
      </button>
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide no-scrollbar space-x-4 p-4"
      >
        {['Item one', 'Item two', 'Item three', 'Item four', 'Item five'].map((item, index) => (
          <div key={index} className="flex-shrink-0 p-1.5 no-scrollbar  bg-green-100 rounded-lg flex items-center justify-center">
            {item}
          </div>
        ))}
      </div>
      <button 
        onClick={() => scroll('right')} 
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-1 z-10"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-6 h-6 text-gray-600" />
      </button>
    </div> */}
        {/* top fixed nav bar  */}
        {/* <nav class="flex items-center justify-between h-12 p-2 bg-gray-50 fixed top-[57px] md:bottom-0 right-0 left-0 lg:px-10">
          <button className="flex-none py-2 text-left truncate">
            <span className="text-sm lg:text-xl ">{"item?.title"} </span>
          </button>

          <div class="flex items-center space-x-4 ml-auto">
            <button className="py-2 text-center lg:px-6">
              <span className="text-lg">Qty : {quantity}</span>
            </button>
            <button className="py-2 text-center lg:px-6">
              <span className="text-lg">{"₹800"}</span>
            </button>
            <button class="py-1.5 truncate px-4  lg:px-6 text-white bg-primary-500 rounded-full hover:bg-green-600">
              Buy Now
            </button>
          </div>
        </nav> */}

        {/* <Container>
          <h3 className="my-6 text-2xl font-semibold">Our Populer Products</h3>
          <div className="">
            <div className="grid grid-cols-4 gap-2 mx-2">
              {randomProducts &&
                randomProducts?.map((item) => {
                  return <ProductCard item={item} key={item._id} />;
                })}
            </div>
          </div>
        </Container> */}

        <Container>
          <h3 className="my-6 text-2xl font-semibold">Other Products</h3>
          <div>
            <div className="grid grid-cols-4 gap-2 mx-2">
              {productsState &&
                productsState
                  .filter(
                    (item) =>
                      item?._id !== getProductId &&
                      item?.category !== productState?.category // Filter by category and exclude current product
                  )
                  .map((item) => <ProductCard item={item} key={item?._id} />)}
            </div>
          </div>
        </Container>
        {/* drawer menu */}
        {/* <Container>
          <div className="flex justify-center items-center">
            <div
              className={`fixed inset-x-0 bottom-0 h-2/3 md:h-2/3 overflow-y-auto z-[99] bg-white rounded-t-3xl shadow-new-shadow transform transition-transform duration-300 ease-in-out ${
                isDrawerOpen ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <div className="p-4 sticky top-0 bg-white z-10 border-b">
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="absolute top-4 right-4 p-2"
                >
                  <X className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-semibold">
                  Your Cart {cartState?.length}
                </h2>
              </div>
              <div className="p-4">
                <>
                  <div className="flex  flex-col  bg-white">
                    {cartState?.map((item) => (
                      <li
                        key={item.care_forid}
                        class="flex py-6 p-4 border-b overflow-hidden "
                      >
                        <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <Link to={`/product/${item.id}`}>
                            <img
                              src={item?.productId?.images[0]?.url}
                              alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                              class="h-full w-full object-cover object-center"
                            />
                          </Link>
                        </div>

                        <div class="ml-4 flex flex-1 flex-col">
                          <div>
                            <div class="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item?.productId?.title}</h3>
                              <p class="ml-4">
                                &#8377; {item?.price * item?.quantity}/-
                              </p>
                            </div>
                      
                            <p class="mt-0 text-sm text-gray-500">
                              Price : {item?.price} | Qty : {item?.quantity}
                            </p>
                          </div>
                          <div class="flex flex-1 items-center justify-between text-sm mt-1">
                            <div className="quantity-button flex ">
                              <span className="px-2 pt-2">
                                <FaMinus className="mx-1 text-2xl font-semibold p-1 bg-green-100 rounded-md text-green-700 border cursor-pointer" />
                              </span>
                              <span className="text-lg pt-2">
                                {item.quantity}
                              </span>
                              <span className="px-2 pt-2">
                                <FaPlus className=" text-2xl border font-semibold mx-1 p-1 bg-green-100 rounded-md text-green-700 cursor-pointer" />
                              </span>
                            </div>

                            <div class="flex mt-1">
                              <button
                                type="button"
                                class="font-medium text-md text-green-700"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </div>
                </>

                <div className="flex space-x-2 mt-4">
                  <button
                    className="w-1/2 bg-black text-white py-3 rounded-full"
                    onClick={() => navigate("/cart")} 
                  >
                    Go to cart
                  </button>
                  <button
                    className="w-1/2 bg-green-500 text-white py-3 rounded-full"
                    onClick={() => navigate("/checkout")} 
                  >
                    Buy now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container> */}
        {/* <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Random Products</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard item={randomProducts} />
        </div>
       </Container> */}
  
      </div>
    </>
  );
};

export default SingleProduct;
