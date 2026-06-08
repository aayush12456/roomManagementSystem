import { Card, Text, Button } from "react-native-paper";
import {View,Image,Pressable,ActivityIndicator} from 'react-native'
import { useState } from "react";
import { useNavigation } from "@react-navigation/native"
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { useDispatch} from "react-redux";
import io from "socket.io-client";
import axios from "axios";
import { planScreenActions } from "../../Redux/Slice/planScreenSlice/planScreenSlice";
const socket = io.connect("http://192.168.29.169:4000")
// const socket = io.connect("https://roommanagementsystembackend-1.onrender.com")
// const socket = io.connect("http://16.16.224.95:4000")
const StaffCard=({staffObj,hotelId,profile,notifyTokenArray,planStatus,paymentActiveSelector,hotelName})=>{
// console.log('staff hotel',hotelId)
  const BASE_URL = "http://192.168.29.169:4000";
  // const BASE_URL = "https://roommanagementsystembackend-1.onrender.com";
  // const BASE_URL = "http://16.16.224.95:4000";
  const navigation=useNavigation()
  const dispatch=useDispatch()
  const [deletingId, setDeletingId] = useState(null);

  const cardClickHandler=()=>{
    navigation.navigate('ProfileDetailsPage',{formData:staffObj,heading:'Staff Details',hotelId:hotelId})
  }
 

  const deleteStaffHandler = async (staffObj) => {

    if (planStatus !== "free" && paymentActiveSelector.activeSubscription == null) {
      dispatch(planScreenActions.planScreenVisibleToggle());
      return;
    }
  
    setDeletingId(staffObj._id); // START LOADER
  
    const staffObject = {
      id: hotelId,
      staffId: staffObj?._id,
      personName: profile?.name,
      imgUrl: profile?.image,
      message: "delete a staff",
    };
    const deleteNameObj={
      id:hotelId,
      name:staffObj.name
    }
    try {
      const response = await axios.post(
        `${BASE_URL}/hotel/deleteStaffOwner/${staffObject.id}`,
        staffObject
      );
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: `Staff removed from system`,
        autoClose:3000,
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
      setTimeout(async() => {
       await sendNotificationToAll();
        socket.emit("deleteStaffOwnerObj", response?.data);
      }, 200);
  
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingId(null); // STOP LOADER
    }
    try {
      const response = await axios.post(`${BASE_URL}/hotel/deleteName/${deleteNameObj.id}`,deleteNameObj);
      // console.log('response in delete obj is',response?.data)
      
      socket.emit('deleteName', response?.data)
    } catch (error) {
      console.error('Error sending activate', error);
    }
  };
  
  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
    }
    return chunks;
    };

  const sendNotificationToAll = async () => {
    if (!Array.isArray(notifyTokenArray) || notifyTokenArray.length === 0) {
    return;
    }
    
    try {
    const tokenChunks = chunkArray(notifyTokenArray, 100);
    const deadTokens = [];
    for (const chunk of tokenChunks) {
    const messages = chunk.map(token => ({
    to: token,
    sound: 'default',
    title: 'Profile Notification 🔔',
    body: `${profile?.name} removed a staff member from ${hotelName} 🚀`,
    data: {
      type: 'PROFILE_DELETE',
    },
    }));
    
    const response = await axios.post(
    'https://exp.host/--/api/v2/push/send',
    messages,
    {
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    },
    }
    );
    
    // console.log('✅ Push sent:', response.data);
    const ticketIds = response.data.data
    .filter(item => item.status === "ok")
    .map(item => item.id);

    if (ticketIds.length > 0) {
      const receiptRes = await axios.post(
        "https://exp.host/--/api/v2/push/getReceipts",
        { ids: ticketIds }
      );

      const receipts = receiptRes.data.data;
      Object.values(receipts).forEach((receipt, index) => {
        if (
          receipt.status === "error" &&
          receipt.details?.error === "DeviceNotRegistered"
        ) {
          const dead = chunk[index];   // EXACT SAME TOKEN
          deadTokens.push(dead);
        }
      });
    }
    }
    // console.log('dead token',deadTokens)
    if (deadTokens.length > 0) {
   const deadResponse= await axios.post(
        `${BASE_URL}/hotel/deleteNotificationToken/${hotelId}`,
        {deadToken: deadTokens }
      );
      socket.emit('deleteNotificationToken', deadResponse.data)
      // console.log("🗑 DEAD TOKENS REMOVED:", deadTokens);
    }

    } catch (error) {
    console.log(
    '❌ Push error:',
    error.response?.data || error.message
    );
    }
};

return (
    <>
    <Pressable>
<Card style={{ margin: 10, borderRadius: 10 }} onPress={cardClickHandler}>
        <Card.Content>
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
           <Image
          source={{ uri: staffObj?.image }}
          style={{
            width: 75,
            height: 75,
            borderRadius: 85,
          }}
        />
        <Text style={{ fontWeight: "500",paddingTop:20}}>{staffObj?.name}</Text>
      
        <Button
  mode="contained"
  buttonColor="#DC3545"
  style={{ borderRadius: 25, height: 50, marginTop: 6 ,paddingTop: 4, fontSize: 16, }}
  onPress={() => {
    if (deletingId === staffObj._id) return; // prevent double click
    deleteStaffHandler(staffObj);
  }}

>
  {deletingId === staffObj._id ? (
    <ActivityIndicator color="#fff" />
  ) : (
    "Delete"
  )}
</Button>

           </View>
        </Card.Content>
        </Card>
    </Pressable>
        
    </>

)
}
export default StaffCard