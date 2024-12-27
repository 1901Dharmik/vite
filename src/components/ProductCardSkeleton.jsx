import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div>
      <div className="w-full my-6 max-w-sm bg-white rounded-lg shadow-md p-4 animate-pulse">
        {/* Product Image Skeleton */}
        <div className="flex justify-center mb-4">
          <div className="w-full h-40 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Product Title Skeleton */}
        <div className="flex justify-between items-center mb-2">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
        </div>

        {/* Rating Skeleton */}
        <div className="flex items-center mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 bg-gray-200 rounded-full mr-1"
              ></div>
            ))}
          </div>
          <div className="h-4 bg-gray-200 rounded w-32 ml-2"></div>
        </div>

        {/* Price Skeleton */}
        <div className="flex items-center mb-2">
          <div className="h-6 bg-gray-200 rounded w-16 mr-2"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>

        {/* Description Skeleton */}
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>

        {/* Buttons Skeleton */}
        <div className="flex space-x-2">
          <div className="h-10 bg-gray-200 rounded w-1/2"></div>
          <div className="h-10 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
