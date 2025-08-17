import DateTimePicker from "@react-native-community/datetimepicker";
import { useState,useRef ,useEffect } from "react";
import { Text,TextInput,Button } from "react-native-paper"
import { Formik } from 'formik';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { customerDetailsSchema } from "../../schemas";
import { View,Pressable,Modal,Dimensions, ScrollView } from "react-native";
import {useSelector} from 'react-redux'
import io from "socket.io-client";
import axios from "axios";
const socket = io.connect("http://192.168.29.169:4000")
const CustomerDetailModal=({showAlert,setShowAlert,selectedRoomId,customerArray})=>{
  console.log('customer array',customerArray)
  const BASE_URL = "http://192.168.29.169:4000";
  const hotelDetailSelector=useSelector((state)=>state.getHotelDetails.getHotelDetailsObj.hotelObj)
    const screenWidth = Dimensions.get("window").width;
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showDatesPicker, setShowDatesPicker] = useState(false);
    const [showTimesPicker, setShowTimesPicker] = useState(false);
    const [filterCustomerObj,setFilterCustomerObj]=useState({})
    const [matchRoomResponse,setMatchRoomResponse]=useState(null)
    const formikRef = useRef(null);
  
    useEffect(()=>{
    if(selectedRoomId){
    const matchRoom=customerArray.some((item)=>item.roomId==selectedRoomId)
    console.log('match room',matchRoom)
     setMatchRoomResponse(matchRoom)
    }
    },[selectedRoomId,customerArray])

    useEffect(()=>{
      if(selectedRoomId){
      const customerObj=customerArray.find((item)=>item.roomId==selectedRoomId)
      console.log('customer obj',customerObj)
      setFilterCustomerObj(customerObj)
      }
      },[selectedRoomId,customerArray])

      const deleteCustomerDetails=async(customerId)=>{
        const deleteObj={
        id:hotelDetailSelector?._id,
        customerId:customerId
        }
        try {
          const response = await axios.post(`${BASE_URL}/hotel/deleteCustomerDetails/${deleteObj.id}`,deleteObj);
          console.log('response in delete obj is',response?.data)
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Customer deleted Successfully",
            autoClose: 10000, // 10 sec me band hoga
          });
          socket.emit('deleteCustomerDetails', response?.data?.getCustomerDetailsArray)
      } catch (error) {
          // console.error('Error sending activate', error);
      }
      setShowAlert(false)
      }
return (
    <>
      <Formik  initialValues={{
      customerName: '',
      customerAddress: '',
      customerPhoneNumber: '',
      totalCustomer: '',
      customerAadharNumber: '',
      customerCity: '',
      checkInDate: '',
      checkInTime: '',
      checkOutDate: '',
      checkOutTime: '',
      executiveName:''
      }}
      validationSchema={customerDetailsSchema}
      onSubmit={async(values,{ resetForm }) => {
        const checkInTime=new Date(values.checkInTime).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata"
        })
        const checkOutTime=new Date(values.checkOutTime).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata"
        })
      const customerDetailsObj={
        id:hotelDetailSelector._id,
        roomId:selectedRoomId,
        customerName:values.customerName,
        customerAddress:values.customerAddress,
        customerPhoneNumber:values.customerPhoneNumber,
        totalCustomer:values.totalCustomer,
        customerAadharNumber:values.customerAadharNumber,
        customerCity:values.customerCity,
        checkInDate:values.checkInDate,
        checkInTime:checkInTime,
        checkOutDate:values.checkOutDate,
        checkOutTime:checkOutTime,
        frontDeskExecutiveName:values.executiveName
      }
      try {
        const response = await axios.post(`${BASE_URL}/hotel/addCustomerDetails/${customerDetailsObj.id}`,customerDetailsObj);
        console.log('response in deactivate obj is',response?.data)
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Customer Added Successfully",
          autoClose: 10000, // 10 sec me band hoga
        });
        socket.emit('addCustomerDetails', response?.data?.getCustomerDetailsArray)
    } catch (error) {
        // console.error('Error sending activate', error);
    }
