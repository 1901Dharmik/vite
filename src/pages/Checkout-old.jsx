import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import StatesData from "../constant/mock";
import Meta from "../components/Meta";
import {
  createAnOrder,
  deleteUserCart,
  resetState,
  addAddressByUser,
} from "../features/users/userSlice";
import { config } from "../utils/axiosConfig";

const shippingSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  address: yup.string().required("Address is required"),
  landmark: yup.string().required("Landmark is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  country: yup.string().required("Country is required"),
  pincode: yup.number().required("Pincode is required"),
});
const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.auth.cartProducts);
  const authState = useSelector((state) => state.auth);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [cartProductState, setCartProductState] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [address, setAddress] = useState("address not Found");
  // console.log(address,"address");
  // TODO : ADD and remove address by user also select address

  useEffect(() => {
    let sum = 0;
    cartState?.forEach((item) => {
      sum += item.quantity * item.price;
    });
    setTotalAmount(sum);
  }, [cartState]);

  useEffect(() => {
    if (authState?.orderedProduct?.success) {
      navigate("/my-orders");
    }
  }, [authState, navigate]);

  useEffect(() => {
    const items = cartState?.map((item) => ({
      product: item.productId._id,
      quantity: item.quantity,
      // color: item.color._id,
      price: item.price,
    }));
    setCartProductState(items);
  }, [cartState]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load!");
      return;
    }

    const result = await axios.post(
      "http://localhost:8000/api/user/order/checkout",
      { amount: totalAmount },
      config
    );

    if (!result) {
      alert("Something went wrong");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_Z39iNGufE6LzVy",
      amount: amount.toString(),
      currency: currency,
      name: "Rapple",
      description: "Test Transaction",
      order_id: order_id,
      handler: async (response) => {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
        };

        const paymentResult = await axios.post(
          "http://localhost:8000/api/user/order/paymentVerification",
          data,
          config
        );

        dispatch(
          createAnOrder({
            totalPrice: totalAmount,
            totalPriceAfterDiscount: totalAmount,
            orderItems: cartProductState,
            paymentInfo: paymentResult.data,
            shippingInfo: JSON.parse(localStorage.getItem("address")),
            paymentMethod: "Razorpay",
          })
        );

        dispatch(addAddressByUser(shippingInfo));
        localStorage.removeItem("address");
        dispatch(resetState());
      },
      prefill: {
        name: "Rapple",
        email: "budgetapple@gmail.com",
        contact: "7032617903",
      },
      notes: {
        address: "Rapple Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const checkoutHandler = () => {
    if (paymentMethod === "Razorpay") {
      handleRazorpayPayment();
    } else if (paymentMethod === "COD") {
      dispatch(
        createAnOrder({
          totalPrice: totalAmount,
          totalPriceAfterDiscount: totalAmount,
          orderItems: cartProductState,
          paymentInfo: {
            razorpayOrderId: "",
            razorpayPaymentId: "",
          },
          shippingInfo: JSON.parse(localStorage.getItem("address")),
          paymentMethod: "COD",
        })
      );
      // dispatch(addAddress())
      localStorage.removeItem("address");
      dispatch(deleteUserCart());
      dispatch(resetState());
      alert("Order placed successfully with Cash on Delivery");
      navigate("/my-orders");
      // navigate("/");
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      landmark: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      setShippingInfo(values);

      localStorage.setItem("address", JSON.stringify(values));
      // setAddress(shippingInfo);
      dispatch(addAddressByUser(values));
      setTimeout(checkoutHandler, 300);
    },
  });

  useEffect(() => {
    dispatch(addAddressByUser(shippingInfo));
  }, []);

  // tax calculate
  const taxRate = 0.12;
  const calculateTax = (totalAmount) => {
    return totalAmount * taxRate;
  };

  const tax = calculateTax(totalAmount);
  return (
    <>
      <Meta title="Checkout" />
      <BreadCrumb title="Checkout" />
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
          <form
            onSubmit={formik.handleSubmit}
            className="mx-auto max-w-screen-xl px-4 2xl:px-0"
          >
            <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
              <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                  <svg
                    className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  Cart
                </span>
              </li>
              <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                  <svg
                    className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  Checkout
                </span>
              </li>
              <li className="flex shrink-0 items-center">
                <svg
                  className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Order summary
              </li>
            </ol>
            <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
              <div className="min-w-0 flex-1 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Delivery Details
                  </h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="first_name"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {" "}
                        First name{" "}
                      </label>
                      <input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        required
                      />
                      <div className="error">
                        {formik.touched.firstName && formik.errors.firstName}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="last_name"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {" "}
                        Last name{" "}
                      </label>
                      <input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastName}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        required
                      />
                      <div className="error">
                        {formik.touched.lastName && formik.errors.lastName}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="your_email"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {" "}
                        Your email*{" "}
                      </label>
                      <input
                        type="email"
                        id="your_email"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        placeholder="name@flowbite.com"
                        required
                      />
                    </div>
                    <div className="col-span-full">
                      <label
                        htmlFor="street-people"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Address (Area and Street)
                      </label>
                      <div className="mt-2">
                        <input
                          placeholder="Address(Area and Street)"
                          name="address"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.address}
                          autoComplete="street-people"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        />
                        <div className="error">
                          {formik.touched.address && formik.errors.address}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="landmark"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {" "}
                        Landmark *{" "}
                      </label>
                      <input
                        type="text"
                        placeholder="Landmark"
                        name="landmark"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.landmark}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        required
                      />
                      <div className="error">
                        {formik.touched.landmark && formik.errors.landmark}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="City"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {" "}
                        City *{" "}
                      </label>
                      <input
                        type="text"
                        placeholder="City"
                        name="city"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.city}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        required
                      />
                      <div className="error">
                        {formik.touched.city && formik.errors.city}
                      </div>
                    </div>
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <label
                          htmlFor="select-country-input-3"
                          className="block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {" "}
                          Country *{" "}
                        </label>
                      </div>
                      <select
                        name="country"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.country}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      >
                        <option value="selected">Select Country</option>
                        {/* <option selected>India</option> */}
                        <option value="India">India</option>
                      </select>
                      <div className="error">
                        {formik.touched.country && formik.errors.country}
                      </div>
                    </div>
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {" "}
                          State *{" "}
                        </label>
                      </div>
                      <select
                          name="state"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.state}
                          id="state"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      >
                         <option value="AP">Andhra Pradesh</option>
                    <option value="AR">Arunachal Pradesh</option>
                    <option value="AS">Assam</option>
                    <option value="BR">Bihar</option>
                    <option value="CT">Chhattisgarh</option>
                    <option value="GA">Gujarat</option>
                    <option value="HR">Haryana</option>
                    <option value="HP">Himachal Pradesh</option>
                    <option value="JK">Jammu and Kashmir</option>
                    <option value="GA">Goa</option>
                    <option value="JH">Jharkhand</option>
                    <option value="KA">Karnataka</option>
                    <option value="KL">Kerala</option>
                    <option value="MP">Madhya Pradesh</option>
                    <option value="MH">Maharashtra</option>
                    <option value="MN">Manipur</option>
                    <option value="ML">Meghalaya</option>
                    <option value="MZ">Mizoram</option>
                    <option value="NL">Nagaland</option>
                    <option value="OR">Odisha</option>
                    <option value="PB">Punjab</option>
                    <option value="RJ">Rajasthan</option>
                    <option value="SK">Sikkim</option>
                    <option value="TN">Tamil Nadu</option>
                    <option value="TG">Telangana</option>
                    <option value="TR">Tripura</option>
                    <option value="UT">Uttarakhand</option>
                    <option value="UP">Uttar Pradesh</option>
                    <option value="WB">West Bengal</option>
                    <option value="AN">Andaman and Nicobar Islands</option>
                    <option value="CH">Chandigarh</option>
                    <option value="DN">Dadra and Nagar Haveli</option>
                    <option value="DD">Daman and Diu</option>
                    <option value="DL">Delhi</option>
                    <option value="LD">Lakshadweep</option>
                    <option value="PY">Puducherry</option>
                      </select>
                      <div className="error">
                    {formik.touched.state && formik.errors.state}
                  </div>
                    </div>
                    <div>
                      <label
                        htmlFor="phone-input-3"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {" "}
                        Phone Number*{" "}
                      </label>
                      <div className="flex items-center">
                        <button
                          id="dropdown-phone-button-3"
                          data-dropdown-toggle="dropdown-phone-3"
                          className="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <svg
                            fill="none"
                            aria-hidden="true"
                            className="me-2 h-4 w-4"
                            viewBox="0 0 20 15"
                          >
                            <rect
                              width="19.6"
                              height={14}
                              y=".5"
                              fill="#fff"
                              rx={2}
                            />
                            <mask
                              id="a"
                              style={{ maskType: "luminance" }}
                              width={20}
                              height={15}
                              x={0}
                              y={0}
                              maskUnits="userSpaceOnUse"
                            >
                              <rect
                                width="19.6"
                                height={14}
                                y=".5"
                                fill="#fff"
                                rx={2}
                              />
                            </mask>
                            <g mask="url(#a)">
                              <path
                                fill="#D02F44"
                                fillRule="evenodd"
                                d="M19.6.5H0v.933h19.6V.5zm0 1.867H0V3.3h19.6v-.933zM0 4.233h19.6v.934H0v-.934zM19.6 6.1H0v.933h19.6V6.1zM0 7.967h19.6V8.9H0v-.933zm19.6 1.866H0v.934h19.6v-.934zM0 11.7h19.6v.933H0V11.7zm19.6 1.867H0v.933h19.6v-.933z"
                                clipRule="evenodd"
                              />
                              <path fill="#46467F" d="M0 .5h8.4v6.533H0z" />
                              <g filter="url(#filter0_d_343_121520)">
                                <path
                                  fill="url(#paint0_linear_343_121520)"
                                  fillRule="evenodd"
                                  d="M1.867 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.866 0a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM7.467 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zM2.333 3.3a.467.467 0 100-.933.467.467 0 000 .933zm2.334-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.4.467a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm-2.334.466a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.466a.467.467 0 11-.933 0 .467.467 0 01.933 0zM1.4 4.233a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM6.533 4.7a.467.467 0 11-.933 0 .467.467 0 01.933 0zM7 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zM3.267 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0z"
                                  clipRule="evenodd"
                                />
                              </g>
                            </g>
                            <defs>
                              <linearGradient
                                id="paint0_linear_343_121520"
                                x1=".933"
                                x2=".933"
                                y1="1.433"
                                y2="6.1"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#fff" />
                                <stop offset={1} stopColor="#F0F0F0" />
                              </linearGradient>
                              <filter
                                id="filter0_d_343_121520"
                                width="6.533"
                                height="5.667"
                                x=".933"
                                y="1.433"
                                colorInterpolationFilters="sRGB"
                                filterUnits="userSpaceOnUse"
                              >
                                <feFlood
                                  floodOpacity={0}
                                  result="BackgroundImageFix"
                                />
                                <feColorMatrix
                                  in="SourceAlpha"
                                  result="hardAlpha"
                                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                />
                                <feOffset dy={1} />
                                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                <feBlend
                                  in2="BackgroundImageFix"
                                  result="effect1_dropShadow_343_121520"
                                />
                                <feBlend
                                  in="SourceGraphic"
                                  in2="effect1_dropShadow_343_121520"
                                  result="shape"
                                />
                              </filter>
                            </defs>
                          </svg>
                          +1
                          <svg
                            className="-me-0.5 ms-2 h-4 w-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="m19 9-7 7-7-7"
                            />
                          </svg>
                        </button>
                        <div
                          id="dropdown-phone-3"
                          className="z-10 hidden w-56 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
                        >
                          <ul
                            className="p-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdown-phone-button-2"
                          >
                            <li>
                              <button
                                type="button"
                                className="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                role="menuitem"
                              >
                                <span className="inline-flex items-center">
                                  <svg
                                    fill="none"
                                    aria-hidden="true"
                                    className="me-2 h-4 w-4"
                                    viewBox="0 0 20 15"
                                  >
                                    <rect
                                      width="19.6"
                                      height={14}
                                      y=".5"
                                      fill="#fff"
                                      rx={2}
                                    />
                                    <mask
                                      id="a"
                                      style={{ maskType: "luminance" }}
                                      width={20}
                                      height={15}
                                      x={0}
                                      y={0}
                                      maskUnits="userSpaceOnUse"
                                    >
                                      <rect
                                        width="19.6"
                                        height={14}
                                        y=".5"
                                        fill="#fff"
                                        rx={2}
                                      />
                                    </mask>
                                    <g mask="url(#a)">
                                      <path
                                        fill="#D02F44"
                                        fillRule="evenodd"
                                        d="M19.6.5H0v.933h19.6V.5zm0 1.867H0V3.3h19.6v-.933zM0 4.233h19.6v.934H0v-.934zM19.6 6.1H0v.933h19.6V6.1zM0 7.967h19.6V8.9H0v-.933zm19.6 1.866H0v.934h19.6v-.934zM0 11.7h19.6v.933H0V11.7zm19.6 1.867H0v.933h19.6v-.933z"
                                        clipRule="evenodd"
                                      />
                                      <path
                                        fill="#46467F"
                                        d="M0 .5h8.4v6.533H0z"
                                      />
                                      <g filter="url(#filter0_d_343_121520)">
                                        <path
                                          fill="url(#paint0_linear_343_121520)"
                                          fillRule="evenodd"
                                          d="M1.867 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.866 0a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM7.467 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zM2.333 3.3a.467.467 0 100-.933.467.467 0 000 .933zm2.334-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.4.467a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm-2.334.466a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.466a.467.467 0 11-.933 0 .467.467 0 01.933 0zM1.4 4.233a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM6.533 4.7a.467.467 0 11-.933 0 .467.467 0 01.933 0zM7 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zM3.267 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0z"
                                          clipRule="evenodd"
                                        />
                                      </g>
                                    </g>
                                    <defs>
                                      <linearGradient
                                        id="paint0_linear_343_121520"
                                        x1=".933"
                                        x2=".933"
                                        y1="1.433"
                                        y2="6.1"
                                        gradientUnits="userSpaceOnUse"
                                      >
                                        <stop stopColor="#fff" />
                                        <stop offset={1} stopColor="#F0F0F0" />
                                      </linearGradient>
                                      <filter
                                        id="filter0_d_343_121520"
                                        width="6.533"
                                        height="5.667"
                                        x=".933"
                                        y="1.433"
                                        colorInterpolationFilters="sRGB"
                                        filterUnits="userSpaceOnUse"
                                      >
                                        <feFlood
                                          floodOpacity={0}
                                          result="BackgroundImageFix"
                                        />
                                        <feColorMatrix
                                          in="SourceAlpha"
                                          result="hardAlpha"
                                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                        />
                                        <feOffset dy={1} />
                                        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                        <feBlend
                                          in2="BackgroundImageFix"
                                          result="effect1_dropShadow_343_121520"
                                        />
                                        <feBlend
                                          in="SourceGraphic"
                                          in2="effect1_dropShadow_343_121520"
                                          result="shape"
                                        />
                                      </filter>
                                    </defs>
                                  </svg>
                                  United States (+1)
                                </span>
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                role="menuitem"
                              >
                                <span className="inline-flex items-center">
                                  <svg
                                    className="me-2 h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 20 15"
                                  >
                                    <rect
                                      width="19.6"
                                      height={14}
                                      y=".5"
                                      fill="#fff"
                                      rx={2}
                                    />
                                    <mask
                                      id="a"
                                      style={{ maskType: "luminance" }}
                                      width={20}
                                      height={15}
                                      x={0}
                                      y={0}
                                      maskUnits="userSpaceOnUse"
                                    >
                                      <rect
                                        width="19.6"
                                        height={14}
                                        y=".5"
                                        fill="#fff"
                                        rx={2}
                                      />
                                    </mask>
                                    <g mask="url(#a)">
                                      <path
                                        fill="#0A17A7"
                                        d="M0 .5h19.6v14H0z"
                                      />
                                      <path
                                        fill="#fff"
                                        fillRule="evenodd"
                                        d="M-.898-.842L7.467 4.8V-.433h4.667V4.8l8.364-5.642L21.542.706l-6.614 4.46H19.6v4.667h-4.672l6.614 4.46-1.044 1.549-8.365-5.642v5.233H7.467V10.2l-8.365 5.642-1.043-1.548 6.613-4.46H0V5.166h4.672L-1.941.706-.898-.842z"
                                        clipRule="evenodd"
                                      />
                                      <path
                                        stroke="#DB1F35"
                                        strokeLinecap="round"
                                        strokeWidth=".667"
                                        d="M13.067 4.933L21.933-.9M14.009 10.088l7.947 5.357M5.604 4.917L-2.686-.67M6.503 10.024l-9.189 6.093"
                                      />
                                      <path
                                        fill="#E6273E"
                                        fillRule="evenodd"
                                        d="M0 8.9h8.4v5.6h2.8V8.9h8.4V6.1h-8.4V.5H8.4v5.6H0v2.8z"
                                        clipRule="evenodd"
                                      />
                                    </g>
                                  </svg>
                                  United Kingdom (+44)
                                </span>
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                role="menuitem"
                              >
                                <span className="inline-flex items-center">
                                  <svg
                                    className="me-2 h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 20 15"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <rect
                                      width="19.6"
                                      height={14}
                                      y=".5"
                                      fill="#fff"
                                      rx={2}
                                    />
                                    <mask
                                      id="a"
                                      style={{ maskType: "luminance" }}
                                      width={20}
                                      height={15}
                                      x={0}
                                      y={0}
                                      maskUnits="userSpaceOnUse"
                                    >
                                      <rect
                                        width="19.6"
                                        height={14}
                                        y=".5"
                                        fill="#fff"
                                        rx={2}
                                      />
                                    </mask>
                                    <g mask="url(#a)">
                                      <path
                                        fill="#0A17A7"
                                        d="M0 .5h19.6v14H0z"
                                      />
                                      <path
                                        fill="#fff"
                                        stroke="#fff"
                                        strokeWidth=".667"
                                        d="M0 .167h-.901l.684.586 3.15 2.7v.609L-.194 6.295l-.14.1v1.24l.51-.319L3.83 5.033h.73L7.7 7.276a.488.488 0 00.601-.767L5.467 4.08v-.608l2.987-2.134a.667.667 0 00.28-.543V-.1l-.51.318L4.57 2.5h-.73L.66.229.572.167H0z"
                                      />
                                      <path
                                        fill="url(#paint0_linear_374_135177)"
                                        fillRule="evenodd"
                                        d="M0 2.833V4.7h3.267v2.133c0 .369.298.667.666.667h.534a.667.667 0 00.666-.667V4.7H8.2a.667.667 0 00.667-.667V3.5a.667.667 0 00-.667-.667H5.133V.5H3.267v2.333H0z"
                                        clipRule="evenodd"
                                      />
                                      <path
                                        fill="url(#paint1_linear_374_135177)"
                                        fillRule="evenodd"
                                        d="M0 3.3h3.733V.5h.934v2.8H8.4v.933H4.667v2.8h-.934v-2.8H0V3.3z"
                                        clipRule="evenodd"
                                      />
                                      <path
                                        fill="#fff"
                                        fillRule="evenodd"
                                        d="M4.2 11.933l-.823.433.157-.916-.666-.65.92-.133.412-.834.411.834.92.134-.665.649.157.916-.823-.433zm9.8.7l-.66.194.194-.66-.194-.66.66.193.66-.193-.193.66.193.66-.66-.194zm0-8.866l-.66.193.194-.66-.194-.66.66.193.66-.193-.193.66.193.66-.66-.193zm2.8 2.8l-.66.193.193-.66-.193-.66.66.193.66-.193-.193.66.193.66-.66-.193zm-5.6.933l-.66.193.193-.66-.193-.66.66.194.66-.194-.193.66.193.66-.66-.193zm4.2 1.167l-.33.096.096-.33-.096-.33.33.097.33-.097-.097.33.097.33-.33-.096z"
                                        clipRule="evenodd"
                                      />
                                    </g>
                                    <defs>
                                      <linearGradient
                                        id="paint0_linear_374_135177"
                                        x1={0}
                                        x2={0}
                                        y1=".5"
                                        y2="7.5"
                                        gradientUnits="userSpaceOnUse"
                                      >
                                        <stop stopColor="#fff" />
                                        <stop offset={1} stopColor="#F0F0F0" />
                                      </linearGradient>
                                      <linearGradient
                                        id="paint1_linear_374_135177"
                                        x1={0}
                                        x2={0}
                                        y1=".5"
                                        y2="7.033"
                                        gradientUnits="userSpaceOnUse"
                                      >
                                        <stop stopColor="#FF2E3B" />
                                        <stop offset={1} stopColor="#FC0D1B" />
                                      </linearGradient>
                                    </defs>
                                  </svg>
                                  Australia (+61)
                                </span>
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                role="menuitem"
                              >
                                <span className="inline-flex items-center">
                                  <svg
                                    className="me-2 h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 20 15"
                                  >
                                    <rect
                                      width="19.6"
                                      height={14}
                                      y=".5"
                                      fill="#fff"
                                      rx={2}
                                    />
                                    <mask
                                      id="a"
                                      style={{ maskType: "luminance" }}
                                      width={20}
                                      height={15}
                                      x={0}
                                      y={0}
                                      maskUnits="userSpaceOnUse"
                                    >
                                      <rect
                                        width="19.6"
                                        height={14}
                                        y=".5"
                                        fill="#fff"
                                        rx={2}
                                      />
                                    </mask>
                                    <g mask="url(#a)">
                                      <path
                                        fill="#262626"
                                        fillRule="evenodd"
                                        d="M0 5.167h19.6V.5H0v4.667z"
                                        clipRule="evenodd"
                                      />
                                      <g filter="url(#filter0_d_374_135180)">
                                        <path
                                          fill="#F01515"
                                          fillRule="evenodd"
                                          d="M0 9.833h19.6V5.167H0v4.666z"
                                          clipRule="evenodd"
                                        />
                                      </g>
                                      <g filter="url(#filter1_d_374_135180)">
                                        <path
                                          fill="#FFD521"
                                          fillRule="evenodd"
                                          d="M0 14.5h19.6V9.833H0V14.5z"
                                          clipRule="evenodd"
                                        />
                                      </g>
                                    </g>
                                    <defs>
                                      <filter
                                        id="filter0_d_374_135180"
                                        width="19.6"
                                        height="4.667"
                                        x={0}
                                        y="5.167"
                                        colorInterpolationFilters="sRGB"
                                        filterUnits="userSpaceOnUse"
                                      >
                                        <feFlood
                                          floodOpacity={0}
                                          result="BackgroundImageFix"
                                        />
                                        <feColorMatrix
                                          in="SourceAlpha"
                                          result="hardAlpha"
                                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                        />
                                        <feOffset />
                                        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                        <feBlend
                                          in2="BackgroundImageFix"
                                          result="effect1_dropShadow_374_135180"
                                        />
                                        <feBlend
                                          in="SourceGraphic"
                                          in2="effect1_dropShadow_374_135180"
                                          result="shape"
                                        />
                                      </filter>
                                      <filter
                                        id="filter1_d_374_135180"
                                        width="19.6"
                                        height="4.667"
                                        x={0}
                                        y="9.833"
                                        colorInterpolationFilters="sRGB"
                                        filterUnits="userSpaceOnUse"
                                      >
                                        <feFlood
                                          floodOpacity={0}
                                          result="BackgroundImageFix"
                                        />
                                        <feColorMatrix
                                          in="SourceAlpha"
                                          result="hardAlpha"
                                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                        />
                                        <feOffset />
                                        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                        <feBlend
                                          in2="BackgroundImageFix"
                                          result="effect1_dropShadow_374_135180"
                                        />
                                        <feBlend
                                          in="SourceGraphic"
                                          in2="effect1_dropShadow_374_135180"
                                          result="shape"
                                        />
                                      </filter>
                                    </defs>
                                  </svg>
                                  Germany (+49)
                                </span>
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                role="menuitem"
                              >
                                <span className="inline-flex items-center">
                                  <svg
                                    className="me-2 h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 20 15"
                                  >
                                    <rect
                                      width="19.1"
                                      height="13.5"
                                      x=".25"
                                      y=".75"
                                      fill="#fff"
                                      stroke="#F5F5F5"
                                      strokeWidth=".5"
                                      rx="1.75"
                                    />
                                    <mask
                                      id="a"
                                      style={{ maskType: "luminance" }}
                                      width={20}
                                      height={15}
                                      x={0}
                                      y={0}
                                      maskUnits="userSpaceOnUse"
                                    >
                                      <rect
                                        width="19.1"
                                        height="13.5"
                                        x=".25"
                                        y=".75"
                                        fill="#fff"
                                        stroke="#fff"
                                        strokeWidth=".5"
                                        rx="1.75"
                                      />
                                    </mask>
                                    <g mask="url(#a)">
                                      <path
                                        fill="#F44653"
                                        d="M13.067.5H19.6v14h-6.533z"
                                      />
                                      <path
                                        fill="#1035BB"
                                        fillRule="evenodd"
                                        d="M0 14.5h6.533V.5H0v14z"
                                        clipRule="evenodd"
                                      />
                                    </g>
                                  </svg>
                                  France (+33)
                                </span>
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div className="relative w-full">
                          <input
                            type="text"
                            id="phone-input"
                            className="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            placeholder="123-456-7890"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="Pincode"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {" "}
                        Pincode{" "}
                      </label>
                      <input
                       type="text"
                       name="pincode"
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.pincode}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        placeholder="Pincode"
                        required
                      />
                        <div className="error">
                    {formik.touched.pincode && formik.errors.pincode}
                  </div>
                    </div>
                    
                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                      >
                        <svg
                          className="h-5 w-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 12h14m-7 7V5"
                          />
                        </svg>
                        Add new address
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Payment
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="credit-card"
                            aria-describedby="credit-card-text"
                            type="radio"
                            name="payment-method"
                            defaultValue
                            className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                            defaultChecked
                          />
                        </div>
                        <div className="ms-4 text-sm">
                          <label
                            htmlFor="credit-card"
                            className="font-medium leading-none text-gray-900 dark:text-white"
                          >
                            {" "}
                            Credit Card{" "}
                          </label>
                          <p
                            id="credit-card-text"
                            className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                          >
                            Pay with your credit card
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <button
                          type="button"
                          className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        >
                          Delete
                        </button>
                        <div className="h-3 w-px shrink-0 bg-gray-200 dark:bg-gray-700" />
                        <button
                          type="button"
                          className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="pay-on-delivery"
                            aria-describedby="pay-on-delivery-text"
                            type="radio"
                            name="payment-method"
                            defaultValue
                            className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                          />
                        </div>
                        <div className="ms-4 text-sm">
                          <label
                            htmlFor="pay-on-delivery"
                            className="font-medium leading-none text-gray-900 dark:text-white"
                          >
                            {" "}
                            Payment on delivery{" "}
                          </label>
                          <p
                            id="pay-on-delivery-text"
                            className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                          >
                            +$15 payment processing fee
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <button
                          type="button"
                          className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        >
                          Delete
                        </button>
                        <div className="h-3 w-px shrink-0 bg-gray-200 dark:bg-gray-700" />
                        <button
                          type="button"
                          className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="paypal-2"
                            aria-describedby="paypal-text"
                            type="radio"
                            name="payment-method"
                            defaultValue
                            className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                          />
                        </div>
                        <div className="ms-4 text-sm">
                          <label
                            htmlFor="paypal-2"
                            className="font-medium leading-none text-gray-900 dark:text-white"
                          >
                            {" "}
                            Paypal account{" "}
                          </label>
                          <p
                            id="paypal-text"
                            className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                          >
                            Connect to your account
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <button
                          type="button"
                          className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        >
                          Delete
                        </button>
                        <div className="h-3 w-px shrink-0 bg-gray-200 dark:bg-gray-700" />
                        <button
                          type="button"
                          className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Delivery Methods
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="dhl"
                            aria-describedby="dhl-text"
                            type="radio"
                            name="delivery-method"
                            defaultValue
                            className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                            defaultChecked
                          />
                        </div>
                        <div className="ms-4 text-sm">
                          <label
                            htmlFor="dhl"
                            className="font-medium leading-none text-gray-900 dark:text-white"
                          >
                            {" "}
                            $15 - DHL Fast Delivery{" "}
                          </label>
                          <p
                            id="dhl-text"
                            className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                          >
                            Get it by Tommorow
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="fedex"
                            aria-describedby="fedex-text"
                            type="radio"
                            name="delivery-method"
                            defaultValue
                            className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                          />
                        </div>
                        <div className="ms-4 text-sm">
                          <label
                            htmlFor="fedex"
                            className="font-medium leading-none text-gray-900 dark:text-white"
                          >
                            {" "}
                            Free Delivery - FedEx{" "}
                          </label>
                          <p
                            id="fedex-text"
                            className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                          >
                            Get it by Friday, 13 Dec 2023
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="express"
                            aria-describedby="express-text"
                            type="radio"
                            name="delivery-method"
                            defaultValue
                            className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                          />
                        </div>
                        <div className="ms-4 text-sm">
                          <label
                            htmlFor="express"
                            className="font-medium leading-none text-gray-900 dark:text-white"
                          >
                            {" "}
                            $49 - Express Delivery{" "}
                          </label>
                          <p
                            id="express-text"
                            className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                          >
                            Get it today
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="voucher"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {" "}
                    Enter a gift card, voucher or promotional code{" "}
                  </label>
                  <div className="flex max-w-md items-center gap-4">
                    <input
                      type="text"
                      id="voucher"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder
                      required
                    />
                    <button
                      type="button"
                      className="flex items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                <div className="flow-root">
                  <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Subtotal
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        $8,094.00
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Savings
                      </dt>
                      <dd className="text-base font-medium text-green-500">
                        0
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Store Pickup
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        $99
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Tax
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        $199
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">
                        Total
                      </dt>
                      <dd className="text-base font-bold text-gray-900 dark:text-white">
                        $8,392.00
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="space-y-3">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Proceed to Payment
                  </button>
                  <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    One or more items in your cart require an account.{" "}
                    <a
                      href="#"
                      title
                      className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                    >
                      Sign in or create an account now.
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </form>
        </section>
      </Container>
    </>
  );
};

export default Checkout;
