import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartProduct,
  getUserCart,
  updateCartProduct,
} from "../features/users/userSlice";
import { BsCartX } from "react-icons/bs";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import AllProducts from "../components/AllProduct";
import Container from "../components/Container";
import triggerNotification from "../components/Toast";
const CartItemSkeleton = () => (
  <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6 animate-pulse">
    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
      <div className="shrink-0 md:order-1">
        <div className="h-20 w-20 rounded-2xl bg-gray-300"></div>
      </div>

      <div className="flex items-center justify-between md:order-3 md:justify-end">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-md bg-gray-300"></div>
          <div className="h-8 w-8 bg-gray-300"></div>
          <div className="h-8 w-8 rounded-md bg-gray-300"></div>
        </div>

        <div className="text-end md:order-4 md:w-32">
          <div className="h-6 w-20 bg-gray-300 ml-auto"></div>
        </div>
      </div>

      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
        <div className="h-6 w-3/4 bg-gray-300"></div>

        <div className="flex lg:items-center item-end justify-end lg:justify-start gap-4">
          <div className="h-4 w-32 bg-gray-300"></div>
          <div className="h-4 w-16 bg-gray-300"></div>
        </div>
      </div>
    </div>
  </div>
);
const Cart = () => {
  const navigate = useNavigate();
  const [productUpdateDetail, setProductUpdateDetail] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  const dispatch = useDispatch();
  const userCartState = useSelector((state) => state?.auth?.user?.cart);
  // const {
  //   cart: userCartState,
  //   isLoading,
  //   isError,
  //   isSuccess,
  // } = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getUserCart());
  }, [dispatch]);

  useEffect(() => {
    if (productUpdateDetail !== null) {
      dispatch(
        updateCartProduct({
          cartItemId: productUpdateDetail?.cartItemId,
          quantity: productUpdateDetail?.quantity,
        })
      );
      setTimeout(() => {
        dispatch(getUserCart());
      }, 300);
    }
  }, [dispatch, productUpdateDetail]);

  const deleteACartProduct = (id) => {
    dispatch(deleteCartProduct(id));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 200);
  };

  useEffect(() => {
    let sum = 0;
    userCartState?.forEach((item) => {
      sum += Number(item.quantity) * item.price;
    });
    setTotalAmount(sum);
  }, [userCartState]);

  const handleQuantityChange = (cartItemId, newQuantity) => {
    setProductUpdateDetail({
      cartItemId: cartItemId,
      quantity: newQuantity,
    });
  };

  const handleCheckout = () => {
    if (userCartState?.length === 0 || !totalAmount) {
      triggerNotification(
        "error",
        "Your cart is empty or the total amount is invalid. Please add items to the cart."
      );
    } else {
      navigate("/checkout");
    }
  };

  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />

      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Shopping Cart ( {userCartState?.length || 0} )
          </h2>

          <div className="mt-6 sm:mt-8 md:gap-6  lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {!userCartState?.length && (
                  <div className="empty-cart pt-[10px] ">
                    {/* <BsCartX className="text-gray-200" /> */}
                    {/* <span class="icon-[solar--bag-cross-line-duotone]"></span> */}
                    <span class="icon-[solar--bag-cross-line-duotone] h-32 w-32 text-gray-400 animate-pulse"></span>
                    <span className="text-2xl font-medium">Cart is empty!</span>
                    <span>
                      Look like you have no items in your shopping cart.
                    </span>
                    <button className="button" onClick={() => navigate("/")}>
                      RETURN TO SHOP
                    </button>
                  </div>
                )}
                {/* {isLoading ? <>Loading...</> : ""} */}

                {userCartState &&
                  userCartState?.map((item) => (
                    <ul className="border rounded-xl lg:shadow-sm p-2.5 lg:p-6 bg-image2 bg-opacity-25">
                      <li class="flex lg:pb-0  lg:border-none">
                        <div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200">
                          <img
                            src={item?.productId?.images[0]?.url}
                            alt={item?.productId?.title}
                            class="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div class="ml-4 flex flex-1 flex-col">
                          <div>
                            <div class="flex justify-between text-base font-medium text-gray-900">
                              <h3 className="hover:underline">
                                <Link to={`/product/${item?._id}`}>
                                  {item?.productId?.title}
                                </Link>
                              </h3>
                              <p class="ml-4">₹ {item?.price}</p>
                            </div>
                            <p class="mt-1 text-sm text-gray-500">
                              {item?.productId?.category}
                            </p>
                          </div>
                          <div class="flex flex-1 items-end justify-between text-sm">
                            {/* <p class="text-gray-500">Qty 1</p> */}
                            <div className="flex items-center space-x-2">
                              <span className="text-md hidden lg:block pr-4">
                                {item?.quantity} X {item?.price} = ₹
                                {item.quantity * item.price}
                              </span>
                              <div className="flex justify-center items-center ">
                                <button
                                  className="inline-flex h-8 w-8 items-center justify-center rounded-2xl border border-green-300 bg-green-100 hover:bg-green-200 dark:border-green-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                                  onClick={() =>
                                    handleQuantityChange(
                                      item._id,
                                      Math.max(1, item.quantity - 1)
                                    )
                                  }
                                >
                                  <span class="icon-[octicon--dash-16] text-mdlg:text-lg text-green-600"></span>
                                </button>
                                <span className="mx-3 text-lg ">
                                  {item.quantity}
                                </span>
                                <button
                                  className="inline-flex h-8 w-8 items-center justify-center rounded-2xl border border-green-300 bg-green-100 hover:bg-green-200 dark:border-green-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                                  onClick={() =>
                                    handleQuantityChange(
                                      item._id,
                                      Math.min(10, item.quantity + 1)
                                    )
                                  }
                                >
                                  <span class="icon-[octicon--plus-16] text-mdlg:text-lg text-green-600"></span>
                                </button>
                              </div>
                            </div>

                            <div
                              onClick={() => deleteACartProduct(item?._id)}
                              class="flex bg-red-100 p-1.5 border border-red-200 rounded-full cursor-pointer"
                            >
                              {/* <span class="icon-[solar--trash-bin-trash-bold-duotone] text-red-600 text-xl rouded-full "></span> */}
                              <span class="icon-[solar--trash-bin-trash-bold-duotone] text-red-600 text-xl rouded-full"></span>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  ))}
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-2xl border border-gray-200 bg-image-productcard p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order summary
                </p>

                <div className="space-y-4">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Price
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      ₹ {totalAmount !== null ? totalAmount : 0} /-
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      ₹ {totalAmount !== null ? totalAmount : 0} /-
                    </dd>
                  </dl>
                </div>

                {/* {userCartState?.length > 0 ? (
                  <button
                   onClick={handleCheckout}
                    className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Checkout
                  </button>
                ) : (
                 
                  <button onClick={handleCheckout}
                    className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    disabled
                  >
                    Check out
                  </button>
                )} */}
                <button
                  onClick={handleCheckout}
                  className={`flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-md tracking-wide font-medium text-white focus:outline-none focus:ring-4 dark:focus:ring-primary-800 ${
                    userCartState?.length > 0 && totalAmount > 0
                      ? "bg-[#318e4c] hover:bg-[#206c43] focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={userCartState?.length === 0 || !totalAmount}
                >
                  Checkout
                </button>

                <div class="flex items-center justify-center gap-2">
                  <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {" "}
                    or{" "}
                  </span>
                  <a
                    href="/"
                    title=""
                    class="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                  >
                    Continue Shopping
                    <svg
                      class="h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="hidden xl:mt-8 xl:block">
          {/* <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">
                  People also bought
                </h3> */}
          {/* <Container>
            <h3 className="my-6 text-2xl font-semibold mx-4">
              People also bought
            </h3>

            <AllProducts />
          </Container> */}
        </div>
      </section>
    </>
  );
};

export default Cart;
