import { createSlice } from "@reduxjs/toolkit";

const planScreenSlice = createSlice({
  name: "planScreenToggle",
  initialState: {
    planScreenToggle: false,
  },
  reducers: {
    planScreenVisibleToggle(state){
        state.planScreenToggle = !state.planScreenToggle;
      
    },
  },
});

export const planScreenActions = planScreenSlice.actions
export default planScreenSlice.reducer