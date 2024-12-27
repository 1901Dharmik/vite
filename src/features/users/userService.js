import axios from "axios";
import { base_url , config} from "../../utils/axiosConfig";

const register = async (userData) => {
  const response = await axios.post(`${base_url}user/register`, userData);
  if (response.data) {
    return response.data;
  }
};

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/login`, userData);
  if (response.data) {
    localStorage.setItem("customer", JSON.stringify(response.data));
    // sessionStorage.setItem("customer", JSON.stringify(response.data));
    
    //  // Set session expiration (e.g., 5 minutes)
    //  const expirationTime = Date.now() + 300000; // 5 minutes in milliseconds
    //  sessionStorage.setItem("sessionExpiration", expirationTime);
    // return response.data;
  }
};

const getUserWishlist = async () => {
  const response = await axios.get(`${base_url}user/wishlist`, config);
  if (response.data) {
    return response.data;
  }
};
const addToCart = async(cartData)  => {
  const response = await axios.post(`${base_url}user/cart`,cartData ,config);
  if (response.data) {
    return response.data;
  }
}
const saveAddress = async (address) => {
  const response = await axios.put(`${base_url}user/save-address`,{address}, config);
  return response.data;
};
const getCart = async()  => {
  const response = await axios.get(`${base_url}user/cart` ,config);
  if (response.data) {
    return response.data;
  }
}
const removeProductFromCart = async (cartItemId) => {
  const response = await axios.delete(`${base_url}user/delete-product-cart/${cartItemId}`,config);
  if (response.data) {
    return response.data;
  }
}

const updateProductFromCart = async (cartDetail) => {
  console.log(cartDetail);
  const response = await axios.delete(`${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`,config);
  if (response.data) {
    return response.data;
  }
}
const createOrder = async(orderDetail)  => {
  const response = await axios.post(`${base_url}user/cart/create-order`,orderDetail,config);
  if (response.data) {
    return response.data;
    }
}
const getUserOrders = async () => {
  const response = await axios.get(`${base_url}user/getmyorders`,config);
  if (response.data) {
    return response.data;
  }
};

const updateUser = async (data) => {
  const response = await axios.put(
    `${base_url}user/edit-user`,
    data.data,
    data.config2
  );
  if (response.data) {
    return response.data;
  }
};

const forgotPassToken = async (data) => {
  const response = await axios.post(
    `${base_url}user/forgot-password-token`,
    data
  );
  if (response.data) {
    return response.data;
  }
};

const resetPass = async (data) => {
  const response = await axios.put(
    `${base_url}user/reset-password/${data.token}`,
    { password: data?.password }
  );
  if (response.data) {
    return response.data;
  }
};

const emptyCart = async () => {
  const response = await axios.delete(`${base_url}user/empty-cart`, config);
  if (response.data) {
    return response.data;
  }
};
// const addToWishlist = async (prodId) => {
//   const response = await axios.put(
//     `${base_url}product/wishlist`,
//     { prodId },
//     config
//   );
//   if (response.data) {
//     return response.data;
//   }
// };
export const authService = {
  register,
  login,
  getUserWishlist,
  addToCart,
  getCart,
  removeProductFromCart,
  updateProductFromCart,
  createOrder,
  getUserOrders,
  updateUser,
  forgotPassToken,
  resetPass,
  emptyCart,
  saveAddress,
  
};
