// import { Card,Text } from "react-native-paper"
// import { View,Pressable,Image } from "react-native";
// import { useState,useEffect,useRef } from "react";
// import axios from 'axios'
// import moment from "moment";
// import io from "socket.io-client";
// import {useSelector,useDispatch} from 'react-redux'
// import CustomerDetailModal from "../../customerDetailModal/customerDetailModal";
// import AdvanceBookModal from "../../advanceBookModal/advanceBookModal";
// import plus from '../../../../assets/roomIcon/plus.png'
// import AddRoomModal from "../../addRoomModal/addRoomModal";
// import AwesomeAlert from 'react-native-awesome-alerts';
// import { deleteRoomAsync } from "../../../Redux/Slice/deleteRoomSlice/deleteRoomSlice";
// const socket = io.connect("http://192.168.29.169:4000")
// const RoomDetailCard=({roomTitle,roomDetails,currentDate,profile})=>{
//   console.log('profile data',profile)
//   // console.log('curent date',currentDate)
//   // console.log('room details',roomDetails)
//   // console.log('titles',roomTitle)
//   const dispatch=useDispatch()
//   const BASE_URL = "http://192.168.29.169:4000";
//   const [showAlert, setShowAlert] = useState(false);
//   const [selectedRoomId, setSelectedRoomId] = useState(null);
//   const [customerObj,setCustomerObj]=useState({})
//   const [label,setLabel]=useState('')
//   const [anotherShowAlert, setAnotherShowAlert] = useState(false);
//   const [customerArrayAdvance,setCustomerArrayAdvance]=useState([])
//   const [roomType,setRoomType]=useState('')
//   const [floors,setFloors]=useState('')
//   const [roomNo,setRoomNo]=useState('')
//   const [selectFloor,setSelectFloor]=useState('')
//   const [roomIds,setRoomIds]=useState('')
//   const [advanceAlert,setAdvanceAlert]=useState(false)
//   const [roomAlert,setRoomAlert]=useState(false)
//   const [isDeleting, setIsDeleting] = useState(false);
//   const hotelDetailSelector=useSelector((state)=>state.getHotelDetails.getHotelDetailsObj.hotelObj)

//   // console.log('hotel id',hotelDetailSelector?._id)
//   const finalDate=new Date()
//   const todayDate=finalDate.toLocaleDateString("en-GB") 
//     const irregulars = {
//         one: "First",
//         two: "Second",
//         three: "Third",
//         five: "Fifth",
//         eight: "Eighth",
//         nine: "Ninth",
//         twelve: "Twelfth",
//         ground: "Ground"
//       };
//       const convertFloorName = (title) => {
//         const [wordPart] = title.split(/Floor/i); 
//         const lowerWord = wordPart.toLowerCase();
    
//         const ordinal =
//           irregulars[lowerWord] ||
//           lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1) + "th";
    
//         return `${ordinal} Floor`;
//       };
//       const lastPress = useRef(0);
//       const timeoutRef = useRef(null);

//       const handlePress = (roomId, roomType, shortLabel) => {
//         const time = new Date().getTime();
//         const delta = time - lastPress.current;
    
//         if (timeoutRef.current) {
//           clearTimeout(timeoutRef.current);
//         }
    
//         if (delta < 300 && !profile.post) {
//           // 🔁 Double tap detected → cancel single tap
//           clearTimeout(timeoutRef.current);
//           anotherClickHandler(roomId, roomType, shortLabel);
//         } else {
//           // 🕓 Wait 300ms to confirm it's single tap
//           timeoutRef.current = setTimeout(() => {
//             roomClickHandler(roomId, roomType, shortLabel);
//           }, 300);
//         }
    
//         lastPress.current = time;
//       };
      
//       const anotherClickHandler = (roomId, roomType, shortLabel) => {
//         console.log("🔴 Double tap → anotherRoomClickHandler called for:", roomId,shortLabel);
//         setLabel(shortLabel)
//         setAnotherShowAlert(true)
//         setRoomIds(roomId)
//         // --- yahan aap delete logic, confirm modal, etc. laga sakte ho
//       };

//   const roomClickHandler = (id, type, num) => {
//     console.log('num is',num)
//   // console.log("id is", id);
//   setSelectedRoomId(id);

//   const today = moment(todayDate, "DD/MM/YYYY");
//   const current = moment(currentDate, "DD/MM/YYYY");

