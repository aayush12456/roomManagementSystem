import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const addFloorAsync = createAsyncThunk(
  'addRoom/addRoomAsync',
  async (addFloorObj, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/addFloor`, addFloorObj, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.status === 200) {
        throw new Error('Failed to add register data to mongodb database.');
      }
    

      const Responedata = response.data;
      console.log( 'add floor data ',Responedata)
      return Responedata
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const addFloorSlice = createSlice({
  name: 'addFloorObj',
  initialState: {
    addFloorObj: {}, // Initialize responseData in the state
  },
  reducers: {
    addFloorData: (state) => {
        state.addFloorObj = {};
      },
  },
  extraReducers: (builder) => {
    builder.addCase(addFloorAsync.fulfilled, (state, action) => {
      state.addFloorObj = action.payload; // Update responseData in the state after successful login
      // console.log('register data in slice',state.registerDataObj)
    });
    // Additional extra reducers if needed
    builder.addCase(addFloorAsync.rejected, (state, action) => {
      state.addFloorObj = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default addFloorSlice.reducer;
export const addFloorAction = addFloorSlice.actions;
export const {addFloorData} = addFloorSlice.actions;
