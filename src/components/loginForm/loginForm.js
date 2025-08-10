import { SafeAreaView } from 'react-native-safe-area-context';
import LoginImage from "../common/loginImage/loginImage"
import signUpImg from '../../../assets/AllIcons/signupImg.png'
import Modal from 'react-native-modal';
import { TextInput,Button } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { View,Text,Image,KeyboardAvoidingView, Platform, Keyboard, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useDispatch,useSelector} from 'react-redux'
import { useState,useEffect } from 'react';
import { getHotelNameAsync } from '../../Redux/Slice/getHotelNameSlice/getHotelNameSlice';
import { clearHotelNameData } from '../../Redux/Slice/getHotelNameSlice/getHotelNameSlice';
import { clearPhoneOtpData, getPhoneOtpAsync } from '../../Redux/Slice/getPhoneOtpSlice/getPhoneOtpSlice';
const LoginForm=()=>{
  const phoneNameSelectorObj=useSelector((state)=>state?.getHotelNameData?.getHotelNameObj)
  const getPhoneOtpSelectorObj=useSelector((state)=>state.getPhoneOtpData.getPhoneOtpObj)
  console.log('get phone otp',getPhoneOtpSelectorObj)
    const [phoneNumber,setPhoneNumber]=useState('')
    const [isModalVisible, setModalVisible] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [phoneNameObj,setPhoneNameObj]=useState('')
    const [hotelName,setHotelName]=useState('')
    const navigation = useNavigation();
    const dispatch=useDispatch()
    console.log('phone name selector',phoneNameSelectorObj)
   
    useEffect(() => {
      if (phoneNameSelectorObj) {
        setPhoneNameObj(phoneNameSelectorObj);
      }
    }, [phoneNameSelectorObj]);

    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => setKeyboardVisible(true)
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => setKeyboardVisible(false)
      );
  
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);

    useEffect(() => {
      const saveOtpDataToSecureStore = async () => {
        try {
          await SecureStore.setItemAsync(
            'otpData',
            JSON.stringify(getPhoneOtpSelectorObj)
          );
          console.log('OTP data saved to SecureStore');
        } catch (error) {
          console.error('Error saving to SecureStore:', error);
        }
      };
    
      if (getPhoneOtpSelectorObj?.mssg === "otp send Successfully") {
        saveOtpDataToSecureStore(); // ✅ Save to SecureStore
        dispatch(clearHotelNameData()); // Clear the hotel name object
        dispatch(clearPhoneOtpData())
        navigation.navigate('GetOtpPage',{ formData:hotelName });
      }
    }, [getPhoneOtpSelectorObj]);
    
    
    useEffect(() => {
      if (phoneNameObj.mssg==="get hotel name") {
        setModalVisible(true);
      } else {
        setModalVisible(false);
      }
    }, [phoneNameObj]);
    const signUpHandler=()=>{
        navigation.navigate('SignUpPage')
    }
    const loginHandler=()=>{
    const phoneObj={
      phone:phoneNumber
    }
    dispatch(getHotelNameAsync(phoneObj))
    }
  
    const hotelClickHandler=(phone)=>{
      setHotelName(phone)
    const phoneObj={
      phone:phoneNumber
    }
    dispatch(getPhoneOtpAsync(phoneObj))
    }
return (
    <>
       <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
<SafeAreaView style={{ flex: 1 }}>
<LoginImage/>
<ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
          keyboardShouldPersistTaps="handled"
        >
<View style={{ paddingHorizontal: 16 }}>
        <TextInput
          label="Enter your registered mobile number  "
          mode="outlined"
          onChangeText={(text)=>setPhoneNumber(text)}
          keyboardType="phone-pad"   // ← shows number keypad
  maxLength={10}             // optional, restrict to 10 digits
  returnKeyType="done" 
        />
      </View> 
      <View style={{ width: '100%', overflow: 'hidden' }}>
         <Button
                      mode="contained"
                      style={{
                        height: 50, // Set the desired height
                        borderRadius:23,
                        color: '#FFFFFF',
                         fontSize: 16, 
                         justifyContent:'center',
                         marginTop: 24,
                         marginLeft: 12,
                         marginRight: 20,
                      }}
                      buttonColor="rgba(234, 88, 12, 1)"
                      onPress={loginHandler}
                    >
           SEND OTP
                    </Button>
      </View>
      <View>
        <Text style={{textAlign:'center',paddingTop:16}}>Don't have an account?</Text>
      </View>
      <View style={{flexDirection:'row', gap:6,marginTop:0,}}>
      <View>
        <Image source={signUpImg} style={{width:80,height:80,marginLeft:12}}/>
      </View>
      <View style={{width:'70%'}} >
         <Button
                      mode="contained"
                      style={{
                        height: 50, // Set the desired height
                        borderRadius:23,
                        color: '#FFFFFF',
                         fontSize: 16, 
                         justifyContent:'center',
                         marginLeft: 12,
                         marginTop:12,
                         marginRight: 20,
                      }}
                      buttonColor="rgba(234, 88, 12, 1)"
                      onPress={signUpHandler}
                    >
           SIGN UP
                    </Button>
      </View>
      </View>
      </ScrollView>
      <View>
      <Modal isVisible={isModalVisible}  
       onBackdropPress={() =>{ setModalVisible(false) ,dispatch(clearHotelNameData())}}
       animationIn="slideInUp"
       animationOut="slideOutDown"
       animationInTiming={500} // You can adjust for slower animation
       animationOutTiming={800}
       backdropTransitionInTiming={500}
       backdropTransitionOutTiming={800}
       useNativeDriver={true}
       
       >
          <View style={{
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
           {phoneNameObj?.matchedNames?.length>0?<Text style={{ fontSize: 18, fontWeight: '800' }}>
             Your Hotel Name:
            </Text>:null}
            <ScrollView>
            {
                  phoneNameObj?.matchedNames?.length>0? phoneNameObj?.matchedNames?.map((hotelName,index)=>{
                return (
                 <View key={hotelName}>
                  <Text style={{ marginTop: 10,fontSize:16 }} onPress={()=>hotelClickHandler(hotelName)}>
                  {hotelName}
                </Text>
                </View>
                )
              }):
              <Text style={{ marginTop: 10 ,fontSize:14,textAlign:'center'}}>
          No phone number registered in any hotel
            </Text>
            }
            </ScrollView>
            <Button
              mode="outlined"
              onPress={() => {setModalVisible(false),setPhoneNameObj({}),dispatch(clearHotelNameData())}}
              style={{ marginTop: 20 }}
            >
              Close
            </Button>
          </View>
        </Modal>
      </View>
</SafeAreaView>
</KeyboardAvoidingView>
    </>
)
}
export default LoginForm