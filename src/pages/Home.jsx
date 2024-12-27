import React, { useState, useCallback, useRef, useEffect } from "react";
import Container from "../components/Container";
import { Icon } from "@iconify/react";
import {
  ArrowRight,
  StarIcon,
  Brain,
  ActivitySquare,
  Star,
  Loader2,
} from "lucide-react";

import Abc from "../components/Abc";
import HeroSection from "../components/Hero";
import Meta from "../components/Meta";
import Tittle from "../components/Title";
import AllProducts from "../components/AllProduct";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlice";
import { Link, useNavigate } from "react-router-dom";
import { getCategories } from "../features/pcategory/pcategorySlice";
import CallToAction from "../components/CallToAction";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ProductCarosel from "../components/ProductCarousel";
import Banner from "../components/Banner";
import DropBox from "../components/DropBox";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

const products = [
  {
    name: "Digestive Care Trial Kit",
    rating: 4.2,
    users: "14000+ People Using",
    price: "₹ 1,399/-",
    originalPrice: "₹ 2,197/-",
    description: "Care For: Indigestion, Burning, Bloating",
    image:
      "https://sajivanayurveda.in/wp-content/uploads/2018/06/digestive-kit-demo-copy-450x315.jpg",
  },
  {
    name: "Digestive Care Essential Kit",
    rating: 4.6,
    users: "11000+ People Using",
    price: "₹ 2,099/-",
    originalPrice: "₹ 3,496/-",
    description: "Care For: Gas, Constipation, Indigestion",
    image:
      "https://sajivanayurveda.in/wp-content/uploads/2018/06/digestive-kit-demo-copy-450x315.jpg",
  },
  {
    name: "Digestive Care Complete Kit",
    rating: 4.2,
    users: "17000+ People Using",
    price: "₹ 1,999/-",
    originalPrice: "₹ 2,996/-",
    description: "Care For: Gas, Acidity, Constipation",
    image:
      "https://sajivanayurveda.in/wp-content/uploads/2018/06/digestive-kit-demo-copy-450x315.jpg",
  },
  {
    name: "Digestive Care Intense Kit",
    rating: 4.9,
    users: "19500+ People Using",
    price: "₹ 3,849/-",
    originalPrice: "₹ 5,893/-",
    description: "Care For: Gas, Acidity, Constipation",
    image:
      "https://sajivanayurveda.in/wp-content/uploads/2018/06/digestive-kit-demo-copy-450x315.jpg",
  },
];
const digestiveIssues = [
  { title: "Stomach Gas", color: "bg-green-100", buttonColor: "bg-green-500" },
  { title: "Acidity", color: "bg-yellow-100", buttonColor: "bg-orange-500" },
  { title: "Constipation", color: "bg-blue-100", buttonColor: "bg-blue-500" },
];
const features = [
  { title: "Assured Quality", description: "No Compromise", icon: "⭐️" },
  { title: "Free Shipping", description: "No Extra Cost", icon: "🛵" },
  { title: "Diet Plans", description: "Families served", icon: "📍" },
  { title: "Free Consultance", description: "24/7 AnyTime", icon: "💊" },
];

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const buttonVariants = {
    initial: { x: -100 },
    animate: { x: 100, rotate: 360 },
  };

  const {
    product: productState,
    isError,
    isLoading,
  } = useSelector((state) => state.product);
  const categoryState = useSelector((state) => state?.pCategory?.pCategories);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getCategories());
  }, [dispatch]);

  const [activeTab, setActiveTab] = useState("All");

  // Generate unique categories by extracting all unique categories from products
  const tabs = [
    "All",
    ...Array.from(
      new Set(
        productState.flatMap((product) =>
          Array.isArray(product.category)
            ? product.category
            : [product.category]
        )
      )
    ),
  ];

  // Filter products based on the active tab (category)
  const filteredProducts =
    activeTab === "All"
      ? productState // Show all products when "All" is active
      : productState.filter((product) =>
          // Check if the product's category (single or array) includes the active tab
          Array.isArray(product.category)
            ? product.category.includes(activeTab)
            : product.category === activeTab
        );

  return (
    <>
      {/* bg-[#f5f5f7] */}
      <div className="bg-gray-100">
        <Meta title={"Sajivan Ayurveda | Home"} />

        {/* Hero Section */}
        {/* <HeroSection /> */}
        <Banner />
        {/* <DropBox /> */}

        {/* Category Section */}

        <Container>
          <div className="bg-white">
            <Tittle
              name="Product By Categories"
              head="Select Wide Range Of Ayurvedic Products"
            />
            <div className="mx-auto px-4  ">
              <div className=" flex overflow-x-auto no-scrollbar pb-8 gap-3">
                <div className="min-w-[320px] lg:w-full bg-image-productcard border rounded-xl p-8 flex flex-col justify-between hover:shadow-custom-shadow">
                  <div>
                    <h3 className="text-3xl font-medium mb-4">
                      Digestive Care
                    </h3>
                    <p className="mb-6">
                      Get to know health problems and their causes. Also know
                      the benefits of Home Remedies, Yoga, Exercise, & more.
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => navigate("/category/Digestive%20Care")}
                      className="text-gray-600 bg-gray-100 border px-6 py-2 rounded-xl font-semibold flex items-center hover:bg-gray-200 transition duration-300"
                    >
                      Know More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                    <img
                      className="h-16 w-16 text-yellow-400 rounded-full"
                      src="./images/digestivecare-icon.jpeg"
                      alt=""
                    />
                    {/* <Brain className="h-16 w-16 text-yellow-400" /> */}
                  </div>
                </div>

                <div className=" min-w-[320px] lg:w-full bg-image4 border rounded-xl p-8 flex flex-col justify-between hover:shadow-custom-shadow">
                  <div>
                    <h3 className="text-3xl font-medium mb-4">Piles Care</h3>
                    <p className="mb-6">
                      Body Mass Index is commonly used to calculate whether your
                      weight is healthy or not.
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => navigate("/category/Piles%20Care")}
                      className="text-gray-600 bg-gray-100 border px-6 py-2 rounded-xl font-semibold flex items-center hover:bg-gray-200 transition duration-300"
                    >
                      Know More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                    <img
                      className="h-16 w-16 text-yellow-400 rounded-full"
                      src="./images/pilescare-icon.jpeg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
        {/* populer Kits   */}
        <Container>
          <div className="bg-white">
            <Tittle
              name="Popular Kits"
              head="Select Wide Range Of Ayurvedic Products"
            />
            <div className="flex mx-4 pb-8 overflow-x-auto lg:grid lg:grid-cols-2 gap-4">
              {productState?.map((item) => {
                if (item?.tags == "popular") {
                  return (
                    <div
                      className="grid border grid-cols-4 py-6 overflow-x-auto no-scrollbar min-w-[330px] lg:min-w-[50%] max-h-[300px] bg-image-productcard p-3 rounded-xl hover:shadow-custom-shadow"
                      key={item._id}
                    >
                      <div className="flex items-center justify-center h-full col-span-2">
                        <img
                          className="mr-4 p-2 lg:h-44 w-auto drop-shadow"
                          src="./images/dig123.png"
                          alt="Product Image"
                        />
                      </div>
                      <div className="col-span-2">
                        <h2 className=" font-normal text-xl mt-4">
                          {item?.title}{" "}
                        </h2>
                        <p className="py-1 text-gray-500 font-thin">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.
                        </p>
                        <p className="">₹ 800</p>
                        <div className="flex flex-end items-end justify-end pr-2">
                          <button className="mt-2 text-lg font-normal px-2 border rounded-lg">
                            view
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>{" "}
          </div>
        </Container>

        {/* <Container>
          <div className="bg-white">
            <Tittle
              name="Popular Kits"
              head="Select Wide Range Of Ayurvedic Products"
            />
            <div className="container mx-auto px-4">
              <div className="mt-0 pb-8 flex gap-4 overflow-x-auto no-scrollbar">
                {productState?.map((product) => {
                  if (product?.tags == "popular") {
                    return (
                      <>
                        <Link
                          to={`/product/${product?._id}`}
                          key={product.name}
                          className="border rounded-2xl p-3  min-w-[300px] bg-image-productcard bg-transparent hover:shadow-custom-shadow"
                        >
                          <img
                            src={product?.images[0]?.url}
                            alt={product?.name}
                            className="w-full h-48 object-contain mb-4 rounded-xl"
                          />
                          <h3 className="text-lg font-semibold mb-2">
                            {product?.title}
                          </h3>
                          <div className="flex items-center mb-2">
                            <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="text-sm font-medium">
                              {product?.totalrating.toString()}
                            </span>

                            <span className="text-sm text-gray-500 ml-2 ">
                              11000+ People Using
                            </span>
                          </div>
                          <div className="flex items-baseline mb-2">
                            <span className="text-lg font-bold text-green-600">
                              ₹ {"  "} {product?.price.toLocaleString()}/-
                            </span>
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ₹ {"  "} {(product?.price * 1.05).toFixed(2)}/-
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <button className="bg-white border border-green-600 text-green-600 py-2 px-4 rounded-xl hover:bg-green-50">
                              Add To Cart
                            </button>
                            <button className="bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700">
                              Buy Now
                            </button>
                          </div>
                        </Link>
                      </>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </Container> */}

        {/* Tab Section   */}
        <Container>
          <div className="bg-white">
            <Tittle
              name="Product By Categories"
              head="Select Wide Range Of Ayurvedic Products"
            />
            <div className="mx-auto">
              <div className="flex mb-6 justify-center items-center border-gray-200 overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`py-2 px-4 text-sm font-medium ${
                      activeTab === tab
                        ? "text-green-600 border-b-2 border-green-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="featuredProducts gap-0 px-4">
                <div className="bottom">
                  <Swiper
                    style={{
                      "--swiper-pagination-color": "#206c43",
                    }}
                    spaceBetween={10}
                    grabCursor={true}
                    freeMode={true}
                    pagination={{
                      clickable: true,
                    }}
                    loop={true}
                    breakpoints={{
                      0: { slidesPerView: 1 },
                      320: { slidesPerView: 1.2 },
                      412: { slidesPerView: 1.6 },
                      568: { slidesPerView: 2 },
                      768: { slidesPerView: 3 },
                      1024: { slidesPerView: 4 },
                    }}
                    modules={[FreeMode, Autoplay, Pagination]}
                    className="mySwiper"
                  >
                    {isError ? (
                     <>
                     {[...Array(4)].map((_, index) => (
                       <SwiperSlide key={index}>
                         <ProductCardSkeleton />
                       </SwiperSlide>
                     ))}
                   </>
                    ) : isLoading ? (
                      <>
                        {[...Array(4)].map((_, index) => (
                          <SwiperSlide key={index}>
                            <ProductCardSkeleton />
                          </SwiperSlide>
                        ))}
                      </>
                    ) : (
                      <>
                        {filteredProducts.length > 0 ? (
                          filteredProducts.map((item) => (
                            <SwiperSlide key={item._id}>
                              <ProductCard item={item} />
                            </SwiperSlide>
                          ))
                        ) : (
                          <div>No Products Found</div>
                        )}
                      </>
                    )}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* All Products */}
        <Container>
          <div className="bg-white">
            <Tittle
              name="All Products"
              head="Select Wide Range Of Ayurvedic Products"
            />
            <AllProducts />
          </div>
        </Container>

        {/* Digestive Care */}
        <Container>
          <div className="bg-white">
            <Tittle
              name="Digestive Care"
              head="Select Wide Range Of Ayurvedic Products"
              style={{ padding: "30px" }}
            />
            <div className="featuredProducts gap-0 px-4  ">
              <div className="bottom ">
                <Swiper
                  style={{
                    "--swiper-pagination-color": "#206c43",
                  }}
                  // slidesPerView={4}
                  spaceBetween={10}
                  grabCursor={true}
                  freeMode={true}
                  pagination={{
                    clickable: true,
                  }}
                  loop={true}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                    },
                    320: {
                      slidesPerView: 1.2,
                    },
                    412: {
                      slidesPerView: 1.6,
                    },
                    568: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 3,
                    },
                    1024: {
                      slidesPerView: 4,
                    },
                    // 1300: {
                    //   slidesPerView: 6,
                    // },
                  }}
                  // autoplay={{
                  //   delay: 2500,
                  //   disableOnInteraction: false,
                  // }}
                  modules={[FreeMode, Autoplay, Pagination]}
                  className="mySwiper"
                >
                  {isError ? (
                   <>
                   {[...Array(4)].map((_, index) => (
                     <SwiperSlide key={index}>
                       <ProductCardSkeleton />
                     </SwiperSlide>
                   ))}
                 </>
                  ) : isLoading ? (
                    <>
                      {[...Array(4)].map((_, index) => (
                        <SwiperSlide key={index}>
                          <ProductCardSkeleton />
                        </SwiperSlide>
                      ))}
                    </>
                  ) : (
                    <>
                      {Array.isArray(productState) ? (
                        productState?.map((item) => {
                          if (item?.category?.includes("Smartphone ")) {
                            return (
                              <SwiperSlide>
                                <ProductCard item={item} key={item._id} />
                              </SwiperSlide>
                            );
                          }
                        })
                      ) : (
                        <div>No Products Found</div>
                      )}
                    </>
                  )}
                </Swiper>
              </div>
            </div>
          </div>
        </Container>

        {/* Call To Action */}
        <CallToAction />

        {/* Piles Care */}
        <Container>
          <div className="bg-white">
            <Tittle
              name="Piles Care"
              head="Select Wide Range Of Ayurvedic Products"
              style={{ padding: "30px" }}
            />
            <div className="featuredProducts gap-0 px-4  ">
              <div className="bottom ">
                <Swiper
                  style={{
                    "--swiper-pagination-color": "#206c43",
                  }}
                  // slidesPerView={4}
                  spaceBetween={10}
                  grabCursor={true}
                  freeMode={true}
                  pagination={{
                    clickable: true,
                  }}
                  loop={true}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                    },
                    320: {
                      slidesPerView: 1.2,
                    },
                    412: {
                      slidesPerView: 1.6,
                    },
                    568: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 3,
                    },
                    1024: {
                      slidesPerView: 4,
                    },
                    // 1300: {
                    //   slidesPerView: 6,
                    // },
                  }}
                  // autoplay={{
                  //   delay: 2500,
                  //   disableOnInteraction: false,
                  // }}
                  modules={[FreeMode, Autoplay, Pagination]}
                  className="mySwiper"
                >
                  {isError ? (
                   <>
                   {[...Array(4)].map((_, index) => (
                     <SwiperSlide key={index}>
                       <ProductCardSkeleton />
                     </SwiperSlide>
                   ))}
                 </>
                  ) : isLoading ? (
                    <>
                      {[...Array(4)].map((_, index) => (
                        <SwiperSlide key={index}>
                          <ProductCardSkeleton />
                        </SwiperSlide>
                      ))}
                    </>
                  ) : (
                    <>
                      {Array.isArray(productState) ? (
                        productState?.map((item) => {
                          if (item?.category?.includes("Leptops")) {
                        
                            return (
                              <SwiperSlide>
                                <ProductCard item={item} key={item._id} />
                              </SwiperSlide>
                            );
                          }
                        })
                      ) : (
                        <div>No Products Found</div>
                      )}
                    </>
                  )}
                </Swiper>
              </div>
            </div>
          </div>
        </Container>

        {/* Call To Action */}
        <CallToAction />

        {/* symptumps */}
        {/* <Container>
          <div className="bg-white">
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {digestiveIssues.map((issue, index) => (
                  <div
                    key={index}
                    className={`rounded-lg overflow-hidden shadow-md ${issue.color}`}
                  >
                    <div className="p-6 flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-semibold mb-4">
                          {issue.title}
                        </h3>
                        <button
                          className={`${issue.buttonColor} text-white px-4 py-2 rounded-full hover:opacity-90 transition duration-300`}
                        >
                          Know More
                        </button>
                      </div>
                      <img
                        src={`/placeholder.svg?height=100&width=100&text=${issue.title}`}
                        alt={issue.title}
                        width={100}
                        height={100}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="mb-4 flex justify-center">
                      <span className="text-4xl">{feature.icon}</span>
                    </div>
                    <h4 className="text-lg font-semibold text-orange-500 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container> */}

        {/* know & Bmi */}
        <Container>
          <div className="bg-white">
            <div className="container mx-auto px-4 py-12">
              <h2 className="text-4xl font-bold text-center mb-2">
                Discover What's New
              </h2>
              <div className="w-16 h-1 bg-green-500 mx-auto mb-4"></div>
              <p className="text-center text-gray-600 mb-12 ">
                Know the benefit of the knowledge center & BMI calculator, to
                keep yourself healthy.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-[#136454] text-white rounded-lg p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-3xl font-semibold mb-4">
                      Knowledge Center
                    </h3>
                    <p className="mb-6 tracking-wide">
                      Get to know health problems and their causes. Also know
                      the benefits of Home Remedies, Yoga, Exercise, & more.
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <button className="bg-white text-emerald-800 px-6 py-2 rounded-full font-semibold flex items-center hover:bg-gray-100 transition duration-300">
                      Visit Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                    <Brain className="h-16 w-16 text-yellow-400" />
                  </div>
                </div>

                <div className="bg-[#499659] text-white rounded-lg p-8 flex flex-col justify-between ">
                  <div>
                    <h3 className="text-3xl font-semibold mb-4">
                      BMI Calculator
                    </h3>
                    <p className="mb-6 tracking-wide">
                      Body Mass Index is commonly used to calculate whether your
                      weight is healthy or not.
                    </p>
                  </div>
                  <div className="flex items-center justify-between ">
                    <button className="bg-white text-green-600 px-6 py-2 rounded-full font-semibold flex items-center hover:bg-gray-100 transition duration-300">
                      Check Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                    <ActivitySquare className="h-16 w-16 text-blue-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
        {/* Customer Reviews */}

        <Container>
          <div className="bg-white">
            <Tittle
              name="Customer Reviews"
              head="Select Wide Range Of Ayurvedic Products"
            />
            <div className="px-4">
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
                className="mySwiper lg:px-0"
              >
                {[...Array(4)]?.map((_, index) => (
                  <SwiperSlide key={index}>
                    <div className="max-w-xl mt-4 mb-12 mx-auto p-4 bg-image2 shadow-new-shadow rounded-lg ">
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
                              Occaecati est et illo quibusdam accusamus qui.
                              Incidunt aut et molestiae ut facere aut. Est
                              quidem iusto praesentium excepturi harum nihil
                              tenetur facilis. Ut omnis voluptates nihil
                              accusantium doloribus eaque debitis.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Home;
