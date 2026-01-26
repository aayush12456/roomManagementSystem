import { View,Image,ScrollView,KeyboardAvoidingView, Platform,Text } from "react-native"
import { TextInput,Button } from 'react-native-paper';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import {Picker} from '@react-native-picker/picker';
import {  staffPostList } from "../../utils/signUpData";
import avatar from '../../../assets/AllIcons/avatar.png'
import * as ImagePicker from 'expo-image-picker';
import io from "socket.io-client";
import axios from "axios";
import { planScreenActions } from "../../Redux/Slice/planScreenSlice/planScreenSlice";
const socket = io.connect("http://192.168.29.169:4000")
// const socket = io.connect("https://roommanagementsystembackend-1.onrender.com")
const AddStaff=({profile,notifyTokenArray, hotelId,planStatus,paymentActiveSelector})=>{
  console.log('payment select',paymentActiveSelector)
  console.log('plan status',planStatus)
  const BASE_URL = "http://192.168.29.169:4000";
  // const BASE_URL = "https://roommanagementsystembackend-1.onrender.com";
  const dispatch=useDispatch()
  const hotelDetailSelector=useSelector((state)=>state.getHotelDetails.getHotelDetailsObj.hotelObj)
  const [staffName,setStaffName]=useState('')
  const [staffPhoneNumber,setStaffPhoneNumber]=useState('')
  const [staffAddress,setStaffAddress]=useState('')
  const [staffPost,setStaffPost]=useState('')
  const [staffImage,setStaffImage]=useState('')
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  
  const validate = () => {
    let newErrors = {};

    if (!staffName.trim()) {
      newErrors.staffName = "Staff Name is required";
    } else if (staffName.length < 6) {
      newErrors.staffName = "Staff Name must be at least 6 characters";
    }

    if (!staffPhoneNumber.trim()) {
      newErrors.staffPhone = "Phone Number is required";
    } else if (!/^\d{10}$/.test(staffPhoneNumber)) {
      newErrors.staffPhone = "Phone Number must be 10 digits";
    }

    if (!staffAddress.trim()) {
      newErrors.staffAddress = "Staff Address is required";
    }

    if (!staffPost) {
      newErrors.staffPost = "Staff Post is required";
    }
    if (!staffImage) {
      newErrors.staffImage = "Staff Image is required";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true agar koi error nahi hai
  };



  const uploadStaffImage = async () => {
    try {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert("Permission to access media library is required!");
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        setStaffImage(selectedImage.uri);
      } else {
        console.log('No image selected or operation canceled.');
      }
    } catch (error) {
      console.log('Error during image picking:', error);
    }
  };

  const addStaffHandler=async()=>{
    if (planStatus !== "free" && paymentActiveSelector.activeSubscription==null) {
      dispatch(planScreenActions.planScreenVisibleToggle())
      return
    }
    if (!validate()) return;
    const formData = new FormData()
    formData.append("staffName",staffName)
    formData.append("staffPhone",staffPhoneNumber)
    formData.append("staffAddress",staffAddress)
    formData.append("staffPost",staffPost)
    formData.append("hotelId",hotelDetailSelector?._id)
    if (staffImage) {
      const imageUri = staffImage;
        const fileName = imageUri.split("/").pop();
        const fileType = "image/jpeg"; // ya mime-type detect karlo
    
        formData.append("staffImg", {
          uri: imageUri,
          type: fileType,
          name: fileName,
        });
    }
    formData.append('personName',profile.name)
    formData.append('imgUrl',profile.image)
    formData.append('message','added new staff')
    console.log('form',formData)
    try {
      const response = await axios.post(
        `${BASE_URL}/hotel/addStaff`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response in staff", response.data);
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Staff Details Added Successfully",
        autoClose: 10000,
      });

        sendNotificationToAll();
      socket.emit('addStaffOwnerObj', response?.data)
    } catch (error) {
      console.error("Error in Add/Update Staff", error.message);
    }
    setStaffName('')
    setStaffAddress('')
    setStaffPhoneNumber('')
    setStaffImage('')
    setStaffPost('')
    setErrors({});
  }
  // const addStaffHandler = async () => {

  //   // 🔒 Subscription Check (Same)
  //   if (planStatus !== "trial" && paymentActiveSelector.activeSubscription == null) {
  //     dispatch(planScreenActions.planScreenVisibleToggle());
  //     return;
  //   }
  
  //   // ❌ Validation Check (Same)
  //   if (!validate()) return;
  
  //   // ✅ FormData (Same)
  //   const formData = new FormData();
  //   formData.append("staffName", staffName);
  //   formData.append("staffPhone", staffPhoneNumber);
  //   formData.append("staffAddress", staffAddress);
  //   formData.append("staffPost", staffPost);
  //   formData.append("hotelId", hotelDetailSelector?._id);
  
  //   if (staffImage) {
  //     const imageUri = staffImage;
  //     const fileName = imageUri.split("/").pop();
  //     const fileType = "image/jpeg";
  
  //     formData.append("staffImg", {
  //       uri: imageUri,
  //       type: fileType,
  //       name: fileName,
  //     });
  //   }
  
  //   formData.append("personName", profile.name);
  //   formData.append("imgUrl", profile.image);
  //   formData.append("message", "added new staff");
  
  //   console.log("form", formData);
  
  //   try {
  //     // ✅ MAIN API CALL (Same)
  //     const response = await axios.post(
  //       `${BASE_URL}/hotel/addStaff`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  
  //     console.log("response in staff", response.data);
  
  //     // ✅ FAST USER FEEL: Toast instantly
  //     Toast.show({
  //       type: ALERT_TYPE.SUCCESS,
  //       title: "Staff Details Added Successfully",
  //       autoClose: 3000,
  //     });
  
  //     // ✅ FAST USER FEEL: Form reset instantly
  //     setStaffName("");
  //     setStaffAddress("");
  //     setStaffPhoneNumber("");
  //     setStaffImage("");
  //     setStaffPost("");
  //     setErrors({});
  
  //     // ✅ Now heavy work same function ke andar chalega
  //     setTimeout(async () => {
  
  //       // 🔔 Notification (Same)
  //       await sendNotificationToAll();
  
  //       // 🔥 Socket Emit (Same)
  //       socket.emit("addStaffOwnerObj", response?.data);
  
  //     }, 300); // small delay so UI becomes fast
  
  //   } catch (error) {
  //     console.error("Error in Add/Update Staff", error.message);
  //   }
  // };
  
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
    const deadTokens = [];
    for (const chunk of tokenChunks) {
    const messages = chunk.map(token => ({
    to: token,
    sound: 'default',
    title: 'Profile Notification 🔔',
    body: `${profile?.name} added a new Staff 🚀`,
    data: {
      type: 'PROFILE_ADDED',
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
    const ticketIds = response.data.data
      .filter(item => item.status === "ok")
      .map(item => item.id);

      if (ticketIds.length > 0) {
const receiptRes = await axios.post(
          "https://exp.host/--/api/v2/push/getReceipts",
          { ids: ticketIds }
        );

        const receipts = receiptRes.data.data;
        Object.values(receipts).forEach((receipt, index) => {
          if (
            receipt.status === "error" &&
            receipt.details?.error === "DeviceNotRegistered"
          ) {
            const dead = chunk[index];   // EXACT SAME TOKEN
            deadTokens.push(dead);
          }
        });
      }
    }
    console.log('dead token',deadTokens)
    if (deadTokens.length > 0) {
   const deadResponse= await axios.post(
        `${BASE_URL}/hotel/deleteNotificationToken/${hotelId}`,
        {deadToken: deadTokens }
      );
      socket.emit('deleteNotificationToken', deadResponse.data)
      console.log("🗑 DEAD TOKENS REMOVED:", deadTokens);
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
 <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80} // adjust according to header height
    >
      <ScrollView
contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
keyboardShouldPersistTaps="handled"
>
    <View style={{marginTop:40}}>
    <View style={{ paddingHorizontal: 16 }}>
        <TextInput
          label="Staff Name"
          mode="outlined"
          onChangeText={(text) => setStaffName(text)}
          value={staffName}
        />
          {errors.staffName && <Text style={{ color: "red" }}>{errors.staffName}</Text>}
        </View>
        <View style={{ paddingHorizontal: 16,marginTop:12 }}>
        <TextInput
          label="Staff Phone Number"
          mode="outlined"
          keyboardType="phone-pad"
          onChangeText={(text) => setStaffPhoneNumber(text)}
          value={staffPhoneNumber}
        />
          {errors.staffPhone && <Text style={{ color: "red" }}>{errors.staffPhone}</Text>}
        </View>
        <View style={{ paddingHorizontal: 16,marginTop:12 }}>
        <TextInput
          label="Staff Address"
          mode="outlined"
          onChangeText={(text) => setStaffAddress(text)}
          value={staffAddress}
        />
         {errors.staffAddress && <Text style={{ color: "red" }}>{errors.staffAddress}</Text>}
        </View>
        <View style={{
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 8,
        backgroundColor: '#fff',
        overflow: 'hidden',
        marginTop:16,
        marginLeft:17,
        marginRight:17
      }}>
          <Picker
          selectedValue={staffPost}
          onValueChange={(itemValue) => setStaffPost(itemValue)}
        >
         {
          staffPostList.map((item)=>{
            return (
              <Picker.Item 
              key={item.value} 
              label={item.label} 
              value={item.value} 
              onValueChange={(itemValue) => setStaffPost(itemValue)}
            />
            )
          })
         }
        </Picker>
        </View>
        {errors.staffPost && (
            <Text style={{ color: "red", marginLeft: 20 }}>{errors.staffPost}</Text>
          )}
        <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
              <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                <Image
                  source={staffImage ? { uri: staffImage } : avatar}
                  style={{ width: 60, height: 60, borderRadius: 30 }}
                />
                <Button
                  mode="contained"
                  style={{
                    height: 40,
                    borderRadius: 11,
                    justifyContent: 'center',
                    marginTop: 2
                  }}
                  buttonColor="rgba(234, 88, 12, 1)"
                  onPress={uploadStaffImage}
                >
                  {staffImage ? "Change" : "Upload"}
                </Button>
              </View>
              {errors.staffImage && (
    <Text style={{ color: "red", marginTop: 8 }}>{errors.staffImage}</Text>
  )}
            </View>
        <View style={{ width: '100%', overflow: 'hidden' }}>
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
                      onPress={addStaffHandler}
                    >
           SUBMIT
                    </Button>
      </View>

    </View>
    </ScrollView>
    </KeyboardAvoidingView>

    </>
)
}
export default AddStaff

// import { View, Image, ScrollView, KeyboardAvoidingView, Platform, Text } from "react-native";
// import { TextInput, Button } from 'react-native-paper';
// import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
// import { useSelector } from "react-redux";
// import { useState } from "react";
// import { Picker } from '@react-native-picker/picker';
// import { staffPostList } from "../../utils/signUpData";
// import avatar from '../../../assets/AllIcons/avatar.png';
// import * as ImagePicker from 'expo-image-picker';
// import axios from "axios";

// const AddStaff = () => {
//   const BASE_URL = "http://192.168.29.169:4000";
//   const hotelDetailSelector = useSelector(
//     (state) => state.getHotelDetails.getHotelDetailsObj.hotelObj
//   );

//   const [staffName, setStaffName] = useState('');
//   const [staffPhoneNumber, setStaffPhoneNumber] = useState('');
//   const [staffAddress, setStaffAddress] = useState('');
//   const [staffPost, setStaffPost] = useState('');
//   const [staffImage, setStaffImage] = useState('');

//   // error states
//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     let newErrors = {};

//     if (!staffName.trim()) {
//       newErrors.staffName = "Staff name is required";
//     } else if (staffName.length < 6) {
//       newErrors.staffName = "Staff name must be at least 6 characters";
//     }

//     if (!staffPhoneNumber.trim()) {
//       newErrors.staffPhone = "Phone number is required";
//     } else if (!/^\d{10}$/.test(staffPhoneNumber)) {
//       newErrors.staffPhone = "Phone number must be 10 digits";
//     }

//     if (!staffAddress.trim()) {
//       newErrors.staffAddress = "Address is required";
//     }

//     if (!staffPost) {
//       newErrors.staffPost = "Staff post is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0; // true agar koi error nahi hai
//   };

//   const uploadStaffImage = async () => {
//     try {
//       let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (!permissionResult.granted) {
//         alert("Permission to access media library is required!");
//         return;
//       }

//       let result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 1,
//       });

//       if (!result.canceled && result.assets && result.assets.length > 0) {
//         const selectedImage = result.assets[0];
//         setStaffImage(selectedImage.uri);
//       }
//     } catch (error) {
//       console.log('Error during image picking:', error);
//     }
//   };

//   const addStaffHandler = async () => {
//     if (!validate()) return; // agar validation fail to stop karo

//     const formData = new FormData();
//     formData.append("staffName", staffName);
//     formData.append("staffPhone", staffPhoneNumber);
//     formData.append("staffAddress", staffAddress);
//     formData.append("staffPost", staffPost);
//     formData.append("hotelId", hotelDetailSelector?._id);

//     if (staffImage) {
//       const fileName = staffImage.split("/").pop();
//       const fileType = "image/jpeg";
//       formData.append("staffImg", {
//         uri: staffImage,
//         type: fileType,
//         name: fileName,
//       });
//     }

//     try {
//       const response = await axios.post(
//         `${BASE_URL}/hotel/addStaff`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       console.log("response in staff", response.data);
//       Toast.show({
//         type: ALERT_TYPE.SUCCESS,
//         title: "Staff Details Added Successfully",
//         autoClose: 10000,
//       });
//     } catch (error) {
//       console.error("Error in Add/Update Staff", error.message);
//     }

//     setStaffName('');
//     setStaffAddress('');
//     setStaffPhoneNumber('');
//     setStaffImage('');
//     setStaffPost('');
//     setErrors({});
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       keyboardVerticalOffset={80}
//     >
//       <ScrollView
//         contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
//         keyboardShouldPersistTaps="handled"
//       >
//         <View style={{ marginTop: 40 }}>
//           <View style={{ paddingHorizontal: 16 }}>
//             <TextInput
//               label="Staff Name"
//               mode="outlined"
//               onChangeText={(text) => setStaffName(text)}
//               value={staffName}
//             />
//             {errors.staffName && <Text style={{ color: "red" }}>{errors.staffName}</Text>}
//           </View>

//           <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
//             <TextInput
//               label="Staff Phone Number"
//               mode="outlined"
//               keyboardType="phone-pad"
//               onChangeText={(text) => setStaffPhoneNumber(text)}
//               value={staffPhoneNumber}
//             />
//             {errors.staffPhone && <Text style={{ color: "red" }}>{errors.staffPhone}</Text>}
//           </View>

//           <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
//             <TextInput
//               label="Staff Address"
//               mode="outlined"
//               onChangeText={(text) => setStaffAddress(text)}
//               value={staffAddress}
//             />
//             {errors.staffAddress && <Text style={{ color: "red" }}>{errors.staffAddress}</Text>}
//           </View>

//           <View
//             style={{
//               borderWidth: 1,
//               borderColor: "#888",
//               borderRadius: 8,
//               backgroundColor: "#fff",
//               overflow: "hidden",
//               marginTop: 16,
//               marginLeft: 17,
//               marginRight: 17,
//             }}
//           >
//             <Picker selectedValue={staffPost} onValueChange={(itemValue) => setStaffPost(itemValue)}>
//               <Picker.Item label="Select Staff Post" value="" />
//               {staffPostList.map((item) => (
//                 <Picker.Item key={item.value} label={item.label} value={item.value} />
//               ))}
//             </Picker>
//           </View>
//           {errors.staffPost && (
//             <Text style={{ color: "red", marginLeft: 20 }}>{errors.staffPost}</Text>
//           )}

//           <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
//             <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
//               <Image
//                 source={staffImage ? { uri: staffImage } : avatar}
//                 style={{ width: 60, height: 60, borderRadius: 30 }}
//               />
//               <Button
//                 mode="contained"
//                 style={{
//                   height: 40,
//                   borderRadius: 11,
//                   justifyContent: "center",
//                   marginTop: 2,
//                 }}
//                 buttonColor="rgba(234, 88, 12, 1)"
//                 onPress={uploadStaffImage}
//               >
//                 {staffImage ? "Change" : "Upload"}
//               </Button>
//             </View>
//           </View>

//           <View style={{ width: "100%", overflow: "hidden" }}>
//             <Button
//               mode="contained"
//               style={{
//                 height: 50,
//                 borderRadius: 11,
//                 marginTop: 20,
//                 marginLeft: 12,
//                 marginRight: 20,
//               }}
//               buttonColor="rgba(234, 88, 12, 1)"
//               onPress={addStaffHandler}
//             >
//               SUBMIT
//             </Button>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// export default AddStaff;
