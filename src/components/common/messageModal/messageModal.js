import { View,Modal,Dimensions,Image } from "react-native";
import { Button,Text } from "react-native-paper";
import deleteImg from '../../../../assets/roomIcon/noDelete.png'
const MessageModal=({messageAlert,setMessageAlert,label,messageObj,currentDate,todayDate,advanceMessageObj,
  floorMessageAlert,setFloorMessageAlert,floorLabel,setFloorLabel
})=>{
    const screenWidth = Dimensions.get("window").width;
    console.log('message obj',messageObj)
    console.log('advance message obj',advanceMessageObj)
return (
<>
<Modal visible={messageAlert || floorMessageAlert} transparent animationType="fade"   avoidKeyboard={true} >
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
      <View style={{flexDirection:"row",justifyContent:'center'}}>
<Image source={deleteImg} style={{width:50,height:50}}/>
      </View>
       
       <View style={{marginTop:15}}>
       {floorLabel ? null : (
  currentDate > messageObj?.checkOutDate ? (
    <Text style={{ textAlign: 'center' }}>
      You cannot delete{" "}
      <Text style={{ fontWeight: 'bold' }}>{label}</Text>
      {" "}because today date is not{" "}
      <Text style={{ fontWeight: 'bold' }}>
        {advanceMessageObj ? advanceMessageObj?.selectedDate : messageObj?.checkOutDate}
      </Text>
    </Text>
  ) : (
    <Text style={{ textAlign: 'center' }}>
      You cannot delete{" "}
      <Text style={{ fontWeight: 'bold' }}>{label}</Text>
      {" "}upto date of{" "}
      <Text style={{ fontWeight: 'bold' }}>
        {advanceMessageObj ? advanceMessageObj?.selectedDate : messageObj?.checkOutDate}
      </Text>
      {" "}because room is booked
    </Text>
  )
)}


{floorLabel ? (
  <Text style={{ textAlign: 'center' }}>
    You cannot delete{" "}
    <Text style={{ fontWeight: 'bold' }}>{floorLabel}</Text>
    {" "}because room is booked in this floor please delete room first then try it again
  </Text>
) : null}

    
         <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
  <Button
    mode="contained"
    style={{
      height: 50,
      borderRadius: 11,
      justifyContent:'center',
      width: '40%',   // 👈 now center properly
    }}
    buttonColor="rgba(234, 88, 12, 1)"
    onPress={() => {
      setMessageAlert(false);
      setFloorMessageAlert(false);
      setFloorLabel('');
    }}
  >
    Close
  </Button>
</View>
       </View>

       

        </View>
        </View>
</Modal>
</>
)
}
export default MessageModal