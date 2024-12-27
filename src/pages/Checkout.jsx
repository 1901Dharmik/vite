import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
// Components
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import triggerNotification from "../components/Toast";
import CartItems from "../components/Checkout/CartItems";
import DeliveryDetailsForm from "../components/Checkout/DeliveryDetailsForm";
import PaymentMethodSelection from "../components/Checkout/PaymentMethodSelection";

// Redux actions
import {
  createAnOrder,
  deleteUserCart,
  resetState,
  addAddressByUser,
  getUserCart,
} from "../features/users/userSlice";

// Constants and utils
import { config } from "../utils/axiosConfig";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const TAX_RATE = 0.12;
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY
const RAZORPAY_CHACKOUT_API = import.meta.env.VITE_RAZORPAY_CHACKOUT_API
const RAZORPAY_SCRIPT_URL = import.meta.env.VITE_RAZORPAY_SCRIPT_URL
const ROZERPAY_PAYMENT_VERIFICATION_URL = import.meta.env.VITE_ROZERPAY_PAYMENT_VERIFICATION_URL
const STRIPE_PAYMENT_INTENT = import.meta.env.VITE_STRIPE_PAYMENT_INTENT
import * as yup from "yup";

const shippingSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  address: yup.string().required("Address is required"),
  landmark: yup.string().required("Landmark is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  country: yup.string().required("Country is required"),
  pincode: yup
    .string()
    .matches(/^\d{6}$/, "Must be exactly 6 digits")
    .required("Pincode is required"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Must be exactly 10 digits")
    .required("Phone number is required"),
});
const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  // Redux selectors
  const cartState = useSelector((state) => state?.auth?.user?.cart);
  const { user, isLoading, orderedProduct } = useSelector(
    (state) => state?.auth
  );

  // State
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  // Calculate total amount and tax
  const calculateTotals = useCallback(() => {
    if (!cartState?.length) return;

    const sum = cartState.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    setTotalAmount(sum);

    const items = cartState.map((item) => ({
      product: item.productId._id,
      quantity: item.quantity,
      price: item.price,
    }));
    setCartItems(items);
  }, [cartState]);

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      firstName: user?.firstname || "",
      lastName: user?.lastname || "",
      address: "",
      landmark: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phone: user?.mobile || "",
    },
    validationSchema: shippingSchema,
    onSubmit: async (values) => {
      localStorage.setItem("address", JSON.stringify(values));
      dispatch(addAddressByUser(values));

      try {
        setIsProcessing(true);
        setError(null);
        await handleCheckout(values);
      } catch (error) {
        setError("Failed to process checkout. Please try again.");
        triggerNotification(
          "error",
          "Failed to process checkout. Please try again."
        );
      } finally {
        setIsProcessing(false);
      }
    },
  });

  // Load Razorpay script
  const loadRazorpayScript = useCallback(() => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = RAZORPAY_SCRIPT_URL;
      script.onload = () => resolve(true);
      script.onerror = () => {
        triggerNotification("error", "Failed to load payment gateway");
        resolve(false);
      };
      document.body.appendChild(script);
    });
  });

  // Handle Razorpay payment
  const handleRazorpayPayment = async (shippingInfo) => {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) return;

    try {
      const result = await axios.post(
        RAZORPAY_CHACKOUT_API,
        { amount: totalAmount },
        config
      );

      const { amount, id: order_id, currency } = result.data;

      const options = {
        key: RAZORPAY_KEY,
        amount: amount.toString(),
        currency,
        name: "Rapple",
        description: "Test Transaction",
        order_id,
        handler: async (response) => {
          const verificationData = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
          };

          const paymentResult = await axios.post(
            ROZERPAY_PAYMENT_VERIFICATION_URL,
            verificationData,
            config
          );

          await createOrder(paymentResult.data, "Razorpay", shippingInfo);
        },
        prefill: {
          name: `${formik.values.firstName} ${formik.values.lastName}`,
          email: user?.email,
          contact: formik.values.phone,
        },
        theme: {
          color: "#206c43",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      setError("Payment initialization failed");
      triggerNotification("error", "Payment initialization failed");
    }
  };

  // handle Stripe Payment Method
  //   const handleStripePayment = async (shippingInfo) => {
  //     if (!stripe || !elements) return;

  //     setIsProcessing(true);
  //     try {
  //       // Request a payment intent from the backend
  //       const { data: clientSecret } = await axios.post(
  //         "http://localhost:8000/api/user/order/create-payment-intent",
  //         { amount: totalAmount },
  //         config
  //       );

  //       // Confirm the payment
  //       const { paymentIntent, error } = await stripe.confirmCardPayment(
  //         clientSecret,
  //         {
  //           payment_method: {
  //             card: elements.getElement(CardElement),
  //             billing_details: {
  //               name: `${formik.values.firstName} ${formik.values.lastName}`,
  //               email: user?.email,
  //               phone: formik.values.phone,
  //             },
  //           },
  //         }
  //       );

  //       if (error) {
  //         throw new Error(error.message);
  //       }

  //       // Create order after payment succeeds
  //       await createOrder(
  //         { stripePaymentIntentId: paymentIntent.id },
  //         "Stripe",
  //         shippingInfo
  //       );
  //     } catch (error) {
  //       setError("Stripe payment failed");
  //       triggerNotification("error", "Stripe payment failed");
  //     } finally {
  //       setIsProcessing(false);
  //     }
  //   };
  const handleStripePayment = async (shippingInfo) => {
    if (!stripe || !elements) {
      setError("Stripe has not been properly initialized");
      triggerNotification("error", "Payment system not ready");
      return;
    }

    setIsProcessing(true);

    try {
      // Validate card input before proceeding
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Card element not found");
      }

      // Convert country name to ISO 3166-1 alpha-2 code
      const getCountryCode = (countryName) => {
        const countryMap = {
          india: "IN",
          "united states": "US",
          "united kingdom": "GB",
          // Add more mappings if needed
        };
        return countryMap[countryName.toLowerCase()] || "IN"; // Default to IN for India
      };

      const countryCode = getCountryCode(formik.values.country);

      // Create payment intent
      const {
        data: { clientSecret },
      } = await axios.post(
        STRIPE_PAYMENT_INTENT,
        {
          amount: totalAmount,
          currency: "inr",
          shipping: {
            name: `${formik.values.firstName} ${formik.values.lastName}`,
            address: {
              line1: formik.values.address,
              city: formik.values.city,
              state: formik.values.state,
              postal_code: formik.values.pincode,
              country: countryCode, // Using country code instead of full name
            },
          },
        },
        config
      );

      if (!clientSecret) {
        throw new Error("Failed to get payment authorization");
      }

      // Confirm card payment
      const { paymentIntent, error: paymentError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${formik.values.firstName} ${formik.values.lastName}`,
              email: user?.email,
              phone: formik.values.phone,
              address: {
                line1: formik.values.address,
                city: formik.values.city,
                state: formik.values.state,
                postal_code: formik.values.pincode,
                country: countryCode, // Using country code instead of full name
              },
            },
          },
        });

      if (paymentError) {
        // Handle specific Stripe errors
        switch (paymentError.type) {
          case "card_error":
            throw new Error(`Card error: ${paymentError.message}`);
          case "validation_error":
            throw new Error(`Validation error: ${paymentError.message}`);
          default:
            throw new Error(paymentError.message);
        }
      }

      if (paymentIntent.status !== "succeeded") {
        throw new Error(`Payment status: ${paymentIntent.status}`);
      }

      // Create order after successful payment
      await createOrder(
        {
          stripePaymentIntentId: paymentIntent.id,
          paymentStatus: paymentIntent.status,
          paymentAmount: paymentIntent.amount,
          paymentCurrency: paymentIntent.currency,
        },
        "Stripe",
        {
          ...shippingInfo,
          country: countryCode, // Ensure the order also uses the country code
        }
      );

      triggerNotification("success", "Payment processed successfully!");
    } catch (error) {
      console.error("Stripe payment error:", error);

      let errorMessage = "Payment failed: ";
      if (error.response?.data?.message) {
        errorMessage += error.response.data.message;
      } else if (error.message) {
        errorMessage += error.message;
      } else {
        errorMessage += "An unexpected error occurred";
      }

      setError(errorMessage);
      triggerNotification("error", errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };
  // Create order
  const createOrder = async (paymentInfo, paymentMethod, shippingInfo) => {
    try {
      await dispatch(
        createAnOrder({
          totalPrice: totalAmount,
          totalPriceAfterDiscount: totalAmount,
          orderItems: cartItems,
          paymentInfo,
          shippingInfo,
          paymentMethod,
        })
      );

      localStorage.removeItem("address");
      dispatch(deleteUserCart());
      dispatch(resetState());
      navigate("/my-orders");
    } catch (error) {
      setError("Failed to create order");
      triggerNotification("error", "Failed to create order");
    }
  };

  // Handle checkout based on payment method
  const handleCheckout = async (shippingInfo) => {
    if (paymentMethod === "Razorpay") {
      await handleRazorpayPayment(shippingInfo);
    } else if (paymentMethod === "Stripe") {
      await handleStripePayment(shippingInfo);
    } else {
      await createOrder(
        { razorpayOrderId: "", razorpayPaymentId: "" },
        "COD",
        shippingInfo
      );
    }
  };

  // Effects
  useEffect(() => {
    dispatch(getUserCart());
  }, [dispatch]);

  useEffect(() => {
    calculateTotals();
  }, [calculateTotals]);

  useEffect(() => {
    if (orderedProduct?.success) {
      triggerNotification("success", "Order placed successfully!");
      navigate("/my-orders");
    } else if (orderedProduct?.isError) {
      setError("Failed to place order");
      triggerNotification("error", "Failed to place order");
    }
  }, [orderedProduct, navigate]);

  // tax calculate
  const taxRate = 0.12;
  const calculateTax = (totalAmount) => {
    return totalAmount * taxRate;
  };

  const tax = calculateTax(totalAmount);
  const cardStyle = {
    style: {
      base: {
        color: "#303238", // Text color
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4", // Placeholder color
        },
      },
      invalid: {
        color: "#fa755a", // Error text color
        iconColor: "#fa755a", // Error icon color
      },
    },
  };
  return (
    <>
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
                <DeliveryDetailsForm user={user} formik={formik} />
                <hr />
                <PaymentMethodSelection
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                />
                {paymentMethod === "Stripe" && (
                  //   <div className="bg-green-100 text-gray-800 p-8">
                  //     <CardElement
                  //     // options={cardStyle}
                  //     options={{ hidePostalCode: true }} />
                  //   </div>
                  <div className="bg-green-100 text-gray-800 p-8 rounded-lg ">
                    <div className="border border-gray-300 rounded-md p-4 bg-white focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-opacity-50">
                      <CardElement
                        options={{
                          style: {
                            base: {
                              color: "#1F2937", // Tailwind's text-gray-800
                              fontFamily: "Inter, sans-serif",
                              fontSize: "16px",
                              "::placeholder": {
                                color: "#9CA3AF", // Tailwind's text-gray-400
                              },
                            },
                            invalid: {
                              color: "#EF4444", // Tailwind's text-red-500
                            },
                          },
                          hidePostalCode: true,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <>
                {/* left side */}
                <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                  <CartItems cartState={cartState} />
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
                        <dd className="text-base font-medium text-gray-600">
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
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Place Order"}
                    </button>
                    {error && (
                      <div className="text-red-500 text-center">{error}</div>
                    )}
                    {/* Modal */}
                    {isProcessing && (
                      <div className="fixed inset-0 w-xs flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg p-6 space-y-4 text-center">
                          <span class="icon-[solar--box-bold-duotone] h-16 w-16 text-green-600 animate-pulse"></span>
                          <div className="text-lg font-semibold">
                            Processing your order...
                          </div>
                          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" />
                        </div>
                      </div>
                    )}
                 
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

export default Checkout;
