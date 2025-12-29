import { View,Pressable,Modal,Dimensions, ScrollView,  KeyboardAvoidingView,Platform } from "react-native";
import { Text,TextInput,Button } from "react-native-paper"
import { Formik } from 'formik';
import { useState,useRef ,useEffect } from "react";
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { advanceCustomerBookingSchema } from "../../schemas";
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import io from "socket.io-client";
import { passDataObjSliceAcions } from "../../Redux/Slice/passDataSliceObj/passDataSliceObj";
const socket = io.connect("http://192.168.29.169:4000")
// const socket = io.connect("https://roommanagementsystembackend-1.onrender.com")
const AdvanceBookModal=({floor,roomType,roomNo,advanceAlert,selectedRoomId,roomNum,customerArrayAdvance,todayDate,currentDates,setAdvanceAlert})=>{
  // console.log('customer array advance modal',customerArrayAdvance)
const BASE_URL = "http://192.168.29.169:4000";  
// const BASE_URL = "https://roommanagementsystembackend-1.onrender.com";  
const hotelDetailSelector=useSelector((state)=>state.getHotelDetails.getHotelDetailsObj.hotelObj)    
const screenWidth = Dimensions.get("window").width;   
const formikRef = useRef(null);
const ref = useRef();
const dispatch=useDispatch()
const [matchRoomResponseAdvance,setMatchRoomResponseAdvance]=useState(false)
const [showTextFieldAdvance,setShowTextFieldAdvance]=useState(false)
const [filterCustomerObjAdvance,setFilterCustomerObjAdvance]=useState({})
useEffect(()=>{
  if(selectedRoomId){
  const matchRoom=customerArrayAdvance?.some((item)=>item.roomId==selectedRoomId &&item.selectedDate === currentDates)
  // console.log('match room',matchRoom)
   setMatchRoomResponseAdvance(matchRoom)
  }
  },[selectedRoomId,customerArrayAdvance,currentDates])

  useEffect(()=>{
    if(selectedRoomId){
    const customerObj=customerArrayAdvance?.find((item)=>item.roomId==selectedRoomId && item.selectedDate === currentDates)
    setFilterCustomerObjAdvance(customerObj)
    }
    },[selectedRoomId,customerArrayAdvance,currentDates])

    const deleteCustomerDetailsAdvance=async(customerId)=>{
      const deleteObj={
      id:hotelDetailSelector?._id,
      customerId:customerId
      }
      try {
        const response = await axios.post(`${BASE_URL}/hotel/deleteCustomerDetailsAdvance/${deleteObj.id}`,deleteObj);
        // console.log('response in delete obj is',response?.data)
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Advance Customer Details Deleted Successfully",
          autoClose: 10000, // 10 sec me band hoga
        });
        socket.emit('deleteCustomerDetailsAdvance', response?.data?.getAdvanceCustomerDetailsArray)
    } catch (error) {
        // console.error('Error sending activate', error);
    }
    if(todayDate===filterCustomerObjAdvance.selectedDate){
    // setShowAlert(true)
    const finalObj={
      obj:filterCustomerObjAdvance,
      type:true
    }
    // console.log('final obj',finalObj)
    dispatch(passDataObjSliceAcions.passDataObj(finalObj))
    }
    // setShowAlert(true)
    setAdvanceAlert(false)
    }
    
    const updateCustomerDetailsAdvance=(roomId)=>{
      setShowTextFieldAdvance(true)
    }
    
