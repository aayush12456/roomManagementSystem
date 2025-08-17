import { Card,Text } from "react-native-paper"
import { View,Pressable } from "react-native";
import { useState,useEffect } from "react";
import axios from 'axios'
import io from "socket.io-client";
import {useSelector} from 'react-redux'
import CustomerDetailModal from "../../customerDetailModal/customerDetailModal";
const socket = io.connect("http://192.168.29.169:4000")
const RoomDetailCard=({roomTitle,roomDetails})=>{
  console.log('room details',roomDetails)
  const BASE_URL = "http://192.168.29.169:4000";
  const [showAlert, setShowAlert] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [customerArray,setCustomerArray]=useState([])
  const [matchedCustomerResponse,setMatchedCustomerResponse]=useState(null)
  const hotelDetailSelector=useSelector((state)=>state.getHotelDetails.getHotelDetailsObj.hotelObj)
  console.log('hotel id',hotelDetailSelector?._id)
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
      
      const roomClickHandler = (id) => {
        console.log('id is',id)
        setSelectedRoomId(id);
        setShowAlert(true);
      };
  
      
useEffect(() => {
  const fetchRoomDetails = async () => {
    try {
      if (hotelDetailSelector._id) {
        const response = await axios.get(
          `${BASE_URL}/hotel/getCustomerDetails/${hotelDetailSelector?._id}`
        );
        console.log('visitor user in response',response?.data)
        setCustomerArray(response?.data?.getCustomerDetailsArray || {} )
      }
    } catch (error) {
      // console.error("Error fetching visitors:", error);
    }
  };

  fetchRoomDetails();

  socket.on("getCustomerDetails", (newUser) => {
    setCustomerArray(newUser);
  });
  return () => {
    socket.off("getCustomerDetails");
  };
}, [hotelDetailSelector._id]);
console.log('customer array is',customerArray)
const roomData= Object.values(roomDetails)
console.log('room data',roomData)
// useEffect(() => {
//   const isMatch = customerArray.some(cust =>
//     roomData.some(room => room._id === cust.roomId)
//   );
// if(isMatch){
//   setMatchedCustomerResponse(isMatch)
// }
//   console.log("Kya match mila? ->", isMatch); // true ya false
// }, [customerArray, roomData]);

return (
    <>
    <Card style={{ borderRadius: 6, marginVertical: 5, padding: 10 }}>
    <Text>{convertFloorName(roomTitle)}</Text>
    <View style={{flexDirection:'row',flexWrap:'wrap',gap:10}}>
    {roomDetails && typeof roomDetails === 'object' &&
        Object.entries(roomDetails).map(([roomLabel, roomData], roomIndex) =>{
        const data=roomLabel.split('')
        const roomId=roomData?._id
        const shortLabel=`R${data[data.length-1]}`
       const bedType = roomData.bedType.split(',').map(item => item.replace(' Bed', ''));
       const isMatched = customerArray.some(cust => cust.roomId === roomId);
            return (
                <View key={roomIndex} style={{ padding: 6 }}>
                <Pressable onPress={()=>roomClickHandler(roomId)}>
                 <View
                   style={{
                     borderWidth: 1,
                     borderColor:`${isMatched===true?'red':'#000'}`,
                     borderRadius:12,
                     padding:12,
                     marginBottom: 5,
                     width:50
                   }}
                 >
                   <Text style={{ fontWeight: "bold",textAlign:'center' }}>{shortLabel}</Text>
                 </View>
                </Pressable>
             <Text style={{textAlign:'center'}}>{bedType}</Text>
           </View>
            )
        } )}
    </View>
    </Card>
  <CustomerDetailModal showAlert={showAlert} setShowAlert={setShowAlert} selectedRoomId={selectedRoomId} customerArray={customerArray}/>
    
    </>
)
}
export default RoomDetailCard