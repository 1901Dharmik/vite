import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";



const getProducts = async (data) => {
  const response = await axios.get(
    `${base_url}product?${data?.brand ? `brand=${data?.brand}&&` : ""}${
      data?.tag ? `tags=${data?.tag}&&` : ""
    }${data?.category ? `category=${data?.category}&&` : ""}${
      data?.minPrice ? `price[gte]=${data?.minPrice}&&` : ""
    }${data?.maxPrice ? `price[lte]=${data?.maxPrice}&&` : ""}${
      data?.sort ? `sort=${data?.sort}&&` : ""
    }`
  );
  if (response.data) {
    return response.data;
  }
};
// const getProducts = async (data) => {
//   const queryParams = [];
//   if (data?.brand) queryParams.push(`brand=${data.brand}`);
//   if (data?.tag) queryParams.push(`tags=${data.tag}`);
//   if (data?.category) queryParams.push(`category=${data.category}`);
//   if (data?.minPrice) queryParams.push(`price[gte]=${data.minPrice}`);
//   if (data?.maxPrice) queryParams.push(`price[lte]=${data.maxPrice}`);
//   if (data?.sort) queryParams.push(`sort=${data.sort}`);

//   const response = await axios.get(
//     `${base_url}product?${queryParams.join("&&")}`
//   );

//   if (response.data) {
//     return response.data;
//   }
// };
const getSingleProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`);
  if (response.data) {
    return response.data;
  }
};
const addToWishlist = async (prodId) => {
  const response = await axios.put(
    `${base_url}product/wishlist`,
    { prodId },
    config
  );
  if (response.data) {
    return response.data;
  }
};
const rateProduct = async (data) => {
  const response = await axios.put(`${base_url}product/rating`, data, config);
  if (response.data) {
    return response.data;
  }
};

export const productService = {
  getProducts,
  addToWishlist,
  getSingleProduct,
  rateProduct,
};
