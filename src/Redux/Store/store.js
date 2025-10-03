import { configureStore } from "@reduxjs/toolkit"
import hotelRegisterSlice from "../Slice/hotelRegisterSlice/hotelRegisterSlice"
import getHotelNameSlice from "../Slice/getHotelNameSlice/getHotelNameSlice"
import getPhoneOtpSlice from "../Slice/getPhoneOtpSlice/getPhoneOtpSlice"
import compareOtpSlice from "../Slice/compareOtpSlice/compareOtpSlice"
import getHotelDetailSlice from "../Slice/getHotelDetailSlice/getHotelDetailSlice"
import customerModalSlice from "../Slice/customerModalSlice/customerModalSlice"
import passDataSliceObj from "../Slice/passDataSliceObj/passDataSliceObj"
import passReportObjSlice from "../Slice/passReportObjSlice/passReportObjSlice"
import updateMyProfileSlice from "../Slice/updateMyProfileSlice/updateMyProfileSlice"
const store=configureStore({
    reducer:{
        hotelRegisterData:hotelRegisterSlice,
        getHotelNameData:getHotelNameSlice,
        getPhoneOtpData:getPhoneOtpSlice,
        compareOtpData:compareOtpSlice,
        getHotelDetails:getHotelDetailSlice,
        customerModal:customerModalSlice,
        passDataObj:passDataSliceObj,
        passReportObj:passReportObjSlice,
        updateMyProfiles:updateMyProfileSlice
    }
})
export default store