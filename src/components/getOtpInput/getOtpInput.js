import { SafeAreaView } from 'react-native-safe-area-context';
import { OtpInput } from "react-native-otp-entry";
import { View,Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import LoginImage from '../common/loginImage/loginImage';
import * as SecureStore from 'expo-secure-store';
import { useEffect,useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { compareOtpAsync } from '../../Redux/Slice/compareOtpSlice/compareOtpSlice';

const GetOtpInput=({hotelObj})=>{
  const dispatch=useDispatch()
  const navigation = useNavigation();
  const compareOtpSelector=useSelector((state)=>state.compareOtpData.compareOtpObj)
  console.log('compare otp selector',compareOtpSelector)
    const [myOtp,setMyOtp]=useState('')
    const [otpError,setOtpError]=useState('')
    const [recieveOtpObj,setRecieveOtpObj]=useState('')
    const loadOtpData = async () => {
        try {
          const data = await SecureStore.getItemAsync('otpData');
          if (data) {
            const parsedData = JSON.parse(data);
            setRecieveOtpObj(parsedData)
            console.log('Retrieved OTP Data:', parsedData);
            // You can also set it to local state if needed
          } else {
            console.log('No OTP data found in SecureStore');
          }
        } catch (error) {
          console.error('Error retrieving SecureStore data:', error);
        }
      };
    
      useEffect(() => {
        loadOtpData(); // ✅ function called on screen mount
      }, []);
       
      useEffect(() => {
        const saveLoginDataToSecureStore = async () => {
          try {
            await SecureStore.setItemAsync(
              'loginOtpObj',
              JSON.stringify(compareOtpSelector)
            );
            console.log('OTP obj saved to SecureStore');
          } catch (error) {
            console.error('Error saving to SecureStore:', error);
          }
        };
      
        if (compareOtpSelector?.mssg === "fetch data") {
          saveLoginDataToSecureStore(); // ✅ Save to SecureStore
          navigation.navigate('HeaderPage');
        }
      }, [compareOtpSelector]);

      const removeOtpData = async () => {
        try {
          await SecureStore.deleteItemAsync('otpData');
          console.log('OTP data removed from SecureStore');
        } catch (error) {
          console.error('Error removing OTP data:', error);
        }
      };

      const verifyOtpHandler=()=>{
       if(recieveOtpObj.otp!==myOtp){
        setOtpError('Otp is not valid')
        return
       }
       const finalOtpObj={
        phone:recieveOtpObj.phoneNumber,
        hotelName:hotelObj?.hotelName,
        hotelId:hotelObj?.hotelId
       }
       console.log('final otp obj',finalOtpObj)
      dispatch(compareOtpAsync(finalOtpObj))
      removeOtpData()
      }
      const cancelOtpHandler=()=>{
       navigation.navigate('LoginPage')
       removeOtpData()
      }
return (
    <>
    <SafeAreaView style={{ flex: 1 }}>
    <LoginImage/>
    <View style={{ paddingHorizontal: 16 }}>
    <OtpInput numberOfDigits={5} onTextChange={(text) => setMyOtp(text)} />
      </View> 
      <Text style={{color:'red',textAlign:'center',paddingTop:4}}>{otpError}</Text>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
       <View style={{marginTop:11}}>
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
                      onPress={verifyOtpHandler}
                    >
           VERiFY OTP
                    </Button>
       </View>
       <View style={{marginTop:11}}>
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
                      onPress={cancelOtpHandler}
                    >
           CANCEL
                    </Button>
       </View>
      </View>
    </SafeAreaView>
    </>
)
}
export default GetOtpInput