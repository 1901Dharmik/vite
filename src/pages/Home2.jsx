import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import { getAllProducts } from "../features/products/productSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import Container from "../components/Container";
import Transition from "../components/Transition";
import { delay, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Marquee from "../components/Marquee";
import { ChevronRight, ChevronDownIcon, XIcon, X } from "lucide-react";
// import ReactHtmlParser from "react-html-parser";
import MultiSelect from "../components/MultiSelect"
import ToasterNotification from "../components/ToasterNotification";
import Searchbar from "../components/Searchbar"

// import { toast } from "sonner";

// import moment from "moment";

import { addToWishlist } from "../features/products/productSlice";
import { getUserCart } from "../features/users/userSlice";
import AllProducts from "../components/AllProduct";
import Tittle from "../components/Title";
import Meta from "../components/Meta";
import ProductListPage from "../components/ProductListPage";
import CustomNotification from "../components/CustomNotification";
import Heart from "../components/Heart";
import LogoShine from "../components/LogoShine";
import Upload from "../components/Upload";
import ImageUploder from "../components/ImageUploader"
// embala imports

const containerVariants = {
  initial: {
    x: 0,
  },
  animate: {
    x: "100%",
    transition: {
      repeat: Infinity,
      duration: 15, // Increased duration for slower animation
      ease: "linear",
    },
  },
};
const countries = [
  { name: "Antigua and Barbuda", code: "AG", flag: "🇦🇬" },
  { name: "United Arab Emirates", code: "AE", flag: "🇦🇪" },
  { name: "regergeg and Barbuda", code: "CN", flag: "🇦🇬" },
  { name: "weggtgw Arab Emirates", code: "US", flag: "🇦🇪" },
  // Add more countries as needed
];
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogState = useSelector((state) => state?.blog?.blog);
  // console.log(blogState);

  // for product only
  const productState = useSelector((state) => state?.product?.product);
  const categoryState = useSelector((state) => state?.pCategory?.pCategories);
  console.log("product state", productState);
  // const specialProductState = useSelector(
  //   (state) => state?.specialProduct?.specialProduct
  // );

  const getBlogs = () => {
    dispatch(getAllBlogs());
  };

  const getProducts = () => {
    dispatch(getAllProducts());
  };

  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };

  const getCartItems = () => {
    dispatch(getUserCart());
  };

  useEffect(() => {
    getBlogs();
    getProducts();
    getCartItems();
    dispatch(getCategories());
  }, []);

  // embla
  const OPTIONS = { loop: true };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  // select multiple option
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (country) => {
    if (!selectedCountries.find((c) => c.code === country.code)) {
      setSelectedCountries([...selectedCountries, country]);
    }
    setIsOpen(false);
  };

  const handleRemove = (countryCode) => {
    setSelectedCountries(
      selectedCountries.filter((c) => c.code !== countryCode)
    );
  };

  return (
    <div className="" style={{ backdropFilter: "blur(20px)" }}>
      <Meta title={"Sajivan Ayurveda | Home"} />
      <div className="bg-[#f5f5f7]">
        {/* <div className="relative bg-gradient-to-b from-green-50 to-green-100">
      
        <section className="overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-stretch lg:max-h-[900px] lg:min-h-[900px]">
            <div className="flex items-center justify-center w-full lg:order-2 lg:w-7/12">
              <div className="h-full px-4 pt-24 pb-16 sm:px-6 lg:px-24 2xl:px-32 lg:pt-40 lg:pb-14">
                <div className="flex flex-col justify-between flex-1 h-full">
                  <div>
                    <h1 className="text-4xl font-bold text-black sm:text-6xl xl:text-7xl">
                      Take control <br />
                      on your daily expenses
                    </h1>
                    <p className="mt-6 text-base text-black sm:text-xl">
                      Our A.I helps you to predict your expenses based on your
                      previous activity and shares how you should manage you
                      money.
                    </p>
                    <a
                      href="#"
                      title
                      className="inline-flex items-center px-6 py-5 text-base font-semibold text-black transition-all duration-200 bg-green-300 mt-9 hover:bg-green-400 focus:bg-green-400"
                      role="button"
                    >
                      {" "}
                      Get started for free{" "}
                    </a>
                  </div>
                  <div className="mt-8 border-t-2 border-black lg:mt-auto sm:mt-14">
                    <div className="pt-8 sm:flex sm:items-center sm:justify-between sm:pt-14">
                      <p className="text-base font-semibold text-black">
                        App available on
                      </p>
                      <div className="flex items-center mt-5 space-x-5 sm:mt-0">
                        <a
                          href="#"
                          title
                          className="block transition-all duration-200 hover:opacity-80 focus:opacity-80"
                          role="button"
                        >
                          <img
                            className="w-auto rounded h-14 sm:h-16"
                            src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/4/app-store-button.png"
                            alt
                          />
                        </a>
                        <a
                          href="#"
                          title
                          className="block transition-all duration-200 hover:opacity-80 focus:opacity-80"
                          role="button"
                        >
                          <img
                            className="w-auto rounded h-14 sm:h-16"
                            src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/4/play-store-button.png"
                            alt
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full overflow-hidden lg:w-5/12 lg:order-1">
              <div className="lg:absolute lg:bottom-0 lg:left-0">
                <img
                  className="w-full"
                  src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/4/phone-mockup.png"
                  alt
                />
              </div>
            </div>
          </div>
        </section>
      </div> */}
        {/* <section class="pt-10 overflow-hidden bg-gradient-to-b from-green-50 to-green-100 md:pt-0 sm:pt-16 2xl:pt-16 lg:max-h-[900px] lg:min-h-[600px]">
        <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl ">
          <div class="grid items-center grid-cols-1 md:grid-cols-2">
            <div>
              <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                Hey 👋 I am <br class="block sm:hidden" />
                Jenny Carter
              </h2>
              <p class="max-w-lg mt-3 text-xl leading-relaxed text-gray-600 md:mt-8">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat sunt nostrud amet.
              </p>

              <p class="mt-4 text-xl text-gray-600 md:mt-8">
                <span class="relative inline-block">
                  <span class="absolute inline-block w-full bottom-0.5 h-2 bg-yellow-300"></span>
                  <span class="relative"> Have a question? </span>
                </span>
                <br class="block sm:hidden" />
                Ask me on{" "}
                <a
                  href="#"
                  title=""
                  class="transition-all duration-200 text-sky-500 hover:text-sky-600 hover:underline"
                >
                  Twitter
                </a>
              </p>
            </div>

            <div class="relative">
              <img
                class="relative w-full xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110"
                src="./images/doc.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section> */}

        <Hero />
        <Tittle
          name="Product By Categories"
          head="Select Wide Range Of Ayurvedic Products"
          style={{ padding: "30px" }}
        />
        {/* <LogoShine/>
        <Upload/> */}
 <Searchbar/>
        <Container>
          <div className="grid lg:grid-cols-2 grid-cols-1 py-4">
            {categoryState?.length > 0 ? (
              categoryState?.map((item) => (
                <Link to={`/category/${item?.title}`} key={item._id}>
                  <motion.div
                    className="col-3"
                    whileHover={{ scale: 1.035 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <li
                      // onClick={() => handleRouteClick(item._id)}
                      className="cursor-pointer flex items-center space-x-3 p-2 hover:opacity-85 rounded"
                    >
                      <img
                        src={
                          item?.images?.[1]?.url || " "
                          // defaultImageUrl
                        }
                        className=" rounded-xl"
                        alt={item?.title || "Default Image"}
                        // onError={(e) => {
                        //   e.target.src = defaultImageUrl; // Fallback image on error
                        // }}
                      />
                      {/* <div className="item-title">
                    <h3>{item?.title || "Untitled"}</h3>
                    <p>{item?.category || "No Category"}</p>
                  </div> */}
                    </li>
                  </motion.div>
                </Link>
              ))
            ) : (
              <li className="text-center text-gray-500">No items available</li>
            )}
          </div>
        </Container>

        {/* <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mx-2 my-12">
            {categoryState?.map((item) => {
              return (
                <div
                  className="grid grid-cols-3 bg-white p-3 rounded-xl hover:shadow-custom-shadow"
                  key={item._id}
                >
                  <div className="flex items-center justify-center h-full">
                    <img
                      className="mr-4"
                      src={item?.images?.[0]?.url || " "}
                      alt="Product Image"
                    />
                  </div>
                  <div className="col-span-2">
                    <h2 className=" font-normal text-xl mt-4">
                      {item?.title}{" "}
                    </h2>
                    <p className="py-1 text-gray-500 font-thin">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
            })}
          </div>
        </Container> */}
        {/* <Container>
          <div className="grid grid-cols-2">
            <img src="./images/digest1.jpeg" alt="" className="rounded-xl px-2" />
          </div>
        </Container> */}

        <Container>
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <img
                  src="https://sajivanayurveda.in/wp-content/uploads/2023/02/digestive-kit-full-photo-3.jpg"
                  alt="Samsung QLED TV"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover mb-4 rounded-lg"
                />
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">Digestive Care</h2>
                    {/* <p className="text-gray-500">$43.84</p> */}
                  </div>
                  <button className="flex items-center text-green-600 hover:text-green-800">
                    More details
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <img
                  src="https://sajivanayurveda.in/wp-content/uploads/2023/02/aaabc.jpg"
                  alt="Samsung QLED TV"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover mb-4 rounded-lg "
                />
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">Piles Care</h2>
                    {/* <p className="text-gray-500">$43.84</p> */}
                  </div>
                  <button className="flex items-center text-green-600 hover:text-green-800">
                    More details
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <Container>
          <div className="bg-white mx-4 h-full lg:h-[280px] p-4 md:p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between rounded-xl">
            <div className="w-full md:w-1/3 mb-6 md:mb-0 bg-image-man">
              <div className="mt-4">
                <img
                  src="./images/dig-man.png"
                  alt="Joint and muscle illustration"
                  width={200}
                  height={300}
                  className=" w-full h-auto "
                />
              </div>
            </div>
            <div className="w-full md:w-1/3 text-center mb-6 md:mb-0">
              <h1 className="text-2xl font-bold mb-4">
                Sukoon Ayurvedic Joint & Muscle Oil
              </h1>
              <p className="text-sm md:text-base lg:text-lg mb-6">
                Cure your joint & muscle pain with the magical touch of Ayurveda
                to get long-lasting relief from the discomfort.
              </p>
              <button className="button">Shop Now</button>
            </div>
            <div className="w-full md:w-1/3 relative">
              <img
                src="./images/dig123.png"
                alt="Product image"
                width={200}
                height={300}
                className="w-full h-auto drop-shadow"
              />
              <div className="absolute top-0 right-0 bg-primary-700 text-white text-sm font-light px-2 py-1 rounded-full">
                New!
              </div>
            </div>
          </div>
          <MultiSelect/>
          <ToasterNotification/>
         
          {/* <div className="bg-green-50 p-4 md:p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between">
      <div className="w-full md:w-1/3 mb-6 md:mb-0">
        <img
          src="/placeholder.svg?height=300&width=200"
          alt="Joint and muscle illustration"
          width={200}
          height={300}
          className="w-full h-auto"
        />
      </div>
      <div className="w-full md:w-1/3 text-center mb-6 md:mb-0">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
          Sukoon Ayurvedic Joint & Muscle Oil
        </h1>
        <p className="text-sm md:text-base lg:text-lg mb-6">
          Cure your joint & muscle pain with the magical touch of Ayurveda to get long-lasting relief from the discomfort.
        </p>
        <button className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">
          Shop Now
        </button>
      </div>
      <div className="w-full md:w-1/3 relative">
        <img
          src="/placeholder.svg?height=300&width=200"
          alt="Product image"
          width={200}
          height={300}
          className="w-full h-auto"
        />
        <div className="absolute top-0 right-0 bg-green-400 text-white text-xs font-bold px-2 py-1 rounded-full">
          New!
        </div>
      </div>
    </div> */}
        </Container>

        <div className="w-full max-w-md">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Multi country
          </label>
          <div
            className="relative"
            onClick={() => setIsOpen(!isOpen)} // Make the entire container clickable
          >
            <div className="min-h-[42px] p-1 border border-gray-300 rounded-md bg-white cursor-pointer">
              <div className="flex flex-wrap gap-1">
                {selectedCountries.map((country) => (
                  <div
                    key={country.code}
                    className="flex items-center bg-green-200/60 rounded-md px-2 py-1"
                  >
                    <span className="mr-1">{country.flag}</span>
                    <span className="text-sm mr-1 text-green-800">{country.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent closing the dropdown when removing a country
                        handleRemove(country.code);
                      }}
                      className=" text-gray-500 hover:text-gray-700 p-[3px] bg-[#007867] rounded-full"
                    >
                      <X size={12} className="text-bold text-gray-200"/>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent the click event from bubbling up to the parent div
                setIsOpen(!isOpen);
              }}
              className="absolute right-0 top-0 h-full px-2 flex items-center"
            >
              <ChevronDownIcon size={20} />
            </button>
          </div>
          {isOpen && (
            <ul className="mt-1 max-h-60 overflow-auto border border-gray-300 rounded-md bg-white shadow-lg">
              {countries.map((country) => (
                <li
                  key={country.code}
                  onClick={() => handleSelect(country)}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <span className="mr-2">{country.flag}</span>
                  {country.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <ImageUploder/>

        <Tittle
          name="All Products"
          head="Select Wide Range Of Ayurvedic Products"
          style={{ padding: "30px" }}
        />
        <AllProducts />

        <Container>
          {" "}
          <div className="m-10 mx-3 overflow-hidden rounded-xl shadow-new-shadow ">
            <div className="flex flex-col  overflow-hidden bg-image-doc  sm:flex-row md:h-80">
              <div className="order-first ml-auto h-48 w-full  sm:order-none sm:h-auto sm:w-full lg:w-2/5">
                <img
                  className="h-full w-full object-contain xl:px-2 xl:mt-2 "
                  src="https://cdn.shopify.com/s/files/1/0575/8920/3125/files/Weight-Loss-Care.png?v=1629540167"
                  loading="lazy"
                />
              </div>
              <div className=" text-center flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-3/5 lg:mt-6 ict">
                <h1 classname=" font-semibold text-2xl  text-[#3f9c3a] mt-4 pb-4">
                  Expert Consultation For Digestive Care
                </h1>
                <p classname="mt-1 font-light pb-12 mx-8  ">
                  Get the best customised ayurvedic care for Digestive problems
                  on the Phone from our Experts at your comfort
                </p>
                <div className="flex space-x-4 lg:ml-[220px] mb-2">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#3f9c3a] text-white shadow-md">
                    Contact Us
                  </button>
                  <link to="tel:+91%208490059352" />
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#54ae3c] text-white shadow-md">
                    Call Now
                  </button>
                  <link to="http://wa.me/918490059352" />
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#3f9c3a] text-white shadow-md">
                    Whatsapp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <Container>
          <Tittle
            name="Digestive Care"
            head="Select Wide Range Of Ayurvedic Products"
            style={{ padding: "30px" }}
          />
          <div className="grid lg:grid-cols-4 grid-cols-1  gap-2 mx-2">
            {productState?.map((item) => {
              if (item?.category === "Digestive Care") {
                return <ProductCard item={item} key={item._id} />;
              }
            })}
          </div>
        </Container>

        <Container>
          <Tittle
            name="Piles Care"
            head="Select Wide Range Of Ayurvedic Products"
            style={{ padding: "30px" }}
          />
          <div className="grid lg:grid-cols-4 grid-cols-1 gap-2 mx-2">
            {productState?.map((item) => {
              if (item?.category === "Piles Care") {
                return <ProductCard item={item} key={item._id} />;
              }
            })}
          </div>
        </Container>

        <Container>
          <Tittle
            name="All Products"
            head="Select Wide Range Of Ayurvedic Products"
            style={{ padding: "30px" }}
          />
          <div className="grid lg:grid-cols-4 grid-cols-1 gap-2 mx-2">
            {productState?.map((item) => {
              if (item?.category === "Gadgets") {
                return <ProductCard item={item} key={item._id} />;
              }
            })}
          </div>
        </Container>
        <Tittle
          name="What ? Our Customer Say"
          head="Select Wide Range Of Ayurvedic Products"
          style={{ padding: "30px" }}
        />

        <Container>
          <div className=" flex items-center justify-center   py-6 motion">
            <Marquee speed={30}>
              <img
                src="https://sajivanayurveda.in/wp-content/uploads/2023/02/1-1.png"
                alt="Example 1"
                className="h-[300px] rounded-md shadow-lg "
              />
              <img
                src="https://sajivanayurveda.in/wp-content/uploads/2023/02/1-1.png"
                alt="Example 2"
                className="h-[300px] rounded-md shadow-lg "
              />
              <img
                src="https://sajivanayurveda.in/wp-content/uploads/2023/02/1-1.png"
                alt="Example 3"
                className="h-[300px] rounded-md shadow-lg "
              />
              <img
                src="https://sajivanayurveda.in/wp-content/uploads/2023/02/1-1.png"
                alt="Example 3"
                className="h-[300px] rounded-md shadow-lg "
              />
              {/* <span className="text-white text-xl">This is a marquee text!</span> */}
            </Marquee>
          </div>
        </Container>
        {/* <EmblaCarousel slides={SLIDES} options={OPTIONS} /> */}
        {/* <ProductListPage /> */}
        <CustomNotification
          variant="success"
          message="Action successful!"
          duration={5000}
        />
        
        <Container>
          <div className="flex flex-col md:flex-row w-full px-4 bg-white gap-4 ">
            {/* Digestive Care Banner */}
            <div className="relative w-full md:w-1/2 h-64 md:h-96 rounded-xl">
              <div className="absolute inset-0 bg-teal-500 bg-opacity-30">
                <div className="p-6 h-full flex flex-col justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      Digestive Care
                    </h2>
                    <p className="text-white text-opacity-90">
                      Lowers Blood Sugar, Cholesterol, Anxiety
                    </p>
                  </div>
                  <button className="bg-teal-600 text-white px-4 py-2 rounded-full w-28 hover:bg-teal-700 transition duration-300">
                    Explore
                  </button>
                </div>
              </div>
            </div>

            {/* Piles Care Banner */}
            <div className="relative w-full md:w-1/2 h-64 md:h-96 px-4 rounded-xl">
              <div className="absolute inset-0 bg-indigo-500 bg-opacity-30">
                <div className="p-6 h-full flex flex-col justify-between items-end text-right">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      Piles Care
                    </h2>
                    <p className="text-white text-opacity-90">
                      Lowers Blood Sugar, Regulates Liver & Pancreas
                    </p>
                  </div>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-full w-28 hover:bg-indigo-700 transition duration-300">
                    Explore
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Home;
