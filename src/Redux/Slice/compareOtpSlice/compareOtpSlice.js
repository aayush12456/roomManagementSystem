import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const compareOtpAsync = createAsyncThunk(
  'compareOtp/compareOtpAsync',
  async (compareOtpObj, { rejectWithValue }) => {
    try {
      const response = await axios.post('/compareOtp', compareOtpObj, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.status === 200) {
        throw new Error('Failed to add register data to mongodb database.');
      }
    

      const Responedata = response.data;
      console.log( 'compare otp data ',Responedata)
      return Responedata
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const compareOtpSlice = createSlice({
  name: 'compareOtp',
  initialState: {
    compareOtpObj: {}, // Initialize responseData in the state
  },
  reducers: {
    compareOtpData: (state) => {
        state.compareOtpObj = null;
      },
  },
  extraReducers: (builder) => {
    builder.addCase(compareOtpAsync.fulfilled, (state, action) => {
      state.compareOtpObj = action.payload; // Update responseData in the state after successful login
      // console.log('register data in slice',state.registerDataObj)
    });
    // Additional extra reducers if needed
    builder.addCase(compareOtpAsync.rejected, (state, action) => {
      state.compareOtpObj = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default compareOtpSlice.reducer;
export const compareOtpSliceAction = compareOtpSlice.actions;
export const { compareOtpData } = compareOtpSlice.actions;
