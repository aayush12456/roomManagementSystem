import { View,Pressable,Modal,Dimensions, ScrollView,  KeyboardAvoidingView,Platform,Text } from "react-native";
import { Button,TextInput } from "react-native-paper";
import { Formik } from 'formik';
import { useDispatch } from "react-redux";
import { bedType, roomType } from "../../utils/signUpData";
import {Picker} from '@react-native-picker/picker';
import { roomAdd } from "../../schemas";
import { addRoomAsync } from "../../Redux/Slice/addRoomSlice/addRoomSlice";
const AddRoomModal=({roomAlert,setRoomAlert,hotelId,floorSelect})=>{
    const screenWidth = Dimensions.get("window").width;
    const dispatch=useDispatch()
return (
    <>
    <Formik 
     initialValues={{
    roomType:'',
    bedType:'',
    roomNumber:''
     }}
     validationSchema={roomAdd}
     onSubmit={(values, { resetForm }) => {
      console.log("Room Added:", values);
      const roomObj={
        hotelId:hotelId,
        roomType:values.roomType,
        bedType:values.bedType,
        roomNumber:values.roomNumber,
        floor:floorSelect
      } 
      console.log("Rooms Added:", roomObj);
      dispatch(addRoomAsync(roomObj))
      resetForm();          // ✅ form fields clear
      setRoomAlert(false);  // ✅ modal close
    }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue })=>(
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
     Submit
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