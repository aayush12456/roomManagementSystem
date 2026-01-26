import DateTimePicker from "@react-native-community/datetimepicker";
import { useState,useRef ,useEffect } from "react";
import { Text,TextInput,Button } from "react-native-paper"
import { Formik } from 'formik';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { customerDetailsSchema } from "../../schemas";
import { View,Pressable,Modal,Dimensions, ScrollView,Image } from "react-native";
import SignatureScreen from "react-native-signature-canvas";
import {useSelector,useDispatch} from 'react-redux'
import io from "socket.io-client";
import axios from "axios";
import { passDataObjSliceAcions } from "../../Redux/Slice/passDataSliceObj/passDataSliceObj";
import { planScreenActions } from "../../Redux/Slice/planScreenSlice/planScreenSlice";
const socket = io.connect("http://192.168.29.169:4000")
// const socket = io.connect("https://roommanagementsystembackend-1.onrender.com")
const safeTimeToISOString = (timeStr) => {
  // ✅ FULL SAFETY
  if (!timeStr || typeof timeStr !== "string") return "";

  try {
    let hours = 0;
    let minutes = 0;

    const lower = timeStr.toLowerCase();

    if (lower.includes("am") || lower.includes("pm")) {
      const parts = timeStr.split(" ");
      if (!parts[0]) return "";

      const timePart = parts[0].split(":");
      if (timePart.length !== 2) return "";

      hours = parseInt(timePart[0], 10);
      minutes = parseInt(timePart[1], 10);

      if (lower.includes("pm") && hours < 12) hours += 12;
      if (lower.includes("am") && hours === 12) hours = 0;
    } 
    else if (timeStr.includes(":")) {
      const timePart = timeStr.split(":");
      if (timePart.length !== 2) return "";

      hours = parseInt(timePart[0], 10);
      minutes = parseInt(timePart[1], 10);
    } 
    else {
      return "";
    }

    const date = new Date(1970, 0, 1, hours, minutes, 0);

    if (isNaN(date.getTime())) return "";

    return date.toISOString();
  } catch (error) {
    console.log("safeTimeToISOString error:", error);
    return "";
  }
};


const CustomerDetailModal=({showAlert,setShowAlert,selectedRoomId,customerArray,roomType,floor,roomNo,
  currentDates,planStatus,paymentActiveSelector})=>{
  // console.log('customer array',customerArray)
  console.log('plan stat',planStatus)
  const BASE_URL = "http://192.168.29.169:4000";
  // const BASE_URL = "https://roommanagementsystembackend-1.onrender.com";
  const hotelDetailSelector=useSelector((state)=>state.getHotelDetails.getHotelDetailsObj.hotelObj)
  const passDataSelector=useSelector((state)=>state.passDataObj.passDataObj)
  const recentBookObj=passDataSelector.obj
  const dispatch=useDispatch()
  // console.log('pass data obj ',passDataSelector)
  // console.log('hotel detail obj',hotelDetailSelector)
    const screenWidth = Dimensions.get("window").width;
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showDatesPicker, setShowDatesPicker] = useState(false);
    const [showTimesPicker, setShowTimesPicker] = useState(false);
    const [filterCustomerObj,setFilterCustomerObj]=useState({})
    const [matchRoomResponse,setMatchRoomResponse]=useState(false)
    const [dateResponse,setDateResponse]=useState(false)
    const [showTextField,setShowTextField]=useState(false)
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const [showSignaturePad, setShowSignaturePad] = useState(false);

    const formikRef = useRef(null);
    const ref = useRef();
  
    useEffect(()=>{
    if(selectedRoomId){
    const matchRoom=customerArray.some((item)=>item.roomId==selectedRoomId)
    // console.log('match room',matchRoom)
     setMatchRoomResponse(matchRoom)
    }
    },[selectedRoomId,customerArray])
   
    useEffect(()=>{
      if(selectedRoomId && currentDates){
      const dateRoom=customerArray.some((item)=>item.currentDate==currentDates)
       setDateResponse(dateRoom)
      }
      },[selectedRoomId,customerArray,currentDates])
      
    useEffect(()=>{
      if(selectedRoomId){
      const customerObj=customerArray.find((item)=>item.roomId==selectedRoomId)
      // console.log('customer obj',customerObj)
      setFilterCustomerObj(customerObj)
      }
      },[selectedRoomId,customerArray])
  
    
    // console.log('filter customer obj',filterCustomerObj)
      const deleteCustomerDetails=async(customerId)=>{
        if (planStatus !== "free") {
          dispatch(planScreenActions.planScreenVisibleToggle())
          return
        }
        const deleteObj={
        id:hotelDetailSelector?._id,
        customerId:customerId
        }
        try {
          const response = await axios.post(`${BASE_URL}/hotel/deleteCustomerDetails/${deleteObj.id}`,deleteObj);
          // console.log('response in delete obj is',response?.data)
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Customer Details Deleted Successfully",
            autoClose: 10000, // 10 sec me band hoga
          });
          socket.emit('deleteCustomerDetails', response?.data)
      } catch (error) {
          // console.error('Error sending activate', error);
      }
      setShowAlert(false)
      }

      const updateCustomerDetailsData=()=>{
        setShowTextField(true)
      }    

 
    console.log('filter customer',filterCustomerObj)
