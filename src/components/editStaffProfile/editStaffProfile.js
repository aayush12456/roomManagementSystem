import { Text ,TextInput,Button} from "react-native-paper"
import { View,Image,Pressable, ScrollView,KeyboardAvoidingView, Platform } from "react-native"
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { useState } from "react"
import editImg from '../../../assets/profileIcon/edit.png'
import * as ImagePicker from 'expo-image-picker';
import { Picker } from "@react-native-picker/picker";
import { staffPostList } from "../../utils/signUpData";
import { useNavigation } from "@react-navigation/native"
import io from "socket.io-client";
import axios from "axios";

const socket = io.connect("http://192.168.29.169:4000")
const EditStaffProfile=({editStaff,hotelId})=>{
  console.log('hotelId staff',hotelId)
  const BASE_URL = "http://192.168.29.169:4000";
  const navigation=useNavigation()
    const [updateImage,setUpdateImage]=useState('')
    const [updateName,setUpdateName]=useState(editStaff?.name)
    const [updatePost,setUpdatePost]=useState(editStaff?.post)
    const [updatePhone,setUpdatePhone]=useState(editStaff?.phone)
    const [updateAddress,setUpdateAddress]=useState(editStaff?.address)
    const [errors, setErrors] = useState({});

    const validate = () => {
      let newErrors = {};
    
      if (!updateName?.trim()) {
        newErrors.staffName = "Staff Name is required";
      } else if (updateName.length < 6) {
        newErrors.staffName = "Staff Name must be at least 6 characters";
      }
    
      if (!updatePhone?.trim()) {
        newErrors.staffPhone = "Staff Phone Number is required";
      } else if (!/^\d{10}$/.test(updatePhone)) {
        newErrors.staffPhone = "Staff Phone Number must be 10 digits";
      }
    
      if (!updateAddress?.trim()) {
        newErrors.staffAddress = "Staff Address is required";
      }
    
      if (!updatePost) {
        newErrors.staffPost = "Staff Post is required";
      }
    
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    

    const imageClickHandler = async () => {
        try {
          const maxFileSize = 5 * 1024 * 1024; // 5MB
      
          let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
          if (!permissionResult.granted) {
            alert("Permission to access media library is required!");
            return;
          }
      
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // 👈 only images
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
      
          if (!result.canceled && result.assets && result.assets.length > 0) {
            const selectedImage = result.assets[0];
            console.log('selct image',selectedImage)
            setUpdateImage(selectedImage.uri)
           
          } else {
            console.log('No image selected or operation canceled.');
          }
        } catch (error) {
          console.log('Error during image picking:', error);
        }
      };
      const updateDataHandler=async(staffId)=>{
        if (!validate()) return;
        const formData = new FormData()
        formData.append("staffName",updateName)
        formData.append("staffPhone",updatePhone)
        formData.append("staffAddress",updateAddress)
        formData.append("staffPost",updatePost)
        formData.append("hotelId",hotelId)
        formData.append("staffId",staffId)
        if (updateImage) {
          const imageUri = updateImage;
          const fileName = imageUri.split("/").pop();
          const fileType = "image/jpeg"; // ya mime-type detect karlo
      
          formData.append("updateImg", {
            uri: imageUri,
            type: fileType,
            name: fileName,
          });
        }
        console.log('form data in staff',formData)
        try {
          const response = await axios.post(
            `${BASE_URL}/hotel/updateStaff`,
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
            title: "Staff Details Updated Successfully",
            autoClose: 10000,
          });
          socket.emit('updateStaffOwnerObj', response?.data)
        } catch (error) {
          console.error("Error in Add/Update Staff", error.message);
        }
        navigation.goBack()
        setErrors({});
      }
return (
    <>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80} // adjust according to header height
    >
         <View style={{marginTop:40}}>
         <Pressable onPress={imageClickHandler}>
  <View style={{ alignItems: "center", marginBottom: 5 }}>
  <View>
    <Image
      source={{ uri: editStaff?.image }}
      style={{
        width: 130,
        height: 130,
        borderRadius: 65, // 130 ka half
      }}
    />

    {/* Edit Icon Circle */}
    <View
      style={{
        position: "absolute",
        bottom: 10,
        right: 0,
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image source={editImg} style={{ width: 20, height: 20, tintColor: "white" }} />
    </View>
  </View>
</View>
  </Pressable>
  <ScrollView
contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
keyboardShouldPersistTaps="handled"
>
<View style={{ paddingHorizontal: 16, marginTop: 16 }}>
      <TextInput
        label="Staff Name"
        mode="outlined"
        value={updateName}
        onChangeText={(text) => setUpdateName(text)}
      />
      {errors.staffName && <Text style={{ color: "red" }}>{errors.staffName}</Text>}
    </View>

<View style={{ paddingHorizontal: 16, marginTop: 16 }}>
      <TextInput
        label="Staff Phone Number"
        mode="outlined"
        value={updatePhone}
        onChangeText={(text) => setUpdatePhone(text)}
        keyboardType="phone-pad"
      />
      {errors.staffPhone && <Text style={{ color: "red" }}>{errors.staffPhone}</Text>}
    </View>

    <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
      <TextInput
        label="Staff Address"
        mode="outlined"
        value={updateAddress}
        onChangeText={(text) => setUpdateAddress(text)}
      />
      {errors.staffAddress && <Text style={{ color: "red" }}>{errors.staffAddress}</Text>}
    </View>
    {/* <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
      <TextInput
        label="Post"
        mode="outlined"
        value={updatePost}
        onChangeText={(text) => setUpdatePost(text)}
      />
    </View> */}
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
         selectedValue={updatePost} // ✅ show current selected designation
         onValueChange={(itemValue) => setUpdatePost(itemValue)}
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
        <View style={{ padding: 20, marginTop: "auto" }}>
        <Button
          mode="contained"
          buttonColor="#28a745"
          style={{ borderRadius: 25, height: 50, paddingTop: 4, fontSize: 16 }}
          onPress={()=>updateDataHandler(editStaff?._id)}
        >
Update
        </Button>
      </View>
</ScrollView>
         </View>
    </KeyboardAvoidingView>
    </>
)
}
export default EditStaffProfile