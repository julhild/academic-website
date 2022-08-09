import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pubService from "./pubService";
import { errorMessage } from "../utils";

const initialState = {
  publications: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// get publications
export const getPublications = createAsyncThunk(
  "publications/getAll",
  async (thunkAPI) => {
    try {
      return await pubService.getPublications();
    } catch (error) {
      const message = errorMessage(error);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const pubSlice = createSlice({
  name: "publications",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPublications.pending, (state) => {
        state.publications = null;
      })
      .addCase(getPublications.fulfilled, (state, action) => {
        state.publications = action.payload;
      });
  },
});

export default pubSlice.reducer;