return (
    <>
      <Formik  initialValues={{
 customerName: filterCustomerObj?.customerName || recentBookObj?.customerName|| '',
 customerAddress: filterCustomerObj?.customerAddress || recentBookObj?.customerAddress ||'',
 customerPhoneNumber: filterCustomerObj?.customerPhoneNumber || recentBookObj?.customerPhoneNumber|| '',
 totalCustomer: filterCustomerObj?.totalCustomer || '',
 relation:filterCustomerObj?.relation || '',
 customerIdProof: filterCustomerObj?.customerIdProof || '',
 customerAadharNumber: filterCustomerObj?.customerAadharNumber || '',
 customerCity: filterCustomerObj?.customerCity || '',
 customerOccupation: filterCustomerObj?.customerOccupation || '',
 customerDestination: filterCustomerObj?.customerDestination || '',
 reasonToStay: filterCustomerObj?.reasonToStay || '',
 checkInDate: filterCustomerObj?.checkInDate || '',
//  checkInTime: filterCustomerObj?.checkInTime || '',
 checkOutDate: filterCustomerObj?.checkOutDate || '',
 checkOutTime: filterCustomerObj?.checkOutTime || '',
//  personalCheckOutTime:filterCustomerObj?.personalCheckOutTime || '',
checkInTime: safeTimeToISOString(filterCustomerObj?.checkInTime),
personalCheckOutTime: safeTimeToISOString(
  filterCustomerObj?.personalCheckOutTime
),

 totalPayment: filterCustomerObj?.totalPayment ||'',
 paymentPaid: filterCustomerObj?.paymentPaid || '',
 paymentDue: filterCustomerObj?.paymentDue || '',
 executiveName: filterCustomerObj?.frontDeskExecutiveName || '',
 customerSignature: filterCustomerObj?.customerSignature || '',
//  extraCustomers: [] 
extraCustomers: filterCustomerObj?.extraCustomers?.map(item => ({
  customerName: item.customerName || "",
  customerAddress: item.customerAddress || "",
  customerPhoneNumber: item.customerPhoneNumber || "",
  customerAadharNumber: item.customerAadharNumber || "",
})) || [],
      }}
      enableReinitialize 
      validationSchema={customerDetailsSchema}
      onSubmit={async(values,{ resetForm }) => {
        // const checkInTime=new Date(values.checkInTime).toLocaleTimeString("en-IN", {
        //   hour: "2-digit",
        //   minute: "2-digit",
        //   hour12: true,
        //   timeZone: "Asia/Kolkata"
        // })
        // const personalCheckOutTime=new Date(values.personalCheckOutTime).toLocaleTimeString("en-IN", {
        //   hour: "2-digit",
        //   minute: "2-digit",
        //   hour12: true,
        //   timeZone: "Asia/Kolkata"
        // })
        if (planStatus !== "free"&& paymentActiveSelector.activeSubscription==null) {
          dispatch(planScreenActions.planScreenVisibleToggle())
          return
        }
        const checkInTime = values.checkInTime
        ? new Date(values.checkInTime).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "Asia/Kolkata",
          })
        : "";

      const personalCheckOutTime = values.personalCheckOutTime
        ? new Date(values.personalCheckOutTime).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "Asia/Kolkata",
          })
        : "";
        const formattedExtraCustomers = values.extraCustomers.map((item, index) => ({
          extraCustomerLabel: `Extra Customer ${index + 1}`,   // ✅ YE TEXT JAAYEGA
          customerName: item.customerName,
          customerAddress: item.customerAddress,
          customerPhoneNumber: item.customerPhoneNumber,
          customerAadharNumber: item.customerAadharNumber
        }));
        

      const customerDetailsObj={
        id:hotelDetailSelector._id,
        roomId:selectedRoomId || recentBookObj?.roomId,
        currentDate:currentDates,
        roomType:roomType || recentBookObj?.roomType,
        floor:floor || recentBookObj?.floor,
        roomNo:roomNo || recentBookObj?.roomNo,
        customerName:values.customerName,
        customerAddress:values.customerAddress,
        customerPhoneNumber:values.customerPhoneNumber,
        totalCustomer:values.totalCustomer,
        // extraCustomers: values.extraCustomers,
        extraCustomers:formattedExtraCustomers,
        relation:values.relation,
        customerIdProof:values.customerIdProof,
        customerAadharNumber:values.customerAadharNumber,
        customerCity:values.customerCity,
        customerOccupation:values.customerOccupation,
        customerDestination:values.customerDestination,
        reasonToStay:values.reasonToStay,
        checkInDate:values.checkInDate,
        checkInTime:checkInTime,
        checkOutDate:values.checkOutDate,
        personalCheckOutTime:personalCheckOutTime,
        checkOutTime:hotelDetailSelector?.checkOutTime,
        totalPayment:values.totalPayment,
        paymentPaid:values.paymentPaid,
        paymentDue:values.paymentDue,
        frontDeskExecutiveName:values.executiveName,
        customerSignature: values.customerSignature, 
      }
      try {
        if (matchRoomResponse === true) {
          // 🔹 Agar room already booked hai → Update API
          const response = await axios.post(
            `${BASE_URL}/hotel/updateCustomerDetails/${customerDetailsObj.id}`,
            customerDetailsObj
          );
          // console.log("response in update obj is", response?.data);
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Customer Details Updated Successfully",
            autoClose: 10000,
          });
          // socket.emit("updateCustomerDetails", response?.data?.getCustomerDetailsArray);
          socket.emit("updateCustomerDetails", response?.data);
        } else {
          // 🔹 Agar room empty hai → Add API
          const response = await axios.post(
            `${BASE_URL}/hotel/addCustomerDetails/${customerDetailsObj.id}`,
            customerDetailsObj
          );
          // console.log("response in add obj is", response?.data);
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Customer Details Added Successfully",
            autoClose: 10000,
          });
          socket.emit("addCustomerDetails", response?.data);
          // socket.emit("addReportDetails", response?.data?.reportArray);
        }
      } catch (error) {
        console.error("Error in Add/Update Customer", error);
      }

