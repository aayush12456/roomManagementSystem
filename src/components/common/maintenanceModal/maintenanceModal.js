import { View, Modal, Dimensions, ScrollView,Pressable } from "react-native";
import { Image } from 'expo-image';
import { Text,Button } from "react-native-paper";
import { useEffect,useState } from "react";
import cleanImg from '../../../../assets/roomIcon/cleaning.png'
import personImg from '../../../../assets/roomIcon/mechanic.png'
import axios from "axios";
import io from "socket.io-client";
const socket = io.connect("http://192.168.29.169:4000");
import { useNavigation } from "@react-navigation/native"
const screenWidth = Dimensions.get("window").width;
const MaintenanceModal=({ maintainAlert,setMaintainAlert,maintainObj,finalMainCleanObj})=>{
  const navigation=useNavigation()
    console.log('maintain obj',maintainObj)
    console.log('final main',finalMainCleanObj)
    const BASE_URL = "http://192.168.29.169:4000";
    const maintainCleanHandler=async(type)=>{
      const finalMaintainObj={
        ...maintainObj,
        type:type
      }
      console.log('final main',finalMaintainObj)
      try {
        const response = await axios.post(`${BASE_URL}/hotel/addMaintenanceCleanRoom/${finalMaintainObj.id}`,finalMaintainObj);
        console.log('response in delete obj is',response?.data)
  
        socket.emit('addMaintainCleanRoom', response?.data)
    } catch (error) {
        // console.error('Error sending activate', error);
    }
    setMaintainAlert(false)
    }

  const deleteMainCleanDetails=async(roomId,id)=>{
const deleteMainCleanObj={
  id:id,
  roomId:roomId
}
try {
  const response = await axios.post(`${BASE_URL}/hotel/deleteMaintenanceCleanRoom/${deleteMainCleanObj.id}`,deleteMainCleanObj);
  console.log('response in delete main clean obj is',response?.data)

  socket.emit('deleteMaintainCleanRoom', response?.data)
} catch (error) {
  // console.error('Error sending activate', error);
}
setMaintainAlert(false)
navigation.goBack();
  }
return (
    <>
   <Modal visible={maintainAlert} transparent animationType="fade"   avoidKeyboard={true}>
   <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <View
                 style={{
    backgroundColor: "#fff",
    borderRadius: 10,
    width: screenWidth * 0.9,
    maxHeight: "60%", // modal box fixed height
    paddingVertical: 10,
  }}
              >
                {finalMainCleanObj?.roomId===maintainObj?.roomId?null:<Text style={{textAlign:'center',paddingTop:12}}>Select Option for {maintainObj?.roomNo} </Text>}
{finalMainCleanObj?.roomId===maintainObj?.roomId?null:<View style={{marginTop:25,alignItems:'center'}}>
  <Pressable onPress={()=>maintainCleanHandler('Clean Room')}>
  <View style={{flexDirection:"row",gap:10,marginLeft:-40}}>
    <Image source={cleanImg} style={{width:24,height:24}}/>
    <Text>Clean Room</Text>
    </View>
  </Pressable>
  <Pressable onPress={()=>maintainCleanHandler('Maintenance Room')}>
  <View style={{flexDirection:"row",gap:10,marginTop:20}}>
    <Image source={personImg} style={{width:24,height:24}}/>
    <Text>Maintenance Room</Text>
    </View>
  </Pressable>
</View>}
{finalMainCleanObj?.roomId===maintainObj?.roomId && finalMainCleanObj?.type=="Clean Room"?<View>
<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
  <Image
    source={require('../../../../assets/roomIcon/Cleaning.gif')}
    style={{ width:100, height:100 }}
    contentFit="cover"
  />
</View>
<Text style={{ textAlign: 'center', paddingTop: 5, paddingLeft: 15, paddingRight: 15 }}>
  <Text style={{ fontWeight: 'bold' }}>{finalMainCleanObj?.roomNo}</Text>
  {` is going to be cleaned by `}
  <Text style={{ fontWeight: 'bold' }}>{finalMainCleanObj?.mainCleanerName}</Text>
  {` wait for sometime`}
</Text>

</View>:null}

{finalMainCleanObj?.roomId===maintainObj?.roomId && finalMainCleanObj?.type=="Maintenance Room"?<View>
<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
  <Image
    source={require('../../../../assets/roomIcon/Electrician.gif')}
    style={{ width:100, height:100 }}
    contentFit="cover"
  />
</View>
<Text style={{ textAlign: 'center', paddingTop: 5, paddingLeft: 15, paddingRight: 15 }}>
  in a
  <Text style={{ fontWeight: 'bold' }}> {finalMainCleanObj?.roomNo}</Text>
  {` maintenance is going by `}
  <Text style={{ fontWeight: 'bold' }}>{finalMainCleanObj?.mainCleanerName}</Text>
  {` wait for sometime`}
</Text>

</View>:null}

<View style={{flexDirection:'row',justifyContent:`${maintainObj.floorName && finalMainCleanObj?.roomId?'space-between':'center'}`}}>
{maintainObj.floorName && finalMainCleanObj?.roomId?<View style={{ width: '50%', alignItems: 'center', marginTop: 20 }}>
  <Button
    mode="contained"
    style={{
      height: 50,
      borderRadius: 11,
      justifyContent:'center',
      width: '70%',   // 👈 now center properly
    }}
    buttonColor="rgba(234, 88, 12, 1)"
    onPress={() => {
      deleteMainCleanDetails(finalMainCleanObj._id,maintainObj.id)
    }}
  >
    Delete
  </Button>
</View>:null}
<View style={{ width: '50%', alignItems: 'center', marginTop: 20 }}>
  <Button
    mode="contained"
    style={{
      height: 50,
      borderRadius: 11,
      justifyContent:'center',
      width: '70%',   // 👈 now center properly
    }}
    buttonColor="rgba(234, 88, 12, 1)"
    onPress={() => {
  setMaintainAlert(false)
    }}
  >
    Close
  </Button>
</View>
                </View>
                </View>

                </View>

   </Modal>
    </>
)
}
export default MaintenanceModal