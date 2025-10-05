import { Text ,TextInput,Button} from "react-native-paper"
import { View,Image,Pressable, ScrollView,KeyboardAvoidingView, Platform } from "react-native"
import { useState } from "react"
import editImg from '../../../assets/profileIcon/edit.png'
import * as ImagePicker from 'expo-image-picker';
import { Picker } from "@react-native-picker/picker";
import { staffPostList } from "../../utils/signUpData";
import { useNavigation } from "@react-navigation/native"
const EditStaffProfile=({editStaff})=>{
  const navigation=useNavigation()
    const [updateImage,setUpdateImage]=useState('')
    const [updateName,setUpdateName]=useState(editStaff?.name)
    const [updatePost,setUpdatePost]=useState(editStaff?.post)
    const [updatePhone,setUpdatePhone]=useState(editStaff?.phone)
    const [updateAddress,setUpdateAddress]=useState(editStaff?.address)
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
      const updateDataHandler=()=>{
        const formData = new FormData()
        formData.append("name",updateName)
        formData.append("phone",updatePhone)
        // formData.append("oldPhone",phoneNumber)
        formData.append("address",updateAddress)
        // formData.append("id",hotelDetailSelector?._id)
        // formData.append("staffId",staffId)
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
        console.log('form data',formData)
        // dispatch(updateMyProfileAsync(formData))
        navigation.goBack()
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
        label="Name"
        mode="outlined"
        value={updateName}
        onChangeText={(text) => setUpdateName(text)}
      />
    </View>

<View style={{ paddingHorizontal: 16, marginTop: 16 }}>
      <TextInput
        label="Phone Number"
        mode="outlined"
        value={updatePhone}
        onChangeText={(text) => setUpdatePhone(text)}
        keyboardType="phone-pad"
      />
    </View>

    <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
      <TextInput
        label="Address"
        mode="outlined"
        value={updateAddress}
        onChangeText={(text) => setUpdateAddress(text)}
      />
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
        <View style={{ padding: 20, marginTop: "auto" }}>
        <Button
          mode="contained"
          buttonColor="#28a745"
          style={{ borderRadius: 25, height: 50, paddingTop: 4, fontSize: 16 }}
          onPress={updateDataHandler}
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