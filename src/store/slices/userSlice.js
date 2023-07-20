import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../actions/userAction";

const initialState = {
  loading: false,
  userInfo: null, // for user object
  userToken: localStorage.getItem("userToken"),
  error: null,
  success: false, // for monitoring the registration process.
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken");
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },

    resetUserState: (state) => initialState,
  },
  extraReducers: (builder) => {
    // login user
    builder.addCase(userLogin.pending, (state, { payload }) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = { ...state.userInfo, ...payload.data };
      state.userToken = payload.userToken;
    });
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});
// export actions
export const { logout, resetUserState } = userSlice.actions;
export default userSlice.reducer;
