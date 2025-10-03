import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const updateMyProfileAsync = createAsyncThunk(
  'updateMyProfile/updateMyProfileAsync',
  async (updateMyProfileObj, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/updateMyProfile`, updateMyProfileObj, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (!response.status === 200) {
        throw new Error('Failed to add register data to mongodb database.');
      }
    

      const Responedata = response.data;
      console.log( 'profile response data ',Responedata)
        //     const token = response.data.token;
        //  const personalSignUpData={
        //   firstName:response.data.user.firstName,
        //   DOB:response.data.user.DOB,
        //   aboutUser:response.data.user.aboutUser,
        //   city:response.data.user.city,
        //   drinking:response.data.user.drinking,
        //   eating:response.data.user.eating,
        //   education:response.data.user.education,
        //   phone:response.data.user.phone,
        //   gender:response.data.user.gender,
        //   profession:response.data.user.profession,
        //   smoking:response.data.user.smoking,
        //   images:response.data.user.images,
        //   interest:response.data.user.interest,
        //   looking:response.data.user.looking,
        //   relationship:response.data.user.relationship,
        //   zodiac:response.data.user.zodiac,
        //   language:response.data.user.language,
        //   videoUrl:response.data.user.videoUrl
        // }
        // sessionStorage.setItem('signupObject',JSON.stringify(personalSignUpData))
      return Responedata
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const updateMyProfileSlice = createSlice({
  name: 'updateMyProfile',
  initialState: {
    updateMyProfileObj: {}, // Initialize responseData in the state


  },
  reducers: {
    updateMyProfileData: (state) => {
      state.updateMyProfileObj = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateMyProfileAsync.fulfilled, (state, action) => {
      state.updateMyProfileObj = action.payload; // Update responseData in the state after successful login
      // console.log('register data in slice',state.registerDataObj)
    });
    // Additional extra reducers if needed
    builder.addCase(updateMyProfileAsync.rejected, (state, action) => {
      state.updateMyProfileObj = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default updateMyProfileSlice.reducer;
export const updateMyProfileAction = updateMyProfileSlice.actions;