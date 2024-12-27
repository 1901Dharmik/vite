import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";
// import { toast } from "sonner";
import axios from "axios";
import triggerNotification from "../../components/Toast";
// import { setTokenInSessionStorage } from "../../utils/axiosConfig";
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    return JSON.parse(savedCart);
  }
  return [];
};

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getUserProductWishlist = createAsyncThunk(
  "user/wishlist",
  async (thunkAPI) => {
    try {
      return await authService.getUserWishlist();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addProdToCart = createAsyncThunk(
  "user/cart/add",
  async (cartData, thunkAPI) => {
    try {
      return await authService.addToCart(cartData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addAddressByUser = createAsyncThunk(
  "user/save-address",
  async (address, thunkAPI) => {
    try {
      return await authService.saveAddress(address);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// export const saveAddress = createAsyncThunk(
//   'address/saveAddress',
//   async (address, { rejectWithValue }) => {
//     try {
//       const response = await axios.put('/api/user/address', { address });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const getUserCart = createAsyncThunk(
  "user/cart/get",
  async (thunkAPI) => {
    try {
      return await authService.getCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteCartProduct = createAsyncThunk(
  "user/cart/product/delete",
  async (id, thunkAPI) => {
    try {
      return await authService.removeProductFromCart(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateCartProduct = createAsyncThunk(
  "user/cart/product/update",
  async (cartDetail, thunkAPI) => {
    try {
      return await authService.updateProductFromCart(cartDetail);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateProfile = createAsyncThunk(
  "user/user/update",
  async (userDetail, thunkAPI) => {
    try {
      return await authService.updateUser(userDetail);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAnOrder = createAsyncThunk(
  "user/cart/create-order",
  async (orderDetail, thunkAPI) => {
    try {
      return await authService.createOrder(orderDetail);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrders = createAsyncThunk(
  "user/orders/get",
  async (thunkAPI) => {
    try {
      return await authService.getUserOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const forgotPasswordToken = createAsyncThunk(
  "user/password/token",
  async (data, thunkAPI) => {
    try {
      return await authService.forgotPassToken(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/password/reset",
  async (data, thunkAPI) => {
    try {
      return await authService.resetPass(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteUserCart = createAsyncThunk(
  "user/cart/delete",
  async (thunkAPI) => {
    try {
      return await authService.emptyCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const getCustomerformLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;
// const getCustomerformLocalStorage = sessionStorage.getItem("customer")
//   ? JSON.parse(sessionStorage.getItem("customer"))
//   : null;
// const initialState = {
//   user: getCustomerformLocalStorage,
//   // user: {
//   //   cart: [],
//   //   isLoading: false,
//   //   isSuccess: false,
//   //   isError: false,
//   // },
//   // order: {
//   //   isLoading: false,
//   //   isSuccess: false,
//   //   isError: false,
//   //   errorMessage: '',
//   // },
//   isError: false,
//   isSuccess: false,
//   invoicePath: "",
//   // redirectTo: null,
//   isLoading: false,
//   status: "idle",
//   message: "",
//   // shouldRedirectToLogin: false,
//   orderedProducts: null,
// };
const initialState = {
  user: getCustomerformLocalStorage,
  isError: '',
  isSuccess: '',
  isLoading: '',
  message: '',
};
export const resetState = createAction("Reset_all");
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createduser = action.payload;

        if (state.isSuccess == true) {
          triggerNotification("success", "User created successfully");
          state.shouldRedirectToLogin = true;
          //  window.location.href = '/login';
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        if (state.isError === true) {
          toast.error(action.error);
        }
        // state.message = action.payload
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      // .addCase(loginUser.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = false;
      //   state.isSuccess = true;
      //   state.user = action.payload;

      //   // state.user = action.payload;
      //   if (state.isSuccess === true) {
      //     localStorage.setItem("token", action.payload.token);
      //     triggerNotification("success", "User Logged in successfully");
      //   }
      //   // if (state.isSuccess === true) {
      //   //   // Use sessionStorage instead of localStorage
      //   //   setTokenInSessionStorage(action.payload);
      //   //   triggerNotification("success", "User Logged in successfully");
      //   // }
      // })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        // if (state.isSuccess === true) {
        // triggerNotification("success", "User Logged in successfully");
        // }
      })
      // .addCase(loginUser.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.isSuccess = false;
      //   if (state.isError === true) {
      //     triggerNotification("error",action.payload.message);
      //   }
      //   // state.message = action.payload
      // })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;

        // Check if action.payload is defined and has a message property
        const errorMessage =
          action.payload?.response.data.message ||
          "An unknown error occurred. Please try again.";

        // Trigger notification with the error message
        triggerNotification("error", errorMessage);
      })
      .addCase(getUserProductWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProductWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user.wishlist = action.payload;
      })
      .addCase(getUserProductWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addProdToCart.pending, (state) => {
        state.isLoading = true;
      })
      // .addCase(addProdToCart.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = false;
      //   state.isSuccess = true;
      //   // state.cartProduct = action.payload;
      //   // localStorage.setItem('cart', JSON.stringify(state.auth?.user?.cart));
      //   // state.user.cart = action.payload;
      //   state.user.cart.push(action.payload);
      //   if (state.isSuccess === true) {
      //    triggerNotification("success","Product Added Successfully");
      //   }
      // })
      .addCase(addProdToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;

        // Initialize state.user.cart if it doesn't exist
        if (!state.user) {
          state.user = {};
        }
        if (!state.user.cart) {
          state.user.cart = [];
        }

        // Add the product to the cart
        state.user.cart.push(action.payload);

        // Trigger notification
        if (state.isSuccess === true) {
          triggerNotification("success", "Product Added Successfully");
        }
      })
      .addCase(addProdToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        if (state.isError === true) {
          triggerNotification(
            "error",
            action?.payload?.response?.data?.message
          );
        }
      })
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        // state.cartProducts = action.payload;
        // localStorage.getItem('cart', JSON.stringify(state.auth?.user?.cart));
        state.user.cart = action.payload;
        // if (state.isSuccess === true) {
        //  triggerNotification("success","Cart Fetched Success");
        // }
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(deleteCartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        // state.user.cart = action.payload;
        state.deletedCartProduct = action.payload;
        // localStorage.setItem('cart', JSON.stringify(state.auth.user.cart));
        if (state.isSuccess) {
          triggerNotification("info", "Product Deldted From Cart Successfully");
        }
      })
      .addCase(deleteCartProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(updateCartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCartProduct = action.payload;
      })
      .addCase(updateCartProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createAnOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAnOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderedProducts = action.payload;
        state.invoicePath = action.payload.invoicePath;
        // state.order.redirectUrl = action.payload.redirectUrl;
        if (state?.isSuccess) {
          triggerNotification("success", "Cart Fetched Success");
        }
      })
      .addCase(createAnOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getOrderedProducts = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedUser = action.payload;
        if ((state.isSuccess = true)) {
          let currentUserData = JSON.parse(localStorage.getItem("customer"));
          let newUserData = {
            _id: currentUserData?._id,
            token: currentUserData?.token,
            fistname: action?.payload?.firstname,
            lastname: action?.payload?.lastname,
            email: action?.payload?.email,
            mobile: action?.payload?.mobile,
          };
          localStorage.setItem("customer", JSON.stringify(newUserData));
          state.user = newUserData;
          triggerNotification("success", "Profile updated successfully");
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(forgotPasswordToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPasswordToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.token = action.payload;
        if (state.isSuccess) {
          triggerNotification("success", "Email sent Successfully");
        }
      })
      .addCase(forgotPasswordToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pass = action.payload;
        if (state.isSuccess) {
          triggerNotification("success", "resetPassword Successfully");
        }
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(deleteUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCart = action.payload;
      })
      .addCase(deleteUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addAddressByUser.fulfilled, (state, action) => {
        // state.status = 'succeeded';
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user.address = action.payload;
      })
      .addCase(resetState, () => initialState);
  },
});

export default authSlice.reducer;
// loginUser
