import { configureStore } from "@reduxjs/toolkit"
import hotelRegisterSlice from "../Slice/hotelRegisterSlice"
const store=configureStore({
    reducer:{
        hotelRegisterData:hotelRegisterSlice
    }
})
export default store