console.log('customer',customerDetailsObj)
        resetForm()
        setShowAlert(false)
      }}
      innerRef={formikRef}
      >

 {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue })=>(
  <>
 <Modal visible={showAlert} transparent animationType="fade">
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
      {/* 🔹 Scroll starts from Customer Name */}
     { matchRoomResponse===false?<Text style={{textAlign:'center'}}>Enter Customer Details</Text>
       :
       <Text style={{textAlign:'center'}}>Customer Details Preview</Text>     
    }
      {matchRoomResponse===false?
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          alignItems: "center",
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
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
        {values.customerPhoneNumber?.trim().length > 0?<View>
        <TextInput
          label="Total Customer"
          mode="outlined"
          style={{ width: screenWidth * 0.75, marginBottom: 10 }}
          onChangeText={handleChange('totalCustomer')}
          onBlur={handleBlur('totalCustomer')}
          value={values.totalCustomer}
        />
          {touched.totalCustomer && errors.totalCustomer && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.totalCustomer}</Text>}
        </View>:null}

        {values.customerPhoneNumber?.trim().length > 0?<View>
        <TextInput
          label="Customer Aadhar Number"
          mode="outlined"
          style={{ width: screenWidth * 0.75, marginBottom: 10 }}
          onChangeText={handleChange('customerAadharNumber')}
          onBlur={handleBlur('customerAadharNumber')}
          value={values.customerAadharNumber}
        />
        {touched.customerAadharNumber && errors.customerAadharNumber && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.customerAadharNumber}</Text>}
        </View>:null}

        {values.customerPhoneNumber?.trim().length > 0?<View>
        <TextInput
          label="Customer City"
          mode="outlined"
          style={{ width: screenWidth * 0.75, marginBottom: 10 }}
          onChangeText={handleChange('customerCity')}
          onBlur={handleBlur('customerCity')}
          value={values.customerCity}
        />
         {touched.customerCity && errors.customerCity && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.customerCity}</Text>}
        </View>:null}

       {values.customerPhoneNumber?.trim().length > 0?<View >
      {/* Date Field */}
      <Pressable onPress={() => setShowDatePicker(true)}>
        <TextInput
          label="Check In Date"
          mode="outlined"
          value={values.checkInDate}
          placeholder="Check In Date"
          editable={false}
          pointerEvents="none"
          style={{ width: screenWidth * 0.75, marginBottom: 10 }}
        />
      </Pressable>
      {touched.checkInDate && errors.checkInDate && (
  <Text style={{ color: 'red' }}>{errors.checkInDate}</Text>
)}
    </View>:null}
  
      {values.customerPhoneNumber?.trim().length > 0?<View>
  <Pressable onPress={() => setShowTimePicker(true)} style={{ marginTop: 10 }}>
        <TextInput
          label="Check In Time"
          mode="outlined"
          value={
            values.checkInTime
              ? new Date(values.checkInTime).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                  timeZone: "Asia/Kolkata"
                })
              : ""
          }
          placeholder="Check In Time"
          editable={false}
          pointerEvents="none"
          style={{ width: screenWidth * 0.75, marginBottom: 10 }}
        />
      </Pressable>
      {touched.checkInTime && errors.checkInTime && (
  <Text style={{ color: 'red' }}>{errors.checkInTime}</Text>
)}

      </View>:null}

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
        value={values.checkInDate ? new Date(values.checkInDate.split("/").reverse().join("-")) : new Date()}
          mode="date"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setFieldValue("checkInDate", selectedDate.toLocaleDateString("en-GB"));
            }
          }}
        />
      )}

      {/* Time Picker */}
      {showTimePicker && (
        <DateTimePicker
        value={values.checkInTime ? new Date(values.checkInTime) : new Date()}
          mode="time"
          onChange={(event, selectedCheckInTime) => {
            setShowTimePicker(false);
            if (selectedCheckInTime) {
              // ✅ Store as Date object in Formik
              setFieldValue("checkInTime", selectedCheckInTime.toISOString());
            }
          }}
        />
      )}

