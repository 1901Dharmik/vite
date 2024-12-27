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
  getUserCart
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
    dispatch(getUserCart());
  }, [dispatch]);
console.log("cart state: " + cartState);

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
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Rapple</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp; /&nbsp;
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">shopping@rapple.com</p>
              <h4 className="mb-3">Shipping Address</h4>
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                  <select
                    className="form-control form-select"
                    id="country"
                    name="country"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.country}
                  >
                    <option value="selected">Select Country</option>
                    <option value="India">India</option>
                  </select>
                  <div className="error">
                    {formik.touched.country && formik.errors.country}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                    name="firstName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                  />
                  <div className="error">
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                    name="lastName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                  />
                  <div className="error">
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Address(Area and Street)"
                    className="form-control"
                    name="address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                  />
                  <div className="error">
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Landmark"
                    className="form-control"
                    name="landmark"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.landmark}
                  />
                  <div className="error">
                    {formik.touched.landmark && formik.errors.landmark}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="City"
                    className="form-control"
                    name="city"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.city}
                  />
                  <div className="error">
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <select
                    name="state"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.state}
                    className="form-control form-select"
                    id="state"
                  >
                    <option value="" defaultValue="selected" disabled>
                      Select State
                    </option>
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
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Pincode"
                    className="form-control"
                    name="pincode"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.pincode}
                  />
                  <div className="error">
                    {formik.touched.pincode && formik.errors.pincode}
                  </div>
                </div>
                <div className="w-100">
                  <h4 className="mb-3">Payment Method</h4>
                  <div className="d-flex align-items-center">
                    <input
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="cod" className="mb-0 ms-2">
                      Cash on Delivery
                    </label>
                  </div>
                  <div className="d-flex align-items-center mt-2">
                    <input
                      type="radio"
                      id="razorpay"
                      name="paymentMethod"
                      value="Razorpay"
                      checked={paymentMethod === "Razorpay"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="razorpay" className="mb-0 ms-2">
                      Razorpay
                    </label>
                  </div>
                </div>
                <div className="w-100 mt-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Return to Cart
                    </Link>
                    <button
                      type="submit"
                      className="button border-0 align-item-center"
                    >
                      Place order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="col-5">
            <div className="border-bottom py-4">
              {cartState &&
                cartState.map((item, index) => (
                  <div
                    key={index}
                    className="d-flex gap-10 mb-2 align-items-center"
                  >
                    <div className="w-75 d-flex gap-10">
                      <div className="w-25 position-relative">
                        <span
                          style={{ top: "-10px", right: "2px" }}
                          className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                        >
                          {item.quantity}
                        </span>
                        <img
                          src={item.productId.images[0]?.url}
                          alt="product"
                          width={80}
                          height={80}
                        />
                      </div>
                      <div>
                        <h5 className="total-price">{item.productId.title}</h5>
                        <p className="total-price">{item.productId.brand}</p>
                        <p className="total-price">
                          Qty: {item.quantity} Price: {item.price}
                        </p>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="total">₹ {item.quantity * item.price}</h5>
                    </div>
                  </div>
                ))}
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">
                  Price ({cartState?.length ? cartState.length : ""} Item)
                </p>
                <p className="total-price">₹ {totalAmount}</p>
              </div>
              <div className="">
                <p className="total-price">
                  Tax is Inclusive (12%) : {tax.toFixed(2)}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Delivery Charges</p>
                <p className="mb-0 total-price" style={{ color: "#388e3c" }}>
                  Free
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
              <h4 className="total">Total Amount</h4>
              <h5 className="total">₹ {totalAmount}</h5>
            </div>
          </div>
        </div>
      </Container>
      {/* <div>{shippingInfo}</div> */}
    </>
  );
};

export default Checkout;
