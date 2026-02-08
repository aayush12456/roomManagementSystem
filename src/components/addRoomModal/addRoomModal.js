import { View,Pressable,Modal,Dimensions, ScrollView,  KeyboardAvoidingView,Platform,Text,ActivityIndicator } from "react-native";
import { Button,TextInput } from "react-native-paper";
import { Formik } from 'formik';
import { useDispatch } from "react-redux";
import { useState } from "react";
import { bedType, roomType } from "../../utils/signUpData";
import {Picker} from '@react-native-picker/picker';
import { roomAdd } from "../../schemas";
import { addRoomAsync } from "../../Redux/Slice/addRoomSlice/addRoomSlice";
import axios from "axios"
import { getMessageNotifyAsync } from "../../Redux/Slice/getMessageNotifySlice/getMessageNotifySlice";
import { planScreenActions } from "../../Redux/Slice/planScreenSlice/planScreenSlice";
const AddRoomModal=({roomAlert,setRoomAlert,hotelId,floorSelect,profile,notifyTokenArray,planStatus
,paymentActiveSelector})=>{
  console.log('token in room',notifyTokenArray)
    const screenWidth = Dimensions.get("window").width;
    console.log('profile in room',profile)
    const dispatch=useDispatch()
    const [loading, setLoading] = useState(false);

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
      
      for (const chunk of tokenChunks) {
      const messages = chunk.map(token => ({
      to: token,
      sound: 'default',
      title: 'Room Notification 🔔',
      body: `${profile?.name} added a new room 🚀`,
      data: {
        type: 'ROOM_ADDED',
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
    <Formik 
     initialValues={{
    roomType:'',
    bedType:'',
    roomNumber:''
     }}
     validationSchema={roomAdd}
     onSubmit={async(values, { resetForm }) => {
      if (planStatus !== "free" && paymentActiveSelector.activeSubscription==null) {
        dispatch(planScreenActions.planScreenVisibleToggle())
        return
      }
      if (loading) return; 
      setLoading(true); 
      console.log("Room Added:", values);
      const roomObj={
        hotelId:hotelId,
        roomType:values.roomType,
        bedType:values.bedType,
        roomNumber:values.roomNumber,
        floor:floorSelect,
        name:profile.name,
        imgUrl:profile.image,
        message:'added new room'
      } 
      console.log("Rooms Added:", roomObj);
      // dispatch(addRoomAsync(roomObj))
      // sendNotificationToAll()
      // resetForm();          // ✅ form fields clear
      // setRoomAlert(false);
      try{
        await dispatch(addRoomAsync(roomObj)).unwrap()
         await sendNotificationToAll()
         dispatch(getMessageNotifyAsync(hotelId));
        resetForm();       
        setRoomAlert(false); 
      } catch (error) {
    console.log("❌ Room add error:", error);
  }
  finally {
    setLoading(false);   // ✅ STOP LOADER (always runs)
  } // ✅ modal close
    }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue,resetForm })=>(
         <>
 <Modal visible={roomAlert} transparent animationType="fade"   avoidKeyboard={true} >

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
        padding:20,
        borderRadius: 10,
        maxHeight: "60%", // Modal height limit for scrolling
        width: screenWidth * 0.9,
      }}
    >
        <Text style={{textAlign:'center'}}>Add Room</Text>
        <ScrollView
                contentContainerStyle={{
                  paddingHorizontal: 20,
                  paddingBottom: 20,
                }}
                showsVerticalScrollIndicator={false}
              >
                  <View style={{
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 8,
        backgroundColor: '#fff',
        overflow: 'hidden',
        marginTop:12
      }}>
           <Picker
  selectedValue={values.roomType}
  onValueChange={(itemValue) =>
    setFieldValue("roomType", itemValue)
  }
           >
           {
            roomType.map((roomItem,index)=>{
              console.log('room item',roomItem)
              return (
               <Picker.Item 
                key={roomItem.value}
                label={roomItem.label}
                value={roomItem.value}
            />
              )
            })
           }
           </Picker>
            </View>
            {touched.roomType && errors.roomType && (
                <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                  {errors.roomType}
                </Text>
              )}

            <View style={{
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 8,
        backgroundColor: '#fff',
        overflow: 'hidden',
        marginTop:12
      }}>
           <Picker
  selectedValue={values.bedType}
  onValueChange={(itemValue) =>
    setFieldValue("bedType", itemValue)
  }
           >
           {
            bedType.map((bedItem,index)=>{
              console.log('room item',bedItem)
              return (
               <Picker.Item 
                key={bedItem.value}
                label={bedItem.label}
                value={bedItem.value}
            />
              )
            })
           }
           </Picker>
            </View>
            {touched.bedType && errors.bedType && (
                <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                  {errors.bedType}
                </Text>
              )}

            <View style={{ paddingHorizontal: 0, marginBottom: 10,marginTop:8 }}>
        <TextInput
          label="Room Number"
          mode="outlined"
          keyboardType="numeric"
          value={values.roomNumber}
          onChangeText={handleChange("roomNumber")}
          onBlur={handleBlur("roomNumber")}
        />
        {touched.roomNumber && errors.roomNumber && (
                  <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                    {errors.roomNumber}
                  </Text>
                )}
      </View>
                </ScrollView>
      
      <View style={{flexDirection:"row",justifyContent:'space-between'}}>
      <View style={{ width: '50%', overflow: 'hidden' }}>
            <Button
                      mode="contained"
                      style={{
                        height: 50, // Set the desired height
                        borderRadius:11,
                        color: '#FFFFFF',
                         fontSize: 16, 
                         justifyContent:'center',
                         marginTop: 20,
                         marginLeft: 12,
                         marginRight: 20,
                      }}
                      buttonColor="rgba(234, 88, 12, 1)"
                      onPress={handleSubmit}
                    >
                   {
                    loading?
                    <ActivityIndicator color="#fff" />
                    :'Submit'
                   }
                    </Button>
          </View>

          <View style={{ width: '50%', overflow: 'hidden' }}>
            <Button
                      mode="contained"
                      style={{
                        height: 50, // Set the desired height
                        borderRadius:11,
                        color: '#FFFFFF',
                         fontSize: 16, 
                         justifyContent:'center',
                         marginTop: 20,
                         marginLeft: 12,
                         marginRight: 20,
                      }}
                      buttonColor="rgba(234, 88, 12, 1)"
                      onPress={() => {
                        resetForm();
                        setRoomAlert(false)
                  
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
        )}
      </Formik>
      
    </>
)
}
export default AddRoomModal