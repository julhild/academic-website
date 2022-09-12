import { configureStore } from "@reduxjs/toolkit";
import pubReducer from "./publications/pubSlice";
import newsReducer from "./news/newsSlice";
import researchReducer from "./research/researchSlice";
import peopleReducer from "./people/peopleSlice";

export const store = configureStore({
  reducer: {
    publications: pubReducer,
    news: newsReducer,
    research: researchReducer,
    groupMembers: peopleReducer,
  },
});
