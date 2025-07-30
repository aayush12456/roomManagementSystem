import { SafeAreaView } from 'react-native-safe-area-context';
import { OtpInput } from "react-native-otp-entry";
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import LoginImage from '../common/loginImage/loginImage';
import * as SecureStore from 'expo-secure-store';
import { useEffect,useState } from 'react';
const GetOtpInput=()=>{
    const [myOtp,setMyOtp]=useState('')
    const loadOtpData = async () => {
        try {
          const data = await SecureStore.getItemAsync('otpData');
          if (data) {
            const parsedData = JSON.parse(data);
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
return (
    <>
    <SafeAreaView style={{ flex: 1 }}>
    <LoginImage/>
    <View style={{ paddingHorizontal: 16 }}>
    <OtpInput numberOfDigits={5} onTextChange={(text) => setMyOtp(text)} />
      </View> 
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
       <View>
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
                    >
           VERiFY OTP
                    </Button>
       </View>
       <View>
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