import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const getAllHotelDetailsAsync = createAsyncThunk(
  'getAllHotelDetails/getAllHotelDetailsAsync',
  async (hotelId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`getAllHotel/${hotelId}`, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.status === 200) {
        throw new Error('Failed to add register data to mongodb database.');
      }
    

      const Responedata = response.data;
      console.log( 'get all hotel data ',Responedata)
      return Responedata
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const getAllHotelDetailsSlice = createSlice({
  name: 'getAllHotelDetails',
  initialState: {
    getAllHotelDetailsObj: {}, // Initialize responseData in the state


  },
//   reducers: {
//     clearHotelNameData: (state) => {
//         state.getHotelNameObj = null;
//       },
//   },
  extraReducers: (builder) => {
    builder.addCase(getAllHotelDetailsAsync.fulfilled, (state, action) => {
      state.getAllHotelDetailsObj = action.payload; // Update responseData in the state after successful login
      // console.log('register data in slice',state.registerDataObj)
    });
    // Additional extra reducers if needed
    builder.addCase(getAllHotelDetailsAsync.rejected, (state, action) => {
      state.getAllHotelDetailsObj = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default getAllHotelDetailsSlice.reducer;
export const getAllHotelDetailsSliceAction = getAllHotelDetailsSlice.actions;
// export const { clearHotelNameData } = getHotelNameSlice.actions;
