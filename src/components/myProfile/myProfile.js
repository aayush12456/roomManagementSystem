import {Card, Text,Button } from "react-native-paper"
import { Image,View,Pressable,StatusBar } from "react-native"
import phone from '../../../assets/profileIcon/phone.png'
import location from '../../../assets/profileIcon/location.png'
import edit from '../../../assets/profileIcon/edit.png'
import designation from '../../../assets/profileIcon/designation.png'
import { useNavigation } from "@react-navigation/native"
const MyProfile=({profiles})=>{
    const navigation=useNavigation()
    const editProfileHandler=()=>{
    navigation.navigate('EditProfilePage',{formData:profiles,heading:'Edit Profile'})
    }
return (
    <>
    <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        {/* <Card style={{ borderRadius: 6,marginLeft:6,marginRight:6,marginTop:50 }}> */}
         <Pressable onPress={editProfileHandler}>
         <View style={{ flexDirection: 'row', justifyContent: 'flex-end',marginRight:22 }}>
         <Image source={edit} style={{marginTop:15}} />
        </View>
            </Pressable>   
            <View style={{marginTop:10}}>
            <View style={{alignItems:"center",marginBottom:5}}>
        <Image
          source={{ uri: profiles?.image }}
          style={{
            width: 130,
            height: 130,
            borderRadius: 85,
          }}
        />
        <Text style={{color: "black", fontSize:18,fontWeight:"700",textAlign:'center',paddingTop:9}}>{profiles?.name}</Text>
        </View>

        <View
          style={{
            height: 1,
            backgroundColor: "#ccc",
            marginHorizontal: 15,
            marginBottom: 10,
            marginTop:9
          }}
        />
        <View>
            <View style={{flexDirection:"row",gap:25,marginLeft:42,marginRight:42,marginTop:5}}>
              <Image source={phone} style={{ width: 18, height:18 }}/>
              <Text style={{fontSize:15}}>{profiles?.phone}</Text>
            </View>

            <View
          style={{
            height: 1,
            backgroundColor: "#ccc",
            marginHorizontal: 15,
            marginBottom: 10,
            marginTop:15
          }}
        />

            <View style={{flexDirection:"row",gap:25,justifyContent:'space-between',marginTop:5,marginLeft:42,marginRight:42,marginBottom:40}}>
              <Image source={location} style={{ width: 18, height:18 }}/>
              <Text style={{fontSize:15}}>{profiles?.address}</Text>
            </View>

            <View
          style={{
            height: 1,
            backgroundColor: "#ccc",
            marginHorizontal: 15,
            marginBottom: 10,
            marginTop:-20
          }}
        />

<View style={{flexDirection:"row",gap:25,marginLeft:42,marginRight:42}}>
              <Image source={designation} style={{ width: 25, height:25 }}/>
             {!profiles?.post? <Text style={{fontSize:15}}>Owner</Text>
             :
             <Text style={{fontSize:15}}>{profiles?.post}</Text>
            }
            </View>

            <View
          style={{
            height: 1,
            backgroundColor: "#ccc",
            marginHorizontal: 15,
            marginBottom: 10,
            marginTop:12
          }}
        />


        </View>
            </View>
       
        {/* </Card> */}
    </>
)
}
export default MyProfile