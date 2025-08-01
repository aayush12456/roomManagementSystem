import { configureStore } from "@reduxjs/toolkit"
import hotelRegisterSlice from "../Slice/hotelRegisterSlice/hotelRegisterSlice"
import getHotelNameSlice from "../Slice/getHotelNameSlice/getHotelNameSlice"
import getPhoneOtpSlice from "../Slice/getPhoneOtpSlice/getPhoneOtpSlice"
import compareOtpSlice from "../Slice/compareOtpSlice/compareOtpSlice"
const store=configureStore({
    reducer:{
        hotelRegisterData:hotelRegisterSlice,
        getHotelNameData:getHotelNameSlice,
        getPhoneOtpData:getPhoneOtpSlice,
        compareOtpData:compareOtpSlice
    }
})
export default store