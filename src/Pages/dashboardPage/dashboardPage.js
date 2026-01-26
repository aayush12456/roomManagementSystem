// import Dashboard from "../../components/dashboard/dashboard"
// import { useEffect,useState } from "react"
// import { useDispatch,useSelector } from "react-redux";
// import * as SecureStore from 'expo-secure-store';
// import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
// import { getHotelDetailsAsync } from "../../Redux/Slice/getHotelDetailSlice/getHotelDetailSlice";
// import { deleteRoomData } from "../../Redux/Slice/deleteRoomSlice/deleteRoomSlice";
// import { addRoomData } from "../../Redux/Slice/addRoomSlice/addRoomSlice";
// import { addFloorData } from "../../Redux/Slice/addFloorSlice/addFloorSlice";
// import { deleteFloorData } from "../../Redux/Slice/deleteFloorSlice/deleteFloorSlice";
// const DashboardPage=({profile})=>{
//     const dispatch=useDispatch()
//     const hotelDetailSelector=useSelector((state)=>state.getHotelDetails.getHotelDetailsObj.hotelObj)
//     const addRoomSelector=useSelector((state)=>state.addRoomData.addRoomObj)
//     const deleteRoomSelector=useSelector((state)=>state.deleteRoomData.deleteRoomObj)
//     const addFloorSelector=useSelector((state)=>state.addFloorData.addFloorObj)
//     const deleteFloorSelector=useSelector((state)=>state.deleteFloorData.deleteFloorObj)
//     console.log('add floor',addFloorSelector)
//     console.log('deelte room',deleteRoomSelector)
//     console.log('add room selctsdddd',addRoomSelector)
//     console.log('hotel details',hotelDetailSelector)
//     console.log('deelte floor',deleteFloorSelector)
//     const roomMssg=addRoomSelector?.mssg ||deleteRoomSelector?.mssg
//     console.log('room mssg',roomMssg)
//     const floorMssg=addFloorSelector?.mssg || deleteFloorSelector?.mssg
//     const roomArraySelector=addRoomSelector?.matchedHotels || deleteRoomSelector?.matchedHotels|| addFloorSelector?.matchedHotels
     
//   console.log('room array selector',roomArraySelector)

//     const [loginObj, setLoginObj] = useState(null);
//     const [finalRoomArraySelector,setFinalRoomArraySelector]=useState(null)
    
//     const getLoginDataToSecureStore = async () => {
//         try {
//           const data = await SecureStore.getItemAsync('loginOtpObj');
//           if (data) {
//             const parsedData = JSON.parse(data);
//             setLoginObj(parsedData)
//             console.log('Retrieved login obj Data:', parsedData);
//             // You can also set it to local state if needed
//           } else {
//             console.log('No login obj data found in SecureStore');
//             setLoginObj({})
//           }
//         } catch (error) {
//           console.error('Error retrieving SecureStore data:', error);
//           setLoginObj({});
//         }
//         finally {
//           setLoading(false); // ✅ loading done
//         }
//       };
    
//       useEffect(() => {
//         getLoginDataToSecureStore(); // ✅ function called on screen mount
//       }, []);
//       const id=loginObj?.matchedHotels[0]?._id
//       useEffect(()=>{
//       if(id){
//       dispatch(getHotelDetailsAsync(id))
//       }
//       },[id])

    


//       const finalHotelDetailSelector=roomArraySelector?roomArraySelector:hotelDetailSelector
//       console.log('final hotel',finalHotelDetailSelector)
//       useEffect(() => {
//         if (roomMssg === "New room added successfully") {
//           Toast.show({
//             type: ALERT_TYPE.SUCCESS,
//             title: "Room Added Successfully",
//             autoClose: 5000,
//           });
      
//           // Re-fetch hotel details
//           if (id) dispatch(getHotelDetailsAsync(hotelDetailSelector?._id));
      
//           // Reset add slice after a small delay (so UI can use matchedHotels)
//           setTimeout(() => {
//             dispatch(addRoomData());
//           }, 3000);
//         } 
        
//         else if (roomMssg === "Room deleted successfully") {
//           Toast.show({
//             type: ALERT_TYPE.SUCCESS,
//             title: "Room Deleted Successfully",
//             autoClose: 5000,
//           });
      
//           // Re-fetch hotel details
//           if (id) dispatch(getHotelDetailsAsync(hotelDetailSelector?._id));
      
//           // Reset delete slice after delay
//           setTimeout(() => {
//             dispatch(deleteRoomData());
//           }, 1000);
//         }
//       }, [roomMssg,dispatch]);
      
//       useEffect(()=>{
//         if (floorMssg === "New Floor Added Successfully") {
//           Toast.show({
//             type: ALERT_TYPE.SUCCESS,
//             title: "Floor Added Successfully",
//             autoClose: 5000,
//           });
      