{showDatesPicker && (
        <DateTimePicker
        value={values.checkOutDate ? new Date(values.checkOutDate.split("/").reverse().join("-")) : new Date()}
          mode="date"
          onChange={(event, selectedOutDate) => {
            setShowDatesPicker(false);
            if (selectedOutDate) {
              setFieldValue("checkOutDate", selectedOutDate.toLocaleDateString("en-GB"));
            }
          }}
        />
      )}

      {/* Time Picker */}
      {showTimesPicker && (
        <DateTimePicker
        value={values.checkInTime ? new Date(values.checkInTime) : new Date()}
        mode="time"
        onChange={(event, selectedCheckOutTime) => {
          setShowTimesPicker(false);
          if (selectedCheckOutTime) {
            // ✅ Store as Date object in Formik
            setFieldValue("checkOutTime", selectedCheckOutTime.toISOString());
          }
        }}
        />
      )}

         {values.customerPhoneNumber?.trim().length > 0?<View >
      <Pressable onPress={() => setShowDatesPicker(true)}>
        <TextInput
          label="Check Out Date"
          mode="outlined"
          value={values.checkOutDate}
          placeholder="Check Out Date"
          editable={false}
          pointerEvents="none"
          style={{ width: screenWidth * 0.75, marginBottom: 10 }}
        />
      </Pressable>
      {touched.checkOutDate && errors.checkOutDate && (
  <Text style={{ color: 'red' }}>{errors.checkOutDate}</Text>
)}

    </View>:null}
    
      {values.customerPhoneNumber?.trim().length > 0?<View>
  <Pressable onPress={() => setShowTimesPicker(true)} style={{ marginTop: 10 }}>
        <TextInput
          label="Check Out Time"
          mode="outlined"
          value={
            values.checkOutTime
              ? new Date(values.checkOutTime).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                  timeZone: "Asia/Kolkata"
                })
              : ""
          }
          placeholder="Check Out Time"
          editable={false}
          pointerEvents="none"
          style={{ width: screenWidth * 0.75, marginBottom: 10 }}
        />
      </Pressable>
      {touched.checkOutTime && errors.checkOutTime && (
  <Text style={{ color: 'red' }}>{errors.checkOutTime}</Text>
)}
      </View>:null}
      {values.customerPhoneNumber?.trim().length > 0?<View>
        <TextInput
          label="Front Desk Executive Name"
          mode="outlined"
          style={{ width: screenWidth * 0.75, marginBottom: 10 }}
          onChangeText={handleChange('executiveName')}
          onBlur={handleBlur('executiveName')}
          value={values.executiveName}
        />
        {touched.executiveName && errors.executiveName && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.executiveName}</Text>}
        </View>:null}
      </ScrollView>
      :
      <ScrollView 
      contentContainerStyle={{
        padding: 20,
        alignItems: "center",
      }}
      >
     <View>
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
      <View style={{flexDirection:"row",gap:6,paddingTop:15}}>
        <Text>Total Customer : </Text>
       <Text>{filterCustomerObj.totalCustomer}</Text>
      </View>
      <View style={{flexDirection:"row",gap:6,paddingTop:15}}>
        <Text>Customer Aadhar Number : </Text>
       <Text>{filterCustomerObj.customerAadharNumber}</Text>
      </View>
      <View style={{flexDirection:"row",gap:6,paddingTop:15}}>
        <Text>Customer City : </Text>
       <Text>{filterCustomerObj.customerCity}</Text>
      </View>
      <View style={{flexDirection:"row",gap:6,paddingTop:15}}>
        <Text>Check In Date : </Text>
       <Text>{filterCustomerObj.checkInDate}</Text>
      </View>
      <View style={{flexDirection:"row",gap:6,paddingTop:15}}>
        <Text>check In Time : </Text>
       <Text>{filterCustomerObj.checkInTime}</Text>
      </View>
      <View style={{flexDirection:"row",gap:6,paddingTop:15}}>
        <Text>check Out Date : </Text>
       <Text>{filterCustomerObj.checkOutDate}</Text>
      </View>
      <View style={{flexDirection:"row",gap:6,paddingTop:15}}>
        <Text>check Out Time : </Text>
       <Text>{filterCustomerObj.checkOutTime}</Text>
      </View>
      <View style={{flexDirection:"row",gap:6,paddingTop:15}}>
        <Text>Front Desk Executive Name : </Text>
       <Text>{filterCustomerObj.frontDeskExecutiveName}</Text>
      </View>
     </View> 
      </ScrollView>
      }
        <View style={{flexDirection:"row",justifyContent:'space-between'}}>
       {matchRoomResponse===false?<View style={{ width: '50%', overflow: 'hidden' }}>
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
          </View>:
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
                  >
         Update
                  </Button>
        </View>
          }
          {
            matchRoomResponse===true?   <View style={{ width: '50%', overflow: 'hidden' }}>
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
                      onPress={()=>deleteCustomerDetails(filterCustomerObj?._id)}
                    >
           Delete
                    </Button>
          </View>:null
          }
          {matchRoomResponse===false?<View style={{ width: '50%', overflow: 'hidden' }}>
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
                        setShowAlert(false)
                        formikRef.current?.resetForm(); // Form reset
                      }}
                    >
     Close
                    </Button>
          </View>:null}
        </View>
        <View style={{flexDirection:'row',justifyContent:'center'}}>
        {matchRoomResponse===true?<View style={{ width: '50%', overflow: 'hidden' }}>
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
                        setShowAlert(false)
                        formikRef.current?.resetForm(); // Form reset
                      }}
                    >
     Close
                    </Button>
          </View>:null}
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
export default CustomerDetailModal