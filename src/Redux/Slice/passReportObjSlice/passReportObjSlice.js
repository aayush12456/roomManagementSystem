import { createSlice } from "@reduxjs/toolkit";
const passReportObjSlice=createSlice({
    name:'passReportObj',
    initialState:{
        passReportObj:{}
    },
    reducers:{
        passReportObj(state,action){
        state.passReportObj=action.payload
        // console.log('pass data obj in slice',state.passDataObj)
        }
    }
})
export const passReportObjSliceActions=passReportObjSlice.actions
export default passReportObjSlice.reducer