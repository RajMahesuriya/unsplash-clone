import { createSlice } from "@reduxjs/toolkit";
import {
  allFilteredImages,
  getImages,
  nabc,
  searchImages,
} from "../actions/unSplaceHomeAction";

const initialState = {
  loading: false,
  homePageData: [],
  searchedImages: [],
  AllImages: null,
  error: null,
  success: false, // for monitoring the registration process.
};

const unSplaceHome = createSlice({
  name: "unSplaceHome",
  initialState,
  reducers: {
    resetState: (state) => initialState,
  },
  extraReducers: (builder) => {
    // API call for price low to high
    builder.addCase(nabc.pending, (state, { payload }) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(nabc.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.homePageData = payload;
      state.success = true;
      state.error = null;
    });
    builder.addCase(nabc.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // search images
    builder.addCase(searchImages.pending, (state, { payload }) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(searchImages.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.searchedImages = payload;
      state.success = true;
      state.error = null;
    });
    builder.addCase(searchImages.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // All images
    builder.addCase(allFilteredImages.pending, (state, { payload }) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(allFilteredImages.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.searchedImages = [...state.searchedImages, ...payload?.results];
      state.success = true;
      state.error = null;
    });
    builder.addCase(allFilteredImages.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // get images
    builder.addCase(getImages.pending, (state, { payload }) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getImages.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.homePageData = [...state.homePageData, ...payload];
      state.success = true;
      state.error = null;
    });
    builder.addCase(getImages.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});
// export actions
export const { resetState } = unSplaceHome.actions;
export default unSplaceHome.reducer;
