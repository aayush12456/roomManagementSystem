import { Text,Button,TextInput,Switch } from "react-native-paper"
import { useEffect,useState } from "react"
import * as SecureStore from 'expo-secure-store';
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import io from "socket.io-client";
import { View } from "react-native";
import { ScrollView,Pressable,Image } from "react-native";
import RoomDetailCard from "../common/roomDetailCard/roomDetailCard";
import plus from '../../../assets/roomIcon/plus.png'
import { SafeAreaView } from "react-native-safe-area-context";
import {useSelector,useDispatch} from 'react-redux'
import BookedModal from "../bookedModal/bookedModal";
import AddFloorModal from "../addFloorModal/addFloorModal";
import { getHotelDetailsAsync } from "../../Redux/Slice/getHotelDetailSlice/getHotelDetailSlice";

const socket = io.connect("http://192.168.29.169:4000")
// const socket = io.connect("https://roommanagementsystembackend-1.onrender.com")
const Dashboard=({hotelDetails,profile,notifyTokenArray})=>{
  const BASE_URL = "http://192.168.29.169:4000";
  // const BASE_URL = "https://roommanagementsystembackend-1.onrender.com";
  console.log('hotel details is',hotelDetails)
  console.log('notify tokens',notifyTokenArray)
  const [customerObj,setCustomerObj]=useState({})
  const [customerArrayAdvance,setCustomerArrayAdvance]=useState([])
  const [showBookedAlert, setShowBookedAlert] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [floorAlert,setFloorAlert]=useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [matchRoomArray,setMatchRoomArray]=useState([])
  const [deletedFloorName, setDeletedFloorName] = useState(null);
  const [isDashboardScrollEnabled, setIsDashboardScrollEnabled] = useState(true);
console.log('das scroll',isDashboardScrollEnabled)
    const navigation = useNavigation();
    const dispatch=useDispatch()
    const totalRoom=hotelDetails?.totalRoom
    const room=hotelDetails?.room
    console.log('room is',room)
    
    const hotelDetailSelector=useSelector((state)=>state.getHotelDetails.getHotelDetailsObj.hotelObj)
    // console.log('hotel id dashboard',hotelDetailSelector?._id)
    
  const deleteFloorSelector=useSelector((state)=>state.deleteFloorData.deleteFloorObj)

  // const filterRoom =
  // room && typeof room === "object"
  //   ? Object.fromEntries(
  //       Object.entries(room).filter(
  //         ([floorKey]) =>
  //           floorKey.toLowerCase() !==
  //           deleteFloorSelector?.floorName?.toLowerCase()
  //       )
  //     )
  //   : {};
  // console.log('delete floor selector in room',deleteFloorSelector)
  // console.log('filter,room',filteredRoom)

  const [filterRoom, setFilterRoom] = useState(room || {});
 // Filter floors locally
 useEffect(() => {
  if (!room || typeof room !== "object") return;

  const floorToRemove =
 deletedFloorName;

  if (floorToRemove) {
    const filtered = Object.fromEntries(
      Object.entries(room).filter(
        ([floorKey]) => floorKey.toLowerCase() !== floorToRemove.toLowerCase()
      )
    );
    setFilterRoom(filtered);
  } else {
    setFilterRoom(room);
  }
}, [room, deletedFloorName]);

console.log('filter,room',filterRoom)

const handleFloorDeleted = (floorName) => {
  setDeletedFloorName(floorName);
};

    const finalDate=new Date()
    const todayDate=finalDate.toLocaleDateString("en-GB")

    useEffect(() => {
      const fetchRoomDetails = async () => {
        try {
          if (hotelDetails?._id) {
            const response = await axios.get(
              `${BASE_URL}/hotel/getCustomerDetails/${hotelDetails?._id}`
            );
            // console.log('visitor user dashboard in response',response?.data)
            setCustomerObj(response?.data || {})
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
    }, [hotelDetails?._id]);

    const customerArray=customerObj?.getCustomerDetailsArray
    // console.log('customer array dashboard is',customerArray)
    // console.log('room is',Object.entries(room))
    // const hotelObj=hotelDetails?.matchedHotels[0]
    // const removeLoginData = async () => {
    //     try {
    //       await SecureStore.deleteItemAsync('loginOtpObj');
    //       console.log('login obj removed from SecureStore');
    //     } catch (error) {
    //       console.error('Error removing login obj:', error);
    //     }
    //   };
    // const logoutHandler=()=>{
    //  removeLoginData()
    //  navigation.navigate('LoginPage')
    // }

    const bookedRoomHandler=()=>{
setShowBookedAlert(true)
    }
    const handleDateChange = (event, date) => {

      setShowDatePicker(false);
      if (date) {
        setSelectedDate(date);
      }
    };
    // console.log('select date',selectedDate.toLocaleDateString("en-GB"))
    const currentDate=selectedDate.toLocaleDateString("en-GB")

    useEffect(() => {
      const fetchRoomDetailsAdvance = async () => {
        try {
          if (hotelDetails?._id) {
            const response = await axios.get(
              `${BASE_URL}/hotel/getCustomerDetailsAdvance/${hotelDetails?._id}`
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
    }, [hotelDetails?._id]);

    useEffect(()=>{
      if(currentDate){
      const matchRoom=customerArrayAdvance?.filter((item)=>item.selectedDate==currentDate)
       setMatchRoomArray(matchRoom)
      }
      },[currentDate,customerArrayAdvance])

      // console.log('match room array',matchRoomArray)

      const bookedNumber=todayDate!==currentDate?matchRoomArray.length: customerArray?.length
      const finalTotalRoom=totalRoom-bookedNumber

      const addFloorHandler=()=>{
        setFloorAlert(true)
      }
return (
    <>

    {/* {
    <Button
                      mode="contained"
                      style={{
                        height: 50, // Set the desired height
                        borderRadius:23,
                        color: '#FFFFFF',
                         fontSize: 16, 
                         justifyContent:'center',
                         marginLeft: 12,
                         marginTop:12,
                         marginRight: 20,
                      }}
                      buttonColor="rgba(234, 88, 12, 1)"
                      onPress={logoutHandler}
                    >
           logout
                    </Button> } */}
                    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={{position:'absolute',right:0}}>
                    <Switch  
                    value={!isDashboardScrollEnabled}    // ← important
                   onValueChange={() => setIsDashboardScrollEnabled(!isDashboardScrollEnabled)}
                   />
                        </View>
                    <View style={{ marginTop:-24,flexDirection:'row',justifyContent:'center' }}>
                      
        <Pressable
        onPress={() => setShowDatePicker(true)}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 12,
          margin: 12,
          backgroundColor: "#f9f9f9",
          width:'50%'
        }}
      >
        <Text style={{ fontSize: 16, color: "#333" }}>
          {selectedDate.toLocaleDateString("en-GB")} {/* dd/mm/yyyy */}
        </Text>
      </Pressable>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            minimumDate={new Date()} // 👈 sirf aaj se aage ki date
            onChange={handleDateChange}
          />
        )}
      </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:8,marginRight:8}}>
                    <View>
                   <Text>Total Rooms : {totalRoom}</Text>
                   <View style={{flexDirection:'row',gap:5,marginTop:4}}>
                   <View
                    style={{
                      width:10,        
                      height: 10,     
                      borderWidth: 2,   
                      borderColor: "blue", 
                      borderRadius: 2,
                      marginTop:5  
                    }}
                   />
                  <Text>Ac</Text>
                  <View
                    style={{
                      width:10,        
                      height: 10,     
                      borderWidth: 2,   
                      borderColor: "green", 
                      borderRadius: 2,  
                      marginTop:5
                    }}
                   />
                  <Text>Non Ac</Text>
    
                  <View
                    style={{
                      width:10,        
                      height: 10,     
                      borderWidth: 2,   
                      borderColor: `${todayDate!==currentDate?'pink':'red'}`, 
                      borderRadius: 2,  
                      marginTop:5
                    }}
                   />
                  {todayDate!==currentDate?<Text>Advance</Text>:<Text>Booked</Text>}
                   </View>
                   
                    </View>
                    <View>
                    <Pressable onPress={bookedRoomHandler}>
                   <Text>{todayDate!==currentDate?`Advance Booked Room`:'Booked Room'} : {bookedNumber}</Text>
                    </Pressable>
                   <Text style={{paddingTop:4}}>Non Booked Room : {finalTotalRoom}</Text>
                    </View>
                    </View>
                    <View>
                    {/* {room && typeof room === 'object' &&
  Object.entries(room).map(([floorKey, floorRooms], floorIndex) => (
    <View key={floorIndex} style={{ marginBottom: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
        {floorKey.replace(/([a-z])([A-Z])/g, '$1 $2')}
      </Text>

      {floorRooms && typeof floorRooms === 'object' &&
        Object.entries(floorRooms).map(([roomLabel, roomData], roomIndex) => (
          <View key={roomIndex} style={{ padding: 6 }}>
            <Text style={{ fontWeight: 'bold' }}>{roomLabel}</Text>
            <Text>Room Type: {roomData.roomType}</Text>
            <Text>Bed Type: {roomData.bedType}</Text>
          </View>
        ))}
    </View>
  ))
} */}
<ScrollView 
  scrollEnabled={isDashboardScrollEnabled}
 contentContainerStyle={{
    paddingBottom: 100, // last card ke liye space
  }}>
{
          room && typeof room==='object'?Object.entries(filterRoom).map(([floorKey,floorRooms],floorIndex)=>{
                        return (
                          <View style={{marginTop:12,marginLeft:8,marginRight:8}} key={floorIndex}>
                            <RoomDetailCard roomTitle={floorKey} roomDetails={floorRooms} 
                             currentDate={currentDate} profile={profile} 
                             onFloorDeleted={handleFloorDeleted} notifyTokenArray={notifyTokenArray}  />
                          </View>
                        )
                      }):null
                    }

                    
                   {/* {!profile.post? <View style={{flexDirection:'row',justifyContent:'center'}}>
                 <Pressable onPress={addFloorHandler} >
                 <View
                   style={{
                     borderWidth: 1,
                    //  borderColor:`${isAdvanceMatched ===true && todayDate !== currentDate?"pink":isMatched===true &&  todayDate === currentDate ?'red':roomType==='Ac'?'blue':roomType === "Non Ac"?'green':''}`,
                    borderColor:`orange`,
                     borderRadius:12,
                     padding:12,
                     marginBottom: 3,
                     marginTop:5,
                     width:50,    
                   }}
                 >
     <Image source={plus} style={{width:20,height:20}}/>
                 </View>
                 <Text style={{textAlign:'center',paddingTop:2}}>Add Floor</Text>
                </Pressable>
                    </View>:null} */}
                    {!profile?.post? <Pressable onPress={addFloorHandler} >
                      <View style={{flexDirection:"row",justifyContent:"center"}}>
                      <View style={{width:'90%', marginTop:15,backgroundColor:'orange', 
                    padding:12, position: "relative",bottom:0,borderRadius:30}}>
                      {/* <View style={{flexDirection:'row',justifyContent:'center'}}>
                      <Image source={plus} style={{width:20,height:20,tintColor: 'white'}}/>
                      </View> */}
                      <Text style={{textAlign:'center',paddingTop:6,paddingBottom:6,color:"white"}}>Add Floor</Text>
                    </View>
                      </View>
                    
                     </Pressable>:null}
                    
                      
</ScrollView>

                    </View>
                    <BookedModal room={room} customerArray={customerArray} customerArrayAdvance={customerArrayAdvance}
                     showBookedAlert={showBookedAlert} setShowBookedAlert={setShowBookedAlert} todayDate={todayDate} currentDate={currentDate}/> 
                      
                      <AddFloorModal floorAlert={floorAlert} setFloorAlert={setFloorAlert} hotelId={hotelDetails?._id}
                      notifyTokenArray={notifyTokenArray} profile={profile} 
                      />
                    </SafeAreaView>  

    </>
)
}
export default Dashboard