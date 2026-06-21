import { createSlice } from "@reduxjs/toolkit";
const passCollageNameSlice=createSlice({
    name:'passCollageName',
    initialState:{
        passCollageName:''
    },
    reducers:{
        passCollageName(state,action){
        state.passCollageName=action.payload
        // console.log('pass data obj in slice',state.passDataObj)
        }
    }
})
export const passCollageNameSliceActions=passCollageNameSlice.actions
export default passCollageNameSlice.reducer