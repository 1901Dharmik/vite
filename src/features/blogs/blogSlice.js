import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { blogService } from "./blogService";
import { toast } from "react-toastify";

// export const getAllBlogs = createAsyncThunk(
//   "blogs/get-blogs",
//   async (thunkAPI) => {
//     try {
//       const blogs = await blogService.getBlogs();
//       const publishedBlogs = blogs.filter(blog => blog.status === 'published');
//       return publishedBlogs;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
export const getAllBlogs = createAsyncThunk(
  "blogs/get-blogs",
  async ({ page, limit }, thunkAPI) => {
    try {
      const response = await blogService.getBlogs(page, limit);
      console.log("res",response);
      const publishedBlogs = response.blogs.filter(blog => blog.status === 'published');
      console.log(publishedBlogs);
    
      return {
        totalBlogs: response.totalBlogs,
        page: response.page,
        limit: response.limit,
        blogs: publishedBlogs
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getABlog = createAsyncThunk(
  "blogs/get-blog",
  async (id,thunkAPI) => {
    try {
      return await blogService.getBlog(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const likeBlog = createAsyncThunk(
  "blogs/like-blog",
  async (blogId, thunkAPI) => {
    try {
      return await blogService.likeBlog(blogId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const dislikeBlog = createAsyncThunk(
  "blog/dislike-blog",
  async (blogId, thunkAPI) => {
    try {
      return await blogService.dislikeBlog(blogId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);



const blogState = {
  blogs: [],
  totalBlogs: 0,
  page: 1,
  limit: 2,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const blogSlice = createSlice({
  name: "blog",
  initialState: blogState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        // state.blog = action.payload;
        state.blogs = action.payload.blogs;
        state.totalBlogs = action.payload.totalBlogs;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getABlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABlog.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.singleBlog = action.payload;
        // state.message = "Product added to wishlist successfully";
      })
      .addCase(getABlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // state.message = action.payload;
        toast.error(action.error);
      })
      .addCase(likeBlog.fulfilled, (state, action) => {
        state.isSuccess = true;
        if (state.singleBlog) {
          state.singleBlog = action.payload;
        }
      })
      .addCase(dislikeBlog.fulfilled, (state, action) => {
        state.isSuccess = true;
        if (state.singleBlog) {
          state.singleBlog = action.payload;
        }
      });
      // .addCase(likeBlog.fulfilled, (state, action) => {
      //   const updatedBlog = action.payload;
      //   state.blogs = state.blogs.map((blog) =>
      //     blog._id === updatedBlog._id ? updatedBlog : blog
      //   );
      //   toast.success("Blog liked successfully");
      // })
      // .addCase(dislikeBlog.fulfilled, (state, action) => {
      //   const updatedBlog = action.payload;
      //   state.blogs = state.blogs.map((blog) =>
      //     blog._id === updatedBlog._id ? updatedBlog : blog
      //   );
      //   toast.success("Blog disliked successfully");
      // })
            
   

  },
});

export default blogSlice.reducer;
// loginUser
