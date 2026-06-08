import { Text,Switch,Snackbar } from "react-native-paper"
import { useEffect,useState } from "react"
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import io from "socket.io-client";
import { View } from "react-native";
import { ScrollView,Pressable,Image } from "react-native";
import RoomDetailCard from "../common/roomDetailCard/roomDetailCard";
import totalRoomIcon from '../../../assets/roomIcon/totalRoom.png'
import bookedRoomIcon from '../../../assets/roomIcon/bookedRoom.png'
import circleIcon from '../../../assets/roomIcon/circle.png'
import { SafeAreaView } from "react-native-safe-area-context";
import {useSelector,useDispatch} from 'react-redux'
import BookedModal from "../bookedModal/bookedModal";
import AddFloorModal from "../addFloorModal/addFloorModal";
import { getPaymentActiveAsync } from "../../Redux/Slice/getPaymentActiveSlice/getPaymentActiveSlice";
import SkeletonCard from "../common/skeletonCard/skeletonCard";

const socket = io.connect("http://192.168.29.169:4000")
// const socket = io.connect("https://roommanagementsystembackend-1.onrender.com")
// const socket = io.connect("http://16.16.224.95:4000")
const Dashboard=({hotelDetails,profile,notifyTokenArray,planStatus,hotelName})=>{
  const BASE_URL = "http://192.168.29.169:4000";
  // const BASE_URL = "https://roommanagementsystembackend-1.onrender.com";
  // const BASE_URL = "http://16.16.224.95:4000";
  // console.log('hotel details is',hotelDetails)
  // console.log('notify tokens',notifyTokenArray)
  const [customerObj,setCustomerObj]=useState({})
  const [customerArrayAdvance,setCustomerArrayAdvance]=useState([])
  const [showBookedAlert, setShowBookedAlert] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [floorAlert,setFloorAlert]=useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [matchRoomArray,setMatchRoomArray]=useState([])
  const [deletedFloorName, setDeletedFloorName] = useState(null);
  const [isDashboardScrollEnabled, setIsDashboardScrollEnabled] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loadingRooms, setLoadingRooms] = useState(true);
// console.log('das scroll',isDashboardScrollEnabled)
    const navigation = useNavigation();
    const dispatch=useDispatch()
    const totalRoom=hotelDetails?.totalRoom
    const room=hotelDetails?.room
    // console.log('room is',room)
    useEffect(() => {
      if (room && Object.keys(room).length > 0) {
        setLoadingRooms(false);
      }
    }, [room]);
    
    
    const hotelDetailSelector=useSelector((state)=>state.getHotelDetails.getHotelDetailsObj.hotelObj)
    // console.log('hotel id dashboard',hotelDetailSelector?._id)
    
  const deleteFloorSelector=useSelector((state)=>state.deleteFloorData.deleteFloorObj)

  useEffect(()=>{
    if(hotelDetailSelector?._id){
    dispatch(getPaymentActiveAsync(hotelDetailSelector?._id))
    }
        },[hotelDetailSelector?._id])
        const paymentActiveSelector=useSelector((state)=>state.getPaymentActive.getPaymentActiveObj)

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

// console.log('filter,room',filterRoom)

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
                    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={{position:'absolute',right:0}}>
                  <Switch
  value={!isDashboardScrollEnabled}
  onValueChange={() => {
    const newValue = !isDashboardScrollEnabled;
    setIsDashboardScrollEnabled(newValue);

    if (!newValue) {
      setSnackbarMessage("Lock Screen Mode Enabled");
    } else {
      setSnackbarMessage("Lock Screen Mode Disabled");
    }

    setSnackbarVisible(true);
  }}
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
                 
                   <View
  style={{
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 12,
  }}
>
  {/* Total Rooms */}
  <View
    style={{
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#F5F7FB",
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderRadius: 14,
      elevation: 3,
      marginHorizontal: 4,
    }}
  >
    <Image source={totalRoomIcon} style={{ width: 30, height:30 }} />

    <View style={{ marginLeft: 6 }}>
      <Text style={{ fontSize: 13, color: "#555" }}>
        Total{"\n"}Rooms
      </Text>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        {totalRoom}
      </Text>
    </View>
  </View>

  {/* Booked Rooms */}
  <Pressable onPress={bookedRoomHandler}>
  <View
    style={{
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#F5F7FB",
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderRadius: 14,
      elevation: 3,
      marginHorizontal: 4,
    }}
  >
    <Image source={bookedRoomIcon} style={{ width:30, height: 30 }} />

    <View style={{ marginLeft: 6 }}>
      <Text style={{ fontSize: 13, color: "#555" }}>
{todayDate!==currentDate?`Advance `:'Booked '}{"\n"}{todayDate!==currentDate?`Booked `:'Rooms '}
      </Text>
      <Text style={{ fontSize: 16, fontWeight: "bold", color:`${todayDate!==currentDate?'pink':'red'}` }}>
        {bookedNumber}
      </Text>
    </View>
  </View>
  </Pressable>

  {/* Available Rooms */}
  <View
    style={{
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#F5F7FB",
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderRadius: 14,
      elevation: 3,
      marginHorizontal: 4,
    }}
  >
    <Image source={circleIcon} style={{ width:30, height: 30 }} />

    <View style={{ marginLeft: 6 }}>
      <Text style={{ fontSize: 13, color: "#555" }}>
        Available{"\n"}Rooms
      </Text>
      <Text style={{ fontSize: 16, fontWeight: "bold", color: "green" }}>
        {finalTotalRoom}
      </Text>
    </View>
  </View>
