import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const contactUsAsync = createAsyncThunk(
  'contactUs/contactUsAsync',
  async (contactUsObj, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/sendEmail/${contactUsObj.id}`, contactUsObj, {
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

const contactUsSlice = createSlice({
  name: 'contactUsObj',
  initialState: {
    contactUsObj: {}, // Initialize responseData in the state
  },
  reducers: {
    contactUsData: (state) => {
        state.contactUsObj = {};
      },
  },
  extraReducers: (builder) => {
    builder.addCase(contactUsAsync.fulfilled, (state, action) => {
      state.contactUsObj = action.payload; // Update responseData in the state after successful login
      // console.log('register data in slice',state.registerDataObj)
    });
    // Additional extra reducers if needed
    builder.addCase(contactUsAsync.rejected, (state, action) => {
      state.contactUsObj = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default contactUsSlice.reducer;
export const contactUsAction = contactUsSlice.actions;
export const {contactUsData} = contactUsSlice.actions;