//   // Sirf valid bookings rakho (jisme currentDate checkOut ke baad na ho)
//   const validBookings = customerArray?.filter((item) => {
//     const checkOut = moment(item.checkOutDate, "DD/MM/YYYY");
//     return !(current.isAfter(checkOut) && item.roomId === id);
//   });

//   // Ab is filtered list se booked check karo
//   const isRoomBooked = validBookings.some((item) => {
//     const checkIn = moment(item.checkInDate, "DD/MM/YYYY");
//     const checkOut = moment(item.checkOutDate, "DD/MM/YYYY");

//     return (
//       item.roomId === id &&
//       today.isSameOrAfter(checkIn) &&
//       today.isSameOrBefore(checkOut)
//     );
//   });

//   const hasAdvanceBooking = customerArrayAdvance?.some(
//     (item) => item.roomId === id && item.selectedDate === currentDate
//   );
  

//   // if (
//   //   (todayDate === currentDate &&
//   //     customerArrayAdvance?.every((item) => item.roomId !== id)) ||
//   //   isRoomBooked
//   // ) {
//   //   setShowAlert(true);
//   // } else {
//   //   setAdvanceAlert(true);
//   // }
//   if (
//     (todayDate === currentDate  && !hasAdvanceBooking) ||
//     isRoomBooked
//   ) {
//     setShowAlert(true);
//   } else {
//     setAdvanceAlert(true);
//   }
//   setRoomType(type);
//   setFloors(convertFloorName(roomTitle));
//   setRoomNo(num);
// };

//   // console.log('floor us',floors)
//   // console.log('room no',roomNo)
//   // console.log('show alert in advance',showAlert)
// const addRoomHandler=(roomTitle)=>{
//   console.log('room title',roomTitle)
//   setSelectFloor(roomTitle)
// setRoomAlert(true)
// }

// useEffect(() => {
//   const fetchRoomDetails = async () => {
//     try {
//       if (hotelDetailSelector._id) {
//         const response = await axios.get(
//           `${BASE_URL}/hotel/getCustomerDetails/${hotelDetailSelector?._id}`
//         );
//         // console.log('visitor user in response',response?.data)
//         setCustomerObj(response?.data || {} )
//       }
//     } catch (error) {
//       // console.error("Error fetching visitors:", error);
//     }
//   };

//   fetchRoomDetails();

//   socket.on("getCustomerDetails", (newUser) => {
//     setCustomerObj(newUser);
//   });
//   return () => {
//     socket.off("getCustomerDetails");
//   };
// }, [hotelDetailSelector._id]);

// const customerArray=customerObj?.getCustomerDetailsArray
// // console.log('customer array is',customerArray)
// const roomData= Object.values(roomDetails)
// // console.log('room data',roomData)
// // useEffect(() => {
// //   const isMatch = customerArray.some(cust =>
// //     roomData.some(room => room._id === cust.roomId)
// //   );
// // if(isMatch){
// //   setMatchedCustomerResponse(isMatch)
// // }
// //   console.log("Kya match mila? ->", isMatch); // true ya false
// // }, [customerArray, roomData]);

// useEffect(() => {
//   const fetchRoomDetailsAdvance = async () => {
//     try {
//       if (hotelDetailSelector._id) {
//         const response = await axios.get(
//           `${BASE_URL}/hotel/getCustomerDetailsAdvance/${hotelDetailSelector?._id}`
//         );
//         // console.log('visitor user in response',response?.data)
//         setCustomerArrayAdvance(response?.data?.getAdvanceCustomerDetailsArray || {} )
//       }
//     } catch (error) {
//       // console.error("Error fetching visitors:", error);
//     }
//   };

//   fetchRoomDetailsAdvance();

//   socket.on("getCustomerDetailsAdvance", (newUser) => {
//     setCustomerArrayAdvance(newUser);
//   });
//   return () => {
//     socket.off("getCustomerDetailsAdvance");
//   };
// }, [hotelDetailSelector._id]);
// // console.log('customer array advance',customerArrayAdvance)



