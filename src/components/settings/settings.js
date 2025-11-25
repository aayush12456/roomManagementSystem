
import React, { useRef, useState,useEffect } from "react";
import { View, Text,  Pressable,ScrollView,Modal } from "react-native";
import { Image } from 'expo-image';
import RBSheet from "react-native-raw-bottom-sheet";
import account from "../../../assets/settingIcon/account.png";
import deleteImg from "../../../assets/settingIcon/delete.png";
import switchImg from "../../../assets/settingIcon/switch.png";
import successImage from "../../../assets/AllIcons/successImg.gif"
import * as SecureStore from 'expo-secure-store';
import { Button,Card } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { useDispatch,useSelector } from "react-redux";
import { switchProfileAsync, switchProfileData } from "../../Redux/Slice/switchProfileSlice/switchProfileSlice";
import { deleteSwitchProfileAsync } from "../../Redux/Slice/deleteSwitchProfileSlice/deleteSwitchProfileSlice";
import AwesomeAlert from "react-native-awesome-alerts";
import { deleteHotelAsync, resetHotelData } from '../../Redux/Slice/deleteHotelSlice/deleteHotelSlice';

// Bottom sheet content
const BottomSheetContent = ({ existingAccountHandler }) => (
  <View >
    <Text style={{textAlign:"center",marginTop:-20,fontWeight:'700'}}>_____</Text>
    <View style={{paddingTop:23}}>
    <Text style={{ fontSize: 15, fontWeight: "500",textAlign:'center' }}>
      Add account
    </Text>
    </View>
    <View
      style={{
        height: 1,
        width:'100%',
        backgroundColor: '#ccc', // grey line
        marginVertical: 15,
      }}
    />
      <View style={{ width: '100%', overflow: 'hidden' }}>
         <Button
                      mode="contained"
                      style={{
                        height: 50, // Set the desired height
                        borderRadius:11,
                        color: '#FFFFFF',
                         fontSize: 16, 
                         justifyContent:'center',
                         marginTop:0,
                      }}
                      buttonColor="rgba(234, 88, 12, 1)"
                      onPress={existingAccountHandler}
                    >
           Log In To Existing Account
                    </Button>
      </View>
      <Text style={{textAlign:'center', fontSize: 15, fontWeight: "500",paddingTop:12}}>Create New Account</Text>
  </View>
);

const SwitchAccountSheet = ({ profileArray,profileClickHandler,deleteSwitchProfileHandler }) => (
  <View>
    <Text style={{ textAlign: "center", marginTop: -20, fontWeight: "700" }}>
      _____
    </Text>
    <View style={{ paddingTop: 23 }}>
      <Text style={{ fontSize: 15, fontWeight: "500", textAlign: "center" }}>
        Switch Account
      </Text>
    </View>
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#ccc",
        marginVertical: 15,
      }}
    />

    {/* {profileArray && profileArray.length > 0 ? (
      profileArray.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => onSelectAccount(item)}
          style={{
            paddingVertical: 10,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            {item.name}
          </Text>
        </Pressable>
      ))
    ) : (
      <Text style={{ textAlign: "center", color: "gray" }}>
        No accounts available
      </Text>
    )} */}
<ScrollView  
contentContainerStyle={{
  paddingBottom: 100, // last card ke liye space
}}
>
{
        profileArray.map((profile)=>{
          return (
            <>
            <Card style={{marginTop:20}} >
              <Pressable onPress={()=>profileClickHandler(profile)}>
              <View style={{flexDirection:"row",justifyContent:'space-between'}}>
                <Image source={{uri:profile.image}} 
                 style={{
                  width: 50,
                  height: 50,
                  borderRadius: 40,
                  marginBottom: 5,
                  marginLeft:12,
                  marginTop:6
                }}
                />
                <View style={{paddingTop:8}}>
                 <Text >{profile?.name}</Text>
                 <Text style={{paddingTop:4}}>{profile?.hotelName}</Text>
                </View>
                <Pressable 
                onPress={(event) => {
                  event.stopPropagation(); // 🛑 stop parent press
                  deleteSwitchProfileHandler(profile);
                }}
                >
                <Image source={deleteImg} style={{width:18,height:18,marginTop:15,marginLeft:50,marginRight:10}}/>
                </Pressable>
            </View>
              </Pressable>
            
            </Card>
            </>
          )
        })
      }
