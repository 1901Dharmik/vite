import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import { getAllProducts } from "../features/products/productSlice";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import Container from "./Container";

const pageTransition = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const ProductCardSkeleton = () => (
  // <div className="bg-white shadow-md rounded-lg p-4 animate-pulse">
  //   <div className="w-full h-48 bg-gray-300 rounded-md mb-4"></div>
  //   <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
  //   <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
  //   <div className="h-8 bg-gray-300 rounded w-1/3"></div>
  // </div>
  <div className="w-full max-w-sm bg-white rounded-lg shadow my-4 p-4 animate-pulse">
    {/* Product Image Skeleton */}
    <div className="flex justify-center mb-4">
      <div className="w-full h-40 bg-gray-300 rounded-lg"></div>
    </div>

    {/* Product Title Skeleton */}
    <div className="flex justify-between items-center mb-2">
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
    </div>

    {/* Rating Skeleton */}
    <div className="flex justify-between items-center mb-2">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-gray-300 rounded-full mr-1"></div>
        ))}
      </div>
      <div className="h-4 bg-gray-300 rounded w-32 ml-2"></div>
    </div>

    {/* Price Skeleton */}
    <div className="flex items-center mb-2">
      <div className="h-6 bg-gray-300 rounded w-16 mr-2"></div>
      <div className="h-4 bg-gray-300 rounded w-20"></div>
    </div>

    {/* Description Skeleton */}
    <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>

    {/* Buttons Skeleton */}
    <div className="flex space-x-2">
      <div className="h-10 bg-gray-300 rounded w-1/2"></div>
      <div className="h-10 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>
);
const AllProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productState = useSelector((state) => state.product.product);
  console.log("ps1", productState);

  const isError = useSelector((state) => {
    return state?.product?.isError;
  });

  const isLoading = useSelector((state) => {
    return state.product.isLoading;
  });

  const getProducts = () => {
    dispatch(getAllProducts());
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Container>
      <div className="featuredProducts gap-0 px-4  ">
        {/* <div className="top">
      <h1>{type} products</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
        suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
        lacus vel facilisis labore et dolore magna aliqua. Quis ipsum
        suspendisse ultrices gravida. Risus commodo viverra maecenas.
      </p>
    </div> */}
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
            {/* {isError
          ? "Something went wrong!"
          : isLoading
          ? "loading"
          :  
          productState?.map((item) => (
              <SwiperSlide>
                <ProductCard item={item} key={item._id} />
              </SwiperSlide>
            ))} */}

            {isError ? (
               <>
               {[...Array(4)].map((_, index) => (
                 <SwiperSlide key={index}>
                   <ProductCardSkeleton />
                 </SwiperSlide>
               ))}
             </>
              // "Something Went TO Wrong"
            ) : isLoading ? (
              // <div class="containerloader">
              //   <div class="loader3"></div>
              //   <div class="loader3"></div>
              //   <div class="loader3"></div>
              //   <div class="loader3"></div>
              //   <div class="loader3"></div>
              // </div>
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
                  productState?.data?.products.map((item) => (
                    <SwiperSlide>
                      {/* <motion.div
                        key={item._id}
                        className="col-3"
                        whileHover={{ scale: 1.035 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      > */}
                      <ProductCard item={item} key={item._id} />
                      {/* </motion.div> */}
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
    </Container>
  );
};

export default AllProducts;
