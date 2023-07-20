import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import unSplaceHomeReducer from "./slices/unSplaceHomeSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    unSplaceHome: unSplaceHomeReducer,
  },
});
export default store;
