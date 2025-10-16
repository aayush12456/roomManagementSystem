import { Text,TextInput,Button } from "react-native-paper"
import {Image,View,ScrollView} from 'react-native'
import success from '../../../assets/AllIcons/success.png'
import Modal from 'react-native-modal';
import * as SecureStore from 'expo-secure-store';
import { useState,useEffect } from "react"
import {useDispatch,useSelector} from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { clearHotelNameData, getHotelNameAsync } from "../../Redux/Slice/getHotelNameSlice/getHotelNameSlice"
import { getPhoneOtpAsync } from "../../Redux/Slice/getPhoneOtpSlice/getPhoneOtpSlice";
import { clearPhoneOtpData } from "../../Redux/Slice/getPhoneOtpSlice/getPhoneOtpSlice";
const ExistingAccount=()=>{
 const dispatch=useDispatch()
 const navigation = useNavigation();   
 const phoneNameSelectorObj=useSelector((state)=>state?.getHotelNameData?.getHotelNameObj)
 const getPhoneOtpSelectorObj=useSelector((state)=>state.getPhoneOtpData.getPhoneOtpObj)
 const [phoneNumber,setPhoneNumber]=useState('') 
 const [hotelName,setHotelName]=useState('') 
 const [isModalVisible, setModalVisible] = useState(false);
 const [phoneNameObj,setPhoneNameObj]=useState('') 
 const loginHandler=()=>{
    const phoneObj={
      phone:phoneNumber
    }
    dispatch(getHotelNameAsync(phoneObj))
    }

    useEffect(() => {
        if (phoneNameSelectorObj) {
          setPhoneNameObj(phoneNameSelectorObj);
        }
      }, [phoneNameSelectorObj]);

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
          setModalVisible(false)
          navigation.navigate('GetOtpPage',{ formData:hotelName,passData:'exisitngAccount' });
        }
      }, [getPhoneOtpSelectorObj]);
      
    useEffect(() => {
        if (phoneNameObj.mssg==="get hotel name") {
          setModalVisible(true);
        } else {
          setModalVisible(false);
        }
      }, [phoneNameObj]);

      const hotelClickHandler=(phone,hotel)=>{
        setHotelName(hotel)
      const phoneObj={
        phone:phoneNumber
      }
      dispatch(getPhoneOtpAsync(phoneObj))
      }
return (
    <>
    <View style={{marginTop:40}}>
    <View style={{flexDirection:"row",justifyContent:"center"}}>
    <Image source={success} style={{width:50,height:50}}/>
    </View> 
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
    </View>
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
                  phoneNameObj?.matchedNames?.length>0? phoneNameObj?.matchedNames?.map((hotelNameObj,index)=>{
                return (
                 <View key={hotelNameObj?.hotelName}>
                  <Text style={{ marginTop: 10,fontSize:16 }} onPress={()=>hotelClickHandler(hotelNameObj?.hotelName,hotelNameObj)}>
                  {hotelNameObj.hotelName}
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
    </>
)
}
export default ExistingAccount