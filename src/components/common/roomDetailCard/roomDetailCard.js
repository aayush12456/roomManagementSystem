import { Card,Text } from "react-native-paper"
import { View,Pressable,Image } from "react-native";
import { useState,useEffect,useRef } from "react";
import axios from 'axios'
import moment from "moment";
import io from "socket.io-client";
import {useSelector,useDispatch} from 'react-redux'
import CustomerDetailModal from "../../customerDetailModal/customerDetailModal";
import AdvanceBookModal from "../../advanceBookModal/advanceBookModal";
import plus from '../../../../assets/roomIcon/plus.png'
import AddRoomModal from "../../addRoomModal/addRoomModal";
import AwesomeAlert from 'react-native-awesome-alerts';
import { deleteRoomAsync } from "../../../Redux/Slice/deleteRoomSlice/deleteRoomSlice";
const socket = io.connect("http://192.168.29.169:4000")
const RoomDetailCard=({roomTitle,roomDetails,currentDate,profile})=>{
  console.log('profile data',profile)
  // console.log('curent date',currentDate)
  // console.log('room details',roomDetails)
  // console.log('titles',roomTitle)
  const dispatch=useDispatch()
  const BASE_URL = "http://192.168.29.169:4000";
  const [showAlert, setShowAlert] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [customerObj,setCustomerObj]=useState({})
  const [label,setLabel]=useState('')
  const [anotherShowAlert, setAnotherShowAlert] = useState(false);
  const [customerArrayAdvance,setCustomerArrayAdvance]=useState([])
  const [roomType,setRoomType]=useState('')
  const [floors,setFloors]=useState('')
  const [roomNo,setRoomNo]=useState('')
  const [selectFloor,setSelectFloor]=useState('')
  const [roomIds,setRoomIds]=useState('')
  const [advanceAlert,setAdvanceAlert]=useState(false)
  const [roomAlert,setRoomAlert]=useState(false)
  const hotelDetailSelector=useSelector((state)=>state.getHotelDetails.getHotelDetailsObj.hotelObj)
  
  // console.log('hotel id',hotelDetailSelector?._id)
  const finalDate=new Date()
  const todayDate=finalDate.toLocaleDateString("en-GB") 
    const irregulars = {
        one: "First",
        two: "Second",
        three: "Third",
        five: "Fifth",
        eight: "Eighth",
        nine: "Ninth",
        twelve: "Twelfth",
        ground: "Ground"
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
    
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
    
        if (delta < 300 && !profile.post) {
          // 🔁 Double tap detected → cancel single tap
          clearTimeout(timeoutRef.current);
          anotherClickHandler(roomId, roomType, shortLabel);
        } else {
          // 🕓 Wait 300ms to confirm it's single tap
          timeoutRef.current = setTimeout(() => {
            roomClickHandler(roomId, roomType, shortLabel);
          }, 300);
        }
    
        lastPress.current = time;
      };
      
      const anotherClickHandler = (roomId, roomType, shortLabel) => {
        console.log("🔴 Double tap → anotherRoomClickHandler called for:", roomId,shortLabel);
        setLabel(shortLabel)
        setAnotherShowAlert(true)
        setRoomIds(roomId)
        // --- yahan aap delete logic, confirm modal, etc. laga sakte ho
      };

  const roomClickHandler = (id, type, num) => {
    console.log('num is',num)
  // console.log("id is", id);
  setSelectedRoomId(id);

  const today = moment(todayDate, "DD/MM/YYYY");
  const current = moment(currentDate, "DD/MM/YYYY");

  // Sirf valid bookings rakho (jisme currentDate checkOut ke baad na ho)
  const validBookings = customerArray?.filter((item) => {
    const checkOut = moment(item.checkOutDate, "DD/MM/YYYY");
    return !(current.isAfter(checkOut) && item.roomId === id);
  });

  // Ab is filtered list se booked check karo
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
  

  // if (
  //   (todayDate === currentDate &&
  //     customerArrayAdvance?.every((item) => item.roomId !== id)) ||
  //   isRoomBooked
  // ) {
  //   setShowAlert(true);
  // } else {
  //   setAdvanceAlert(true);
  // }
  if (
    (todayDate === currentDate  && !hasAdvanceBooking) ||
    isRoomBooked
  ) {
    setShowAlert(true);
  } else {
    setAdvanceAlert(true);
  }
  setRoomType(type);
  setFloors(convertFloorName(roomTitle));
  setRoomNo(num);
};

  // console.log('floor us',floors)
  // console.log('room no',roomNo)
  // console.log('show alert in advance',showAlert)
const addRoomHandler=(roomTitle)=>{
  console.log('room title',roomTitle)
  setSelectFloor(roomTitle)
setRoomAlert(true)
}

useEffect(() => {
  const fetchRoomDetails = async () => {
    try {
      if (hotelDetailSelector._id) {
        const response = await axios.get(
          `${BASE_URL}/hotel/getCustomerDetails/${hotelDetailSelector?._id}`
        );
        // console.log('visitor user in response',response?.data)
        setCustomerObj(response?.data || {} )
      }
    } catch (error) {
      // console.error("Error fetching visitors:", error);
    }
  };

  fetchRoomDetails();

  socket.on("getCustomerDetails", (newUser) => {
    setCustomerObj(newUser);
  });
  return () => {
    socket.off("getCustomerDetails");
  };
}, [hotelDetailSelector._id]);

const customerArray=customerObj?.getCustomerDetailsArray
// console.log('customer array is',customerArray)
const roomData= Object.values(roomDetails)
// console.log('room data',roomData)
// useEffect(() => {
//   const isMatch = customerArray.some(cust =>
//     roomData.some(room => room._id === cust.roomId)
//   );
// if(isMatch){
//   setMatchedCustomerResponse(isMatch)
// }
//   console.log("Kya match mila? ->", isMatch); // true ya false
// }, [customerArray, roomData]);

useEffect(() => {
  const fetchRoomDetailsAdvance = async () => {
    try {
      if (hotelDetailSelector._id) {
        const response = await axios.get(
          `${BASE_URL}/hotel/getCustomerDetailsAdvance/${hotelDetailSelector?._id}`
        );
        // console.log('visitor user in response',response?.data)
        setCustomerArrayAdvance(response?.data?.getAdvanceCustomerDetailsArray || {} )
      }
    } catch (error) {
      // console.error("Error fetching visitors:", error);
    }
  };

  fetchRoomDetailsAdvance();

  socket.on("getCustomerDetailsAdvance", (newUser) => {
    setCustomerArrayAdvance(newUser);
  });
  return () => {
    socket.off("getCustomerDetailsAdvance");
  };
}, [hotelDetailSelector._id]);
// console.log('customer array advance',customerArrayAdvance)
return (
    <>
    <Card style={{ borderRadius: 6, marginVertical: 5, padding: 10 }}>
    <Text>{convertFloorName(roomTitle)}</Text>
    <View style={{flexDirection:'row',flexWrap:'wrap',gap:10}}>
    {roomDetails && typeof roomDetails === 'object' &&
        Object.entries(roomDetails).map(([roomLabel, roomData], roomIndex) =>{
          console.log('room data is',roomData)
        const data=roomLabel.split('')
        const roomId=roomData?._id
        const shortLabel=`R-${roomData?.number}`
       const bedType = roomData.bedType.split(',').map(item => item.replace(' Bed', ''));
       const isMatched = customerArray?.some(cust => cust.roomId === roomId);
       const today = moment(todayDate, "DD/MM/YYYY");
       const current = moment(currentDate, "DD/MM/YYYY");
       const isRoomBooked = customerArray
  ?.filter(cust => !(current.isAfter(moment(cust.checkOutDate, "DD/MM/YYYY")) && cust.roomId === roomId))
  ?.some(cust =>
    cust.roomId === roomId &&
    today.isBetween(
      moment(cust.checkInDate, "DD/MM/YYYY"),
      moment(cust.checkOutDate, "DD/MM/YYYY"),
      undefined,
      "[]"
    )
  );
       const isAdvanceMatched=customerArrayAdvance.some(cust => cust.roomId === roomId  && cust.selectedDate === currentDate  );
       const hasAdvanceBooking = customerArrayAdvance?.some(
        (item) => item.roomId === roomId && item.selectedDate === currentDate
      );
      //  console.log('is advance matched',isAdvanceMatched)
       const roomType=roomData.roomType
            return (
                <View key={roomIndex} style={{ padding: 6 }}>
                {/* <Pressable onPress={()=>roomClickHandler(roomId,roomType,shortLabel)}> */}
                <Pressable onPress={() => handlePress(roomId, roomType, shortLabel)}>

                 <View
                   style={{
                     borderWidth: 1,
                    //  borderColor:`${isAdvanceMatched ===true && todayDate !== currentDate?"pink":isMatched===true &&  todayDate === currentDate ?'red':roomType==='Ac'?'blue':roomType === "Non Ac"?'green':''}`,
                    borderColor:`${isAdvanceMatched ===true || hasAdvanceBooking && todayDate !== currentDate ?"pink":isMatched===true &&  todayDate === currentDate || isRoomBooked ?'red':roomType==='Ac'?'blue':roomType === "Non Ac"?'green':''}`,
                     borderRadius:12,
                     padding:12,
                     marginBottom: 5,
                     width:50
                     
                   }}
                 >
                 <View style={{ flexDirection: "row", justifyContent: "center" }}>
                 <Text style={{ fontWeight: "bold", textAlign: "center"}}>
        R-
      </Text>
      <Text style={{ fontWeight: "bold", textAlign: "center" }}>
        {roomData?.number}
      </Text>
    </View>
                 </View>
                </Pressable>
             <Text style={{textAlign:'center'}}>{bedType}</Text>
           </View>
            )
        } )}
        {!profile.post?<Pressable onPress={()=>addRoomHandler(roomTitle)} >
                 <View
                   style={{
                     borderWidth: 1,
                    //  borderColor:`${isAdvanceMatched ===true && todayDate !== currentDate?"pink":isMatched===true &&  todayDate === currentDate ?'red':roomType==='Ac'?'blue':roomType === "Non Ac"?'green':''}`,
                    borderColor:`orange`,
                     borderRadius:12,
                     padding:12,
                     marginBottom: 3,
                     marginTop:5,
                     width:50
                     
                   }}
                 >
     <Image source={plus} style={{width:20,height:20}}/>
                 </View>
                 <Text style={{textAlign:'center',paddingTop:2}}>Add Room</Text>
                </Pressable>:null}
    </View>
    </Card>
  <CustomerDetailModal floor={floors} roomType={roomType} roomNo={roomNo} showAlert={showAlert} setShowAlert={setShowAlert} 
  selectedRoomId={selectedRoomId} customerArray={customerArray} currentDates={currentDate}/>

  <AdvanceBookModal floor={floors} roomType={roomType} roomNo={roomNo} advanceAlert={advanceAlert} roomNum={roomNo}
  setAdvanceAlert={setAdvanceAlert}  selectedRoomId={selectedRoomId}
   customerArrayAdvance={customerArrayAdvance} todayDate={todayDate} currentDates={currentDate}/>

   <AddRoomModal roomAlert={roomAlert} setRoomAlert={setRoomAlert} 
   hotelId={hotelDetailSelector?._id} floorSelect={selectFloor}/>
    
    <AwesomeAlert
          show={anotherShowAlert}
          showProgress={false}
          message={`Are you sure you want to delete ${label} `}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No"
          confirmText="Yes"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
       setAnotherShowAlert(false)
          }}
    
    onConfirmPressed={() => {
      // Perform your delete logic here if needed
      const deleteRoomObj={
        id:hotelDetailSelector?._id,
        floor:roomTitle,
        floorId:roomIds
      }
      console.log('Room deleted!',deleteRoomObj);
      dispatch(deleteRoomAsync(deleteRoomObj))
      setAnotherShowAlert(false);
    }}
        />
    </>
)
}
export default RoomDetailCard