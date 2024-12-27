import React from "react";
import ProductCard from "./ProductCard";
const ProductGrid = ({ products }) => {
    return (
      <div className="flex">
        {/* Filter Sidebar */}
        <div className="w-1/4 p-4">
      <h2 className="text-xl font-bold mb-4">Shop By Categories</h2>
      {/* Add your categories and filters here */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Filter By</h3>
        <div className="mt-4">
          {/* Price filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <div className="flex space-x-2 mt-2">
              <input type="number" placeholder="From" className="border p-2 rounded-md w-full" />
              <input type="number" placeholder="To" className="border p-2 rounded-md w-full" />
            </div>
          </div>
          {/* Availability */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Availability</label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">In stock (22)</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Out of stock (1)</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* Additional filters like Product Tags, Brands can go here */}
    </div>
        {/* Product Grid */}
        <div className="w-3/4 p-4 grid grid-cols-3 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} item={product} />
          ))}
        </div>
      </div>
    );
  };
  
  export default ProductGrid;
  