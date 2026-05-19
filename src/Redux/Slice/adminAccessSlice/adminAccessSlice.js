import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const adminAccessAsync = createAsyncThunk(
  'adminAccessDetails/adminAccessAsync',
  async (hotelId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`getAllAdminName/${hotelId}`, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.status === 200) {
        throw new Error('Failed to add register data to mongodb database.');
      }
    

      const Responedata = response.data;
      // console.log( 'get hotel data ',Responedata)
      return Responedata
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const getAdminAccessSlice = createSlice({
  name: 'getAdminAccessDetails',
  initialState: {
    getAdminAccessObj: {}, // Initialize responseData in the state


  },
//   reducers: {
//     clearHotelNameData: (state) => {
//         state.getHotelNameObj = null;
//       },
//   },
  extraReducers: (builder) => {
    builder.addCase(adminAccessAsync.fulfilled, (state, action) => {
      state.getAdminAccessObj = action.payload; // Update responseData in the state after successful login
      // console.log('register data in slice',state.registerDataObj)
    });
    // Additional extra reducers if needed
    builder.addCase(adminAccessAsync.rejected, (state, action) => {
      state.getAdminAccessObj = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default getAdminAccessSlice.reducer;
export const getAdminAccessSliceAction = getAdminAccessSlice.actions;
// export const { clearHotelNameData } = getHotelNameSlice.actions;
