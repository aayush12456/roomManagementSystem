import { Card, Text } from "react-native-paper";
import { View,ScrollView } from "react-native";

const Departure = ({ checkOutArray }) => {
  return (
    <>
    <ScrollView>
   { checkOutArray?.length>0?<Text style={{ textAlign: "center", paddingTop: 20,fontWeight: "600" }}>
 Today Checkout
  </Text>:null}
      {checkOutArray?.length>0?checkOutArray?.map((checkoutData, index) => {
        return (
          <Card
            key={index}
            style={{
              marginHorizontal: 12,
              marginVertical: 8,
              borderRadius: 12,
              elevation: 3,
            }}
          >
            <Card.Content>

              {/* 🔹 ROOM HEADER */}
              <View style={{ marginBottom: 8 }}>
                <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
                  {checkoutData.roomNo}
                </Text>
                <Text variant="bodySmall" style={{ color: "gray" }}>
                  {checkoutData.roomType} • {checkoutData.floor}
                </Text>
              </View>

              {/* 🔹 CHECKOUT TIME */}
              <View style={{ marginBottom: 8 }}>
                <Text variant="bodyMedium">
                  Checkout:
                  <Text style={{ fontWeight: "bold" }}>
                    {" "}
                    {checkoutData.checkOutDate}, {checkoutData.checkOutTime}
                  </Text>
                </Text>
              </View>

              {/* 🔹 GUESTS */}
              <View style={{ marginBottom: 8 }}>
                <Text variant="bodyMedium">
                  Guest:
                  <Text style={{ fontWeight: "600" }}>
                    {" "}
                    {checkoutData?.guests?.join(", ")}
                  </Text>
                </Text>
              </View>

              {/* 🔹 PHONE */}
              <View style={{ marginBottom: 12 }}>
                <Text variant="bodyMedium">
                  Phone:
                  <Text style={{ fontWeight: "600" }}>
                    {" "}
                    {checkoutData.phoneNumber}
                  </Text>
                </Text>
              </View>

              {/* 🔹 ACTION BUTTON */}
            

            </Card.Content>
          </Card>
        );
      }):
      <Text  style={{textAlign:'center',padding:40,fontSize:15,fontWeight: "600"}}>No departures scheduled for today</Text>
      }
    </ScrollView>
 
    </>
  );
};

export default Departure;
