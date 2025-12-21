import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const getMessageNotifyAsync = createAsyncThunk(
  'getMessageNotify/getMessageNotifyAsync',
  async (hotelId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/getMessageNotify/${hotelId}`, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.status === 200) {
        throw new Error('Failed to add register data to mongodb database.');
      }
    

      const Responedata = response.data;
      console.log( 'get message notify data ',Responedata)
      return Responedata
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const getMessageNotifySlice = createSlice({
  name: 'getMessageNotify',
  initialState: {
    getMessageNotifyObj: {}, // Initialize responseData in the state


  },
  reducers: {
    clearMessageNotifyData: (state) => {
        state.getMessageNotifyObj = null;
      },
  },
  extraReducers: (builder) => {
    builder.addCase(getMessageNotifyAsync.fulfilled, (state, action) => {
      state.getMessageNotifyObj = action.payload; // Update responseData in the state after successful login
      // console.log('register data in slice',state.registerDataObj)
    });
    // Additional extra reducers if needed
    builder.addCase(getMessageNotifyAsync.rejected, (state, action) => {
      state.getMessageNotifyObj = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default getMessageNotifySlice.reducer;
export const getMessageNotifySliceAction = getMessageNotifySlice.actions;
export const {  clearMessageNotifyData } = getMessageNotifySlice.actions;
