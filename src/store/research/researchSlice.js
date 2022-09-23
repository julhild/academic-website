import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import researchService from "./researchService";
import { errorMessage } from "../utils";

const initialState = {
  research: [],
};

// get publications
export const getResearch = createAsyncThunk(
  "research/getAll",
  async (thunkAPI) => {
    try {
      return await researchService.getResearch();
    } catch (error) {
      const message = errorMessage(error);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const researchSlice = createSlice({
  name: "research",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getResearch.pending, (state) => {
        state.research = null;
      })
      .addCase(getResearch.fulfilled, (state, action) => {
        state.research = action.payload;
      });
  },
});

export default researchSlice.reducer;
