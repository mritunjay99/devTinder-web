/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequest: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      return state.filter((element) => element._id !== action.payload);
    },
    remove: (state, action) => {
      return null;
    },
  },
});

export const { addRequest, removeRequest, remove } = requestSlice.actions;
export default requestSlice.reducer;