</View>
                  
<View
  style={{
    marginHorizontal: 8,
    backgroundColor: "#F9FAFB",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginTop: 20,
    marginBottom: 10,
    elevation: 3,
  }}
>
  {/* Row */}
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginRight:20,
    }}
  >
    {/* LEFT TEXT */}
    <Text
      style={{
        fontSize: 13,
        fontWeight: "600",
        color: "#333",
      }}
    >
      Room Status
    </Text>

    {/* RIGHT INDICATORS */}
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {/* AC */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "blue",
          borderRadius: 8,
          paddingVertical: 3,
          paddingHorizontal: 6,
          marginLeft: 4,
        }}
      >
        <View
          style={{
            width: 8,
            height: 8,
            borderWidth: 2,
            borderColor: "#3B5EDB",
            borderRadius: 2,
            marginRight: 3,
          }}
        />
        <Text style={{ fontSize: 11 }}>
          AC 
        </Text>
      </View>

      {/* NON AC */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "green",
          borderRadius: 8,
          paddingVertical: 3,
          paddingHorizontal: 6,
          marginLeft: 4,
        }}
      >
        <View
          style={{
            width: 8,
            height: 8,
            borderWidth: 2,
            borderColor: "#2E7D32",
            borderRadius: 2,
            marginRight: 3,
          }}
        />
        <Text style={{ fontSize: 11 }}>
          Non-AC
        </Text>
      </View>

      {/* BOOKED */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor:
            todayDate !== currentDate ? "pink" : "red",
          borderRadius: 8,
          paddingVertical: 3,
          paddingHorizontal: 6,
          marginLeft: 4,
        }}
      >
        <View
          style={{
            width: 8,
            height: 8,
            borderWidth: 2,
            borderColor:
              todayDate !== currentDate ? "pink" : "red",
            borderRadius: 2,
            marginRight: 3,
          }}
        />
        <Text
          style={{
            fontSize: 11,
            
          }}
        >
          {todayDate !== currentDate ? "Advance" : "Booked"} 
        </Text>
      </View>
    </View>
  </View>
</View>

                  
<View>                  
<ScrollView 
  scrollEnabled={isDashboardScrollEnabled}
 contentContainerStyle={{
    paddingBottom: 250, // last card ke liye space
  }}>

                    {
  loadingRooms ? (
    Array.from({ length: 5 }).map((_, index) => (
      <SkeletonCard key={index} />
    ))
  ) : (
    room &&
    typeof room === "object" &&
    Object.entries(filterRoom).map(([floorKey, floorRooms], floorIndex) => {
      return (
        <View
          style={{ marginTop: 12, marginLeft: 8, marginRight: 8 }}
          key={floorIndex}
        >
          <RoomDetailCard
            roomTitle={floorKey}
            roomDetails={floorRooms}
            currentDate={currentDate}
            profile={profile}
            hotelName={hotelName}
            onFloorDeleted={handleFloorDeleted}
            notifyTokenArray={notifyTokenArray}
            planStatus={planStatus}
            paymentActiveSelector={paymentActiveSelector}
          />
        </View>
      );
    })
  )
}
                    {!profile?.post? <Pressable onPress={addFloorHandler} >
                      <View style={{flexDirection:"row",justifyContent:"center"}}>
                      <View style={{width:'90%', marginTop:15,backgroundColor:'#007BFF', 
                    padding:12, position: "relative",bottom:0,borderRadius:30}}>
  
                      <Text style={{textAlign:'center',paddingTop:6,paddingBottom:6,color:"white"}}>Add New Floor</Text>
                    </View>
                      </View>
                    
                     </Pressable>:null}
                    
                      
</ScrollView>

                    </View>
                    <BookedModal room={room} customerArray={customerArray} customerArrayAdvance={customerArrayAdvance}
                     showBookedAlert={showBookedAlert} setShowBookedAlert={setShowBookedAlert} todayDate={todayDate} currentDate={currentDate}/> 
                      
                      <AddFloorModal floorAlert={floorAlert} setFloorAlert={setFloorAlert} hotelId={hotelDetails?._id}
                      notifyTokenArray={notifyTokenArray} profile={profile} planStatus={planStatus} paymentActiveSelector={paymentActiveSelector}
                      hotelName={hotelName}
                      />
                    </SafeAreaView>  
                    <Snackbar
  visible={snackbarVisible}
  onDismiss={() => setSnackbarVisible(false)}
  duration={2000}
>
  {snackbarMessage}
</Snackbar>
    </>
)
}
export default Dashboard