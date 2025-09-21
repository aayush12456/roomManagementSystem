import { ScrollView, View, Pressable, Dimensions } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import { useEffect,useState } from "react";
const HeaderReportCard=({hotelDetailSelector,dateSelector})=>{
    const [staffObj, setStaffObj] = useState({});

    const windowHeight = Dimensions.get('window').height;
    const containerHeight = windowHeight * 0.2;
    const finalDate = new Date();
    const todayDate = finalDate.toLocaleDateString("en-GB");
    const staffArray = Object.values(hotelDetailSelector.staff || {});

    useEffect(() => {
        const postObj = staffArray.find((staff) => staff.post === "Hotel Supervisor");
        setStaffObj(postObj || {});
      }, [staffArray]);
return (
    <>
      <View
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 8,
                  padding: 10,
                  backgroundColor: "#f9f9f9",
                }}
              >
                <Text style={{ textAlign: "right" }}>
                  Registration No: {hotelDetailSelector?.hotelRegistrationNumber}
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: 6,
                    gap: 12,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingTop: 6,
                      gap: 40,
                    }}
                  >
                    <Text style={{ fontSize: 16, color: "black", fontWeight: "800" }}>
                      {hotelDetailSelector?.hotelName}
                    </Text>
                    <Text style={{ fontSize: 16, color: "black" }}>
                      {hotelDetailSelector?.hotelAddress}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: 5,
                      }}
                    >
                      {hotelDetailSelector?.owner1?.phone ? (
                        <Text style={{ fontSize: 16, color: "black" }}>
                          Mob : {hotelDetailSelector?.owner1?.phone},
                        </Text>
                      ) : null}
                      {hotelDetailSelector?.owner2?.phone ? (
                        <Text style={{ fontSize: 16, color: "black" }}>
                          {hotelDetailSelector?.owner2?.phone},
                        </Text>
                      ) : null}
                      {hotelDetailSelector?.owner3?.phone ? (
                        <Text style={{ fontSize: 16, color: "black" }}>
                          {hotelDetailSelector?.owner3?.phone},
                        </Text>
                      ) : null}
                      {hotelDetailSelector?.owner4?.phone ? (
                        <Text style={{ fontSize: 16, color: "black" }}>
                          {hotelDetailSelector?.owner4?.phone}
                        </Text>
                      ) : null}
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      paddingTop: 6,
                      gap: 40,
                    }}
                  >
                    <Text style={{ fontSize: 16, color: "black" }}>
                      Manager Name : {staffObj?.name}
                    </Text>
                    {dateSelector.type === "Custom" ? null : (
                      <Text style={{ fontSize: 16, color: "black" }}>
                        Date :{" "}
                        {dateSelector.type === "yesterday"
                          ? dateSelector.dates
                          : todayDate}
                      </Text>
                    )}
                  </View>
                </ScrollView>
              </View>
    </>
)
}
export default HeaderReportCard