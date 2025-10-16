// import React, { useRef } from "react";
// import { View, Text, Image, Pressable } from "react-native";
// import RBSheet from "react-native-raw-bottom-sheet";
// import account from "../../../assets/settingIcon/account.png";

// // Dummy component for Bottom Sheet content
// const BottomSheetContent = () => (
//   <View style={{ padding: 20 }}>
// <Text style={{fontSize:16,fontWeight:'700',textAlign:'center'}}>Add account</Text>
//   </View>
// );

// const Settings = () => {
//   const refRBSheet = useRef();

//   const addAccountHandler = () => {
//     refRBSheet.current.open(); // Open the bottom sheet
//   };

//   return (
//     <>
//       <View style={{ width: "100%", backgroundColor: "white" }}>
//         <View>
//           <Text style={{ paddingLeft: 32, paddingTop: 16, fontSize: 15, fontWeight: "500" }}>
//             Login
//           </Text>
//           <Pressable onPress={addAccountHandler}>
//             <View style={{ flexDirection: "row", gap: 5, marginTop: 20, marginLeft: 26, marginBottom: 30 }}>
//               <Image source={account} style={{ width: 20, height: 20 }} />
//               <Text style={{ fontSize: 15, marginTop: -2 }}>Add account</Text>
//             </View>
//           </Pressable>
//         </View>
//       </View>

//       <RBSheet
//         ref={refRBSheet}
//         useNativeDriver={false}
//         customStyles={{
//           wrapper: { backgroundColor: "transparent" },
//           container: {
//             borderTopLeftRadius: 40,  // rounded top-left corner
//             borderTopRightRadius: 40, // rounded top-right corner
//             padding: 20,
//             backgroundColor: "white", // sheet background
//             height:200
//           },
//           draggableIcon: { backgroundColor: "#000" },
//         }}
//         customModalProps={{
//           animationType: "slide",
//           statusBarTranslucent: true,
//         }}
//         customAvoidingViewProps={{ enabled: false }}
//       >
//         <BottomSheetContent />
//       </RBSheet>
//     </>
//   );
// };

// export default Settings;
import React, { useRef, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import account from "../../../assets/settingIcon/account.png";
import { Button } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';

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

const Settings = () => {
  const refRBSheet = useRef();
  const navigation=useNavigation()
  const [isOpen, setIsOpen] = useState(false);

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
    </>
  );
};

export default Settings;
