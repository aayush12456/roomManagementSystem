import { Image,View } from "react-native"
import { Text,Button } from "react-native-paper"
import phone from '../../../assets/profileIcon/phone.png'
import location from '../../../assets/profileIcon/location.png'
import mail from '../../../assets/settingIcon/mail.png'
import {Picker} from '@react-native-picker/picker';
import io from "socket.io-client";
import axios from "axios";
import { useState,useEffect } from "react"
const socket = io.connect("http://192.168.29.169:4000")
// const socket = io.connect("https://roommanagementsystembackend-1.onrender.com")
const Access=({profile,hotelName,hotelId})=>{
    const BASE_URL = "http://192.168.29.169:4000";
    // const BASE_URL = "https://roommanagementsystembackend-1.onrender.com";
    const [amount, setAmount] = useState(null);
    const [accessObj,setAccessObj]=useState({})
    const [accessDataObj,setAccessDataObj]=useState({})
    const accessHandler=async(profile,hotelId,hotelName)=>{
        const accessObj={
            id:hotelId,
            hotelName:hotelName,
            name:profile.name,
            phoneNumber:profile.phone,
            amounts:`₹${amount}`
        }
        // console.log('access ds',accessObj)
        try {
            const response = await axios.post(
              `${BASE_URL}/hotel/accessAmount/${accessObj.id}`,
              accessObj ,
            );
            // console.log("response in amount", response.data);
           
            socket.emit('accessAmount', response?.data)
          } catch (error) {
            console.error("Error in Add/Update Staff", error.message);
          }
    }


    useEffect(() => {
      const fetchAccessHandler = async () => {
        try {
          if (hotelId) {
            const response = await axios.get(
              `${BASE_URL}/hotel/getAccessAmount/${hotelId}`
            );
            setAccessObj(response?.data);
          }
        } catch (error) {}
      };
  
      fetchAccessHandler();
  
      socket.on("getAccessAmount", (newUser) => {
        setAccessObj(newUser);
      });
  
      return () => {
        socket.off("getAccessAmount");
      };
    }, [hotelId]);
// console.log('Access obj',accessObj)

useEffect(()=>{
  if(accessObj?.accessData?.length>0){
  const finalAccessObj=accessObj?.accessData.filter((access)=>access.hotelId==hotelId && access.phone==profile.phone)
  setAccessDataObj(finalAccessObj)
  }
},[accessObj,hotelId,profile])

// console.log('access data',accessDataObj)
const showAccessObj=accessDataObj[0]
// console.log('show access objs',showAccessObj)

const revokeAccessHandler=async(id)=>{
  try {
      const response = await axios.post(
        `${BASE_URL}/hotel/revokeAccessAmount/${id}`,
        accessObj ,
      );
      // console.log("response in amount", response.data);
     
      socket.emit('deleteAccessAmount', response?.data)
    } catch (error) {
      console.error("Error in Add/Update Staff", error.message);
    }
}

const formattedAmount = showAccessObj?.amount
  ? showAccessObj.amount.replace("₹", "")
  : "";
return (
    <>

     <View style={{alignItems:"center",marginBottom:5}}>
        <Image
          source={{ uri: profile?.image }}
          style={{
            width: 130,
            height: 130,
            borderRadius: 85,
          }}
        />
        <Text style={{color: "black", fontSize:18,fontWeight:"700",textAlign:'center',paddingTop:9}}>{profile?.name}</Text>
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
            <View style={{flexDirection:"row",gap:25,marginLeft:42,marginRight:42,marginTop:5}}>
              <Image source={phone} style={{ width: 18, height:18 }}/>
              <Text style={{fontSize:15}}>{profile?.phone}</Text>
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

            <View style={{flexDirection:"row",gap:25,marginTop:5,marginLeft:42,marginRight:42,marginBottom:40}}>
              <Image source={location} style={{ width: 18, height:18 }}/>
              <Text style={{fontSize:15}}>{profile?.address}</Text>
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
          <View style={{flexDirection:"row",gap:25,marginTop:5,marginLeft:42,marginRight:42,marginBottom:40}}>
              <Image source={mail} style={{ width: 18, height:18 }}/>
              <Text style={{fontSize:15}}>{profile?.email}</Text>
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
<View
  style={{
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
    overflow: "hidden",
    height: 50,              // 👈 IMPORTANT
    justifyContent: "center", // 👈 center align
    marginLeft:20,
    marginRight:20,
    marginTop:10
  }}
>
  <Picker
    selectedValue={amount || formattedAmount}
    onValueChange={(itemValue) => setAmount(itemValue)}
    style={{ height: 50, width: "100%" }} // 👈 IMPORTANT
  >
    <Picker.Item label="Select Amount" value="" />
    <Picker.Item label="₹1" value="1" />
    <Picker.Item label="₹21" value="21" />
  </Picker>
</View>
          <View style={{ width: '100%', overflow: 'hidden' }}>
         {showAccessObj?
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
            backgroundColor: "red",
         }}
         contentStyle={{ height: 50 }}
         onPress={()=>revokeAccessHandler(showAccessObj._id)}
       >
     Revoke  Access

       </Button>:
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
                         backgroundColor: "#007BFF",
                      }}
                      contentStyle={{ height: 50 }}
                      onPress={()=>accessHandler(profile,hotelId,hotelName)}
                    >
                    Access
         
                    </Button>}
      </View>
    </>
)
}
export default Access