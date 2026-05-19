import { View,Modal,Dimensions, ScrollView ,Image,ActivityIndicator} from "react-native";
import { Text,TextInput,Button } from "react-native-paper"
import { Formik } from 'formik';
import { useState,useRef ,useEffect } from "react";
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { advanceCustomerBookingSchema } from "../../schemas";
import {useSelector,useDispatch} from 'react-redux'
import accessImg from '../../../assets/roomIcon/noDelete.png'
import axios from 'axios'
import io from "socket.io-client";
import { passDataObjSliceAcions } from "../../Redux/Slice/passDataSliceObj/passDataSliceObj";
import { planScreenActions } from "../../Redux/Slice/planScreenSlice/planScreenSlice";
const socket = io.connect("http://192.168.29.169:4000")
// const socket = io.connect("https://roommanagementsystembackend-1.onrender.com")
const AdvanceBookModal=({floor,roomType,roomNo,advanceAlert,selectedRoomId,roomNum,customerArrayAdvance
  ,todayDate,currentDates,setAdvanceAlert,planStatus,paymentActiveSelector,profile})=>{
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
const [loading, setLoading] = useState(false);
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

    const deleteCustomerDetailsAdvance=async(customerId,customerName,checkInDate,customerPhoneNumber)=>{
      if (planStatus !== "free" && paymentActiveSelector.activeSubscription==null) {
        dispatch(planScreenActions.planScreenVisibleToggle())
        return
      }
      if (loading) return; 
      setLoading(true); 
      const deleteObj={
      id:hotelDetailSelector?._id,
      customerId:customerId,
      customerName:customerName,
      checkInDate:checkInDate,
      customerPhoneNumber:customerPhoneNumber
      }
      const formatDateForToast= (dateString) => {
        const [day, month, year] = dateString.split("/");
      
        const dateObj = new Date(year, month - 1, day);
      
        return dateObj.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
        });
      };
      try {
        const response = await axios.post(`${BASE_URL}/hotel/deleteCustomerDetailsAdvance/${deleteObj.id}`,deleteObj);
        // console.log('response in delete obj is',response?.data)
        const formattedDate = formatDateForToast(currentDates);
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Booking Cancelled",
          textBody: `Room ${roomNo} for ${formattedDate}`,
          autoClose:10000,
          containerStyle: {
            borderRadius: 16,
            marginHorizontal: 20,
            paddingVertical: 12,
            backgroundColor: "#16A34A", // soft success green
          },
          titleStyle: {
            fontSize: 15,
            fontWeight: "600",
            color: "#fff",
          },
          textBodyStyle: {
            fontSize: 13,
            color: "#E5E7EB",
          },
        });
        socket.emit('deleteCustomerDetailsAdvance', response?.data?.getAdvanceCustomerDetailsArray)
    } catch (error) {
        // console.error('Error sending activate', error);
    }
    finally {
      setLoading(false);   // ✅ STOP LOADER (always runs)
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
    
    // const updateCustomerDetailsAdvance=(roomId)=>{
    //   setShowTextFieldAdvance(true)
    // }
    
return (
    <>
   <Formik 
    initialValues={{
        customerName: filterCustomerObjAdvance?.customerName || '',
        customerAddress:filterCustomerObjAdvance?.customerAddress || '',
        customerPhoneNumber:filterCustomerObjAdvance?.customerPhoneNumber || '',
        customerEmail:filterCustomerObjAdvance?.customerEmail || '',
        totalPayment:filterCustomerObjAdvance?.totalPayment || '',
        advancePayment:filterCustomerObjAdvance?.advancePayment || '',
        executiveName:filterCustomerObjAdvance?.frontDeskExecutiveName || '',
    }}
    enableReinitialize 
    validationSchema={advanceCustomerBookingSchema}
    onSubmit={async(values,{ resetForm }) => {
      if (planStatus !== "free"&& paymentActiveSelector.activeSubscription==null) {
        dispatch(planScreenActions.planScreenVisibleToggle())
        return
      }
      if (loading) return; 
      setLoading(true); 
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
            customerEmail:values.customerEmail,
            totalPayment:values.totalPayment,
            advancePayment:values.advancePayment,
            frontDeskExecutiveName:values.executiveName,
        }
        // console.log('advance customer',advanceCustomerObj)
        const formatDateForToast= (dateString) => {
          const [day, month, year] = dateString.split("/");
        
          const dateObj = new Date(year, month - 1, day);
        
          return dateObj.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
          });
        };
     try{
      if(matchRoomResponseAdvance === true){
        const response = await axios.post(
          `${BASE_URL}/hotel/updateCustomerDetailsAdvance/${advanceCustomerObj.id}`,
          advanceCustomerObj
        );
        // console.log("response in update obj is", response?.data);
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Details Updated",
          textBody: `Guest information updated`,
          autoClose:10000,
          containerStyle: {
            borderRadius: 16,
            marginHorizontal: 20,
            paddingVertical: 12,
            backgroundColor: "#16A34A", // soft success green
          },
          titleStyle: {
            fontSize: 15,
            fontWeight: "600",
            color: "#fff",
          },
          textBodyStyle: {
            fontSize: 13,
            color: "#E5E7EB",
          },
        });
        socket.emit("updateCustomerDetailsAdvance", response?.data?.getAdvanceCustomerDetailsArray);
      }
      else{
        const response = await axios.post(
          `${BASE_URL}/hotel/addCustomerDetailsAdvance/${advanceCustomerObj.id}`,
          advanceCustomerObj
        );
        // console.log("response in add obj advance is", response?.data);
        const formattedDate = formatDateForToast(currentDates);
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Booking Confirmed",
          textBody: `Room ${roomNo} for ${formattedDate}`,
          autoClose:10000,
          containerStyle: {
            borderRadius: 16,
            marginHorizontal: 20,
            paddingVertical: 12,
            backgroundColor: "#16A34A", // soft success green
          },
          titleStyle: {
            fontSize: 15,
            fontWeight: "600",
            color: "#fff",
          },
          textBodyStyle: {
            fontSize: 13,
            color: "#E5E7EB",
          },
        });
        socket.emit("addCustomerDetailsAdvance", response?.data?.getAdvanceCustomerDetailsArray);
      }
     }catch(error){
      console.error('error in app/update',error)
     }
     finally {
      setLoading(false);   // ✅ STOP LOADER (always runs)
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
{matchRoomResponseAdvance === false ? (
  profile?.post !== "Housekeeping Staff" && (
    <Text style={{ textAlign:'center', fontSize:16, fontWeight:'bold' }}>
 Enter Advance Guest Details
    </Text>
  )
) : showTextFieldAdvance === false ? (
  <Text style={{ textAlign:'center', fontSize:16, fontWeight:'bold' }}>
Advance Guest Summary
  </Text>
) : profile?.post !== "Housekeeping Staff" ? (
  <Text style={{ textAlign:'center', fontSize:16, fontWeight:'bold' }}>
 Update Advance Guest Details
  </Text>
) : (
  <Text style={{ textAlign:'center', fontSize:16, fontWeight:'bold' }}>
 Enter Advance Guest Details
  </Text>
)}
        {(matchRoomResponseAdvance === false || showTextFieldAdvance === true  )?
        <View style={{ flex: 1 }}>
          <ScrollView
                      contentContainerStyle={{
                        alignItems: "center",
                        padding: 20,
                      }}
                      keyboardShouldPersistTaps="handled"
                      style={{ flex: 1 }}
                    >
                       { profile?.post === "Housekeeping Staff"?<View style={{alignItems:"center",justifyContent:"center"}}>

<Image
source={accessImg} 
style={{width:50,height:50,marginBottom:15}}
resizeMode="contain"
/>

<Text style={{fontSize:16,fontWeight:"bold",marginBottom:6}}>
Access Restricted
</Text>

<Text style={{textAlign:"center",color:"#6B7280"}}>
Housekeeping staff can only view room status. Advance booking is not permitted.
</Text>

</View>:null}
                      {/* ---- TEXT INPUTS ---- */}
                     {profile?.post === "Housekeeping Staff"?null: <View>
                        <TextInput
                          label="Full Name"
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
                      </View>}

                     { profile?.post === "Housekeeping Staff"?null:<View>
                        <TextInput
                          label="Address"
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
                      </View>}

                      {profile?.post === "Housekeeping Staff"?null:<View>
                        <TextInput
                          label="Mobile Number"
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
                      </View>}

                      {values.customerPhoneNumber?.trim().length > 0?<View>
                        <TextInput
                          label="Email"
                          mode="outlined"
                          style={{
                            width: screenWidth * 0.75,
                            marginBottom: 10,
                          }}
                          onChangeText={handleChange("customerEmail")}
                          onBlur={handleBlur("customerEmail")}
                          value={values.customerEmail}
                        />
                        {touched.customerEmail &&
                          errors.customerEmail && (
                            <Text
                              style={{ color: "red", marginLeft: 12 }}
                            >
                              {errors.customerEmail}
                            </Text>
                          )}
                      </View>:null
  }

                      {values.customerPhoneNumber?.trim().length > 0 && (
                        <>
                          <View>
                            <TextInput
                              label="Total Amount"
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
                              label="Advance Paid"
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
                      {profile?.post === "Housekeeping Staff"?null:<View style={{ width: "50%" }}>
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
                          buttonColor="#007BFF"
                        >
                        {
                    loading?
                    <ActivityIndicator color="#fff" />
                    :'Book'
                   }
                        </Button>
                      </View>}
                      <View style={{ width: "50%",marginLeft:`${profile?.post === "Housekeeping Staff"?70:0}` }}>
                        <Button
                          mode="contained"
                          style={{
                            height: 50,
                            borderRadius: 11,
                            justifyContent: "center",
                            marginLeft: 12,
                            marginRight: 20,
                          }}
                          buttonColor="#6C757D"
                          onPress={() => {
                            setAdvanceAlert(false);
                            formikRef.current?.resetForm();
                          }}
                        >
                        {profile?.post === "Housekeeping Staff"?'Close':'Cancel'}
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
      <View style={{flexDirection:"row",gap:6,paddingTop:10,width: "100%",
    alignItems: "flex-start"}}>
        <Text>Full Name : </Text>
       <Text style={{ flex: 1,flexShrink: 1}}>{filterCustomerObjAdvance.customerName}</Text>
      </View>
      <View style={{flexDirection:"row",gap:6,paddingTop:15,width: "100%",
    alignItems: "flex-start"}}>
        <Text>Address : </Text>
       <Text style={{ flex: 1,flexShrink: 1}}>{filterCustomerObjAdvance.customerAddress}</Text>
      </View>
      <View style={{flexDirection:"row",gap:6,paddingTop:15}}>
        <Text>Mobile Number : </Text>
       <Text>{filterCustomerObjAdvance.customerPhoneNumber}</Text>
      </View>
      <View style={{flexDirection:"row",gap:6,paddingTop:15}}>
        <Text>Email : </Text>
       <Text>{filterCustomerObjAdvance.customerEmail}</Text>
      </View>
      <View style={{flexDirection:"row",gap:6,paddingTop:15}}>
        <Text>Total Amount : </Text>
       <Text>{filterCustomerObjAdvance.totalPayment}</Text>
      </View>
      <View style={{flexDirection:"row",gap:6,paddingTop:15}}>
        <Text>Advance Paid : </Text>
       <Text>{filterCustomerObjAdvance.advancePayment}</Text>
      </View>
      {todayDate===filterCustomerObjAdvance.selectedDate?
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      {profile?.post === "Housekeeping Staff"?null:<View style={{  overflow: 'hidden' }}>
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
                buttonColor="#007BFF"
                onPress={()=>deleteCustomerDetailsAdvance
                (filterCustomerObjAdvance?._id)}
              >
 Check In
              </Button>
    </View>}
    {profile?.post === "Housekeeping Staff"?null:<View style={{ width: '50%', overflow: 'hidden' }}>
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
                      buttonColor="#6C757D"
                      onPress={() => {
                        setAdvanceAlert(false)
                        formikRef.current?.resetForm(); // Form reset
                      }}
                    >
     Cancel
                    </Button>
          </View>}
          {profile?.post === "Housekeeping Staff"?<View style={{ width: '50%', overflow: 'hidden',marginLeft:70,marginTop:10 }}>
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
                      buttonColor="#6C757D"
                      onPress={() => {
                        setAdvanceAlert(false)
                        formikRef.current?.resetForm(); // Form reset
                      }}
                    >
     Close
                    </Button>
          </View>:null}
     </View> 
      
      
      :<View style={{flexDirection:'row',justifyContent:'space-between'}}>
      {/* {profile?.post === "Housekeeping Staff"?null:<View style={{ width: '50%', overflow: 'hidden' }}>
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
        </View>} */
        <View style={{ width: '50%', overflow: 'hidden',marginLeft:`${profile?.post === "Housekeeping Staff"?70:0}` }}>
        <Button
        mode="contained"
        style={{
          height: 50, // Set the desired height
          borderRadius:11,
          color: '#FFFFFF',
           fontSize: 16, 
           justifyContent:'center',
           marginTop:`${profile?.post === "Housekeeping Staff"?40:20}`,
           marginLeft: 12,
           marginRight: 20,
        }}
        buttonColor="#6C757D"
        onPress={() => {
          setAdvanceAlert(false)
          formikRef.current?.resetForm(); // Form reset
        }}
      >
Close
      </Button>
      </View>
        }
       {profile?.post === "Housekeeping Staff"?null:<View style={{ width: '50%', overflow: 'hidden' }}>
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
                      buttonColor="#DC3545"
                      onPress={()=>deleteCustomerDetailsAdvance(filterCustomerObjAdvance?._id,filterCustomerObjAdvance?.customerName,
                        filterCustomerObjAdvance?.selectedDate,filterCustomerObjAdvance?.customerPhoneNumber)}
                    >
          {
                    loading?
                    <ActivityIndicator color="#fff" />
                    :'Cancel'
                   }
                    </Button>
          </View>}
      </View>}
         {/* {todayDate===filterCustomerObjAdvance.selectedDate?null:<View style={{flexDirection:"row",justifyContent:'center'}}>
         <View style={{ width: '50%', overflow: 'hidden',marginTop:`${profile?.post === "Housekeeping Staff"?20:0}` }}>
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
                      buttonColor="#6C757D"
                      onPress={() => {
                        setAdvanceAlert(false)
                        formikRef.current?.resetForm(); // Form reset
                      }}
                    >
     Close
                    </Button>
          </View>
         </View>} */}
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