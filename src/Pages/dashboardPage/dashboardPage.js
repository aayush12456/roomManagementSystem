
import Dashboard from "../../components/dashboard/dashboard"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

import { getHotelDetailsAsync } from "../../Redux/Slice/getHotelDetailSlice/getHotelDetailSlice";

import { addRoomData } from "../../Redux/Slice/addRoomSlice/addRoomSlice";
import { deleteRoomData } from "../../Redux/Slice/deleteRoomSlice/deleteRoomSlice";
import { addFloorData } from "../../Redux/Slice/addFloorSlice/addFloorSlice";
import { deleteFloorData } from "../../Redux/Slice/deleteFloorSlice/deleteFloorSlice";

const DashboardPage = ({ profile,notifyTokenArray,planStatus,hotelName }) => {
  const dispatch = useDispatch();
  // console.log('profiles',profile)
  // console.log('notify tokens dash',notifyTokenArray)

  const hotelDetailSelector = useSelector(
    (state) => state.getHotelDetails.getHotelDetailsObj.hotelObj
  );

  const addRoomSelector = useSelector((state) => state.addRoomData.addRoomObj);
  // console.log('add rooms',addRoomSelector)

  
  const deleteRoomSelector = useSelector(
    (state) => state.deleteRoomData.deleteRoomObj
  );
  const addFloorSelector = useSelector((state) => state.addFloorData.addFloorObj);
  const deleteFloorSelector = useSelector(
    (state) => state.deleteFloorData.deleteFloorObj
  );

  const roomMssg = addRoomSelector?.mssg || deleteRoomSelector?.mssg;
  const floorMssg = addFloorSelector?.mssg || deleteFloorSelector?.mssg;
  // console.log('room msff',deleteRoomSelector)
  const roomNumber=addRoomSelector?.roomNumber||deleteRoomSelector?.roomNumber
  const [loginObj, setLoginObj] = useState(null);

  // -----------------------------
  // LOGIN DATA
  // -----------------------------
  useEffect(() => {
    const load = async () => {
      const data = await SecureStore.getItemAsync("loginOtpObj");
      setLoginObj(data ? JSON.parse(data) : {});
    };
    load();
  }, []);

  const id = loginObj?.matchedHotels?.[0]?._id;

  // -----------------------------
  // FETCH HOTEL DETAILS (only backend data)
  // -----------------------------
  useEffect(() => {
    if (id) {
      dispatch(getHotelDetailsAsync(id));
    }
  }, [id]);

  // -----------------------------
  // SAFE REFETCH FUNCTION
  // -----------------------------
  const safeRefetch = () => {
    if (!id) return;
    setTimeout(() => {
      dispatch(getHotelDetailsAsync(id));
    }, 200);
  };

  const resetRoomSlices = () => {
    dispatch(addRoomData());
    dispatch(deleteRoomData());
  };

  const resetFloorSlices = () => {
    dispatch(addFloorData());
    dispatch(deleteFloorData());
  };

  useEffect(() => {
    if (!roomMssg) return;

    resetFloorSlices();

    if (roomMssg === "New room added successfully") {
   
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: `Room ${roomNumber} Added`,
        autoClose:10000,
        containerStyle: {
          borderRadius: 16,
          marginHorizontal: 20,
          paddingVertical: 12,
          backgroundColor: "#1F2937", // professional dark
        },
        titleStyle: {
          fontSize: 15,
          fontWeight: "600",
          color: "#FFFFFF",
        },
      });
      resetRoomSlices();
      safeRefetch();
    }

    if (roomMssg === "Room deleted successfully") {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: `Room ${roomNumber} Removed`,
        autoClose:10000,
        containerStyle: {
          borderRadius: 16,
          marginHorizontal: 20,
          paddingVertical: 12,
          backgroundColor: "#1F2937",
        },
        titleStyle: {
          fontSize: 15,
          fontWeight: "600",
          color: "#FFFFFF",
        },
      });
      resetRoomSlices();
      safeRefetch();
    }
  }, [roomMssg]);

  // -----------------------------
  // FLOOR HANDLER
  // -----------------------------
  useEffect(() => {
    if (!floorMssg) return;

    resetRoomSlices();

    if (floorMssg === "New Floor Added Successfully") {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: `New Floor Added`,
        autoClose:10000,
        containerStyle: {
          borderRadius: 16,
          marginHorizontal: 20,
          paddingVertical: 12,
          backgroundColor: "#1F2937",
        },
        titleStyle: {
          fontSize: 15,
          fontWeight: "600",
          color: "#FFFFFF",
        },
      });

      resetFloorSlices();
      safeRefetch();
    }

    if (floorMssg === "Floor deleted successfully") {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: `Floor Removed`,
        autoClose:10000,
        containerStyle: {
          borderRadius: 16,
          marginHorizontal: 20,
          paddingVertical: 12,
          backgroundColor: "#1F2937",
        },
        titleStyle: {
          fontSize: 15,
          fontWeight: "600",
          color: "#FFFFFF",
        },
      });
      resetFloorSlices();
      safeRefetch();
    }
  }, [floorMssg]);

  // -----------------------------
  // ❗ NO MATCHED HOTELS MERGE HERE
  // ONLY BACKEND FINAL DATA RETURNED
  // -----------------------------

  return <Dashboard hotelDetails={hotelDetailSelector} profile={profile}  
notifyTokenArray={notifyTokenArray} planStatus={planStatus} hotelName={hotelName} />;
};

export default DashboardPage;
