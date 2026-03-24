import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const replyMailAsync = createAsyncThunk(
  'replyUs/replyUsAsync',
  async (replyMailObj, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/replyEmail/${replyMailObj.id}`, replyMailObj, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.status === 200) {
        throw new Error('Failed to add register data to mongodb database.');
      }
    

      const Responedata = response.data;
      console.log( 'add contact data ',Responedata)
      return Responedata
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const replyMailSlice = createSlice({
  name: 'replyMailObj',
  initialState: {
    replyMailObj: {}, // Initialize responseData in the state
  },
  reducers: {
    replyMailData: (state) => {
        state.replyMailObj = {};
      },
  },
  extraReducers: (builder) => {
    builder.addCase(replyMailAsync.fulfilled, (state, action) => {
      state.replyMailObj = action.payload; // Update responseData in the state after successful login
      // console.log('register data in slice',state.registerDataObj)
    });
    // Additional extra reducers if needed
    builder.addCase(replyMailAsync.rejected, (state, action) => {
      state.replyMailObj = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default replyMailSlice.reducer;
export const replyMailAction = replyMailSlice.actions;
export const {replyMailData} = replyMailSlice.actions;
