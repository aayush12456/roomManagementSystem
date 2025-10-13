import { Card, Text, Button } from "react-native-paper";
import {View,Image,Pressable} from 'react-native'
import { useNavigation } from "@react-navigation/native"
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import io from "socket.io-client";
import axios from "axios";
const socket = io.connect("http://192.168.29.169:4000")
const StaffCard=({staffObj,hotelId})=>{
console.log('staff hotel',hotelId)
  const BASE_URL = "http://192.168.29.169:4000";
  const navigation=useNavigation()
  const cardClickHandler=()=>{
    // console.log('hello')
    navigation.navigate('ProfileDetailsPage',{formData:staffObj,heading:'Staff Details',hotelId:hotelId})
  }
  const deleteStaffHandler=async(staffObj)=>{
    const staffObject={
      id:hotelId,
      staffId:staffObj?._id
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

      socket.emit('deleteStaffOwnerObj', response?.data)
  } catch (error) {
      // console.error('Error sending activate', error);
  }
  }
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