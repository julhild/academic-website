import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import teachingService from "./teachingService";
import { errorMessage } from "../utils";

const initialState = {
  lectures: [],
  lecture: null,
};

// get lectures
export const getLectures = createAsyncThunk(
  "teaching/getAll",
  async (thunkAPI) => {
    try {
      return await teachingService.getLectures();
    } catch (error) {
      const message = errorMessage(error);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get lecture
export const fetchLecture = createAsyncThunk(
  "teaching/fetchLecture",
  async (lectureId, thunkAPI) => {
    try {
      return await teachingService.fetchLecture(lectureId);
    } catch (error) {
      const message = errorMessage(error);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const teachingSlice = createSlice({
  name: "teaching",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getLectures.pending, (state) => {
        state.lectures = null;
      })
      .addCase(getLectures.fulfilled, (state, action) => {
        state.lectures = action.payload;
      })
      .addCase(fetchLecture.pending, (state) => {
        state.lecture = null;
      })
      .addCase(fetchLecture.fulfilled, (state, action) => {
        state.lecture = action.payload;
      });
  },
});

export default teachingSlice.reducer;