</ScrollView>
     

  </View>
);


const Settings = ({profileArray, hotelId,phone,hotelImgFirst,hotelName,profile}) => {
  console.log('profile array',profileArray)
  console.log('profiles is',profile)
const profileSelector=useSelector((state)=>state.switchProfileData.switchProfileObj)
const deleteHotelSelector=useSelector((state)=>state.deleteHotel.deleteHotelObj)
console.log('delete hotel select',deleteHotelSelector)
console.log('profile select',profileSelector)
  const refRBSheet = useRef();
  const switchRBSheet=useRef()
  const dispatch=useDispatch()
  const navigation=useNavigation()
  const [isOpen, setIsOpen] = useState(false);
  const [isSwitchOpen, setIsSwitchOpen] = useState(false);
  const [hotelAlert,setHotelAlert]=useState(false)
  const [messageAlert,setMessageAlert]=useState(false)

  const addAccountHandler = () => {
    setIsOpen(true);
    refRBSheet.current.open();
  };
  const closeSheet=()=>{
    setIsOpen(false)
  }

  const existingAccountHandler = () => {
    refRBSheet.current.close(); // optional: close sheet before navigation
    navigation.navigate("ExistingAccountPage",{heading:'Add account'});
  };

const switchAccountHandler=()=>{
setIsSwitchOpen(true)
switchRBSheet.current.open();
}
const closeSwitchSheet=()=>{
  setIsSwitchOpen(false)
}

const profileClickHandler=(profile)=>{
// console.log('profile',profile)
const profileObj={
  phone:profile?.phone,
  hotelId:profile?.hotelId,
  hotelName:profile?.hotelName
}
console.log('profile obj',profileObj)
dispatch(switchProfileAsync(profileObj))
}
const deleteSwitchProfileHandler=(profile)=>{
  console.log('profile',profile)
  const deleteProfileObj={
    hotelId:hotelId,
    phone:phone,
    anotherHotelId:profile?.hotelId,
    anotherPhone:profile?.phone
  }
  console.log('delete switch',deleteProfileObj)
  dispatch(deleteSwitchProfileAsync(deleteProfileObj))
}


useEffect(() => {
  const saveLoginDataToSecureStore = async () => {
    try {
      await SecureStore.setItemAsync(
        'loginOtpObj',
        JSON.stringify(profileSelector)
      );
      console.log('OTP obj saved to SecureStore');
    } catch (error) {
      console.error('Error saving to SecureStore:', error);
    }
  };

  if (profileSelector?.mssg === "fetch data") {
    saveLoginDataToSecureStore(); // ✅ Save to SecureStore
    setIsSwitchOpen(false)
    dispatch(switchProfileData())
    navigation.reset({
      index: 0,
      routes: [{ name: 'HeaderPage' }], // or your home screen
    });
  }
}, [profileSelector]);

const deleteHotelHandler=()=>{
  setHotelAlert(true)
}

const removeLoginData = async () => {
  try {
    await SecureStore.deleteItemAsync('loginOtpObj');
    console.log('login obj removed from SecureStore');
  } catch (error) {
    console.error('Error removing login obj:', error);
  }
};
useEffect(() => {
  if (deleteHotelSelector?.mssg==="Hotel deleted successfully") {  
    setMessageAlert(true); // ✅ Show Alert
     
    setTimeout(() => {
      setMessageAlert(false); // ❌ Hide alert
      dispatch(resetHotelData()); // 🔄 Reset
      removeLoginData()
      navigation.navigate('LoginPage'); // 🚀 Navigate
    }, 3000);
  }
}, [deleteHotelSelector?.mssg]);


  return (
    <>
      {/* Main Settings UI */}
      <View style={{ width: "100%", backgroundColor: "white" }}>
        <Text
          style={{
            paddingLeft: 32,
            paddingTop: 16,
            fontSize: 15,
            fontWeight: "500",
          }}
        >
          Login
        </Text>
        <Pressable onPress={addAccountHandler}>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              marginTop: 20,
              marginLeft: 26,
              marginBottom: 30,
            }}
          >
            <Image source={account} style={{ width: 20, height: 20 }} />
            <Text style={{ fontSize: 15, marginTop: -2 }}>Add account</Text>
          </View>
        </Pressable>

      {profileArray?.length>0?  <Pressable onPress={switchAccountHandler}>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              marginLeft: 26,
              marginBottom: 30,
            }}
          >
            <Image source={switchImg} style={{ width: 20, height: 20 }} />
            <Text style={{ fontSize: 15, marginTop: -2 }}>Switch account</Text>
          </View>
        </Pressable>:null}

        {!profile?.post?<Pressable onPress={deleteHotelHandler}>
        <View
            style={{
              flexDirection: "row",
              gap: 5,
              marginLeft: 26,
              marginBottom: 30,
            }}
          >
            <Image source={{uri:hotelImgFirst}} style={{ width: 35, height: 35,borderRadius:20,marginLeft:-7 }} />
            <Text style={{ fontSize: 15,paddingTop:3 }}>Delete Hotel</Text>
          </View>
        </Pressable>:null}
      </View>

      {/* Semi-transparent overlay */}
      {isOpen && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1,
          }}
        />
      )}

      {/* Bottom Sheet */}
      <RBSheet
        ref={refRBSheet}
        useNativeDriver={false} // avoids warning
        onClose={closeSheet}
        customStyles={{
          wrapper: { backgroundColor: "transparent" },
          container: {
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            padding: 20,
            backgroundColor: "white",
            height:200,
            zIndex: 2,
          },
          draggableIcon: { backgroundColor: "#000" },
        }}
        customModalProps={{
          animationType: "slide",
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{ enabled: false }}
      >
        <BottomSheetContent existingAccountHandler={existingAccountHandler} />
      </RBSheet>


      {isSwitchOpen && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1,
          }}
        />
      )}

      {/* Bottom Sheet */}
      <RBSheet
        ref={switchRBSheet}
        useNativeDriver={false} // avoids warning
        onClose={closeSwitchSheet}
        customStyles={{
          wrapper: { backgroundColor: "transparent" },
          container: {
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            padding: 20,
            backgroundColor: "white",
            height:200,
            zIndex: 2,
          },
          draggableIcon: { backgroundColor: "#000" },
        }}
        customModalProps={{
          animationType: "slide",
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{ enabled: false }}
      >
        <SwitchAccountSheet  profileArray={profileArray}   profileClickHandler={profileClickHandler}
         dispatch={dispatch} deleteSwitchProfileHandler={deleteSwitchProfileHandler} />
      </RBSheet>

      <AwesomeAlert
        show={hotelAlert}
        showProgress={false}
        message={`Are you sure you want to delete ${hotelName}`}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No"
        confirmText="Yes"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => setHotelAlert(false)}
        onConfirmPressed={() => {
          dispatch(deleteHotelAsync({id:hotelId}))
         setHotelAlert(false)
        }}
      />
        <Modal visible={messageAlert} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            padding: 25,
            borderRadius: 10,
            alignItems: 'center',
            borderWidth: 1,
            width: 300,
          }}
        >
          <Image
            source={successImage}
            style={{
              width: 160,
              height: 160,
              marginBottom: 10,
              marginTop:-20
            }}
            resizeMode="contain"
          />
          <Text
            style={{
              fontWeight: '700',
              fontSize: 17,
              textAlign: 'center',
              marginBottom: 10,
              position:'relative',
              top:-30
            }}
          >
            Hotel Deleted Successfully!
          </Text>
        </View>
      </View>
    </Modal>
    </>
  );
};

export default Settings;
