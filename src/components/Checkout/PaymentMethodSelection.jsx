import React from "react";

const PaymentMethodSelection = ({ paymentMethod, setPaymentMethod }) => {
  return (
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
        {/*  */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                type="radio"
                id="razorpay"
                name="paymentMethod"
                value="Stripe"
                checked={paymentMethod === "Stripe"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
              />
            </div>
            <div className="ms-4 text-sm">
              <label
                htmlFor="Stripe"
                className="font-medium leading-none text-gray-900 dark:text-white"
              >
                Stripe PAyment
              </label>
              <p
                id="Stripe"
                className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
              >
                Phonepe , Google pay , Paytm etc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSelection;
