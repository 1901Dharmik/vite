import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import StatesData from "../constant/mock";
import {
  createAnOrder,
  deleteUserCart,
  resetState,
  addAddressByUser,
  getUserCart,
} from "../features/users/userSlice";
import { config } from "../utils/axiosConfig";
import states from "../constant/mock";
import triggerNotification from "../components/Toast";

const shippingSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  address: yup.string().required("Address is required"),
  landmark: yup.string().required("Landmark is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  country: yup.string().required("Country is required"),
  pincode: yup
    .number()
    .required("Pincode is required")
    .test(
      "len",
      "Must be exactly 6 digits",
      (val) => val && val.toString().length === 6
    ),
  phone: yup
    .number()
    .required("Phone number is required")
    .test(
      "len",
      "Must be exactly 10 digits",
      (val) => val && val.toString().length === 10
    ),
});

const Chexkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state?.auth?.user?.cart);

  const authState = useSelector((state) => state?.auth);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [cartProductState, setCartProductState] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [address, setAddress] = useState("address not Found");
  // console.log(address,"address");
  console.log(authState, "authState");
  // TODO : ADD and remove address by user also select address
  useEffect(() => {
    dispatch(getUserCart());
  }, [dispatch]);

  useEffect(() => {
    let sum = 0;
    cartState?.forEach((item) => {
      sum += item.quantity * item.price;
    });
    setTotalAmount(sum);
  }, [cartState]);

  useEffect(() => {
    if (authState?.isLoading) {
      // You can add a loading indicator here if needed
      console.log("Order is being processed...");
    } else if (authState?.orderedProduct?.success) {
      triggerNotification("success", "Order placed successfully!");

      navigate("/my-orders");
      dispatch(resetState());
    } else if (authState?.orderedProduct?.isError) {
      triggerNotification(
        "error",
        authState?.message || "An error occurred while placing the order"
      );
      dispatch(resetState());
    }
  }, [authState, navigate, dispatch]);

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
        dispatch(deleteUserCart());
        dispatch(resetState());
        triggerNotification("success", "Order Placed Suceessfully");
        navigate("/my-orders");
      },
      prefill: {
        name: "Dharmik",
        email: "dharmikvaghela2003@gmail.com",
        contact: "8490059352",
      },
      notes: {
        address: "Sajivan Office",
      },
      theme: {
        color: "#206c43",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const checkoutHandler = async () => {
    if (paymentMethod === "Razorpay") {
      await handleRazorpayPayment();
    } else if (paymentMethod === "COD") {
      try {
        await dispatch(
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
        localStorage.removeItem("address");
        dispatch(deleteUserCart());
        await dispatch(resetState());
        alert("Order placed successfully with Cash on Delivery");
        navigate("/my-orders");
      } catch (error) {
        triggerNotification(
          "error",
          error.message || "Failed to place order. Please try again."
        );
      }
    }
  };

  // useEffect(() => {
  //   if (isSuccess) {
  //     triggerNotification("success", "Order placed successfully!");
  //     localStorage.removeItem("address");
  //     dispatch(deleteUserCart());
  //     if (redirectUrl) {
  //       navigate(redirectUrl);
  //     } else {
  //       navigate("/my-orders");
  //     }
  //     dispatch(resetState());
  //   }
  //   if (isError) {
  //     triggerNotification(
  //       "error",
  //       errorMessage || "Failed to place order. Please try again."
  //     );
  //   }
  // }, [isSuccess, isError, errorMessage, redirectUrl, navigate, dispatch]);

  // if (isLoading) {
  //   return <Loader />;
  // }
  const formik = useFormik({
    initialValues: {
      firstName: `${authState?.user?.firstname || ""}`,
      lastName: `${authState?.user?.lastname || ""}`,
      address: "",
      landmark: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phone: `${authState?.user?.mobile || ""}`,
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
      {" "}
      <Meta title="Checkout" />
      <BreadCrumb title="Checkout" />
      <Container>
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
          <form
            onSubmit={formik.handleSubmit}
            className="mx-auto max-w-screen-xl px-4 2xl:px-0"
          >
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
                        placeholder={authState?.user?.firstname}
                        name="firstName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}
                        defaultValue={authState?.user?.firstname}
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
                        defaultValue={authState?.user?.lastname}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        required
                      />
                      <div className="error">
                        {formik.touched.lastName && formik.errors.lastName}
                      </div>
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
                        <option value="" isabled selected>
                          Select Country
                        </option>
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
                          State / Province *{" "}
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
                        <option value="" disabled selected>
                          Select state
                        </option>
                        {states.map((state) => (
                          <option key={state.value} value={state.value}>
                            {state.label}
                          </option>
                        ))}
                      </select>

                      <div className="error">
                        {formik.touched.state && formik.errors.state}
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
                        type="number"
                        minLength={6}
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

                    <div>
                      <label
                        htmlFor="Phone"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {" "}
                        Phone No{" "}
                      </label>
                      <input
                        type="number"
                        name="phone"
                        minLength={10}
                        maxLength={10}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        placeholder="phone no"
                        required
                      />
                      <div className="error">
                        {formik.touched.phone && formik.errors.phone}
                      </div>
                    </div>
                  </div>
                </div>
                <hr />

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Select Payment Method
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            type="radio"
                            id="cod"
                            name="paymentMethod"
                            value="COD"
                            checked={paymentMethod === "COD"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            defaultValue
                            className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                            defaultChecked
                          />
                        </div>
                        <div className="ms-4 text-sm">
                          <label
                            htmlFor="cod"
                            className="font-medium leading-none text-gray-900 dark:text-white"
                          >
                            Case On Delivery
                          </label>
                          <p
                            id="dhl-text"
                            className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                          >
                            {/* Get it by Tommorow */}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            type="radio"
                            id="razorpay"
                            name="paymentMethod"
                            value="Razorpay"
                            checked={paymentMethod === "Razorpay"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                          />
                        </div>
                        <div className="ms-4 text-sm">
                          <label
                            htmlFor="razorpay"
                            className="font-medium leading-none text-gray-900 dark:text-white"
                          >
                            Pay With Cards & UPI
                          </label>
                          <p
                            id="razorpay"
                            className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                          >
                            Phonepe , Google pay , Paytm etc.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <>
                {/* left side */}
                <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                  <div className="mx-auto  bg-white max-w-7xl px-4  ">
                    <div className=" border-gray-200 ">
                      <h1 className=" text-center text-2xl my-5 font-semibold tracking-tight text-gray-900">
                        Your Cart
                      </h1>
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {cartState &&
                            cartState?.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product?.productId?.images[0]?.url}
                                    alt="no img found"
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={product.href}>
                                          {product?.productId?.title}
                                        </a>
                                      </h3>
                                      <p className="ml-4">
                                        ₹ {product?.price}/-
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {product?.productId?.category}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="text-gray-500">
                                      <label
                                        htmlFor="quantity"
                                        className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                      >
                                        Qty
                                      </label>
                                      {product?.quantity}
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="flow-root">
                    <div className="my-3 divide-y divide-gray-200 dark:divide-gray-800 mx-4">
                      <dl className="flex items-center justify-between gap-4 py-3">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Subtotal ({cartState?.length ? cartState.length : ""}{" "}
                          Item)
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          ₹ {totalAmount}
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4 py-3">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Tax is Inclusive (12%)
                        </dt>
                        <dd className="text-base font-medium text-gray-800">
                          ₹ {tax.toFixed(2)}
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4 py-3">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Delivery Charges
                        </dt>
                        <dd className="text-base font-medium text-green-500 dark:text-white">
                          Free
                        </dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4 py-3">
                        <dt className="text-base font-bold text-gray-900 dark:text-white">
                          Total
                        </dt>
                        <dd className="text-base font-bold text-gray-900 dark:text-white">
                          ₹ {totalAmount}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="space-y-3 mx-6">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-md font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Place Order
                      {/* {isLoading ? "Processing..." : "Place Order"} */}
                    </button>
                  </div>
                </div>
              </>
            </div>
          </form>
        </section>
      </Container>
    </>
  );
};

export default Chexkout;
