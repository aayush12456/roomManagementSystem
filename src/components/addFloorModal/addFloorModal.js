import { View, Modal, Dimensions, ScrollView,ActivityIndicator } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Picker } from "@react-native-picker/picker";
import { roomType,bedType } from "../../utils/signUpData";
import {useDispatch} from 'react-redux'
import { addFloorAsync } from "../../Redux/Slice/addFloorSlice/addFloorSlice";
import axios from "axios"
import { getMessageNotifyAsync } from "../../Redux/Slice/getMessageNotifySlice/getMessageNotifySlice";
import { planScreenActions } from "../../Redux/Slice/planScreenSlice/planScreenSlice";
const screenWidth = Dimensions.get("window").width;

// ✅ Validation Schema
const floorSchema = Yup.object().shape({
  floorName: Yup.string().required("Floor Name is required"),
  totalRooms: Yup.number()
    .typeError("Enter a valid number")
    .required("Total Rooms is required")
    .min(1, "At least 1 room required"),
  roomDetails: Yup.array().of(
    Yup.object().shape({
      roomNumber: Yup.number()
        .typeError("Enter valid room number")
        .required("Room number is required")
        .min(1, "Room number must be greater than 0"),
      roomType: Yup.string().required("Select room type"),
      bedType: Yup.string().required("Select bed type"),
    })
  ),
});


