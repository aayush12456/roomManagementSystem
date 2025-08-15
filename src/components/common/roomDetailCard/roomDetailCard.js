import { Card,Text } from "react-native-paper"
import { View,Pressable } from "react-native";
import { useState } from "react";
import CustomerDetailModal from "../../customerDetailModal/customerDetailModal";
const RoomDetailCard=({roomTitle,roomDetails})=>{
  const [showAlert, setShowAlert] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
    const irregulars = {
        one: "First",
        two: "Second",
        three: "Third",
        five: "Fifth",
        eight: "Eighth",
        nine: "Ninth",
        twelve: "Twelfth",
        ground: "Ground"
      };
      const convertFloorName = (title) => {
        const [wordPart] = title.split(/Floor/i); 
        const lowerWord = wordPart.toLowerCase();
    
        const ordinal =
          irregulars[lowerWord] ||
          lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1) + "th";
    
        return `${ordinal} Floor`;
      };
      
      const roomClickHandler = (id) => {
        console.log('id is',id)
        setSelectedRoomId(id);
        setShowAlert(true);
      };
  
      
return (
    <>
    <Card style={{ borderRadius: 6, marginVertical: 5, padding: 10 }}>
    <Text>{convertFloorName(roomTitle)}</Text>
    <View style={{flexDirection:'row',flexWrap:'wrap',gap:10}}>
    {roomDetails && typeof roomDetails === 'object' &&
        Object.entries(roomDetails).map(([roomLabel, roomData], roomIndex) =>{
        const data=roomLabel.split('')
        const roomId=roomData?._id
        const shortLabel=`R${data[data.length-1]}`
       const bedType = roomData.bedType.split(',').map(item => item.replace(' Bed', ''));
            return (
                <View key={roomIndex} style={{ padding: 6 }}>
                <Pressable onPress={()=>roomClickHandler(roomId)}>
                 <View
                   style={{
                     borderWidth: 1,
                     borderColor: "#000",
                     borderRadius:12,
                     padding:12,
                     marginBottom: 5,
                     width:50
                   }}
                 >
                   <Text style={{ fontWeight: "bold",textAlign:'center' }}>{shortLabel}</Text>
                 </View>
                </Pressable>
             <Text style={{textAlign:'center'}}>{bedType}</Text>
           </View>
            )
        } )}
    </View>
    </Card>
  <CustomerDetailModal showAlert={showAlert} setShowAlert={setShowAlert} selectedRoomId={selectedRoomId}/>
    
    </>
)
}
export default RoomDetailCard