import { Text,Button,TextInput } from "react-native-paper"
import { useEffect,useState } from "react"
import * as SecureStore from 'expo-secure-store';
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import io from "socket.io-client";
import { View } from "react-native";
import { ScrollView,Pressable } from "react-native";
import RoomDetailCard from "../common/roomDetailCard/roomDetailCard";
import { SafeAreaView } from "react-native-safe-area-context";
import {useSelector} from 'react-redux'
import BookedModal from "../bookedModal/bookedModal";
const socket = io.connect("http://192.168.29.169:4000")
const Dashboard=({hotelDetails})=>{
  const BASE_URL = "http://192.168.29.169:4000";
  console.log('hotel details is',hotelDetails)
  const [customerArray,setCustomerArray]=useState([])
  const [showBookedAlert, setShowBookedAlert] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
    const navigation = useNavigation();
    const totalRoom=hotelDetails?.totalRoom
    const room=hotelDetails?.room
    const hotelDetailSelector=useSelector((state)=>state.getHotelDetails.getHotelDetailsObj.hotelObj)
    console.log('hotel id dashboard',hotelDetailSelector?._id)
    useEffect(() => {
      const fetchRoomDetails = async () => {
        try {
          if (hotelDetailSelector?._id) {
            const response = await axios.get(
              `${BASE_URL}/hotel/getCustomerDetails/${hotelDetailSelector?._id}`
            );
            console.log('visitor user dashboard in response',response?.data)
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
    }, [hotelDetailSelector?._id]);
    console.log('customer array dashboard is',customerArray)
    const bookedNumber=customerArray.length
    const finalTotalRoom=totalRoom-bookedNumber
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
    console.log('select date',selectedDate.toLocaleDateString("en-GB"))
    const currentDate=selectedDate.toLocaleDateString("en-GB")
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
                      borderColor: "red", 
                      borderRadius: 2,  
                      marginTop:5
                    }}
                   />
                  <Text>Booked</Text>
                   </View>
                   
                    </View>
                    <View>
                    <Pressable onPress={bookedRoomHandler}>
                   <Text>Booked Room : {bookedNumber}</Text>
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
<ScrollView  contentContainerStyle={{
    paddingBottom: 100, // last card ke liye space
  }}>
{
          room && typeof room==='object'?Object.entries(room).map(([floorKey,floorRooms],floorIndex)=>{
                        return (
                          <View style={{marginTop:12,marginLeft:8,marginRight:8}} key={floorIndex}>
                            <RoomDetailCard roomTitle={floorKey} roomDetails={floorRooms} currentDate={currentDate} />
                          </View>
                        )
                      }):null
                    }
</ScrollView>

                    </View>
                    <BookedModal room={room} customerArray={customerArray} showBookedAlert={showBookedAlert} setShowBookedAlert={setShowBookedAlert}/> 
                    </SafeAreaView>    
    </>
)
}
export default Dashboard