return (
    <>
   <Formik 
    initialValues={{
        customerName: filterCustomerObjAdvance?.customerName || '',
        customerAddress:filterCustomerObjAdvance?.customerAddress || '',
        customerPhoneNumber:filterCustomerObjAdvance?.customerPhoneNumber || '',
        totalPayment:filterCustomerObjAdvance?.totalPayment || '',
        advancePayment:filterCustomerObjAdvance?.advancePayment || '',
        executiveName:filterCustomerObjAdvance?.frontDeskExecutiveName || '',
    }}
    enableReinitialize 
    validationSchema={advanceCustomerBookingSchema}
    onSubmit={async(values,{ resetForm }) => {
        const advanceCustomerObj={
            id:hotelDetailSelector._id,
            roomId:selectedRoomId,
            todayDate:todayDate,
           selectedDate:currentDates,
            roomType:roomType,
            floor:floor,
            roomNo:roomNum,
            customerName:values.customerName,
            customerAddress:values.customerAddress,
            customerPhoneNumber:values.customerPhoneNumber,
            totalPayment:values.totalPayment,
            advancePayment:values.advancePayment,
            frontDeskExecutiveName:values.executiveName,
        }
        // console.log('advance customer',advanceCustomerObj)
     try{
      if(matchRoomResponseAdvance === true){
        const response = await axios.post(
          `${BASE_URL}/hotel/updateCustomerDetailsAdvance/${advanceCustomerObj.id}`,
          advanceCustomerObj
        );
        // console.log("response in update obj is", response?.data);
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "AdvanceCustomer Details Updated Successfully",
          autoClose: 10000,
        });
        socket.emit("updateCustomerDetailsAdvance", response?.data?.getAdvanceCustomerDetailsArray);
      }
      else{
        const response = await axios.post(
          `${BASE_URL}/hotel/addCustomerDetailsAdvance/${advanceCustomerObj.id}`,
          advanceCustomerObj
        );
        // console.log("response in add obj advance is", response?.data);
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Advance Customer Details Added Successfully",
          autoClose: 10000,
        });
        socket.emit("addCustomerDetailsAdvance", response?.data?.getAdvanceCustomerDetailsArray);
      }
     }catch(error){
      console.error('error in app/update',error)
     }
        setAdvanceAlert(false)
        setShowTextFieldAdvance(false); 
        resetForm()
    }}
    innerRef={formikRef}
   >
   {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue })=>(
  <>
   <Modal visible={advanceAlert} transparent animationType="fade"   avoidKeyboard={true} >
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
      height: "50%",  
      width: screenWidth * 0.9,
    }}
    >
        {/* <Text>hello world</Text> */}
        { matchRoomResponseAdvance===false?<Text style={{textAlign:'center'}}>Enter Advance Customer Details</Text>
       :showTextFieldAdvance === false ?
       <Text style={{textAlign:'center'}}>Advance Customer Details Preview</Text>
       :<Text style={{textAlign:'center'}}>Update Advance Customer Details </Text>    
    }
        {(matchRoomResponseAdvance === false || showTextFieldAdvance === true  )?
        <View style={{ flex: 1 }}>
          <ScrollView
                      contentContainerStyle={{
                        alignItems: "center",
                        paddingBottom: 20,
                      }}
                      keyboardShouldPersistTaps="handled"
                      style={{ flex: 1 }}
                    >
                      {/* ---- TEXT INPUTS ---- */}
                      <View>
                        <TextInput
                          label="Customer Name"
                          mode="outlined"
                          style={{
                            width: screenWidth * 0.75,
                            marginBottom: 10,
                          }}
                          onChangeText={handleChange("customerName")}
                          onBlur={handleBlur("customerName")}
                          value={values.customerName}
                        />
                        {touched.customerName && errors.customerName && (
                          <Text
                            style={{ color: "red", marginLeft: 12 }}
                          >
                            {errors.customerName}
                          </Text>
                        )}
                      </View>

                      <View>
                        <TextInput
                          label="Customer Address"
                          mode="outlined"
                          style={{
                            width: screenWidth * 0.75,
                            marginBottom: 10,
                          }}
                          onChangeText={handleChange("customerAddress")}
                          onBlur={handleBlur("customerAddress")}
                          value={values.customerAddress}
                        />
                        {touched.customerAddress &&
                          errors.customerAddress && (
                            <Text
                              style={{ color: "red", marginLeft: 12 }}
                            >
                              {errors.customerAddress}
                            </Text>
                          )}
                      </View>

                      <View>
                        <TextInput
                          label="Customer Phone Number"
                          mode="outlined"
                          style={{
                            width: screenWidth * 0.75,
                            marginBottom: 10,
                          }}
                          keyboardType="phone-pad"
                          onChangeText={handleChange("customerPhoneNumber")}
                          onBlur={handleBlur("customerPhoneNumber")}
                          value={values.customerPhoneNumber}
                        />
                        {touched.customerPhoneNumber &&
                          errors.customerPhoneNumber && (
                            <Text
                              style={{ color: "red", marginLeft: 12 }}
                            >
                              {errors.customerPhoneNumber}
                            </Text>
                          )}
                      </View>

                      {values.customerPhoneNumber?.trim().length > 0 && (
                        <>
                          <View>
                            <TextInput
                              label="Total Payment"
                              mode="outlined"
                              style={{
                                width: screenWidth * 0.75,
                                marginBottom: 10,
                              }}
                              keyboardType="phone-pad"
                              onChangeText={handleChange("totalPayment")}
                              onBlur={handleBlur("totalPayment")}
                              value={values.totalPayment}
                            />
                            {touched.totalPayment &&
                              errors.totalPayment && (
                                <Text
                                  style={{ color: "red", marginLeft: 12 }}
                                >
                                  {errors.totalPayment}
                                </Text>
                              )}
                          </View>

                          <View>
                            <TextInput
                              label="Advance Payment"
                              mode="outlined"
                              style={{
                                width: screenWidth * 0.75,
                                marginBottom: 10,
                              }}
                              keyboardType="phone-pad"
                              onChangeText={handleChange("advancePayment")}
                              onBlur={handleBlur("advancePayment")}
                              value={values.advancePayment}
                            />
                            {touched.advancePayment &&
                              errors.advancePayment && (
                                <Text
                                  style={{ color: "red", marginLeft: 12 }}
                                >
                                  {errors.advancePayment}
                                </Text>
                              )}
                          </View>

                          <View>
                            <TextInput
                              label="Front Desk Executive Name"
                              mode="outlined"
                              style={{
                                width: screenWidth * 0.75,
                                marginBottom: 10,
                              }}
                              onChangeText={handleChange("executiveName")}
                              onBlur={handleBlur("executiveName")}
                              value={values.executiveName}
                            />
                            {touched.executiveName &&
                              errors.executiveName && (
                                <Text
                                  style={{ color: "red", marginLeft: 12 }}
                                >
                                  {errors.executiveName}
                                </Text>
                              )}
                          </View>
                        </>
                      )}
                    </ScrollView>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 10,
                      }}
                    >
                      <View style={{ width: "50%" }}>
                        <Button
                          mode="contained"
                          onPress={handleSubmit}
                          style={{
                            height: 50,
                            borderRadius: 11,
                            justifyContent: "center",
                            marginLeft: 12,
                            marginRight: 20,
                          }}
                          buttonColor="rgba(234, 88, 12, 1)"
                        >
                          Submit
                        </Button>
                      </View>
                      <View style={{ width: "50%" }}>
                        <Button
                          mode="contained"
                          style={{
                            height: 50,
                            borderRadius: 11,
                            justifyContent: "center",
                            marginLeft: 12,
                            marginRight: 20,
                          }}
                          buttonColor="rgba(234, 88, 12, 1)"
                          onPress={() => {
                            setAdvanceAlert(false);
                            formikRef.current?.resetForm();
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
       <Text>{filterCustomerObjAdvance.customerName}</Text>
      </View>
      <View style={{flexDirection:"row",gap:6,paddingTop:15}}>
        <Text>Customer Address : </Text>
       <Text>{filterCustomerObjAdvance.customerAddress}</Text>
      </View>
      <View style={{flexDirection:"row",gap:6,paddingTop:15}}>
        <Text>Customer Phone Number : </Text>
       <Text>{filterCustomerObjAdvance.customerPhoneNumber}</Text>
      </View>
      <View style={{flexDirection:"row",gap:6,paddingTop:15}}>
        <Text>Total Payment : </Text>
       <Text>{filterCustomerObjAdvance.totalPayment}</Text>
      </View>
      <View style={{flexDirection:"row",gap:6,paddingTop:15}}>
        <Text>Advance Payment : </Text>
       <Text>{filterCustomerObjAdvance.advancePayment}</Text>
      </View>
      {todayDate===filterCustomerObjAdvance.selectedDate?
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <View style={{  overflow: 'hidden' }}>
      <Button
                mode="contained"
                style={{
                  height: 50, // Set the desired height
                  borderRadius:11,
                  color: '#FFFFFF',
                   fontSize: 16, 
                   justifyContent:'center',
                   marginTop: 20,
                }}
                buttonColor="rgba(234, 88, 12, 1)"
                onPress={()=>deleteCustomerDetailsAdvance(filterCustomerObjAdvance?._id)}
              >
     Customer Booking
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
      
      
      :<View style={{flexDirection:'row',justifyContent:'space-between'}}>
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
                    onPress={()=>updateCustomerDetailsAdvance(filterCustomerObjAdvance?.roomId)}
                  >
         Update
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
                      onPress={()=>deleteCustomerDetailsAdvance(filterCustomerObjAdvance?._id)}
                    >
           Delete
                    </Button>
          </View>
      </View>}
         {todayDate===filterCustomerObjAdvance.selectedDate?null:<View style={{flexDirection:"row",justifyContent:'center'}}>
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
         </View>}
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