import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const addRoomAsync = createAsyncThunk(
  'addRoom/addRoomAsync',
  async (addRoomObj, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/addRoom`, addRoomObj, {
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

const addRoomSlice = createSlice({
  name: 'addRoomObj',
  initialState: {
    addRoomObj: {}, // Initialize responseData in the state
  },
  reducers: {
    addRoomData: (state) => {
        state.addRoomObj = {};
      },
  },
  extraReducers: (builder) => {
    builder.addCase(addRoomAsync.fulfilled, (state, action) => {
      state.addRoomObj = action.payload; // Update responseData in the state after successful login
      // console.log('register data in slice',state.registerDataObj)
    });
    // Additional extra reducers if needed
    builder.addCase(addRoomAsync.rejected, (state, action) => {
      state.addRoomObj = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default addRoomSlice.reducer;
export const addRoomAction = addRoomSlice.actions;
export const {addRoomData} = addRoomSlice.actions;
