import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productService } from "./productService";
import { toast } from "react-toastify";
import triggerNotification from "../../components/Toast";

// Async thunks remain the same
export const getAllProducts = createAsyncThunk(
  "product/get-all",
  async (params, thunkAPI) => {
    try {
      return await productService.getProducts(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchProducts = createAsyncThunk(
  "product/get",
  async (params, thunkAPI) => {
    try {
      return await productService.getProducts(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAProduct = createAsyncThunk(
  "product/getAProduct",
  async (id, thunkAPI) => {
    try {
      return await productService.getSingleProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "product/wishlist",
  async (prodId, thunkAPI) => {
    try {
      return await productService.addToWishlist(prodId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addRating = createAsyncThunk(
  'product/rating',
  async (data, thunkAPI) => {
    try {
      return productService.rateProduct(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Updated initial state to match your Redux structure
const initialState = {
  product: {
    status: "idle",
    data: {
      products: [],
      pagination: {
        total: 0,
        page: 1,
        totalPages: 1
      }
    },
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    error: null,
    singalproduct: null,
    rating: null
  },
  filters: {
    sort: '',
    search: '',
    page: 1,
    limit: 10,
    minPrice: '',
    maxPrice: '',
  }
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.product.isLoading = true;
        state.product.status = "loading";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.product.isError = false;
        state.product.isLoading = false;
        state.product.isSuccess = true;
        state.product.status = "success";
        state.product.data.products = action.payload.products;
        state.product.data.pagination = action.payload.pagination;
        state.product.error = null;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.product.isLoading = false;
        state.product.isError = true;
        state.product.status = "failed";
        state.product.message = action.payload;
        state.product.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(fetchProducts.pending, (state) => {
        state.product.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.product.status = 'success';
        state.product.data.products = action.payload.products;
        state.product.data.pagination = action.payload.pagination;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.product.status = 'failed';
        state.product.error = action.payload.message;
      })
      .addCase(addToWishlist.pending, (state) => {
        state.product.isLoading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.product.isError = false;
        state.product.isLoading = false;
        state.product.isSuccess = true;
        triggerNotification("success", "Product added to wishlist successfully");
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.product.isLoading = false;
        state.product.isError = true;
        toast.error(action.error);
      })
      .addCase(getAProduct.pending, (state) => {
        state.product.isLoading = true;
      })
      .addCase(getAProduct.fulfilled, (state, action) => {
        state.product.isError = false;
        state.product.isLoading = false;
        state.product.isSuccess = true;
        state.product.singalproduct = action.payload;
        state.product.message = "Product added to wishlist successfully";
      })
      .addCase(getAProduct.rejected, (state, action) => {
        state.product.isLoading = false;
        state.product.isError = true;
        toast.error(action.error);
      })
      .addCase(addRating.pending, (state) => {
        state.product.isLoading = true;
      })
      .addCase(addRating.fulfilled, (state, action) => {
        state.product.isLoading = false;
        state.product.isError = false;
        state.product.isSuccess = true;
        state.product.rating = action.payload;
        state.product.message = 'Rating added successfully!';
        if (state.product.isSuccess === true) {
          toast.success('Rating added successfully!');
        }
      })
      .addCase(addRating.rejected, (state, action) => {
        state.product.isLoading = false;
        state.product.isError = true;
        state.product.isSuccess = false;
        state.product.message = action.error;
      });
  },
});

export const { setFilters } = productSlice.actions;
export default productSlice.reducer;