// return (
//     <>
//     <Card style={{ borderRadius: 6, marginVertical: 5, padding: 10 }}>
//     <Text>{convertFloorName(roomTitle)}</Text>
//     <View style={{flexDirection:'row',flexWrap:'wrap',gap:10}}>
//     {roomDetails && typeof roomDetails === 'object' &&
//         Object.entries(roomDetails).map(([roomLabel, roomData], roomIndex) =>{
//           console.log('room data is',roomData)
//         const data=roomLabel.split('')
//         const roomId=roomData?._id
//         const shortLabel=`R-${roomData?.number}`
//        const bedType = roomData.bedType.split(',').map(item => item.replace(' Bed', ''));
//        const isMatched = customerArray?.some(cust => cust.roomId === roomId);
//        const today = moment(todayDate, "DD/MM/YYYY");
//        const current = moment(currentDate, "DD/MM/YYYY");
//        const isRoomBooked = customerArray
//   ?.filter(cust => !(current.isAfter(moment(cust.checkOutDate, "DD/MM/YYYY")) && cust.roomId === roomId))
//   ?.some(cust =>
//     cust.roomId === roomId &&
//     today.isBetween(
//       moment(cust.checkInDate, "DD/MM/YYYY"),
//       moment(cust.checkOutDate, "DD/MM/YYYY"),
//       undefined,
//       "[]"
//     )
//   );
//        const isAdvanceMatched=customerArrayAdvance.some(cust => cust.roomId === roomId  && cust.selectedDate === currentDate  );
//        const hasAdvanceBooking = customerArrayAdvance?.some(
//         (item) => item.roomId === roomId && item.selectedDate === currentDate
//       );
//       //  console.log('is advance matched',isAdvanceMatched)
//        const roomType=roomData.roomType
//             return (
//                 <View key={roomIndex} style={{ padding: 6 }}>
//                 {/* <Pressable onPress={()=>roomClickHandler(roomId,roomType,shortLabel)}> */}
//                 <Pressable onPress={() => handlePress(roomId, roomType, shortLabel)}>

//                  <View
//                    style={{
//                      borderWidth: 1,
//                     //  borderColor:`${isAdvanceMatched ===true && todayDate !== currentDate?"pink":isMatched===true &&  todayDate === currentDate ?'red':roomType==='Ac'?'blue':roomType === "Non Ac"?'green':''}`,
//                     borderColor:`${isAdvanceMatched ===true || hasAdvanceBooking && todayDate !== currentDate ?"pink":isMatched===true &&  todayDate === currentDate || isRoomBooked ?'red':roomType==='Ac'?'blue':roomType === "Non Ac"?'green':''}`,
//                      borderRadius:12,
//                      padding:12,
//                      marginBottom: 5,
//                      width:50
                     
//                    }}
//                  >
//                  <View style={{ flexDirection: "row", justifyContent: "center" }}>
//                  <Text style={{ fontWeight: "bold", textAlign: "center"}}>
//         R-
//       </Text>
//       <Text style={{ fontWeight: "bold", textAlign: "center" }}>
//         {roomData?.number}
//       </Text>
//     </View>
//                  </View>
//                 </Pressable>
//              <Text style={{textAlign:'center'}}>{bedType}</Text>
//            </View>
//             )
//         } )}
//         {!profile.post?<Pressable onPress={()=>addRoomHandler(roomTitle)} >
//                  <View
//                    style={{
//                      borderWidth: 1,
//                     //  borderColor:`${isAdvanceMatched ===true && todayDate !== currentDate?"pink":isMatched===true &&  todayDate === currentDate ?'red':roomType==='Ac'?'blue':roomType === "Non Ac"?'green':''}`,
//                     borderColor:`orange`,
//                      borderRadius:12,
//                      padding:12,
//                      marginBottom: 3,
//                      marginTop:5,
//                      width:50
                     
//                    }}
//                  >
//      <Image source={plus} style={{width:20,height:20}}/>
//                  </View>
//                  <Text style={{textAlign:'center',paddingTop:2}}>Add Room</Text>
//                 </Pressable>:null}
//     </View>
//     </Card>
//   <CustomerDetailModal floor={floors} roomType={roomType} roomNo={roomNo} showAlert={showAlert} setShowAlert={setShowAlert} 
//   selectedRoomId={selectedRoomId} customerArray={customerArray} currentDates={currentDate}/>

//   <AdvanceBookModal floor={floors} roomType={roomType} roomNo={roomNo} advanceAlert={advanceAlert} roomNum={roomNo}
//   setAdvanceAlert={setAdvanceAlert}  selectedRoomId={selectedRoomId}
//    customerArrayAdvance={customerArrayAdvance} todayDate={todayDate} currentDates={currentDate}/>

//    <AddRoomModal roomAlert={roomAlert} setRoomAlert={setRoomAlert} 
//    hotelId={hotelDetailSelector?._id} floorSelect={selectFloor}/>
    
