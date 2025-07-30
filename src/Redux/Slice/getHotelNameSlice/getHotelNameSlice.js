import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const getHotelNameAsync = createAsyncThunk(
  'getHotelName/getHotelNameAsync',
  async (getHotelNameObj, { rejectWithValue }) => {
    try {
      const response = await axios.post('/getHotelName', getHotelNameObj, {
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

const getHotelNameSlice = createSlice({
  name: 'getHotelName',
  initialState: {
    getHotelNameObj: {}, // Initialize responseData in the state


  },
  reducers: {
    clearHotelNameData: (state) => {
        state.getHotelNameObj = null;
      },
  },
  extraReducers: (builder) => {
    builder.addCase(getHotelNameAsync.fulfilled, (state, action) => {
      state.getHotelNameObj = action.payload; // Update responseData in the state after successful login
      // console.log('register data in slice',state.registerDataObj)
    });
    // Additional extra reducers if needed
    builder.addCase(getHotelNameAsync.rejected, (state, action) => {
      state.getHotelNameObj = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default getHotelNameSlice.reducer;
export const getHotelNameSliceAction = getHotelNameSlice.actions;
export const { clearHotelNameData } = getHotelNameSlice.actions;
