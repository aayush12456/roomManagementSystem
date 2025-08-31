import { createSlice } from "@reduxjs/toolkit";
const passDataObjSlice=createSlice({
    name:'passDataObj',
    initialState:{
        passDataObj:{}
    },
    reducers:{
        passDataObj(state,action){
        state.passDataObj=action.payload
        // console.log('pass data obj in slice',state.passDataObj)
        }
    }
})
export const passDataObjSliceAcions=passDataObjSlice.actions
export default passDataObjSlice.reducer