import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from "../features/users/userSlice";
import productReducer from "../features/products/productSlice";
import pCategoryReducer from "../features/pcategory/pcategorySlice";
import contactReducer from "../features/contact/contactSlice";
import blogReducer from "../features/blogs/blogSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    pCategory: pCategoryReducer,
    blog: blogReducer,
    contact: contactReducer,
  },
});
// Define persist config
// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['auth'] // only auth will be persisted
// };

// // Combine reducers
// const rootReducer = combineReducers({
//   auth: authReducer,
//   product: productReducer,
//   pCategory: pCategoryReducer,
//   blog: blogReducer,
//   contact: contactReducer,
// });

// // Create persisted reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Create store
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ['persist/PERSIST'],
//       },
//     }),
// });

// // Create persistor
// export const persistor = persistStore(store);