const AddFloorModal = ({ floorAlert, setFloorAlert,hotelId,notifyTokenArray,profile,
  planStatus,paymentActiveSelector }) => {
  console.log('notify token in floor',notifyTokenArray)
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
    title: 'Floor Notification 🔔',
    body: `${profile?.name} added a new Floor 🚀`,
    data: {
      type: 'FLOOR_ADDED' },
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
    <Formik
      initialValues={{
        floorName: "",
        totalRooms: "",
        roomDetails: [],
      }}
      validationSchema={floorSchema}
      onSubmit={async(values,{ resetForm }) => {
        if (planStatus !== "free"&& paymentActiveSelector.activeSubscription==null) {
          dispatch(planScreenActions.planScreenVisibleToggle())
          return
        }
        if (loading) return; 
        setLoading(true); 
        const floorName = values.floorName?.trim();
      
        if (!floorName) {
          console.log("⚠️ Floor name missing");
          return;
        }
      
        const floorKey = floorName; // You can capitalize or format if needed
      
        const floorRooms = {};
      
        values.roomDetails.forEach((room, index) => {
          const roomKey = `${floorName} Room ${index + 1}`;
          floorRooms[roomKey] = {
            roomType: room.roomType,
            bedType: room.bedType,
            number: room.roomNumber,
          };
        });
      
        const finalData = {
          id:hotelId,
          [floorKey]: floorRooms,
          floorName:floorName,
          name:profile.name,
          imgUrl:profile.image,
          message:'added new floor'

        };
      
        console.log("✅ Final Submitted Data:", finalData);
        // setTimeout(() => {
        //   dispatch(addFloorAsync(finalData));
        // }, 100);
        // sendNotificationToAll()
        // setFloorAlert(false);
        // resetForm();

        
        try {
          // ✅ 1. Add floor (wait till backend finishes)
          await dispatch(addFloorAsync(finalData)).unwrap();
      
          // ✅ 2. Send push notification
          await sendNotificationToAll();
      
          // ✅ 3. 🔥 MOST IMPORTANT — refresh notification slice
          dispatch(getMessageNotifyAsync(hotelId));
      
          // ✅ 4. UI cleanup
          resetForm();
          setFloorAlert(false);
      
        } catch (error) {
          console.log("❌ Add floor error:", error);
        }
        finally {
          setLoading(false);   // ✅ STOP LOADER (always runs)
        } 
      }}
      
    >
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        submitCount,
        resetForm,
      }) => {
        // 🔁 Update roomDetails whenever totalRooms changes
        const total = parseInt(values.totalRooms) || 0;
        if (values.roomDetails.length !== total) {
          const newRoomDetails = Array.from({ length: total }, (_, i) => ({
            // roomNumber: i + 1,
            roomType: values.roomDetails[i]?.roomType || "",
            bedType: values.roomDetails[i]?.bedType || "",
          }));
          setFieldValue("roomDetails", newRoomDetails, false);
        }

        return (
          <Modal visible={floorAlert} transparent animationType="fade">
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
                <ScrollView
                  contentContainerStyle={{
                    padding: 20,
                    alignItems: "center",
                  }}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                >
                  {/* 🏢 Floor Name */}
                  <TextInput
                    label="Floor Name"
                    mode="outlined"
                    style={{ width: screenWidth * 0.75, marginBottom: 10 }}
                    onChangeText={handleChange("floorName")}
                    value={values.floorName}
                  />
                  {touched.floorName && errors.floorName && (
                    <Text style={{ color: "red" }}>{errors.floorName}</Text>
                  )}

                  {/* 🔢 Total Rooms */}
                  <TextInput
                    label="Total Rooms"
                    mode="outlined"
                    style={{ width: screenWidth * 0.75, marginBottom: 10 }}
                    onChangeText={handleChange("totalRooms")}
                    value={values.totalRooms?.toString()}
                    keyboardType="number-pad"
                  />
                  {touched.totalRooms && errors.totalRooms && (
                    <Text style={{ color: "red" }}>{errors.totalRooms}</Text>
                  )}

                  {/* 🏠 Dynamically Render Rooms */}
                  {values.roomDetails.map((room, index) => (
                    <View key={index} style={{ marginBottom: 15 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          marginBottom: 5,
                          textAlign:'left'
                        }}
                      >
                        {values.floorName
                          ? `${values.floorName} Room ${index + 1}`
                          : `Room ${index + 1}`}
                      </Text>

                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: "#888",
                          borderRadius: 8,
                          backgroundColor: "#fff",
                          overflow: "hidden",
                          width: screenWidth * 0.75,
                        }}
                      >
                        <Picker
                          selectedValue={room.roomType}
                          onValueChange={(itemValue) => {
                            const updated = [...values.roomDetails];
                            updated[index].roomType = itemValue;
                            setFieldValue("roomDetails", updated);
                            setFieldTouched(`roomDetails[${index}].roomType`, true, false);
                          }}
                        >
                          {roomType.map((r) => (
                            <Picker.Item
                              key={r.value}
                              label={r.label}
                              value={r.value}
                            />
                          ))}
                        </Picker>
                      </View>

                      {touched.roomDetails?.[index]?.roomType && errors.roomDetails?.[index]?.roomType && (
  <Text style={{ color: "red" }}>{errors.roomDetails[index].roomType}</Text>
)}
                         <View
                        style={{
                          borderWidth: 1,
                          borderColor: "#888",
                          borderRadius: 8,
                          backgroundColor: "#fff",
                          marginTop:12
                        }}
                      >
                        <Picker
                          selectedValue={room.bedType}
                          onValueChange={(itemValue) => {
                            const updated = [...values.roomDetails];
                            updated[index].bedType = itemValue;
                            setFieldValue("roomDetails", updated);
                            setFieldTouched(`roomDetails[${index}].bedType`, true, false);
                          }}
                        >
                          {bedType.map((b) => (
                            <Picker.Item
                              key={b.value}
                              label={b.label}
                              value={b.value}
                            />
                          ))}
                        </Picker>
                      </View>
                  
{touched.roomDetails?.[index]?.bedType && errors.roomDetails?.[index]?.bedType && (
  <Text style={{ color: "red" }}>{errors.roomDetails[index].bedType}</Text>
)}
                         <TextInput
                    label="Room Number"
                    mode="outlined"
                    style={{ width: screenWidth * 0.75, marginBottom: 10,marginTop:5 }}
                    keyboardType="number-pad"
                    value={room.roomNumber?.toString()}
                    onChangeText={(text) => {
                      const updated = [...values.roomDetails];
                      updated[index].roomNumber = text;
                      setFieldValue("roomDetails", updated);
                    }}
                    onBlur={() => setFieldTouched(`roomDetails[${index}].roomNumber`, true, false)}
                  />
                 {(touched.roomDetails?.[index]?.roomNumber || submitCount > 0) &&
 errors.roomDetails?.[index]?.roomNumber && (
  <Text style={{ color: "red" }}>{errors.roomDetails[index].roomNumber}</Text>
)}
                    </View>

                    
                  ))}

                  
                </ScrollView>

                {/* 🚪 Buttons */}
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 20,
                  }}
                >
                  <Button
                    mode="outlined"
                    onPress={() => {
                      resetForm(); // 🧹 Clear form before closing
                      setFloorAlert(false);
                    }}
                    style={{
                      borderRadius: 10,
                      width: "40%",
                      height: 45,
                      justifyContent: "center",
                    }}
                  >
                    Close
                  </Button>

                  <Button
                    mode="contained"
                    buttonColor="rgba(234, 88, 12, 1)"
                    onPress={handleSubmit}
                    style={{
                      borderRadius: 10,
                      width: "40%",
                      height: 45,
                      justifyContent: "center",
                    }}
                  >
                    {
                    loading?
                    <ActivityIndicator color="#fff" />
                    :'Submit'
                   }
                  </Button>
                </View>
              </View>
            </View>
          </Modal>
        );
      }}
    </Formik>
  );
};

export default AddFloorModal;
