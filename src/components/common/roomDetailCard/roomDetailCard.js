import { Card } from "react-native-paper"
import { Text } from "react-native-paper"
import { View } from "react-native";
const RoomDetailCard=({roomTitle,roomDetails})=>{
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
        // "oneFloor" → ["one", "floor"]
        const [wordPart] = title.split(/Floor/i); 
        const lowerWord = wordPart.toLowerCase();
    
        const ordinal =
          irregulars[lowerWord] ||
          lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1) + "th";
    
        return `${ordinal} Floor`;
      };
      const convertRoomLabelShort = (label) => {
        // Example: "Ground Floor Room 1"
        const lower = label.toLowerCase();
    
        // Floor short code
        let floorCode = "";
        if (lower.startsWith("ground")) {
          floorCode = "G";
        } else {
          floorCode = "F"; // For any floor above ground
        }
    
        // Room number extraction
        const roomNumberMatch = label.match(/Room\s*(\d+)/i);
        const roomNumber = roomNumberMatch ? roomNumberMatch[1] : "";
    
        return `${floorCode}${roomNumber}`;
      };
return (
    <>
    <Card style={{ borderRadius: 6, marginVertical: 5, padding: 10 }}>
    <Text>{convertFloorName(roomTitle)}</Text>
    <View style={{flexDirection:'row',flexWrap:'wrap',gap:10}}>
    {roomDetails && typeof roomDetails === 'object' &&
        Object.entries(roomDetails).map(([roomLabel, roomData], roomIndex) =>{
        const data=roomLabel.split('')
        const shortLabel=`R${data[data.length-1]}`
            return (
                <View key={roomIndex} style={{ padding: 6 }}>
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
             {/* <Text>Room Type: {roomData.roomType}</Text>
             <Text>Bed Type: {roomData.bedType}</Text> */}
           </View>
            )
        } )}
    </View>
    </Card>
    </>
)
}
export default RoomDetailCard