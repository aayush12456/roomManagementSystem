import { View,Pressable,Modal,Dimensions, ScrollView } from "react-native";
import { Text,Button } from "react-native-paper";
import { useEffect } from "react";
const BookedModal=({showBookedAlert,setShowBookedAlert,customerArray,customerArrayAdvance, todayDate,currentDate,room})=>{
  // console.log('customer array in booked',customerArray)
    const screenWidth = Dimensions.get("window").width;
    const acRoomArray=customerArray?.filter((item)=>item.roomType=='Ac')
    const NonAcRoomArray=customerArray?.filter((item)=>item.roomType=='Non Ac')
    const acRoomArrayAdvance=customerArrayAdvance.filter((item)=>item.roomType=='Ac' && item.selectedDate===currentDate)
    const NonAcRoomArrayAdvance=customerArrayAdvance.filter((item)=>item.roomType=='Non Ac' && item.selectedDate===currentDate)
    // console.log('room is',room)
    const finalAcRoomArray=todayDate!==currentDate?acRoomArrayAdvance:acRoomArray|| []
    const finalNonAcRoomArray=todayDate!==currentDate?NonAcRoomArrayAdvance:NonAcRoomArray || []
    const groupedData = finalAcRoomArray?.reduce((acc, item) => {
      if (!acc[item.floor]) {
        acc[item.floor] = [];
      }
      acc[item.floor].push(item.roomNo);
      return acc;
    }, {});

    const groupedDatas = finalNonAcRoomArray?.reduce((nonAc, item) => {
      if (!nonAc[item.floor]) {
        nonAc[item.floor] = [];
      }
      nonAc[item.floor].push(item.roomNo);
      return nonAc;
    }, {});
// console.log('grouped datas',groupedDatas)

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
            padding: 20,
            borderRadius: 10,
            maxHeight: "80%", // 👈 modal ki max height set ki
            width: screenWidth * 0.9,
          }}
        >
          {/* Wrap content in ScrollView */}
          <ScrollView
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={true}
          >
            {/* AC Section */}
            <Text>Ac : {finalAcRoomArray?.length}</Text>
            <View
              style={{
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
                marginBottom: 15,
                marginTop: 12,
                maxHeight: 200, // 👈 bounded height for inner scroll
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
              <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={true}
              >
                {Object.entries(groupedData).map(([floor, rooms], index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      paddingVertical: 6,
                      borderBottomWidth: 0.5,
                      borderColor: "#eee",
                      gap: 47,
                    }}
                  >
                    <Text>{floor}</Text>
                    <Text>{rooms.join(", ")}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* Non AC Section */}
            <Text>Non Ac : {finalNonAcRoomArray?.length}</Text>
            <View
              style={{
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
                marginBottom: 15,
                marginTop: 12,
                maxHeight: 200, // 👈 bounded height
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
              <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={true}
              >
                {Object.entries(groupedDatas).map(([floor, rooms], index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      paddingVertical: 6,
                      borderBottomWidth: 0.5,
                      borderColor: "#eee",
                      gap: 47,
                    }}
                  >
                    <Text>{floor}</Text>
                    <Text>{rooms.join(", ")}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </ScrollView>

          {/* Close Button */}
          <View style={{ width: "100%", alignItems: "center" }}>
            <Button
              mode="contained"
              style={{
                height: 50,
                borderRadius: 11,
                justifyContent: "center",
                marginTop: 20,
              }}
              buttonColor="rgba(234, 88, 12, 1)"
              onPress={() => setShowBookedAlert(false)}
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