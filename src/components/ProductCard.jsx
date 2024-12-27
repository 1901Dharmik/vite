import React, { useState } from "react";
// import "./Card.scss";
import { Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../features/products/productSlice";
import { addProdToCart } from "../features/users/userSlice";
import triggerNotification from "./Toast";
import { getUserCart } from "../features/users/userSlice";
import { motion, AnimatePresence } from "framer-motion";

// model
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { IoIosHeartEmpty } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import { Heart } from "lucide-react";

const ProductCard = (props) => {
  const { item, grid } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state) => state?.auth);

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [isWishListed, setIsWishListed] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  const location = useLocation();
  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };

  // console.log(item);

  const handleAddToCart = () => {
    // if(authState) {
    // setIsAnimating(true);
    dispatch(
      addProdToCart({
        productId: item._id,
        price: item.price,
        quantity,
      })
    ) 
    //   &&
    //     triggerNotification(
    //       "success",
    //       `${item?.title.substring(0, 15)} added successfully!`
    //     );
    // } else {
    //   triggerNotification("error", "You Need To Regiser First");
    // }

    //   // && toast.success(`${item?.title.substring(0, 15)} added successfully!`);
    //   // setOpenModal(true);
  };

  // useEffect(() => {
  //   dispatch(getUserCart());
  // },[addProdToCart,dispatch])

  const handleClick = (_id) => {
    setTimeout(() => {
      navigate(`/product/${_id}`);
    }, 300);
  };
  // to={"/product/" + item?._id} replace reloadDocument
  const userCartState = useSelector((state) => state?.cart);
  const handleBuyNow = async () => {
    if (authState?.user) {
      const isProductInCart = userCartState?.find(
        (cartItem) => cartItem?.productId === item?._id
      );

      if (isProductInCart) {
        // If product is already in the cart, redirect to checkout
        navigate("/checkout");
      } else {
        // If product is not in the cart, add it and then redirect to checkout
        await dispatch(
          addProdToCart({
            productId: item._id,
            price: item.price,
            quantity,
          })
        );
        navigate("/checkout");
        window.location.reload();
      }
    } else {
      // User is not authenticated, show toast message
      triggerNotification(
        "error",
        "Please log in to continue with your purchase"
      );
    }
  };
  // Handle add to wishlist click
  const handleAddToWishlist = () => {
    dispatch(addToWishlist(item._id));
    // setIsWishListed(!isWishListed); // Toggle the wishlist state
  };
  //old buynow
  // const handleBuyNow = () => {
  //   // Add the product to the cart
  //   dispatch(
  //     addProdToCart({
  //       productId: item._id,
  //       price: item.price,
  //       quantity,
  //     })
  //   );
  //   // Redirect to checkout page
  //   navigate("/checkout");
  // };
  return (
    <>
      {/* <div className="grid xl:grid-cols-4 gap-3 pl-6 pt-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 overflow-scroll"> */}
      {/* {loading ? (
        <div className="animate-pulse">
          <div class="cards ">
            <div class="card is-loading shadow-md rounded-3xl animate-pulse">
              <div class="image"></div>
              <div class="content">
                <h2></h2>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      ) : ( */}
      {/* // h-[220px] */}

      <div
        onChange={() => navigate(`/product/${_id}`)}
        className=" mb-12 mt-2 overflow-hidden  border border-gray-200 rounded-[20px] dark:bg-gray-800 dark:border-gray-700 hover:shadow-custom-shadow"
      >
        <Link className="link " to={`/product/${item?._id}`}>
          <div className="w-full border-b border-gray-200 overflow-hidden bg-cover bg-no-repeat rounded-t-[20px]">
            <div className="cards">
              <div className="image h-[400px]">
                {/* <span className="">New Season</span> */}
                {/* <Link className="link" to="/Products/1"> */}

                <img className=""
                  src={item?.images[0]?.url}
                  alt=""
                  className="mainImg bg-opacity-75 "
                  style={{ transition: "all .5s" }}
                />
                <img
                  src={item?.images[1]?.url}
                  alt=""
                  className="secondImg border-none  "
                  style={{ transition: "all .5s ease-in" }}
                />

                {/* </Link> */}
              </div>
            </div>

            {/* <img
                    class="h-[220px]  w-full transition duration-300 ease-in-out hover:scale-110  "
                    src={
                     
                      item.attributes?.img?.data?.attributes?.url
                    }
                    alt=""
                    draggable="false"
                    style={{transition: 'all .5s'}}
                  /> */}
          </div>
        </Link>
        <div class="px-4 pt-5 bg-image-productcard">
          <button
            onClick={handleAddToWishlist}
            className="absolute right-4 top-4 z-10 p-1.5  rounded-full bg-white"
          >
            <Heart className={`h-5 w-5 text-gray-500`} />
          </button>
          <h5 class="mb-0 text-lg  font-semibold  text-gray-900  dark:text-white">
            {item?.title}
          </h5>
          {/* <p
              className={`description ${grid === 12 ? "d-block" : "d-none"}`}
              dangerouslySetInnerHTML={{ __html: item.description }}
            ></p> */}
          {/* </a> */}
          <li class="list-none flex justify-between font-[200] my-1">
            <ReactStars
              count={5}
              size={20}
              value={item?.totalrating.toString()}
              edit={false}
              activeColor="#ffd700"
            />
            {/* <span className="font-lg">4.6</span>
              <img
                class="h-[16px] w-[16px]  ml-1"
                src="https://cdn.shopify.com/s/files/1/0575/8920/3125/files/reviewstar.png?v=1629806756"
                alt="Vigyanveda Review Star"
              />{" "} */}
            <span className="mt-1.5  text-sm">11000+ People Using</span>
          </li>
          {/* <li class="list-none flex font-[300] mt-1 "><span className="font-semibold text-lg">₹</span><h5 className="mt-[1px] pl-1 font-semibold text-lg">5000</h5>
                         < className="font-semibold text-slate-500 text-lg mt-[6px] ml-8 leading-tight line-through">₹</ span>
                               <h5 className="mt-1 pl-1 font-semibold text-lg  text-slate-500 line-through  ">8000</h5></li> */}
          <li className="list-none flex pb-2">
            <h6 className="font-semibold text-lg py-1 mb-0 dark:text-white">
              ₹{item?.price}
            </h6>
            <h6 className="font-small text-lg py-1 mb-0 line-through pl-4 text-gray-500">
              ₹{(item?.price * 1.05).toFixed(2)}
            </h6>
          </li>

          <li className="flex flex-wrap  list-none overflow-hidden mb-3">
            <span className="font-light text-[15px] text-green-800 mr-2">
              Care For
            </span>

            {item?.care_for.map((careItem, index) => (
              <span key={careItem} className="text-[15px] font-light pr-1">
                {careItem}
                {index !== item.care_for.length - 1 && ","}
              </span>
            ))}

            {/* <h6 className="text-[15px] font-light mt-[2px] pl-2 mb-4">
                Gas, Acidity, Constipation
              </h6> */}
          </li>
        </div>
        <li className="list-none flex ">
          {/* <button
              onClick={(e) => {
                addToWish(item?._id);
              }}
              className="w-[50%] bg-[#318e4c] dark:bg-gray-800 py-[10px] rounded-bl-[19px] mr-[1px] text-white font-semibold"
            >
              
              Add To Wishlist
            </button> */}
          <button
            onClick={handleBuyNow}
            className="w-[50%] bg-[#318e4c] dark:bg-gray-800 py-[10px] rounded-bl-[19px] mr-[1px] text-white font-semibold"
          >
            {/* <Link to={`/product/${item._id}`}>Know More</Link> */}
            Buy Now
          </button>

          <button
            className="bg-[#206c43] dark:bg-gray-700 py-[10px] w-[50%] rounded-br-[19px] text-white font-semibold"
            onClick={handleAddToCart}
            // onClick={() => {
            //   alreadyAdded ? navigate("/cart") : handleAddToCart;
            // }}
          >
            Add To Cart
          </button>
        </li>
      </div>
      {/* )} */}

      {/* </div> */}

      {/* <Link className="link" to={`/product/${item.id}`}>
      <div className="card">
        <div className="image">
          {item?.attributes.isNew && <span>New Season</span>}
          <img
            src={
              'http://localhost:1337' + item.attributes?.img?.data?.attributes?.url
            }
            alt=""
            className="mainImg"
          />
          <img
            src={
              'http://localhost:1337' + item.attributes?.img2?.data[0]?.attributes?.url
            }
            alt=""
            className="secondImg"
          />
        </div>
        <h2>{item?.attributes.title}</h2>
        
        <div className="prices">
          <h3>₹{item.oldPrice || item?.attributes.price + 20}</h3>
          <h3>₹{item?.attributes.price}</h3>
          <div className="border-[1px] border-orange-600 py-1 px-4 rounded-full text-xs">
            
            </div>
        </div>
       
      </div>
      
    </Link> */}

      {/* <button className="absolute"
  onClick={() =>
    dispatch(
      addToCart({
        id: item.id,
        title: item.attributes.title,
        desc: item.attributes.desc,
        price: item.attributes.price,
        img: item.attributes.img.data.attributes.url,
        quantity,
       
      })
    )&&
    toast.success(
      `${item.title.substring(0, 15)} added successfully!`
    )
  }>Add to Cart
</button> */}
      {/* <Modal
       position="center"
        show={openModal}
        size="sm"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <div className="flex justify-center items-center">  
            <li class="flex py-6">
                      <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img  src={item?.images[0]?.url} 
                        alt="" 
                        class="h-full w-full object-cover object-center"/>
                      </div>

                      <div class="ml-4 flex flex-1 flex-col">
                        <div>
                          <div class="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link href="#">Throwback Hip Bag</Link>
                            </h3>
                            <p class="ml-4">$90.00</p>
                          </div>
                          <p class="mt-1 text-sm text-gray-500">Salmon</p>
                        </div>
                        <div class="flex flex-1 items-end justify-between text-sm">
                          <p class="text-gray-500">Qty 1</p>

                          <div class="flex">
                            <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                          </div>
                        </div>
                      </div>
                    </li>
            </div>
         
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {item?.title}
            </h3>
            <div className="flex justify-center gap-4 ">
              <Button color="green" onClick={() => setOpenModal(false)}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal> */}
     
    </>
  );
};

export default ProductCard;
