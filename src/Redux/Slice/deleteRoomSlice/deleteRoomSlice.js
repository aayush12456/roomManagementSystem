import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const deleteRoomAsync = createAsyncThunk(
  'deleteRoom/deleteRoomAsync',
  async (deleteRoomObj, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/deleteRoom`, deleteRoomObj, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.status === 200) {
        throw new Error('Failed to add register data to mongodb database.');
      }
    

      const Responedata = response.data;
      console.log( 'add room data ',Responedata)
      return Responedata
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const deleteRoomSlice = createSlice({
  name: 'deleteRoomObj',
  initialState: {
    deleteRoomObj: {}, // Initialize responseData in the state
  },
  reducers: {
    deleteRoomData: (state) => {
        state.deleteRoomObj = {};
      },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteRoomAsync.fulfilled, (state, action) => {
      state.deleteRoomObj = action.payload; // Update responseData in the state after successful login
      // console.log('register data in slice',state.registerDataObj)
    });
    // Additional extra reducers if needed
    builder.addCase(deleteRoomAsync.rejected, (state, action) => {
      state.deleteRoomObj = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default deleteRoomSlice.reducer;
export const deleteRoomAction = deleteRoomSlice.actions;
export const {deleteRoomData} = deleteRoomSlice.actions;
