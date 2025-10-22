import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const deleteSwitchProfileAsync = createAsyncThunk(
  'deleteSwitchProfile/deleteSwitchProfileAsync',
  async (deleteSwitchProfileObj, { rejectWithValue }) => {
    try {
      const response = await axios.post('/deleteSwitchProfile', deleteSwitchProfileObj, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.status === 200) {
        throw new Error('Failed to add register data to mongodb database.');
      }
    

      const Responedata = response.data;
      console.log( 'delete switch profile data ',Responedata)
      return Responedata
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const deleteSwitchProfileSlice = createSlice({
  name: 'deleteSwitchProfileObj',
  initialState: {
    deleteSwitchProfileObj: {}, // Initialize responseData in the state
  },
  reducers: {
    deleteSwitchProfileData: (state) => {
        state.deleteSwitchProfileObj = null;
      },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteSwitchProfileAsync.fulfilled, (state, action) => {
      state.deleteSwitchProfileObj= action.payload; // Update responseData in the state after successful login
      // console.log('register data in slice',state.registerDataObj)
    });
    // Additional extra reducers if needed
    builder.addCase(deleteSwitchProfileAsync.rejected, (state, action) => {
      state.deleteSwitchProfileObj = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default deleteSwitchProfileSlice.reducer;
export const deleteSwitchProfileAction = deleteSwitchProfileSlice.actions;
export const {deleteSwitchProfileData} = deleteSwitchProfileSlice.actions;
