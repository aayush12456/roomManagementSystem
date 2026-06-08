import { Text,Card,Button } from "react-native-paper"
import { View,Image} from "react-native"
import { useNavigation } from '@react-navigation/native';
import { useEffect,useState } from "react"
import axios from "axios";
import io from "socket.io-client";
import { deleteHotelAsync } from "../../../Redux/Slice/deleteHotelSlice/deleteHotelSlice";
import { useDispatch } from "react-redux";

const socket = io.connect("http://192.168.29.169:4000")
// const socket = io.connect("https://roommanagementsystembackend-1.onrender.com")
// const socket = io.connect("http://16.16.224.95:4000")
const HotelCard=({hotelCard})=>{
    const BASE_URL = "http://192.168.29.169:4000";
    // const BASE_URL = "https://roommanagementsystembackend-1.onrender.com"; 
    // const BASE_URL = "http://16.16.224.95:4000";
    // console.log('hotel cards',hotelCard)
    const navigation = useNavigation();
    const dispatch=useDispatch()
const [paymentStatus,setPaymentStatus] = useState(null)
const [deletingId, setDeletingId] = useState(null);
    useEffect(()=>{
        const getPaymentStatus = async ()=>{
           const res = await axios.get(`${BASE_URL}/hotel/getActiveSubscription/${hotelCard?._id}`)
           setPaymentStatus(res.data)
        }
     
        if(hotelCard?._id){
           getPaymentStatus()
        }
     },[hotelCard?._id])
    
     const cardClickHandler=(hotelCard)=>{
    //  console.log('hotel cs',hotelCard)
     navigation.navigate('AllHotelDetailsPage',{formData:hotelCard,heading:hotelCard?.hotelName,hotelName:hotelCard?.hotelName})
     }
     const deleteHotelHandler=async(hotelCard)=>{
      dispatch(deleteHotelAsync({id:hotelCard._id}))
    const deleteHotelNameObj=[
      Id=hotelCard._id
    ]
      try {
        const response = await axios.post(`${BASE_URL}/hotel/deleteHotelName/${hotelCard._id}`,deleteHotelNameObj);
        // console.log('response in delete obj is',response?.data)
        
        socket.emit('deleteHotelName', response?.data)
      } catch (error) {
        console.error('Error sending activate', error);
      }
     }
return (
    <>
    <Card style={{ margin: 10, borderRadius: 10 }} onPress={()=>cardClickHandler(hotelCard)}>
       <View style={{flexDirection:'row',justifyContent:'space-between'}}>
       <Image
          source={{ uri: hotelCard?.hotelImg}}
          style={{
            width: 65,
            height: 65,
            borderRadius: 85,
            marginTop:10,
            marginBottom:10,
            marginLeft:6
          }}
        />
        <View>
    <Text style={{ fontWeight: "500",paddingTop:20}}>{hotelCard.hotelName}</Text>
    <Text style={{textAlign:'center',color:`${hotelCard?.freeSubscription?.plan==="free"
    ||  paymentStatus?.activeSubscription?.status==="active"?'green':'red'}`}}>
        {hotelCard?.freeSubscription?.plan==="free" || paymentStatus?.activeSubscription?.status==="active"
        ?'active':'expired'}</Text>
        </View>
                <Button
  mode="contained"
  buttonColor="#DC3545"
  style={{ borderRadius: 25, height: 50, marginTop: 10 ,paddingTop: 4, fontSize: 16,marginRight:4 }}
  onPress={() => {
    if (deletingId === hotelCard._id) return; // prevent double click
deleteHotelHandler(hotelCard)
  }}
>
  Delete
</Button>
          </View>
    </Card>
    </>
)
}
export default HotelCard