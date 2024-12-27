import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { createAnOrder, deleteUserCart, resetState } from '../features/users/userSlice';
import triggerNotification from './Toast';
import { useNavigate } from 'react-router-dom';

const StripeCheckoutForm = ({ totalAmount, cartProductState, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          // You can add billing details here if needed
        },
      },
    });

    if (error) {
      triggerNotification("error", error.message);
    } else if (paymentIntent.status === "succeeded") {
      try {
        await dispatch(createAnOrder({
          totalPrice: totalAmount,
          totalPriceAfterDiscount: totalAmount,
          orderItems: cartProductState,
          paymentInfo: {
            stripePaymentIntentId: paymentIntent.id,
            status: paymentIntent.status,
          },
          shippingInfo: JSON.parse(sessionStorage.getItem("address")),
          paymentMethod: "Stripe",
        })).unwrap();

        dispatch(deleteUserCart());
        sessionStorage.removeItem("address");
        dispatch(resetState());
        triggerNotification("success", "Payment successful and order placed!");
        navigate("/my-orders");
      } catch (error) {
        triggerNotification("error", "Failed to create order. Please contact support.");
      }
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button 
        type="submit" 
        disabled={!stripe || isProcessing} 
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isProcessing ? "Processing..." : `Pay ₹${totalAmount}`}
      </button>
    </form>
  );
};

export default StripeCheckoutForm;