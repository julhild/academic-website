import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import newsService from "./newsService";
import { errorMessage } from "../utils";

const initialState = {
  news: [],
};

// get publications
export const getNews = createAsyncThunk("news/getAll", async (thunkAPI) => {
  try {
    return await newsService.getAllNews();
  } catch (error) {
    const message = errorMessage(error);

    return thunkAPI.rejectWithValue(message);
  }
});

export const newsSlice = createSlice({
  name: "news",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.news = null;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.news = action.payload;
      });
  },
});

export default newsSlice.reducer;