//           // Re-fetch hotel details
//           if (id) dispatch(getHotelDetailsAsync(hotelDetailSelector?._id));
      
//           // Reset add slice after a small delay (so UI can use matchedHotels)
//           setTimeout(() => {
//             dispatch(addFloorData());
//           }, 3000);
//         } 

//         else if (floorMssg === "Floor deleted successfully") {
//           Toast.show({
//             type: ALERT_TYPE.SUCCESS,
//             title: "Floor deleted successfully",
//             autoClose: 5000,
//           });
      
//           // Re-fetch hotel details
//           // if (id) dispatch(getHotelDetailsAsync(hotelDetailSelector?._id));
      
//           // Reset delete slice after delay
//           setTimeout(() => {
//             dispatch(deleteFloorData());
//           }, 1000);
//         }
//       },[floorMssg,dispatch])
// return (
//     <>
//     <Dashboard hotelDetails={finalHotelDetailSelector} profile={profile}/>
//     </>
// )
// }
// export default DashboardPage

//second change
// import Dashboard from "../../components/dashboard/dashboard"
// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux";
// import * as SecureStore from 'expo-secure-store';
// import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

// import { getHotelDetailsAsync } from "../../Redux/Slice/getHotelDetailSlice/getHotelDetailSlice";
// import { deleteRoomData } from "../../Redux/Slice/deleteRoomSlice/deleteRoomSlice";
// import { addRoomData } from "../../Redux/Slice/addRoomSlice/addRoomSlice";
// import { addFloorData } from "../../Redux/Slice/addFloorSlice/addFloorSlice";
// import { deleteFloorData } from "../../Redux/Slice/deleteFloorSlice/deleteFloorSlice";

// const DashboardPage = ({ profile }) => {

//   const dispatch = useDispatch();

//   const hotelDetailSelector = useSelector(state => state.getHotelDetails.getHotelDetailsObj.hotelObj);
//   const addRoomSelector = useSelector(state => state.addRoomData.addRoomObj);
//   const deleteRoomSelector = useSelector(state => state.deleteRoomData.deleteRoomObj);
//   const addFloorSelector = useSelector(state => state.addFloorData.addFloorObj);
//   const deleteFloorSelector = useSelector(state => state.deleteFloorData.deleteFloorObj);

//   const roomMssg = addRoomSelector?.mssg || deleteRoomSelector?.mssg;
//   const floorMssg = addFloorSelector?.mssg || deleteFloorSelector?.mssg;

//   // ONLY take room update from matchedHotels.room
//   const matched = addRoomSelector?.matchedHotels ||
//                   deleteRoomSelector?.matchedHotels ||
//                   addFloorSelector?.matchedHotels;

//   const [loginObj, setLoginObj] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ⬇ LOAD LOGIN DATA
//   const getLoginDataToSecureStore = async () => {
//     try {
//       const data = await SecureStore.getItemAsync('loginOtpObj');
//       if (data) setLoginObj(JSON.parse(data));
//       else setLoginObj({});
//     } catch (error) {
//       setLoginObj({});
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getLoginDataToSecureStore();
//   }, []);

//   // ⬇ WHEN LOGIN DATA COMES → FETCH HOTEL
//   const id = loginObj?.matchedHotels?.[0]?._id;

//   useEffect(() => {
//     if (id) dispatch(getHotelDetailsAsync(id));
//   }, [id]);

//   // ⬇ FINAL HOTEL OBJECT (only replace rooms)
//   const finalHotelDetailSelector = (() => {
//     if (hotelDetailSelector && matched?.room) {
//       return {
//         ...hotelDetailSelector,
//         room: matched.room,
//         roomArray: matched.roomArray ?? hotelDetailSelector.roomArray
//       };
//     }
//     return hotelDetailSelector;
//   })();


//   // 🟦 ROOM ADD/DELETE HANDLER
//   useEffect(() => {
//     if (!roomMssg) return;

//     // always reset sibling slices first
//     dispatch(addFloorData());
//     dispatch(deleteFloorData());

//     // ADD ROOM
//     if (roomMssg === "New room added successfully") {

//       dispatch(deleteRoomData()); // reset sibling slice immediately

//       Toast.show({
//         type: ALERT_TYPE.SUCCESS,
//         title: "Room Added Successfully",
//         autoClose: 3000,
//       });

//       dispatch(addRoomData()); // reset its own slice

//       setTimeout(() => {
//         dispatch(getHotelDetailsAsync(id));
//       }, 300);

//     }

//     // DELETE ROOM
//     if (roomMssg === "Room deleted successfully") {

//       dispatch(addRoomData()); // reset sibling slice

//       Toast.show({
//         type: ALERT_TYPE.SUCCESS,
//         title: "Room Deleted Successfully",
//         autoClose: 3000,
//       });

