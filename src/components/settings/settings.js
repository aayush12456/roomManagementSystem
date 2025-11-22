
import React, { useRef, useState,useEffect } from "react";
import { View, Text, Image, Pressable,ScrollView } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import account from "../../../assets/settingIcon/account.png";
import deleteImg from "../../../assets/settingIcon/delete.png";
import switchImg from "../../../assets/settingIcon/switch.png";
import * as SecureStore from 'expo-secure-store';
import { Button,Card } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { useDispatch,useSelector } from "react-redux";
import { switchProfileAsync, switchProfileData } from "../../Redux/Slice/switchProfileSlice/switchProfileSlice";
import { deleteSwitchProfileAsync } from "../../Redux/Slice/deleteSwitchProfileSlice/deleteSwitchProfileSlice";


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


const Settings = ({profileArray, hotelId,phone,hotelImgFirst}) => {
  console.log('profile array',profileArray)
const profileSelector=useSelector((state)=>state.switchProfileData.switchProfileObj)
console.log('profile select',profileSelector)
  const refRBSheet = useRef();
  const switchRBSheet=useRef()
  const dispatch=useDispatch()
  const navigation=useNavigation()
  const [isOpen, setIsOpen] = useState(false);
  const [isSwitchOpen, setIsSwitchOpen] = useState(false);

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

        <Pressable>
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
        </Pressable>
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
    </>
  );
};

export default Settings;
