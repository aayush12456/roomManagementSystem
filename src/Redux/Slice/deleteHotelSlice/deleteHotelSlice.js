import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const deleteHotelAsync = createAsyncThunk(
  'deleteHotel/deleteHotel',
  async (deleteHotelObj, { rejectWithValue }) => {
    try {
      const response = await axios.post('/deleteHotel', deleteHotelObj, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.status === 200) {
        throw new Error('Failed to add register data to mongodb database.');
      }
    

      const Responedata = response.data;
      console.log( 'delete hotel data ',Responedata)
      return Responedata
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const deleteHotelSlice = createSlice({
  name: 'deleteHotelObj',
  initialState: {
    deleteHotelObj: {}, // Initialize responseData in the state
  },
  reducers: {
    resetHotelData: (state) => {
        state.deleteHotelObj = null;
      },
  },

  
  extraReducers: (builder) => {
    builder.addCase(deleteHotelAsync.fulfilled, (state, action) => {
      state.deleteHotelObj= action.payload; // Update responseData in the state after successful login
      // console.log('register data in slice',state.registerDataObj)
    });
    // Additional extra reducers if needed
    builder.addCase(deleteHotelAsync.rejected, (state, action) => {
      state.deleteHotelObj = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default deleteHotelSlice.reducer;
export const deleteHotelAction = deleteHotelSlice.actions;
export const {resetHotelData} = deleteHotelSlice.actions;
