import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const deleteAdminStaffOwnerAsync = createAsyncThunk(
  'deleteAdminStaffOwner/deleteAdminStaffOwnerAsync',
  async (deleteAdminStaffOwnerObj, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/deleteAdminStaffOwner/${deleteAdminStaffOwnerObj.id}`,deleteAdminStaffOwnerObj, {
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

const deleteAdminStaffOwnerSlice = createSlice({
  name: 'deleteAdminStaffOwnerObj',
  initialState: {
    deleteAdminStaffOwnerObj: {}, // Initialize responseData in the state
  },
  reducers: {
    deleteAdminStaffOwnerData: (state) => {
        state.deleteAdminStaffOwnerObj = {};
      },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteAdminStaffOwnerAsync.fulfilled, (state, action) => {
      state.deleteAdminStaffOwnerObj = action.payload; // Update responseData in the state after successful login
      // console.log('register data in slice',state.registerDataObj)
    });
    // Additional extra reducers if needed
    builder.addCase(deleteAdminStaffOwnerAsync.rejected, (state, action) => {
      state.deleteAdminStaffOwnerObj= action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default deleteAdminStaffOwnerSlice.reducer;
export const deleteAdminStaffOwnerSliceAction = deleteAdminStaffOwnerSlice.actions;
export const { deleteAdminStaffOwnerData} = deleteAdminStaffOwnerSlice.actions;
