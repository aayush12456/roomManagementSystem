import { SafeAreaView } from 'react-native-safe-area-context';
import { OtpInput } from "react-native-otp-entry";
import { View,Text,Image,ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import LoginImage from '../common/loginImage/loginImage';
import unavailableImg from '../../../assets/settingIcon/unavailable.png'
import * as SecureStore from 'expo-secure-store';
import { useEffect,useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { compareOtpAsync, compareOtpData } from '../../Redux/Slice/compareOtpSlice/compareOtpSlice';
import {Modal} from 'react-native'

const GetOtpInput=({hotelObj,data})=>{
  const dispatch=useDispatch()
  const navigation = useNavigation();
  const [modalMsg,setModalMsg]=useState('')
  const [showModal,setShowModal]=useState('')
  const [loading, setLoading] = useState(false);
  
  const compareOtpSelector=useSelector((state)=>state.compareOtpData.compareOtpObj)
  console.log('compare otp selector',compareOtpSelector)
  const loginMssg=compareOtpSelector?.mssg
    const [myOtp,setMyOtp]=useState('')
    const [otpError,setOtpError]=useState('')
    const [recieveOtpObj,setRecieveOtpObj]=useState('')
    const [loginObj, setLoginObj] = useState(null);
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
          dispatch(compareOtpData())
        }
      }, [compareOtpSelector]);

      // useEffect(() => {
      //   const saveLoginDataToSecureStore = async () => {
      //     try {
      //       // 🛡️ Step 1: Make sure compareOtpSelector is a valid object
      //       if (!compareOtpSelector || typeof compareOtpSelector !== 'object') {
      //         console.log('⚠️ No valid compareOtpSelector found — skipping save');
      //         return;
      //       }
      
      //       // 🗑️ Step 2: Delete old SecureStore data if it exists
      //       const existingData = await SecureStore.getItemAsync('loginOtpObj');
      //       if (existingData) {
      //         console.log('Old loginOtpObj found — deleting...');
      //         await SecureStore.deleteItemAsync('loginOtpObj');
      //       }
      
      //       // 💾 Step 3: Save new data safely
      //       await SecureStore.setItemAsync(
      //         'loginOtpObj',
      //         JSON.stringify(compareOtpSelector)
      //       );
      
      //       console.log('✅ New loginOtpObj saved to SecureStore');
      //     } catch (error) {
      //       console.error('Error handling SecureStore loginOtpObj:', error);
      //     }
      //   };
      
      //   // ✅ Only run when OTP verified
      //   if (compareOtpSelector?.mssg === "fetch data") {
      //     saveLoginDataToSecureStore();
      //     navigation.navigate('HeaderPage');
      //   }
      // }, [compareOtpSelector]);
      
      

      const removeOtpData = async () => {
        try {
          await SecureStore.deleteItemAsync('otpData');
          console.log('OTP data removed from SecureStore');
        } catch (error) {
          console.error('Error removing OTP data:', error);
        }
      };


      const getLoginDataToSecureStore = async () => {
        try {
          const data = await SecureStore.getItemAsync('loginOtpObj');
          if (data) {
            const parsedData = JSON.parse(data);
            setLoginObj(parsedData)
            // console.log('Retrieved login obj Data:', parsedData);
            // You can also set it to local state if needed
          } else {
            console.log('No login obj data found in SecureStore');
            setLoginObj({})
          }
        } catch (error) {
          console.error('Error retrieving SecureStore data:', error);
          setLoginObj({});
        }
      
      };
      useEffect(() => {
        getLoginDataToSecureStore(); // ✅ function called on screen mount
      }, []);
      const verifyOtpHandler=()=>{
        if (loading) return; 
        setLoading(true)
       if(recieveOtpObj.otp!==myOtp){
        setOtpError('Otp is not valid')
        setLoading(false)
        return
       }
      //  const finalOtpObj={
      //   phone:recieveOtpObj.phoneNumber,
      //   hotelName:hotelObj?.hotelName,
      //   hotelId:hotelObj?.hotelId,
      //   anotherPhone:loginObj?.phone,
      //   anotherHotelId:loginObj?.matchedHotels[0]?._id
      //  }
      const finalOtpObj = {
        phone: recieveOtpObj?.phoneNumber,
        hotelName: hotelObj?.hotelName || '',
        hotelId: hotelObj?.hotelId || '',
        anotherPhone: loginObj?.phone || '',
        anotherHotelId: loginObj?.matchedHotels?.[0]?._id || '',
      };
       console.log('final otp obj',finalOtpObj)
      dispatch(compareOtpAsync(finalOtpObj))
      removeOtpData()
      }
      const cancelOtpHandler=()=>{
        if(data){
          navigation.goBack()

        }
        else{
          navigation.navigate('LoginPage')
        }
       removeOtpData()
      }

      useEffect(() => {
        if (loginMssg === "Login with existing account of same hotel name not possible") {
          setModalMsg(loginMssg);
          setShowModal(true);
          dispatch(compareOtpData())
        }
      }, [loginMssg]);
          
return (
    <>
    <SafeAreaView style={{ flex: 1 }}>
    <LoginImage/>
    {/* <Text>otp is {recieveOtpObj.otp}</Text> */}
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
                         width:`${loading?100:""}`
                      }}
                      buttonColor="rgba(234, 88, 12, 1)"
                      onPress={verifyOtpHandler}
                    >
           {/* VERiFY OTP */}
           {
                    loading?
                    <ActivityIndicator color="#fff" />
                    :'VERiFY OTP'
                   }
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
    <Modal
  visible={showModal}
  transparent
  animationType="fade"
  onRequestClose={() => setShowModal(false)}
>
  <View
    style={{
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        width: '80%',
        alignItems: 'center',
      }}
    >
      <Image source={unavailableImg} style={{width:60,height:60}}/>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '500',
          textAlign: 'center',
          marginBottom: 15,
          paddingTop:10
        }}
      >
        {modalMsg}
      </Text>

      <Button
        mode="contained"
        onPress={() => setShowModal(false)}
        buttonColor="rgba(234, 88, 12, 1)"
        style={{
          borderRadius: 8,
          paddingHorizontal: 20,
          paddingVertical: 4,
        }}
      >
        Close
      </Button>
    </View>
  </View>
</Modal>

    </>
)
}
export default GetOtpInput