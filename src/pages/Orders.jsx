import React, { useEffect } from "react";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/users/userSlice";
import Transition from "../components/Transition";
import moment from "moment";

const Orders = () => {
  const dispatch = useDispatch();
  const orderState = useSelector(
    (state) => state.auth?.getOrderedProducts?.orders
  );
  console.log("OrderState", orderState);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <>
      {/* <Transition> */}
      <BreadCrumb title="My Orders" />
      <div className="bg-[#F5F5F7]">
        <Container className="cart-wrapper home-wrapper-2 py-5 ">
          <section className="py-24 relative ">
            <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
              {/* <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center">
             Orders Details
            </h2>
            <p className="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">
              Thanks for making a purchase you can check our order summary frm
              below
            </p> */}
              {orderState &&
                orderState.map((item, index) => {
                  return (
                    <div className="bg-white shadow-sm my-4 main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                        <div className="data">
                          <p className="font-semibold text-base leading-7 text-black">
                            Order Id:{" "}
                            <span className="text-indigo-600 font-medium">
                              {item?._id}
                            </span>
                          </p>
                          <p className="font-semibold text-base leading-7 text-black mt-4">
                            Order Payment :{" "}
                            <span className="text-gray-400 font-medium">
                              {" "}
                              {moment(item?.createdAt).format(
                                "MMMM Do YYYY, h:mm:ss a"
                              )}
                            </span>
                          </p>
                        </div>
                        {/* <button className="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-indigo-600 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                        Track Your Order
                      </button> */}
                      </div>
                      {item?.orderItems?.map((i, idx) => {
                        return (
                          <div
                            key={idx}
                            className="w-full px-3 min-[400px]:px-6"
                          >
                            <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                              <div className="img-box max-lg:w-full">
                                <img
                                  src={i.product?.images[0]?.url}
                                  alt="Premium Watch image"
                                  className=" aspect-square w-full lg:max-w-[110px] rounded-xl"
                                />
                              </div>
                              <div className="flex flex-row items-center w-full ">
                                <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                                  <div className="flex items-center">
                                    <div className>
                                      <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                                        {i.product?.title}
                                      </h2>
                                      <p className="font-normal text-lg leading-8 text-gray-500 mb-3 ">
                                        {i?.product?.category}
                                      </p>
                                      <div className="flex items-center ">
                                        <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                          Qty:{" "}
                                          <span className="text-gray-500">
                                            {i.quantity}
                                          </span>
                                        </p>
                                        <p className="font-medium text-base leading-7 text-black ">
                                          Price:{" "}
                                          <span className="text-gray-500">
                                            ₹ {i.price}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-5">
                                    <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                      <div className="flex gap-3 lg:block">
                                        <p className="font-medium text-lg leading-7 text-black">
                                          Price
                                        </p>
                                        <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                                          ₹ {i.price}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                                      <div className="flex gap-3 lg:block">
                                        <p className="font-medium text-lg leading-7 text-black">
                                          Status
                                        </p>
                                        <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                                          {item?.orderStatus}
                                        </p>
                                      </div>
                                    </div>
                                    {/* <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                                <div className="flex gap-3 lg:block">
                                  <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                                    Expected Delivery Time
                                  </p>
                                  <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                                    23rd March 2021
                                  </p>
                                </div>
                              </div> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
                        <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
                          <p className="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">
                            Payment Method :{" "}
                            <span className="text-gray-500">
                              {item?.paymentMethod}
                            </span>
                          </p>
                        </div>
                        <p className="font-semibold text-lg text-black py-6">
                          Total Price:{" "}
                          <span className="text-indigo-600">
                            {" "}
                            ₹ {item?.totalPriceAfterDiscount}
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>
        </Container>
      </div>
      {/* </Transition> */}
    </>
  );
};

export default Orders;
