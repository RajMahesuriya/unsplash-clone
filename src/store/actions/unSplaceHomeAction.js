import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://api.unsplash.com";

export const nabc = createAsyncThunk(
  "homepage/nabc",
  async ({ placements, user }, { rejectWithValue }) => {
    try {
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const apiUrl = "https://unsplash.com/nabc";
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        proxyUrl + apiUrl,
        { placements, user },
        config
      );

      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const unsplashBaseUrl = "https://unsplash.com/napi/topics";

export const searchImages = createAsyncThunk(
  "homepage/searchImages",
  async ({ search }, { rejectWithValue }) => {
    try {
      // let apiUrl = `${unsplashBaseUrl}/${search}?xp=search-synonym%3Aexperiment`;
      // let apiUrl = `https://api.unsplash.com/search/photos?page=1&per_page=12&query=${search}&client_id=215-ShqR1oFMPPRpCXExdBNW7LOdD-IaMZvgq7yPdtM`;

      const { data } = await axios.get(apiUrl);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const allFilteredImages = createAsyncThunk(
  "homepage/allFilteredImages",
  async ({ search, page, per_page }, { rejectWithValue }) => {
    try {
      // let apiUrl = `${unsplashBaseUrl}/${search}/photos?page=${page}&per_page=${per_page}&xp=search-synonym%3Aexperiment`;

      let apiUrl = `https://api.unsplash.com/search/photos?page=${page}&per_page=${per_page}&query=${search}&client_id=215-ShqR1oFMPPRpCXExdBNW7LOdD-IaMZvgq7yPdtM`;

      const { data } = await axios.get(apiUrl);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getImages = createAsyncThunk(
  "homepage/getImages",
  async ({ page }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        // `https://api.unsplash.com/photos?page=1&query=cats&client_id=${process.env.REACT_APP_ACCESS_KEY}`
        `https://api.unsplash.com/photos?page=${page}&query=cats&client_id=215-ShqR1oFMPPRpCXExdBNW7LOdD-IaMZvgq7yPdtM`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
