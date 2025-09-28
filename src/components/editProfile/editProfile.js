import { Text ,TextInput,Button} from "react-native-paper"
import { View,Image,Pressable } from "react-native"
import editImg from '../../../assets/profileIcon/edit.png'
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react"
const EditProfile=({edit})=>{
    console.log('edit is',edit)
    const [updatePhone,setUpdatePhone]=useState('')
    const [updateImage,setUpdateImage]=useState('')
    const [updateAddress,setUpdateAddress]=useState('')
    const profileImage=edit?.params?.formData?.image
    const name=edit?.params?.formData?.name
    const phoneNumber=edit?.params?.formData?.phone
    const address=edit?.params?.formData?.address
    
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
  
    console.log('update',updatePhone)

    const updateDataHandler=()=>{
      const formData = new FormData()
      formData.append("updateName",name)
      formData.append("updatePhone",updatePhone?updatePhone:phoneNumber)
      formData.append("updateAddress",updateAddress?updateAddress:address)
      formData.append("updatePost","Owner")
      formData.append("updateImg",updateImage)
      console.log('form data',formData)
    }
return (
    <>
 <View style={{marginTop:40}}>
  <Pressable onPress={imageClickHandler}>
  <View style={{ alignItems: "center", marginBottom: 5 }}>
  <View>
    <Image
      source={{ uri: profileImage }}
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


        <View style={{
  paddingHorizontal: 16,
  marginTop: 16
}}>
  <View
    style={{
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 4,
      padding: 12,
      backgroundColor: "#fff"
    }}
  >
    <Text style={{ fontSize: 16, color: "#000" }}>
      { name}
    </Text>
  </View>
</View>

<View style={{ paddingHorizontal: 16, marginTop: 16 }}>
      <TextInput
        label="Phone Number"
        mode="outlined"
        value={updatePhone || phoneNumber}
        onChangeText={(text) => setUpdatePhone(text)}
        keyboardType="phone-pad"
      />
    </View>

    <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
      <TextInput
        label="Address"
        mode="outlined"
        value={updateAddress || address}
        onChangeText={(text) => setUpdateAddress(text)}
      />
    </View>


        
        <View style={{
  paddingHorizontal: 16,
  marginTop: 16
}}>
  <View
    style={{
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 4,
      padding: 12,
      backgroundColor: "#fff"
    }}
  >
    <Text style={{ fontSize: 16, color: "#000" }}>
      { "Owner"}
    </Text>
  </View>
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
 </View>
    </>
)
}
export default EditProfile