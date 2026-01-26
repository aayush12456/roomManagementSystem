import { View,Image,ScrollView,KeyboardAvoidingView, Platform,Text } from "react-native"
import { TextInput,Button } from 'react-native-paper';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { useState } from "react";
import avatar from '../../../assets/AllIcons/avatar.png'
import io from "socket.io-client";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from "react-redux";
import { planScreenActions } from "../../Redux/Slice/planScreenSlice/planScreenSlice";
const socket = io.connect("http://192.168.29.169:4000")
// const socket = io.connect("https://roommanagementsystembackend-1.onrender.com")
const AddOwner=({hotelsId,profile,notifyTokenArray,planStatus,paymentActiveSelector})=>{
    const BASE_URL = "http://192.168.29.169:4000";
    // const BASE_URL = "https://roommanagementsystembackend-1.onrender.com";
    const dispatch=useDispatch()
    const [ownerName,setOwnerName]=useState('')
    const [ownerPhoneNumber,setOwnerPhoneNumber]=useState('')
    const [ownerAddress,setOwnerAddress]=useState('')
    const [ownerImage,setOwnerImage]=useState('')
    const [errors, setErrors] = useState({});

    const validate = () => {
      let newErrors = {};
  
      if (!ownerName.trim()) {
        newErrors.ownerName = "Owner Name is required";
      } else if (ownerName.length < 6) {
        newErrors.ownerName = "Owner Name must be at least 6 characters";
      }
  
      if (!ownerPhoneNumber.trim()) {
        newErrors.ownerPhone = "Phone Number is required";
      } else if (!/^\d{10}$/.test(ownerPhoneNumber)) {
        newErrors.ownerPhone = "Phone Number must be 10 digits";
      }
  
      if (!ownerAddress.trim()) {
        newErrors.ownerAddress = "Owner Address is required";
      }
      if (!ownerImage) {
        newErrors.ownerImage = "Owner Image is required";
      }
    
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0; // true agar koi error nahi hai
    };
  
  

    const uploadOwnerImage = async () => {
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
            quality: 1,
          });
    
          if (!result.canceled && result.assets && result.assets.length > 0) {
            const selectedImage = result.assets[0];
            setOwnerImage(selectedImage.uri);
          } else {
            console.log('No image selected or operation canceled.');
          }
        } catch (error) {
          console.log('Error during image picking:', error);
        }
      };

      const addOwnerHandler=async()=>{
        if (planStatus !== "free" && paymentActiveSelector.activeSubscription==null) {
          dispatch(planScreenActions.planScreenVisibleToggle())
          return
        }
        if (!validate()) return;
        const formData = new FormData()
        formData.append("ownerName",ownerName)
        formData.append("ownerPhone",ownerPhoneNumber)
        formData.append("ownerAddress",ownerAddress)
        formData.append("hotelId",hotelsId)
        if (ownerImage) {
          const imageUri = ownerImage;
            const fileName = imageUri.split("/").pop();
            const fileType = "image/jpeg"; // ya mime-type detect karlo
        
            formData.append("ownerImg", {
              uri: imageUri,
              type: fileType,
              name: fileName,
            });
            formData.append('personName',profile.name)
            formData.append('imgUrl',profile.image)
            formData.append('message','added new owner')
        }
        console.log('form',formData)
        try {
          const response = await axios.post(
            `${BASE_URL}/hotel/addOwner`,
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
            title: "Owner Details Added Successfully",
            autoClose: 10000,
          });
          sendNotificationToAll()
          socket.emit('addOwnerObj', response?.data)
        } catch (error) {
          console.error("Error in Add/Update Staff", error.message);
        }
        setOwnerName('')
        setOwnerAddress('')
        setOwnerPhoneNumber('')
        setOwnerImage('')
        setErrors({});
      }

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
        title: 'Profile Notification 🔔',
        body: `${profile?.name} added a new Owner 🚀`,
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
          label="Owner Name"
          mode="outlined"
          onChangeText={(text) => setOwnerName(text)}
          value={ownerName}
        />
          {errors.ownerName && <Text style={{ color: "red" }}>{errors.ownerName}</Text>}
        </View>
        <View style={{ paddingHorizontal: 16,marginTop:12 }}>
        <TextInput
          label="Owner Phone Number"
          mode="outlined"
          keyboardType="phone-pad"
          onChangeText={(text) => setOwnerPhoneNumber(text)}
          value={ownerPhoneNumber}
        />
          {errors.ownerPhone && <Text style={{ color: "red" }}>{errors.ownerPhone}</Text>}
        </View>
        <View style={{ paddingHorizontal: 16,marginTop:12 }}>
        <TextInput
          label="Owner Address"
          mode="outlined"
          onChangeText={(text) => setOwnerAddress(text)}
          value={ownerAddress}
        />
         {errors.ownerAddress && <Text style={{ color: "red" }}>{errors.ownerAddress}</Text>}
        </View>
       
        <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
              <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                <Image
                  source={ownerImage ? { uri: ownerImage } : avatar}
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
                  onPress={uploadOwnerImage}
                >
                  {ownerImage ? "Change" : "Upload"}
                </Button>
              </View>
              {errors.ownerImage && (
    <Text style={{ color: "red", marginTop: 8 }}>{errors.ownerImage}</Text>
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
                      onPress={addOwnerHandler}
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
export default AddOwner