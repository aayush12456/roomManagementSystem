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
import switchProfileSlice from "../Slice/switchProfileSlice/switchProfileSlice"
import deleteSwitchProfileSlice from "../Slice/deleteSwitchProfileSlice/deleteSwitchProfileSlice"
import addRoomSlice from "../Slice/addRoomSlice/addRoomSlice"
import deleteRoomSlice from "../Slice/deleteRoomSlice/deleteRoomSlice"
import addFloorSlice from "../Slice/addFloorSlice/addFloorSlice"
import deleteFloorSlice from "../Slice/deleteFloorSlice/deleteFloorSlice"
import deleteHotelSlice from "../Slice/deleteHotelSlice/deleteHotelSlice"
import updateHotelImgSlice from "../Slice/updateHotelImgSlice/updateHotelImgSlice"
import getMessageNotifySlice from "../Slice/getMessageNotifySlice/getMessageNotifySlice"
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
        updateMyProfiles:updateMyProfileSlice,
        switchProfileData:switchProfileSlice,
        deleteSwitchProfileData:deleteSwitchProfileSlice,
        addRoomData:addRoomSlice,
        deleteRoomData:deleteRoomSlice,
        addFloorData:addFloorSlice,
        deleteFloorData:deleteFloorSlice,
        deleteHotel:deleteHotelSlice,
        updateHotelImg:updateHotelImgSlice,
        getMessageNotify:getMessageNotifySlice
    }
})
export default store