import { configureStore } from "@reduxjs/toolkit";
import pubReducer from "./publications/pubSlice";
import newsReducer from "./news/newsSlice";
import researchReducer from "./research/researchSlice";

export const store = configureStore({
  reducer: {
    publications: pubReducer,
    news: newsReducer,
    research: researchReducer,
  },
});
