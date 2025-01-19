/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      return state.filter((user) => user._id !== action.payload);
    },
    remmoveFeed: (state, action) => {
      return null;
    },
  },
});

export const { addFeed, removeUserFromFeed, remmoveFeed } = feedSlice.actions;
export default feedSlice.reducer;