//       dispatch(deleteRoomData()); // reset delete slice

//       setTimeout(() => {
//         dispatch(getHotelDetailsAsync(id));
//       }, 300);

//     }

//   }, [roomMssg]);


//   // 🟦 FLOOR ADD/DELETE HANDLER
//   useEffect(() => {
//     if (!floorMssg) return;

//     dispatch(addRoomData());
//     dispatch(deleteRoomData());

//     // ADD FLOOR
//     if (floorMssg === "New Floor Added Successfully") {

//       Toast.show({
//         type: ALERT_TYPE.SUCCESS,
//         title: "Floor Added Successfully"
//       });

//       dispatch(addFloorData()); // reset slice

//       setTimeout(() => {
//         dispatch(getHotelDetailsAsync(id));
//       }, 300);
//     }


//     // DELETE FLOOR
//     if (floorMssg === "Floor deleted successfully") {

//       Toast.show({
//         type: ALERT_TYPE.SUCCESS,
//         title: "Floor Deleted Successfully"
//       });

//       dispatch(deleteFloorData());

//       setTimeout(() => {
//         dispatch(getHotelDetailsAsync(id));
//       }, 300);
//     }

//   }, [floorMssg]);

// console.log('final hotel details',finalHotelDetailSelector)
//   return (
//     <>
//       <Dashboard hotelDetails={finalHotelDetailSelector} profile={profile} />
//     </>
//   );
// };

// export default DashboardPage;
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

const DashboardPage = ({ profile,notifyTokenArray,planStatus }) => {
  const dispatch = useDispatch();
  console.log('profiles',profile)
  console.log('notify tokens dash',notifyTokenArray)

  const hotelDetailSelector = useSelector(
    (state) => state.getHotelDetails.getHotelDetailsObj.hotelObj
  );

  const addRoomSelector = useSelector((state) => state.addRoomData.addRoomObj);
  console.log('add rooms',addRoomSelector)

  
  const deleteRoomSelector = useSelector(
    (state) => state.deleteRoomData.deleteRoomObj
  );
  const addFloorSelector = useSelector((state) => state.addFloorData.addFloorObj);
  const deleteFloorSelector = useSelector(
    (state) => state.deleteFloorData.deleteFloorObj
  );

  const roomMssg = addRoomSelector?.mssg || deleteRoomSelector?.mssg;
  const floorMssg = addFloorSelector?.mssg || deleteFloorSelector?.mssg;

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

  // -----------------------------
  // ROOM HANDLER
  // -----------------------------
  // const sendNotification = async (notifyTokenArray, name, image) => {
  //   if (!notifyTokenArray || notifyTokenArray.length === 0) {
  //     console.log("❌ No push tokens found");
  //     return;
  //   }
  
  //   // 🧠 Create notification payload for each token
  //   const messages = notifyTokenArray.map((token) => ({
  //     to: token,
  //     sound: "default",
  //     title: "New Room Added 🏨",
  //     body: `${name} has added new room`,
  //     data: {
  //       screen: "Dashboard",
  //       name,
  //       image,
  //     },
  //   }));
  
  //   try {
  //     await axios.post(
  //       "https://exp.host/--/api/v2/push/send",
  //       messages,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //         },
  //       }
  //     );
  
  //     console.log("✅ Notifications sent successfully");
  //   } catch (error) {
  //     console.log("❌ Notification error:", error.response?.data || error);
  //   }
  // };
  // const sendNotification = async (name, image) => {
   
  
  //   try {
  //     await axios.post(
  //       "https://exp.host/--/api/v2/push/send",
  //       {
  //         to: notifyTokenArray[0],
  //         sound: "default",
  //         title: "New Room Added 🏨",
  //         body: `${name} has added new room`,
  //         data: {
  //           screen: "Dashboard",
  //           name,
  //           image,
  //         },
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //         },
  //       }
  //     );
  //   } catch (error) {
  //     console.log("Notification error:", error);
  //   }
  // };
  
  

  useEffect(() => {
    if (!roomMssg) return;

    resetFloorSlices();

    if (roomMssg === "New room added successfully") {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Room Added Successfully",
      });
      // sendNotification(
      //   notifyTokenArray,
      //   addRoomSelector?.name,
      //   addRoomSelector?.image
      // );
      resetRoomSlices();
      safeRefetch();
    }

    if (roomMssg === "Room deleted successfully") {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Room Deleted Successfully",
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
        title: "Floor Added Successfully",
      });

      resetFloorSlices();
      safeRefetch();
    }

    if (floorMssg === "Floor deleted successfully") {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Floor Deleted Successfully",
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
notifyTokenArray={notifyTokenArray} planStatus={planStatus} />;
};

export default DashboardPage;
