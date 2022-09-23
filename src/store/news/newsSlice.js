import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import newsService from "./newsService";
import { errorMessage } from "../utils";

const initialState = {
  news: [],
  isMoreNews: true,
};

// get publications
export const getNews = createAsyncThunk(
  "news/getAll",
  async ({ perPage, pageNumber }, thunkAPI) => {
    try {
      return await newsService.getAllNews(perPage, pageNumber);
    } catch (error) {
      const message = errorMessage(error);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const newsSlice = createSlice({
  name: "news",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.news = null;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.news = action.payload.dataToDisplay;
        state.isMoreNews = action.payload.isMoreNews;
      });
  },
});

export default newsSlice.reducer;
