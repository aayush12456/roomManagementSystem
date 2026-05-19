import { View,ScrollView,KeyboardAvoidingView, Platform,Text,ActivityIndicator} from "react-native"
import { TextInput,Button } from 'react-native-paper';
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { replyMailAsync, replyMailData } from "../../Redux/Slice/replyMailSlice/replyMailSlice";
const Reply=({profile,hotelName,hotelId,})=>{
  const dispatch=useDispatch()
  const [loading, setLoading] = useState(false);
  const [message,setMessage]=useState('')
  const replySelector=useSelector((state)=>state.replyMail.replyMailObj )
  useEffect(() => {
    if (replySelector?.mssg === "Reply sent successfully") {
  
      setLoading(false);  // ✅ loader stop
      setMessage('');     // ✅ message clear (IMPORTANT)
  
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: `Email sent successfully`,
        autoClose: 3000,
      });
  
      setTimeout(() => {
        dispatch(replyMailData());
      }, 3000);
    }
  
    // ❌ Error case handle (recommended)
    if (replySelector?.mssg === "Reply failed") {
      setLoading(false);
    }
  
  }, [replySelector?.mssg]);

  const sendMessageHandler=(profile)=>{
    setLoading(true); 
  
const sendMessageObj={
  id:hotelId,
  email:profile.email,
  message:message,
  name:profile.name,
  hotelNames:hotelName

}
// console.log('send mess',sendMessageObj)
dispatch(replyMailAsync(sendMessageObj))
  }
return (
    <>
   
             <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0} // adjust according to header height
    >
            <ScrollView contentContainerStyle={{ flexGrow: 1,  }}
keyboardShouldPersistTaps="handled">
            <View style={{marginTop:40}}>
        
      <View style={{ paddingHorizontal:16,marginTop:12 }}>
      <TextInput
  label="Message"
  mode="outlined"
  multiline
  numberOfLines={5}
  style={{
    height: 120,
    marginTop: 10,
    textAlignVertical: 'top'
  }}
          onChangeText={(text) => setMessage(text)}
          value={message}
/>
      </View>
      <View style={{ width: '100%', overflow: 'hidden' }}>
<Button
  mode="contained"
  disabled={loading}
  style={{
    height: 50,
    borderRadius: 11,
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 12,
    fontSize: 16,
    marginRight: 20,
    backgroundColor: "#007BFF", // force color
    // opacity:loading ? 0.8 : 1, // disabled feel
  }}
  contentStyle={{ height: 50 }}
  onPress={()=>sendMessageHandler(profile)}
>
  {loading ? (
    <View style={{ flexDirection: "row", alignItems: "center",gap:4 }}>
<ActivityIndicator size="small" color="#ffffff" style={{marginLeft:-12}} />
      <Text style={{ color: "#ffffff",textAlign:'center',fontWeight:'600' }}>sending...</Text>
    </View>
  ) : (
    "Send Message"
  )}
</Button>

      </View>
         </View>
            </ScrollView>
         
            </KeyboardAvoidingView>

            </>
        )}


export default Reply