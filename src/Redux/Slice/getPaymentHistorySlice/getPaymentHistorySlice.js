import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const getPaymentHistoryAsync = createAsyncThunk(
  'getPaymentHistory/getPaymentHistoryAsync',
  async (hotelId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/getExpiredSubscription/${hotelId}`, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.status === 200) {
        throw new Error('Failed to add register data to mongodb database.');
      }
    

      const Responedata = response.data;
      console.log( 'get payment history data ',Responedata)
      return Responedata
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const getPaymentHistorySlice = createSlice({
  name: 'getPaymentHistory',
  initialState: {
    getPaymentHistoryObj: {}, // Initialize responseData in the state


  },
  reducers: {
    getPaymentHistoryData: (state) => {
        state.getPaymentHistoryObj = null;
      },
  },
  extraReducers: (builder) => {
    builder.addCase(getPaymentHistoryAsync.fulfilled, (state, action) => {
      state.getPaymentHistoryObj = action.payload; // Update responseData in the state after successful login
      // console.log('register data in slice',state.registerDataObj)
    });
    // Additional extra reducers if needed
    builder.addCase(getPaymentHistoryAsync.rejected, (state, action) => {
      state.getPaymentHistoryObj = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default getPaymentHistorySlice.reducer;
export const getPaymentHistorySliceAction = getPaymentHistorySlice.actions;
export const {    getPaymentHistoryData } = getPaymentHistorySlice.actions;