// console.log('customer detailss',customerDetailsObj)
        resetForm()
        setShowAlert(false)
        setShowTextField(false); 
        if(recentBookObj!=={}){
        dispatch(passDataObjSliceAcions.passDataObj({}))
        }
      }}
      innerRef={formikRef}
      >

 {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue })=>(
  <>
   {/* <Modal visible={ showAlert}  transparent animationType="fade"> */}
 <Modal visible={ passDataSelector?.type===true?passDataSelector.type:showAlert}  transparent animationType="fade">
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
       :showTextField === false ?
       <Text style={{textAlign:'center'}}>Customer Details Preview</Text>
       :<Text style={{textAlign:'center'}}>Update Customer Details </Text>    
    }
      {(matchRoomResponse === false || showTextField === true  )?
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          alignItems: "center",
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        scrollEnabled={scrollEnabled} 
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
          label="Relation"
          mode="outlined"
          style={{ width: screenWidth * 0.75, marginBottom: 10 }}
          onChangeText={handleChange('relation')}
          onBlur={handleBlur('relation')}
          value={values.relation}
        />
          {touched.relation && errors.relation && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.relation}</Text>}
        </View>:null}

        {values.customerPhoneNumber?.trim().length > 0?<View>
        <TextInput
          label="Customer Id Proof"
          mode="outlined"
          style={{ width: screenWidth * 0.75, marginBottom: 10 }}
          onChangeText={handleChange('customerIdProof')}
          onBlur={handleBlur('customerIdProof')}
          value={values.customerIdProof}
        />
        {touched.customerIdProof && errors.customerIdProof && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.customerIdProof}</Text>}
        </View>:null}

        {values.customerPhoneNumber?.trim().length > 0?<View>
        <TextInput
          label="Customer Aadhar Number"
          mode="outlined"
          keyboardType="phone-pad"
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
       
        {values.customerPhoneNumber?.trim().length > 0?<View>
        <TextInput
          label="Customer Occupation"
          mode="outlined"
          style={{ width: screenWidth * 0.75, marginBottom: 10 }}
          onChangeText={handleChange('customerOccupation')}
          onBlur={handleBlur('customerOccupation')}
          value={values.customerOccupation}
        />
         {touched.customerOccupation && errors.customerOccupation && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.customerOccupation}</Text>}
        </View>:null}

        {values.customerPhoneNumber?.trim().length > 0?<View>
        <TextInput
          label="Customer Destination"
          mode="outlined"
          style={{ width: screenWidth * 0.75, marginBottom: 10 }}
          onChangeText={handleChange('customerDestination')}
          onBlur={handleBlur('customerDestination')}
          value={values.customerDestination}
        />
         {touched.customerDestination && errors.customerDestination && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.customerDestination}</Text>}
        </View>:null}

        {values.customerPhoneNumber?.trim().length > 0?<View>
        <TextInput
          label="Total Customer"
          mode="outlined"
          style={{ width: screenWidth * 0.75, marginBottom: 10 }}
          // onChangeText={handleChange('totalCustomer')}
          keyboardType="phone-pad"
          onChangeText={(text) => {
            handleChange('totalCustomer')(text);
        
            const count = parseInt(text || "0");
        
            if (count > 1) {
              // const newArr = Array.from({ length: count - 1 }, () => ({
              //   customerName: "",
              //   customerAddress: "",
              //   customerPhoneNumber: "",
              //   customerAadharNumber: "",
              // }));
              const existing = values.extraCustomers || [];

    const newArr = Array.from({ length: count - 1 }, (_, i) => ({
      customerName: existing[i]?.customerName || "",
      customerAddress: existing[i]?.customerAddress || "",
      customerPhoneNumber: existing[i]?.customerPhoneNumber || "",
      customerAadharNumber: existing[i]?.customerAadharNumber || "",
    }));
              setFieldValue("extraCustomers", newArr);
            } else {
              setFieldValue("extraCustomers", []);
            }
          }}
          onBlur={handleBlur('totalCustomer')}
          value={values.totalCustomer}
        />
          {touched.totalCustomer && errors.totalCustomer && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.totalCustomer}</Text>}
        </View>:null}

        {values.extraCustomers?.map((item, index) => {
  const nameError =
    touched.extraCustomers?.[index]?.customerName &&
    errors.extraCustomers?.[index]?.customerName;

  const addressError =
    touched.extraCustomers?.[index]?.customerAddress &&
    errors.extraCustomers?.[index]?.customerAddress;

  const phoneError =
    touched.extraCustomers?.[index]?.customerPhoneNumber &&
    errors.extraCustomers?.[index]?.customerPhoneNumber;

  const aadharError =
    touched.extraCustomers?.[index]?.customerAadharNumber &&
    errors.extraCustomers?.[index]?.customerAadharNumber;

  return (
    <View key={index} style={{ marginTop: 15 }}>

      <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
        Extra Customer {index + 1}
      </Text>

      {/* ✅ NAME */}
      <TextInput
        label={`Customer Name ${index + 1}`}
        mode="outlined"
        style={{ width: screenWidth * 0.75, marginBottom: 5 }}
        value={values.extraCustomers[index].customerName}
        onChangeText={(text) =>
          setFieldValue(`extraCustomers[${index}].customerName`, text)
        }

      />
      {nameError && <Text style={{ color: "red" }}>{errors.extraCustomers[index].customerName}</Text>}

      {/* ✅ ADDRESS */}
      <TextInput
        label={`Customer Address ${index + 1}`}
        mode="outlined"
        style={{ width: screenWidth * 0.75, marginBottom: 5 }}
        value={values.extraCustomers[index].customerAddress}
        onChangeText={(text) =>
          setFieldValue(`extraCustomers[${index}].customerAddress`, text)
        }
      />
      {addressError && <Text style={{ color: "red" }}>{errors.extraCustomers[index].customerAddress}</Text>}

      {/* ✅ PHONE */}
      <TextInput
        label={`Customer Phone Number ${index + 1}`}
        mode="outlined"
        keyboardType="phone-pad"
        style={{ width: screenWidth * 0.75, marginBottom: 5 }}
        value={values.extraCustomers[index].customerPhoneNumber}
        onChangeText={(text) =>
          setFieldValue(`extraCustomers[${index}].customerPhoneNumber`, text)
        }
      />
      {phoneError && <Text style={{ color: "red" }}>{errors.extraCustomers[index].customerPhoneNumber}</Text>}

      {/* ✅ AADHAR */}
      <TextInput
        label={`Customer Aadhar Number ${index + 1}`}
        mode="outlined"
        keyboardType="phone-pad"
        style={{ width: screenWidth * 0.75, marginBottom: 10 }}
        value={values.extraCustomers[index].customerAadharNumber}
        onChangeText={(text) =>
          setFieldValue(`extraCustomers[${index}].customerAadharNumber`, text)
        }
      />
      {aadharError && <Text style={{ color: "red" }}>{errors.extraCustomers[index].customerAadharNumber}</Text>}

    </View>
  );
})}

   
        {values.customerPhoneNumber?.trim().length > 0?<View>
        <TextInput
          label="Reason To Stay"
          mode="outlined"
          style={{ width: screenWidth * 0.75, marginBottom: 10 }}
          onChangeText={handleChange('reasonToStay')}
          onBlur={handleBlur('reasonToStay')}
          value={values.reasonToStay}
        />
         {touched.reasonToStay && errors.reasonToStay && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.reasonToStay}</Text>}
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
          // value={
          //   values.checkInTime
          //     ? new Date(values.checkInTime).toLocaleTimeString("en-IN", {
          //         hour: "2-digit",
          //         minute: "2-digit",
          //         hour12: true,
          //         timeZone: "Asia/Kolkata"
          //       })
          //     : ""
          // }
          value={
            values.checkInTime &&
            !isNaN(new Date(values.checkInTime).getTime())
              ? new Date(values.checkInTime).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
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
        value={values.personalCheckOutTime ? new Date(values.personalCheckOutTime) : new Date()}
        mode="time"
        onChange={(event, personalSelectedCheckOutTime) => {
          setShowTimesPicker(false);
          if (personalSelectedCheckOutTime) {
            // ✅ Store as Date object in Formik
            setFieldValue("personalCheckOutTime", personalSelectedCheckOutTime.toISOString());
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
    
    {values.customerPhoneNumber?.trim().length > 0 ? (
  <View>
    <Pressable onPress={() => setShowTimesPicker(true)} style={{ marginTop: 10 }}>
      <TextInput
        label="Personal Check Out Time"
        mode="outlined"
        // value={
        //   values.personalCheckOutTime
        //     ? new Date(values.personalCheckOutTime).toLocaleTimeString("en-IN", {
        //         hour: "2-digit",
        //         minute: "2-digit",
        //         hour12: true,
        //         timeZone: "Asia/Kolkata",
        //       })
        //     : ""
        // }
        value={
          values.personalCheckOutTime &&
          !isNaN(new Date(values.personalCheckOutTime).getTime())
            ? new Date(values.personalCheckOutTime).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
            : ""
        }
        placeholder="Personal Check Out Time"
        editable={false}
        pointerEvents="none"
        style={{ width: screenWidth * 0.75, marginBottom: 10 }}
      />
    </Pressable>
    {touched.personalCheckOutTime && errors.personalCheckOutTime && (
      <Text style={{ color: "red" }}>{errors.personalCheckOutTime}</Text>
    )}
  </View>
) : null}

       {values.customerPhoneNumber?.trim().length > 0?<View>

        <TextInput
          label="Check Out Time"
          mode="outlined"
          value={
            hotelDetailSelector?.checkOutTime
          }
          placeholder="Check Out Time"
          editable={false}
          pointerEvents="none"
          style={{ width: screenWidth * 0.75, marginBottom: 10 }}
        />
      
      </View>:null}
      {values.customerPhoneNumber?.trim().length > 0?<View>
        <TextInput
          label="Total Payment"
          mode="outlined"
          keyboardType="phone-pad"
          style={{ width: screenWidth * 0.75, marginBottom: 10 }}
          onChangeText={handleChange('totalPayment')}
          onBlur={handleBlur('totalPayment')}
          value={values.totalPayment}
        />
          {touched.totalPayment && errors.totalPayment && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.totalPayment}</Text>}
        </View>:null}

        {values.customerPhoneNumber?.trim().length > 0?<View>
        <TextInput
          label=" Payment Paid"
          mode="outlined"
          keyboardType="phone-pad"
          style={{ width: screenWidth * 0.75, marginBottom: 10 }}
          onChangeText={handleChange('paymentPaid')}
          onBlur={handleBlur('paymentPaid')}
          value={values.paymentPaid}
        />
          {touched.paymentPaid && errors.paymentPaid && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.paymentPaid}</Text>}
        </View>:null}
     
        {values.customerPhoneNumber?.trim().length > 0 && recentBookObj?.advancePayment?<View>
        <TextInput
          label="Advance Payment"
          mode="outlined"
          style={{ width: screenWidth * 0.75, marginBottom: 10 }}
          value={recentBookObj?.advancePayment}
          editable={false}
          pointerEvents="none"
        />
          
        </View>:null}

        {values.customerPhoneNumber?.trim().length > 0?<View>
        <TextInput
          label=" Payment Due"
          mode="outlined"
          keyboardType="phone-pad"
          style={{ width: screenWidth * 0.75, marginBottom: 10 }}
          onChangeText={handleChange('paymentDue')}
          onBlur={handleBlur('paymentDue')}
          value={values.paymentDue}
        />
          {touched.paymentDue && errors.paymentDue && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.paymentDue}</Text>}
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
        {values.customerPhoneNumber?.trim().length > 0 && !filterCustomerObj?.customerSignature ? (
  <View>
    <Pressable onPress={() => setShowSignaturePad(true)}>
      <TextInput
        label="Customer Signature"
        mode="outlined"
        style={{ width: screenWidth * 0.75, marginBottom: 10 }}
        value={values.customerSignature ? "Signature Captured" : ""}
        editable={false} // ab bas display ke liye hai, typing block ho gayi
        pointerEvents="none" // ✅ isse pressable ke through click hoga
      />
    </Pressable>
    {touched.customerSignature && errors.customerSignature && (
      <Text style={{ color: "red", marginLeft: 12 }}>
        {errors.customerSignature}
      </Text>
    )}
  </View>
) : null}
    
  {/* <View style={{ height: 250, width: screenWidth * 0.9, borderWidth: 2, borderColor: "#ccc" }}>
  <SignatureScreen
  ref={ref}
  onOK={(sig) => setFieldValue("customerSignature", sig)} 
  onClear={() => setFieldValue("customerSignature", "")}
  onBegin={() => setScrollEnabled(false)}
  onEnd={() => {
    setScrollEnabled(true);
    ref.current.readSignature();   // ✅ ye call karega onOK aur Formik me signature save ho jaayega
  }}
  autoClear={false}
  descriptionText="Apna Signature yaha karein"
  webStyle={`
    .m-signature-pad--footer {display: none; margin: 0px;}
    body,html {width: 100%; height: 100%; margin: 0; padding: 0;}
    .m-signature-pad {box-shadow: none; border: none; border-radius: 0;}
  `}
/>

    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <Button
        mode="outlined"
        onPress={() => ref.current.clearSignature()}
        style={{ marginBottom: 10, width: 90, marginTop: 9 }}
      >
        Clear
      </Button>
    </View>
  </View>
  {touched.customerSignature && errors.customerSignature && (
      <Text style={{ color: "red" }}>{errors.customerSignature}</Text>
    )} */}
{showSignaturePad && (
  <View
    style={{
      height: 250,
      width: screenWidth * 0.9,
      borderWidth: 2,
      borderColor: "#ccc",
    }}
  >
    <SignatureScreen
      ref={ref}
      onOK={(sig) => {
        setFieldValue("customerSignature", sig);
        setShowSignaturePad(false); // ✅ Save ke baad pad hide
      }}
      onClear={() => setFieldValue("customerSignature", "")}
      onBegin={() => setScrollEnabled(false)}
      onEnd={() => {
        setScrollEnabled(true);
        ref.current.readSignature(); // ye trigger karega onOK
      }}
      autoClear={false}
      
      descriptionText="Apna Signature yaha karein"
      webStyle={`
        .m-signature-pad--footer {display: none; margin: 0px;}
        body,html {width: 100%; height: 100%; margin: 0; padding: 0;}
        .m-signature-pad {box-shadow: none; border: none; border-radius: 0;}
      `}
    />

    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <Button
        mode="outlined"
        onPress={() => {
          ref.current.clearSignature();
          setFieldValue("customerSignature", "");
        }}
        style={{ marginBottom: 10, width: 90, marginTop: 9 }}
      >
        Clear
      </Button>
    </View>
  </View>
)}
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
      <View style={{flexDirection:"row",gap:6,paddingTop:15}}>
        <Text>Relation : </Text>
       <Text>{filterCustomerObj.relation}</Text>
      </View>
      <View style={{flexDirection:"row",gap:6,paddingTop:15}}>
        <Text>Customer Id Proof : </Text>
       <Text>{filterCustomerObj.customerIdProof}</Text>
      </View>
      <View style={{flexDirection:"row",gap:6,paddingTop:15}}>
        <Text>customer Aadhar Number : </Text>
       <Text>{filterCustomerObj.customerAadharNumber}</Text>
      </View>
      <View style={{flexDirection:"row",gap:6,paddingTop:15}}>
        <Text>Customer City : </Text>
       <Text>{filterCustomerObj.customerCity}</Text>
      </View>
       <View style={{flexDirection:"row",gap:6,paddingTop:15}}>
        <Text>Customer Occupation: </Text>
       <Text>{filterCustomerObj.customerOccupation}</Text>
      </View>
      <View style={{flexDirection:"row",gap:6,paddingTop:15}}>
        <Text>Customer Destination: </Text>
       <Text>{filterCustomerObj.customerDestination}</Text>
      </View>
      <View style={{flexDirection:"row",gap:6,paddingTop:15}}>
        <Text>Total Customer : </Text>
       <Text>{filterCustomerObj.totalCustomer}</Text>
      </View>
    {
      filterCustomerObj?.extraCustomers?.map((customer)=>{
        return (
          <>
          <View style={{marginTop:18}}>
            <Text>{customer?.extraCustomerLabel} </Text>
            <View style={{flexDirection:"row",gap:6,paddingTop:6}}>
            <Text>Customer Name : </Text>
       <Text>{customer?.customerName}</Text>
            </View>
            <View style={{flexDirection:"row",gap:6,paddingTop:3}}>
            <Text>Customer Address : </Text>
       <Text>{customer?.customerAddress}</Text>
            </View>
            <View style={{flexDirection:"row",gap:6,paddingTop:3}}>
            <Text>Customer Phone Number : </Text>
       <Text>{customer?.customerPhoneNumber}</Text>
            </View>
            <View style={{flexDirection:"row",gap:6,paddingTop:3}}>
            <Text>Customer Aadhar Number : </Text>
       <Text>{customer?.customerAadharNumber}</Text>
            </View>
          </View>
          </>
        )
      })
    }
      <View style={{flexDirection:"row",gap:6,paddingTop:15}}>
        <Text>Reason To Stay: </Text>
       <Text>{filterCustomerObj.reasonToStay}</Text>
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
        <Text>Personal Check Out Time : </Text>
       <Text>{filterCustomerObj.personalCheckOutTime}</Text>
      </View>
      <View style={{flexDirection:"row",gap:6,paddingTop:15}}>
        <Text>Total Payment : </Text>
       <Text>{filterCustomerObj.totalPayment}</Text>
      </View>
      <View style={{flexDirection:"row",gap:6,paddingTop:15}}>
        <Text>Payment Paid : </Text>
       <Text>{filterCustomerObj.paymentPaid}</Text>
      </View>
      <View style={{flexDirection:"row",gap:6,paddingTop:15}}>
        <Text>Payment Due : </Text>
       <Text>{filterCustomerObj.paymentDue}</Text>
      </View>
      <View style={{flexDirection:"row",gap:6,paddingTop:15}}>
        <Text>Front Desk Executive Name : </Text>
       <Text>{filterCustomerObj.frontDeskExecutiveName}</Text>
      </View>
      <View style={{ paddingTop: 15 }}>
  <Text>Customer Signature : </Text>
  {filterCustomerObj.customerSignature ? (
    <Image
      source={{ uri: filterCustomerObj.customerSignature }}
      style={{ width: 150, height: 100, resizeMode: "contain", borderWidth:1, borderColor:"#ccc",marginTop:10 }}
    />
  ) : (
    <Text>No signature found</Text>
  )}
</View>

     </View> 
      </ScrollView>
      }
        <View style={{flexDirection:"row",justifyContent:'space-between'}}>
       {(matchRoomResponse === false || showTextField === true)?<View style={{ width: '50%', overflow: 'hidden' }}>
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
                    onPress={()=>updateCustomerDetailsData()}
                  >
         Update
                  </Button>
        </View>
          }
          {
            (matchRoomResponse===true && showTextField==false)?   <View style={{ width: '50%', overflow: 'hidden' }}>
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
          {(matchRoomResponse === false || showTextField === true) ?<View style={{ width: '50%', overflow: 'hidden' }}>
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
                        dispatch(passDataObjSliceAcions.passDataObj({}))
                        formikRef.current?.resetForm(); // Form reset
                      }}
                    >
     Close
                    </Button>
          </View>:null}
        </View>
        <View style={{flexDirection:'row',justifyContent:'center'}}>
        {matchRoomResponse===true && showTextField===false?<View style={{ width: '50%', overflow: 'hidden' }}>
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