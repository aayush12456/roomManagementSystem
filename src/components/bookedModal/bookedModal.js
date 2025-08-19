import { View,Pressable,Modal,Dimensions, ScrollView } from "react-native";
import { Text,Button } from "react-native-paper";
import { useEffect } from "react";
const BookedModal=({showBookedAlert,setShowBookedAlert,customerArray,room})=>{
    const screenWidth = Dimensions.get("window").width;
    const acRoomArray=customerArray.filter((item)=>item.roomType=='Ac')
    const NonAcRoomArray=customerArray.filter((item)=>item.roomType=='Non Ac')
    console.log('room is',room)

    const groupedData = acRoomArray.reduce((acc, item) => {
      if (!acc[item.floor]) {
        acc[item.floor] = [];
      }
      acc[item.floor].push(item.roomNo);
      return acc;
    }, {});

    const groupedDatas = NonAcRoomArray.reduce((nonAc, item) => {
      if (!nonAc[item.floor]) {
        nonAc[item.floor] = [];
      }
      nonAc[item.floor].push(item.roomNo);
      return nonAc;
    }, {});
console.log('grouped datas',groupedDatas)

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
        <View
  style={{
    backgroundColor: "#fff",   // box ka background
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    marginTop:12
  }}
>
  {/* Table Header */}
  <View
    style={{
      flexDirection: "row",
      borderBottomWidth: 1,
      borderColor: "#ccc",
      paddingBottom: 8,
      marginBottom: 8,
    }}
  >
    <Text style={{ flex: 1, fontWeight: "bold" }}>Floor</Text>
    <Text style={{ flex: 1, fontWeight: "bold" }}>Room</Text>
  </View>

  {/* Table Body */}
  <ScrollView style={{ maxHeight: 200 }}>
    {Object.entries(groupedData).map(([floor, rooms], index) => (
      <View
        key={index}
        style={{
          flexDirection: "row",
          paddingVertical: 6,
          borderBottomWidth: 0.5,
          borderColor: "#eee",
          gap:47
        }}
      >
        <Text>{floor}</Text>
        <Text >{rooms.join(", ")}</Text>
      </View>
    ))}
  </ScrollView>
</View>

        <Text>Non Ac : {NonAcRoomArray.length}</Text>
        <View
  style={{
    backgroundColor: "#fff",   // box ka background
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    marginTop:12
  }}
>
  {/* Table Header */}
  <View
    style={{
      flexDirection: "row",
      borderBottomWidth: 1,
      borderColor: "#ccc",
      paddingBottom: 8,
      marginBottom: 8,
    }}
  >
    <Text style={{ flex: 1, fontWeight: "bold" }}>Floor</Text>
    <Text style={{ flex: 1, fontWeight: "bold" }}>Room</Text>
  </View>

  {/* Table Body */}
  <ScrollView style={{ maxHeight: 200 }}>
    {Object.entries(groupedDatas).map(([floor, rooms], index) => (
      <View
        key={index}
        style={{
          flexDirection: "row",
          paddingVertical: 6,
          borderBottomWidth: 0.5,
          borderColor: "#eee",
          gap:47
        }}
      >
        <Text>{floor} </Text>
        <Text>{rooms.join(", ")}</Text>
      </View>
    ))}
  </ScrollView>
</View>

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