import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const getPhoneOtpAsync = createAsyncThunk(
  'getPhoneOtp/getPhoneOtpAsync',
  async (getPhoneOtpObj, { rejectWithValue }) => {
    try {
      const response = await axios.post('/loginWithOtp', getPhoneOtpObj, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.status === 200) {
        throw new Error('Failed to add register data to mongodb database.');
      }
    

      const Responedata = response.data;
      console.log( 'get phone otp data ',Responedata)
      return Responedata
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const getPhoneOtpSlice = createSlice({
  name: 'getPhoneOtp',
  initialState: {
    getPhoneOtpObj: {}, // Initialize responseData in the state


  },
  reducers: {
    clearPhoneOtpData: (state) => {
        state.getPhoneOtpObj = null;
      },
  },
  extraReducers: (builder) => {
    builder.addCase(getPhoneOtpAsync.fulfilled, (state, action) => {
      state.getPhoneOtpObj = action.payload; // Update responseData in the state after successful login
      // console.log('register data in slice',state.registerDataObj)
    });
    // Additional extra reducers if needed
    builder.addCase(getPhoneOtpAsync.rejected, (state, action) => {
      state.getPhoneOtpObj = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default getPhoneOtpSlice.reducer;
export const getPhoneOtpAction = getPhoneOtpSlice.actions;
export const { clearPhoneOtpData } = getPhoneOtpSlice.actions;
