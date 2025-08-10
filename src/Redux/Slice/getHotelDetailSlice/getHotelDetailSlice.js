import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const getHotelDetailsAsync = createAsyncThunk(
  'getHotelDetails/getHotelDetailsAsync',
  async (hotelId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`getRoomDetails/${hotelId}`, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.status === 200) {
        throw new Error('Failed to add register data to mongodb database.');
      }
    

      const Responedata = response.data;
      console.log( 'get hotel data ',Responedata)
      return Responedata
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const getHotelDetailsSlice = createSlice({
  name: 'getHotelDetails',
  initialState: {
    getHotelDetailsObj: {}, // Initialize responseData in the state


  },
//   reducers: {
//     clearHotelNameData: (state) => {
//         state.getHotelNameObj = null;
//       },
//   },
  extraReducers: (builder) => {
    builder.addCase(getHotelDetailsAsync.fulfilled, (state, action) => {
      state.getHotelDetailsObj = action.payload; // Update responseData in the state after successful login
      // console.log('register data in slice',state.registerDataObj)
    });
    // Additional extra reducers if needed
    builder.addCase(getHotelDetailsAsync.rejected, (state, action) => {
      state.getHotelDetailsObj = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default getHotelDetailsSlice.reducer;
export const getHotelDetailsSliceAction = getHotelDetailsSlice.actions;
// export const { clearHotelNameData } = getHotelNameSlice.actions;
