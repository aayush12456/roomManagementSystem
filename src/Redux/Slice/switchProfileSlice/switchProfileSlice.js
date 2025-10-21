import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const switchProfileAsync = createAsyncThunk(
  'switchProfile/switchProfileAsync',
  async (switchProfileObj, { rejectWithValue }) => {
    try {
      const response = await axios.post('/switchProfile', switchProfileObj, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.status === 200) {
        throw new Error('Failed to add register data to mongodb database.');
      }
    

      const Responedata = response.data;
      console.log( 'switch profile data ',Responedata)
      return Responedata
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const switchProfileSlice = createSlice({
  name: 'switchProfileObj',
  initialState: {
    switchProfileObj: {}, // Initialize responseData in the state
  },
  reducers: {
    switchProfileData: (state) => {
        state.switchProfileObj = null;
      },
  },
  extraReducers: (builder) => {
    builder.addCase(switchProfileAsync.fulfilled, (state, action) => {
      state.switchProfileObj = action.payload; // Update responseData in the state after successful login
      // console.log('register data in slice',state.registerDataObj)
    });
    // Additional extra reducers if needed
    builder.addCase(switchProfileAsync.rejected, (state, action) => {
      state.switchProfileObj = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default switchProfileSlice.reducer;
export const switchProfileAction = switchProfileSlice.actions;
export const {switchProfileData} = switchProfileSlice.actions;
