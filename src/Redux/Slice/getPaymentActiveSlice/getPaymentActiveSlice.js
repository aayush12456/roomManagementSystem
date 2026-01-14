import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const getPaymentActiveAsync = createAsyncThunk(
  'getPaymentActive/getPaymentActiveAsync',
  async (hotelId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/getActiveSubscription/${hotelId}`, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.status === 200) {
        throw new Error('Failed to add register data to mongodb database.');
      }
    

      const Responedata = response.data;
      console.log( 'get payment active data ',Responedata)
      return Responedata
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const getPaymentActiveSlice = createSlice({
  name: 'getPaymentActive',
  initialState: {
    getPaymentActiveObj: {}, // Initialize responseData in the state


  },
  reducers: {
    getPaymentActiveData: (state) => {
        state.getPaymentActiveObj = null;
      },
  },
  extraReducers: (builder) => {
    builder.addCase(getPaymentActiveAsync.fulfilled, (state, action) => {
      state.getPaymentActiveObj = action.payload; // Update responseData in the state after successful login
      // console.log('register data in slice',state.registerDataObj)
    });
    // Additional extra reducers if needed
    builder.addCase(getPaymentActiveAsync.rejected, (state, action) => {
      state.getPaymentActiveObj = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default getPaymentActiveSlice.reducer;
export const getPaymentActiveSliceAction = getPaymentActiveSlice.actions;
export const {    getPaymentActiveData } = getPaymentActiveSlice.actions;
