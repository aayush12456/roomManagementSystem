import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const deleteFloorAsync = createAsyncThunk(
  'deleteFloor/deleteFloorAsync',
  async (deleteFloorObj, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/deleteFloor`, deleteFloorObj, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.status === 200) {
        throw new Error('Failed to add register data to mongodb database.');
      }
    

      const Responedata = response.data;
      console.log( 'delete floor data ',Responedata)
      return Responedata
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const deleteFloorSlice = createSlice({
  name: 'deleteFloorObj',
  initialState: {
    deleteFloorObj: {}, // Initialize responseData in the state
  },
  reducers: {
    deleteFloorData: (state) => {
        state.deleteFloorObj = {};
      },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteFloorAsync.fulfilled, (state, action) => {
      state.deleteFloorObj = action.payload; // Update responseData in the state after successful login
      // console.log('register data in slice',state.registerDataObj)
    });
    // Additional extra reducers if needed
    builder.addCase(deleteFloorAsync.rejected, (state, action) => {
      state.deleteFloorObj = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default deleteFloorSlice.reducer;
export const deleteFloorAction = deleteFloorSlice.actions;
export const {deleteFloorData} = deleteFloorSlice.actions;
