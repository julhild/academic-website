import { configureStore } from "@reduxjs/toolkit";
import pubReducer from "./publications/pubSlice";

export const store = configureStore({
  reducer: {
    publications: pubReducer,
  },
});
