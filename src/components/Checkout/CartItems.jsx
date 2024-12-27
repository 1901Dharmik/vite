import React from "react";

const CartItems = ({ cartState }) => {
  const renderCartItem = (product) => (
    <li key={product.productId._id} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={product?.productId?.images[0]?.url}
          alt={product?.productId?.title}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3>{product?.productId?.title}</h3>
          <p className="ml-4">₹ {product?.price}/-</p>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          {product?.productId?.category}
        </p>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="text-gray-500">
            <span className="mr-5">Qty: {product?.quantity}</span>
          </div>
        </div>
      </div>
    </li>
  );

  return (
    <div className="mx-auto  bg-white max-w-7xl px-4  ">
      <div className=" border-gray-200 ">
        <h1 className=" text-center text-2xl my-5 font-semibold tracking-tight text-gray-900">
          Your Cart
        </h1>
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {cartState && cartState.map(renderCartItem)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
