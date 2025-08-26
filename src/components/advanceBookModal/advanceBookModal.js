import { View,Pressable,Modal,Dimensions, ScrollView,Image } from "react-native";
import { Text,TextInput,Button } from "react-native-paper"
import { Formik } from 'formik';
import { useState,useRef ,useEffect } from "react";
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { advanceCustomerBookingSchema } from "../../schemas";
import {useSelector} from 'react-redux'
import axios from 'axios'
import io from "socket.io-client";
const socket = io.connect("http://192.168.29.169:4000")
const AdvanceBookModal=({floor,roomType,roomNo,advanceAlert,setAdvanceAlert,selectedRoomId,roomNum,customerArrayAdvance})=>{
  console.log('customer array advance modal',customerArrayAdvance)
const BASE_URL = "http://192.168.29.169:4000";  
const hotelDetailSelector=useSelector((state)=>state.getHotelDetails.getHotelDetailsObj.hotelObj)    
const screenWidth = Dimensions.get("window").width;   
const formikRef = useRef(null);
const ref = useRef();
const [matchRoomResponse,setMatchRoomResponse]=useState(false)
const [showTextField,setShowTextField]=useState(false)
const [filterCustomerObj,setFilterCustomerObj]=useState({})

useEffect(()=>{
  if(selectedRoomId){
  const matchRoom=customerArrayAdvance.some((item)=>item.roomId==selectedRoomId)
  console.log('match room',matchRoom)
   setMatchRoomResponse(matchRoom)
  }
  },[selectedRoomId,customerArrayAdvance])

  useEffect(()=>{
    if(selectedRoomId){
    const customerObj=customerArrayAdvance.find((item)=>item.roomId==selectedRoomId)
    setFilterCustomerObj(customerObj)
    }
    },[selectedRoomId,customerArrayAdvance])
return (
    <>
   <Formik 
    initialValues={{
        customerName: filterCustomerObj?.customerName || '',
        customerAddress:filterCustomerObj?.customerAddress || '',
        customerPhoneNumber:filterCustomerObj?.customerPhoneNumber || '',
        executiveName:filterCustomerObj?.frontDeskExecutiveName || '',
    }}
    enableReinitialize 
    validationSchema={advanceCustomerBookingSchema}
    onSubmit={async(values,{ resetForm }) => {
        const advanceCustomerObj={
            id:hotelDetailSelector._id,
            roomId:selectedRoomId,
            roomType:roomType,
            floor:floor,
            roomNo:roomNum,
            customerName:values.customerName,
            customerAddress:values.customerAddress,
            customerPhoneNumber:values.customerPhoneNumber,
            frontDeskExecutiveName:values.executiveName,
        }
        console.log('advance customer',advanceCustomerObj)
        const response = await axios.post(
          `${BASE_URL}/hotel/addCustomerDetailsAdvance/${advanceCustomerObj.id}`,
          advanceCustomerObj
        );
        console.log("response in add obj advance is", response?.data);
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Advance Customer Details Added Successfully",
          autoClose: 10000,
        });
        socket.emit("addCustomerDetailsAdvance", response?.data?.getAdvanceCustomerDetailsArray);
        setAdvanceAlert(false)
        resetForm()
    }}
    innerRef={formikRef}
   >
   {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue })=>(
  <>
   <Modal visible={advanceAlert} transparent animationType="fade">
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
        maxHeight: "100%", // Modal height limit for scrolling
        width: screenWidth * 0.9,
      }}
    >
        {/* <Text>hello world</Text> */}
        <Text style={{textAlign:'center'}}>Advance Customer Details</Text>
        {(matchRoomResponse === false || showTextField === true  )?<View>
        <View>
        <TextInput
          label="Customer Name"
          mode="outlined"
          style={{ width: screenWidth * 0.75, marginBottom: 10 }}
          onChangeText={handleChange('customerName')}
          onBlur={handleBlur('customerName')}
          value={values.customerName}
        />
        {touched.customerName && errors.customerName && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.customerName}</Text>}
        </View>
        
        <View>
        <TextInput
          label="Customer Address"
          mode="outlined"
          style={{ width: screenWidth * 0.75, marginBottom: 10 }}
          onChangeText={handleChange('customerAddress')}
          onBlur={handleBlur('customerAddress')}
          value={values.customerAddress}
        />
         {touched.customerAddress && errors.customerAddress && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.customerAddress}</Text>}
        </View>

        <View>
        <TextInput
          label="Customer Phone Number"
          mode="outlined"
          style={{ width: screenWidth * 0.75, marginBottom: 10 }}
          keyboardType="phone-pad"
          onChangeText={handleChange('customerPhoneNumber')}
          onBlur={handleBlur('customerPhoneNumber')}
          value={values.customerPhoneNumber}
        />
         {touched.customerPhoneNumber && errors.customerPhoneNumber && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.customerPhoneNumber}</Text>}
        </View>

        <View>
        <TextInput
          label="Front Desk Executive Name"
          mode="outlined"
          style={{ width: screenWidth * 0.75, marginBottom: 10 }}
          onChangeText={handleChange('executiveName')}
          onBlur={handleBlur('executiveName')}
          value={values.executiveName}
        />
        {touched.executiveName && errors.executiveName && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.executiveName}</Text>}
        </View>

        <View style={{flexDirection:"row",justifyContent:'space-between'}}>
     <View style={{ width: '50%', overflow: 'hidden' }}>
            <Button
                      mode="contained"
                      onPress={handleSubmit}
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
                        setAdvanceAlert(false)
                        formikRef.current?.resetForm(); // Form reset
                      }}
                    >
     Close
                    </Button>
          </View>
          </View>
        </View>
        :
        <View>
<View style={{flexDirection:"row",gap:6,paddingTop:10}}>
        <Text>Room Type : </Text>
       <Text>{roomType}</Text>
      </View>
      <View style={{flexDirection:"row",gap:6,paddingTop:10}}>
        <Text>Customer Name : </Text>
       <Text>{filterCustomerObj.customerName}</Text>
      </View>
      <View style={{flexDirection:"row",gap:6,paddingTop:15}}>
        <Text>Customer Address : </Text>
       <Text>{filterCustomerObj.customerAddress}</Text>
      </View>
      <View style={{flexDirection:"row",gap:6,paddingTop:15}}>
        <Text>Customer Phone Number : </Text>
       <Text>{filterCustomerObj.customerPhoneNumber}</Text>
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
                        setAdvanceAlert(false)
                        formikRef.current?.resetForm(); // Form reset
                      }}
                    >
     Close
                    </Button>
          </View>
        </View>
        }
       
        </View>
        </View>    
   </Modal>
  </>
   )}
   </Formik>
    </>
)
}
export default AdvanceBookModal