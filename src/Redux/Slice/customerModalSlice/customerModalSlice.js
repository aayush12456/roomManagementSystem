import { createSlice } from "@reduxjs/toolkit";

const customerModalSlice = createSlice({
  name: "customerModalToggle",
  initialState: {
    customerModalToggle: false,
  },
  reducers: {
    customerModalVisibleToggle(state){
        state.customerModalToggle = !state.customerModalToggle;
      
    },
  },
});

export const customerModalActions = customerModalSlice.actions
export default customerModalSlice.reducer