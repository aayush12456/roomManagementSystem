import { Card, Text, Button } from "react-native-paper";
import {View,Image,Pressable} from 'react-native'
import { useNavigation } from "@react-navigation/native"
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import io from "socket.io-client";
import axios from "axios";
const socket = io.connect("http://192.168.29.169:4000")
// const socket = io.connect("https://roommanagementsystembackend-1.onrender.com")
const StaffCard=({staffObj,hotelId,profile,notifyTokenArray})=>{
console.log('staff hotel',hotelId)
  const BASE_URL = "http://192.168.29.169:4000";
  // const BASE_URL = "https://roommanagementsystembackend-1.onrender.com";
  const navigation=useNavigation()
  const cardClickHandler=()=>{
    // console.log('hello')
    navigation.navigate('ProfileDetailsPage',{formData:staffObj,heading:'Staff Details',hotelId:hotelId})
  }
  const deleteStaffHandler=async(staffObj)=>{
    const staffObject={
      id:hotelId,
      staffId:staffObj?._id,
      personName:profile?.name,
      imgUrl:profile?.image,
      message:'delete a staff'
    }
    console.log('staff',staffObject)
    try {
      const response = await axios.post(`${BASE_URL}/hotel/deleteStaffOwner/${staffObject.id}`,staffObject);
      console.log('response in delete obj is',response?.data)
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "staff Details Deleted Successfully",
        autoClose: 10000, // 10 sec me band hoga
      });
      sendNotificationToAll()
      socket.emit('deleteStaffOwnerObj', response?.data)
  } catch (error) {
      // console.error('Error sending activate', error);
  }
  }

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
    body: `${profile?.name} deleted a Staff 🚀`,
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
    
    console.log('✅ Push sent:', response.data);
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
    console.log('dead token',deadTokens)
    if (deadTokens.length > 0) {
   const deadResponse= await axios.post(
        `${BASE_URL}/hotel/deleteNotificationToken/${hotelId}`,
        {deadToken: deadTokens }
      );
      socket.emit('deleteNotificationToken', deadResponse.data)
      console.log("🗑 DEAD TOKENS REMOVED:", deadTokens);
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
          buttonColor="#28a745"
          style={{ borderRadius: 25, height: 50, paddingTop: 4, fontSize: 16,marginTop:6 }}
          onPress={()=>deleteStaffHandler(staffObj)}
        >
Delete
        </Button>
           </View>
        </Card.Content>
        </Card>
    </Pressable>
        
    </>

)
}
export default StaffCard