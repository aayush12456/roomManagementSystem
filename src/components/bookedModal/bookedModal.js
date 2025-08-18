import { View,Pressable,Modal,Dimensions, ScrollView } from "react-native";
import { Text,Button } from "react-native-paper";
import { useEffect } from "react";
const BookedModal=({showBookedAlert,setShowBookedAlert,customerArray})=>{
    const screenWidth = Dimensions.get("window").width;
    const acRoomArray=customerArray.filter((item)=>item.roomType=='Ac')
    const NonAcRoomArray=customerArray.filter((item)=>item.roomType=='Non Ac')
    return (
        <>
        <Modal visible={showBookedAlert} transparent animationType="fade">
        <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
    }}
  >
    <View
      style={{
        backgroundColor: "#fff",
        padding:20,
        borderRadius: 10,
        maxHeight: "60%", // Modal height limit for scrolling
        width: screenWidth * 0.9,
      }}
    >
    <View>
        <Text>Ac : {acRoomArray.length}</Text>
        <Text>Non Ac : {NonAcRoomArray.length}</Text>
    </View>
        <View style={{ width: '50%', overflow: 'hidden' }}>
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
                      }}
                      buttonColor="rgba(234, 88, 12, 1)"
                      onPress={() => {
                        setShowBookedAlert(false)
                      }}
                    >
     Close
                    </Button>
          </View>
        </View>
        </View>
        </Modal>
        </>
    )
}
export default BookedModal