import { configureStore } from "@reduxjs/toolkit"
import hotelRegisterSlice from "../Slice/hotelRegisterSlice/hotelRegisterSlice"
import getHotelNameSlice from "../Slice/getHotelNameSlice/getHotelNameSlice"
import getPhoneOtpSlice from "../Slice/getPhoneOtpSlice/getPhoneOtpSlice"
const store=configureStore({
    reducer:{
        hotelRegisterData:hotelRegisterSlice,
        getHotelNameData:getHotelNameSlice,
        getPhoneOtpData:getPhoneOtpSlice
    }
})
export default store