//     <AwesomeAlert
//           show={anotherShowAlert}
//           showProgress={false}
//           message={`Are you sure you want to delete ${label} `}
//           closeOnTouchOutside={true}
//           closeOnHardwareBackPress={false}
//           showCancelButton={true}
//           showConfirmButton={true}
//           cancelText="No"
//           confirmText="Yes"
//           confirmButtonColor="#DD6B55"
//           onCancelPressed={() => {
//        setAnotherShowAlert(false)
//           }}
    
//     onConfirmPressed={() => {
//       // Perform your delete logic here if needed
//       const deleteRoomObj={
//         id:hotelDetailSelector?._id,
//         floor:roomTitle,
//         floorId:roomIds
//       }
//       console.log('Room deleted!',deleteRoomObj);
//       dispatch(deleteRoomAsync(deleteRoomObj))
//       setAnotherShowAlert(false);
//     }}
//         />
//     </>
// )
// }
// export default RoomDetailCard

import { Card, Text } from "react-native-paper";
import { View, Pressable, Image} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import moment from "moment";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import CustomerDetailModal from "../../customerDetailModal/customerDetailModal";
import AdvanceBookModal from "../../advanceBookModal/advanceBookModal";
import plus from "../../../../assets/roomIcon/plus.png";
import AddRoomModal from "../../addRoomModal/addRoomModal";
import AwesomeAlert from "react-native-awesome-alerts";
import { deleteRoomAsync } from "../../../Redux/Slice/deleteRoomSlice/deleteRoomSlice";
import { deleteFloorAsync } from "../../../Redux/Slice/deleteFloorSlice/deleteFloorSlice";
import MessageModal from "../messageModal/messageModal";
import MaintenanceModal from "../maintenanceModal/maintenanceModal";


const socket = io.connect("http://192.168.29.169:4000");

