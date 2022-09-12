import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import peopleService from "./peopleService";
import { errorMessage } from "../utils";

const initialState = {
  groupMembers: [],
};

// get group members
export const getGroupMembers = createAsyncThunk(
  "people/getAll",
  async (thunkAPI) => {
    try {
      return await peopleService.getPeople();
    } catch (error) {
      const message = errorMessage(error);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const peopleSlice = createSlice({
  name: "people",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getGroupMembers.pending, (state) => {
        state.groupMembers = null;
      })
      .addCase(getGroupMembers.fulfilled, (state, action) => {
        state.groupMembers = action.payload;
      });
  },
});

export default peopleSlice.reducer;