const RoomDetailCard = ({ roomTitle, roomDetails, currentDate, profile,onFloorDeleted }) => {
 console.log('profile in card',profile)
 console.log('room details',roomDetails)
 console.log('current date',currentDate)
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const BASE_URL = "http://192.168.29.169:4000";

  const [showAlert, setShowAlert] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [customerObj, setCustomerObj] = useState({});
  const [mainCleanObj,setMainCleanObj]=useState({})
  const [anotherMainCleanObj,setAnotherMainCleanObj]=useState({})
  const [finalMainCleanObj,setFinalMainCleanObj]=useState({})
  const [label, setLabel] = useState("");
  const [anotherShowAlert, setAnotherShowAlert] = useState(false);
  const [floorAlert,setFloorAlert]=useState(false)
  const [customerArrayAdvance, setCustomerArrayAdvance] = useState([]);
  const [roomType, setRoomType] = useState("");
  const [floors, setFloors] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [selectFloor, setSelectFloor] = useState("");
  const [roomIds, setRoomIds] = useState("");
  const [advanceAlert, setAdvanceAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState(false);
  const [floorMessageAlert, setFloorMessageAlert] = useState(false);
  const [messageAlertObj, setMessageAlertObj] = useState({});
  const [AdvanceMessageAlertObj, setAdvanceMessageAlertObj] = useState({});
  const [roomAlert, setRoomAlert] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // ✅ guard to prevent double reopen
  const [floorDeleting, setFloorDeleting] = useState(false)
  const [maintainAlert,setMaintainAlert]=useState(false)
 const [floorLabel,setFloorLabel]=useState('')
 const [cardHeight, setCardHeight] = useState(0);

  const hotelDetailSelector = useSelector(
    (state) => state.getHotelDetails.getHotelDetailsObj.hotelObj
  );

  const finalDate = new Date();
  const todayDate = finalDate.toLocaleDateString("en-GB");


  const irregulars = {
    one: "First",
    two: "Second",
    three: "Third",
    five: "Fifth",
    eight: "Eighth",
    nine: "Ninth",
    twelve: "Twelfth",
    ground: "Ground",
  };

  const convertFloorName = (title) => {
    const [wordPart] = title.split(/Floor/i);
    const lowerWord = wordPart.toLowerCase();

    const ordinal =
      irregulars[lowerWord] ||
      lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1) + "th";

    return `${ordinal} Floor`;
  };

  const lastPress = useRef(0);
  const timeoutRef = useRef(null);

  const handlePress = (roomId, roomType, shortLabel) => {
    const time = new Date().getTime();
    const delta = time - lastPress.current;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (delta < 300 && !profile.post) {
      clearTimeout(timeoutRef.current);
      anotherClickHandler(roomId, roomType, shortLabel);
    } else {
      timeoutRef.current = setTimeout(() => {
        roomClickHandler(roomId, roomType, shortLabel);
      }, 300);
    }

    lastPress.current = time;
  };

  // const anotherClickHandler = (id, roomType, shortLabel) => {
  //   if (isDeleting) return; // ✅ stop re-trigger during deletion
  //   console.log("🔴 Double tap → anotherRoomClickHandler called for:", id, shortLabel);

  //   const today = moment(todayDate, "DD/MM/YYYY");
  //   const current = moment(currentDate, "DD/MM/YYYY");

  //   const validBookings = customerArray?.filter((item) => {
  //     const checkOut = moment(item.checkOutDate, "DD/MM/YYYY");
  //     return !(current.isAfter(checkOut) && item.roomId === id);
  //   });

  //   const isRoomBooked = validBookings.some((item) => {
  //     const checkIn = moment(item.checkInDate, "DD/MM/YYYY");
  //     const checkOut = moment(item.checkOutDate, "DD/MM/YYYY");
  //     return (
  //       item.roomId === id &&
  //       today.isSameOrAfter(checkIn) &&
  //       today.isSameOrBefore(checkOut)
  //     );
  //   });

  //   const hasAdvanceBooking = customerArrayAdvance?.some(
  //     (item) => item.roomId === id && item.selectedDate === currentDate
  //   );
  //     console.log('book',isRoomBooked,hasAdvanceBooking)
  //      if(isRoomBooked || hasAdvanceBooking  ){
  //       setMessageAlert(true)
  //       setLabel(shortLabel);
  //       setSelectedRoomId(id);
  //      }
  //      else{
  //       setLabel(shortLabel);
  //       setAnotherShowAlert(true);
  //       setRoomIds(id);
  //      }
  // };

  const anotherClickHandler = (id, roomType, shortLabel) => {
    if (isDeleting) return;
  
    const today = moment(todayDate, "DD/MM/YYYY");
  
    // --- FIND ROOM BOOKING (PRIORITY: customerArray) ----
    const currentBooking = customerArray?.find((item) => item.roomId === id);
    const advanceBooking = customerArrayAdvance?.find((item) => item.roomId === id);
  
    let isDateMismatch = false;
    let isRoomBooked = false;
  
    // ---- PRIORITY: CUSTOMER ARRAY BOOKING ----
    if (currentBooking) {
      const checkIn = moment(currentBooking.checkInDate, "DD/MM/YYYY");
      const checkOut = moment(currentBooking.checkOutDate, "DD/MM/YYYY");
  
      // Check if booking active today
      isRoomBooked =
        today.isSameOrAfter(checkIn) && today.isSameOrBefore(checkOut);
  
      // DATE MISMATCH → today != checkOutDate
      isDateMismatch = !today.isSame(checkOut, "day");
    }
  
    // ---- IF NO CUSTOMER BOOKING → USE ADVANCE BOOKING ----
    else if (advanceBooking) {
      isRoomBooked = true; // advance betyder room booked for that day
      
      const selectedDate = moment(advanceBooking.selectedDate, "DD/MM/YYYY");
  
      // DATE MISMATCH → today != selectedDate
      isDateMismatch = !today.isSame(selectedDate, "day");
    }
  
    console.log("RoomBooked:", isRoomBooked, "DateMismatch:", isDateMismatch);
  
    // -------- FINAL DECISION ----------
    if (isRoomBooked && isDateMismatch) {
      setMessageAlert(true);
      setLabel(shortLabel);
      setSelectedRoomId(id);
    } else {
      setLabel(shortLabel);
      setAnotherShowAlert(true);
      setRoomIds(id);
    }
  };
  
  const roomClickHandler = (id, type, num) => {
    setSelectedRoomId(id);

    const today = moment(todayDate, "DD/MM/YYYY");
    const current = moment(currentDate, "DD/MM/YYYY");

    const validBookings = customerArray?.filter((item) => {
      const checkOut = moment(item.checkOutDate, "DD/MM/YYYY");
      return !(current.isAfter(checkOut) && item.roomId === id);
    });

    const isRoomBooked = validBookings.some((item) => {
      const checkIn = moment(item.checkInDate, "DD/MM/YYYY");
      const checkOut = moment(item.checkOutDate, "DD/MM/YYYY");
      return (
        item.roomId === id &&
        today.isSameOrAfter(checkIn) &&
        today.isSameOrBefore(checkOut)
      );
    });

    const hasAdvanceBooking = customerArrayAdvance?.some(
      (item) => item.roomId === id && item.selectedDate === currentDate
    );
    const mainClean=maintainCleanRoomArray?.some((item)=>item.roomId===id && 
    item.type==="Clean Room" && item.todayDate===currentDate )

    const mainMaintenance=maintainCleanRoomArray?.some((item)=>item.roomId===id && 
    item.type==="Maintenance Room" )

    // if ((todayDate === currentDate && !hasAdvanceBooking) || isRoomBooked) {
    //   setShowAlert(true);
    // } else {
    //   setAdvanceAlert(true);
    // }
    if (mainClean || mainMaintenance) {
      const mainObj={
        roomId:id,
        roomType:type,
        roomNo:num
      }
      setAnotherMainCleanObj(mainObj)
      setMaintainAlert(true);   // maintenance pe alert
    } else {
      // ✔ Normal booking flow
      if ((todayDate === currentDate && !hasAdvanceBooking) || isRoomBooked) {
        setShowAlert(true);
      } else {
        setAdvanceAlert(true);
      }
    }
    setRoomType(type);
    setFloors(convertFloorName(roomTitle));
    setRoomNo(num);
  };

  const addRoomHandler = (roomTitle) => {
    setSelectFloor(roomTitle);
    setRoomAlert(true);
  };

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        if (hotelDetailSelector._id) {
          const response = await axios.get(
            `${BASE_URL}/hotel/getCustomerDetails/${hotelDetailSelector?._id}`
          );
          setCustomerObj(response?.data || {});
        }
      } catch (error) {}
    };

    fetchRoomDetails();

    socket.on("getCustomerDetails", (newUser) => {
      setCustomerObj(newUser);
    });
    return () => {
      socket.off("getCustomerDetails");
      socket.off("getCustomerDetailsAdvance");
    };
  }, [hotelDetailSelector._id]);

  const customerArray = customerObj?.getCustomerDetailsArray || [];
  console.log('customr',customerArray)
  console.log('customr advance',customerArrayAdvance)

  useEffect(() => {
    const fetchRoomDetailsAdvance = async () => {
      try {
        if (hotelDetailSelector._id) {
          const response = await axios.get(
            `${BASE_URL}/hotel/getCustomerDetailsAdvance/${hotelDetailSelector?._id}`
          );
          setCustomerArrayAdvance(response?.data?.getAdvanceCustomerDetailsArray || []);
        }
      } catch (error) {}
    };

    fetchRoomDetailsAdvance();

    socket.on("getCustomerDetailsAdvance", (newUser) => {
      setCustomerArrayAdvance(newUser);
    });

    return () => {
      socket.off("getCustomerDetailsAdvance");
    };
  }, [hotelDetailSelector._id]);

  const deleteFloorHandler=(roomTitle)=>{
    if (profile?.post) {
      console.log("Blocked because profile.post exists");
      return;
    }
    console.log('room title',roomTitle)
    if (floorDeleting) return; 
   
    const roomAdvanceBooked = customerArrayAdvance?.some(
      (item) => item.floor === convertFloorName(roomTitle)
    );
    const roomBooked = customerArray?.some(
      (item) => item.floor === convertFloorName(roomTitle)
    );
    console.log('room booked',roomBooked)
    console.log('room advance booked',roomAdvanceBooked)
    if(roomBooked || roomAdvanceBooked){
      setFloorMessageAlert(true)
      setFloorLabel(convertFloorName(roomTitle))
    }
    else{
      setFloorAlert(true)
    }
    // setFloorAlert(true)
// const deleteFloorObj={
// id:hotelDetailSelector?._id,
// floorName:roomTitle
// }
// console.log('delete obj',deleteFloorObj)
  }
  useEffect(()=>{
    if(selectedRoomId){
    const customerObj=customerArray.find((item)=>item.roomId==selectedRoomId)
    // console.log('customer obj in detail',customerObj)
    setMessageAlertObj(customerObj)
    }
    },[selectedRoomId,customerArray])

    useEffect(()=>{
      if(selectedRoomId){
      const customerObj=customerArrayAdvance.find((item)=>item.roomId==selectedRoomId)
      // console.log('customer obj in detail',customerObj)
      setAdvanceMessageAlertObj(customerObj)
      }
      },[selectedRoomId,customerArrayAdvance])

      const maintainHandler=(roomDetails)=>{
      console.log('details is',roomDetails)
      navigation.navigate('MaintenancePage',{ formData:roomDetails,heading:`${convertFloorName(roomTitle)} Maintenance`,
      title:`${convertFloorName(roomTitle)} Maintenance`,titles:`${convertFloorName(roomTitle)}`,profileName:profile?.name });
      }

      useEffect(() => {
        const fetchMainCleanDetails = async () => {
          try {
            if (hotelDetailSelector?._id) {
              const response = await axios.get(
                `${BASE_URL}/hotel/getMaintenanceCleanRoom/${hotelDetailSelector?._id}`
              );
              setMainCleanObj(response?.data || {});
            }
          } catch (error) {}
        };
    
        fetchMainCleanDetails();
    
        socket.on("getMaintainCleanRoom", (newUser) => {
          setMainCleanObj(newUser);
        });
        return () => {
          socket.off("getMaintainCleanRoom");
        };
      }, [hotelDetailSelector?._id]);
  
      console.log('clen room detail',mainCleanObj)
  
      const maintainCleanRoomArray=mainCleanObj?.maintainCleanRoom
  console.log('cleam man',maintainCleanRoomArray)
      useEffect(()=>{
        if(selectedRoomId){
   const obj=maintainCleanRoomArray?.find((item)=>item.roomId===selectedRoomId)
   console.log('obj is',obj)
  setFinalMainCleanObj(obj)
        }
      },[selectedRoomId,maintainCleanRoomArray])
  
      console.log('final main obj detail',finalMainCleanObj)
  return (
    <>
    <Pressable onPress={()=>deleteFloorHandler(roomTitle)}>
    <Card style={{ borderRadius: 6, marginVertical: 5, padding: 10 }}
     onLayout={(event) => {
      const { height } = event.nativeEvent.layout;
      console.log('height is',height)
      setCardHeight(height)
    }}
    >
     
     <Pressable
  onPress={() => maintainHandler(roomDetails)}
  style={{
    position: "absolute",
    right: -10,
    top: -10,
    bottom: -10,
    width: 30,
  }}
>
  <View
    style={{
      flex: 1,
      backgroundColor: "yellow",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 10,
    }}
  >
    {"MAINTENANCE".split("").map((ch, i) => (
      <Text
        key={i}
        style={{
          color: "black",
          fontWeight: "bold",
          fontSize: cardHeight > 200 ? 11 : 7,
        }}
      >
        {ch}
      </Text>
    ))}
  </View>
</Pressable>


       <View style={{flexDirection:"row",justifyContent:'space-between'}}>
        
       </View>
        <Text>{convertFloorName(roomTitle)}</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
          {roomDetails &&
            typeof roomDetails === "object" &&
            Object.entries(roomDetails).map(([roomLabel, roomData], roomIndex) => {
              const roomId = roomData?._id;
              const shortLabel = `R-${roomData?.number}`;
              const bedType = roomData.bedType
                .split(",")
                .map((item) => item.replace(" Bed", ""));
              const today = moment(todayDate, "DD/MM/YYYY");
              console.log('toay us',today)
              const current = moment(currentDate, "DD/MM/YYYY");
              const isMatched = customerArray?.some((cust) => cust.roomId === roomId);
              const isRoomBooked = customerArray
                ?.filter(
                  (cust) =>
                    !(
                      current.isAfter(moment(cust.checkOutDate, "DD/MM/YYYY")) &&
                      cust.roomId === roomId
                    )
                )
                ?.some(
                  (cust) =>
                    cust.roomId === roomId &&
                    today.isBetween(
                      moment(cust.checkInDate, "DD/MM/YYYY"),
                      moment(cust.checkOutDate, "DD/MM/YYYY"),
                      undefined,
                      "[]"
                    )
                );

              const isAdvanceMatched = customerArrayAdvance.some(
                (cust) => cust.roomId === roomId && cust.selectedDate === currentDate
              );
              console.log('advance match',isAdvanceMatched)
              console.log('is match',isMatched)

              const hasAdvanceBooking = isAdvanceMatched;
              const roomType = roomData.roomType;
              const todayString = moment(todayDate, "DD/MM/YYYY").format("DD/MM/YYYY");
              
              const cleanMatched=maintainCleanRoomArray?.some((item)=>item?.roomId===roomId 
              && item.type==="Clean Room" && item.todayDate===currentDate)
              const maintenanceMatched=maintainCleanRoomArray?.some((item)=>item?.roomId===roomId 
              && item.type==="Maintenance Room")
            console.log('clean match',cleanMatched)
              return (
                <View key={roomIndex} style={{ padding: 6 }}>
                  <Pressable onPress={() => handlePress(roomId, roomType, shortLabel)}>
                    <View
                      style={{
                        borderWidth: cleanMatched || maintenanceMatched? 0 : 1,
                        borderColor: `${
                          isAdvanceMatched && todayDate !== currentDate
                            ? "pink"
                            : isMatched && todayDate === currentDate
                            ? "red"
                            : isRoomBooked
                            ? "red"
                            : roomType === "Ac"
                            ? "blue"
                            : roomType === "Non Ac"
                            ? "green"
                            : ""
                        }`,
                        borderRadius: 12,
                        padding: 12,
                        marginBottom: 5,
                        width: 50,
                        backgroundColor: cleanMatched
                        ? "#2ECC71"
                        : maintenanceMatched
                        ? "#FF9800"
                        : "transparent",
                      }}
                    >
                      <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <Text style={{ fontWeight: "bold", textAlign: "center" }}>R-</Text>
                        <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                          {roomData?.number}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                  <Text style={{ textAlign: "center" }}>{bedType}</Text>
                </View>
              );
            })}

          {!profile.post ? (
            <Pressable onPress={() => addRoomHandler(roomTitle)}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "orange",
                  borderRadius: 12,
                  padding: 12,
                  marginBottom: 3,
                  marginTop: 5,
                  width: 50,
                }}
              >
                <Image source={plus} style={{ width: 20, height: 20 }} />
              </View>
              <Text style={{ textAlign: "center", paddingTop: 2 }}>Add Room</Text>
            </Pressable>
          ) : null}
           
        </View>
      </Card>
    </Pressable>
      

      <CustomerDetailModal
        floor={floors}
        roomType={roomType}
        roomNo={roomNo}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        selectedRoomId={selectedRoomId}
        customerArray={customerArray}
        currentDates={currentDate}
      />

      <AdvanceBookModal
        floor={floors}
        roomType={roomType}
        roomNo={roomNo}
        advanceAlert={advanceAlert}
        roomNum={roomNo}
        setAdvanceAlert={setAdvanceAlert}
        selectedRoomId={selectedRoomId}
        customerArrayAdvance={customerArrayAdvance}
        todayDate={todayDate}
        currentDates={currentDate}
      />

      <AddRoomModal
        roomAlert={roomAlert}
        setRoomAlert={setRoomAlert}
        hotelId={hotelDetailSelector?._id}
        floorSelect={selectFloor}
      />
      
      <MessageModal messageAlert={messageAlert} setMessageAlert={setMessageAlert} label={label} 
      messageObj={messageAlertObj} currentDate={currentDate} todayDate={todayDate} 
      advanceMessageObj={AdvanceMessageAlertObj} floorMessageAlert={floorMessageAlert}  
      setFloorMessageAlert={setFloorMessageAlert} floorLabel={floorLabel} setFloorLabel={setFloorLabel}/>

      <MaintenanceModal  maintainAlert={maintainAlert} setMaintainAlert={setMaintainAlert}
    finalMainCleanObj={finalMainCleanObj} maintainObj={anotherMainCleanObj}
    />

      <AwesomeAlert
        show={anotherShowAlert}
        showProgress={false}
        message={`Are you sure you want to delete ${label}?`}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No"
        confirmText="Yes"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => setAnotherShowAlert(false)}
        onConfirmPressed={() => {
          setIsDeleting(true); // ✅ prevent re-trigger
          const deleteRoomObj = {
            id: hotelDetailSelector?._id,
            floor: roomTitle,
            floorId: roomIds,
          };
          console.log("Room deleted!", deleteRoomObj);
          setAnotherShowAlert(false);
          setTimeout(() => {
            dispatch(deleteRoomAsync(deleteRoomObj));
            setIsDeleting(false); // reset guard after done
          }, 500); // slight delay ensures clean close
        }}
      />

<AwesomeAlert
        show={floorAlert}
        showProgress={false}
        message={`Are you sure you want to delete ${convertFloorName(roomTitle)}?`}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No"
        confirmText="Yes"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => setFloorAlert(false)}
        onConfirmPressed={() => {
          setFloorDeleting(true); // ✅ prevent re-trigger
          const deleteFloorObj = {
            id: hotelDetailSelector?._id,
            floorName: roomTitle,
            
          };
          console.log("floor deleted!", deleteFloorObj);
          setFloorAlert(false);
          setTimeout(() => {
            dispatch(deleteFloorAsync(deleteFloorObj));
            onFloorDeleted?.(roomTitle);
            setFloorDeleting(false); // reset guard after done
          }, 500); // slight delay ensures clean close
        }}
      />
    </>
  );
};

export default RoomDetailCard;
