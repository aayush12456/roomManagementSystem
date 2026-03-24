import { ScrollView,View } from "react-native"
import { Text,Card } from "react-native-paper"
const Arrival=({arrivalArray})=>{
    console.log('arrival array in arrive',arrivalArray)
return (
    <>
    <ScrollView>
    {arrivalArray?.length>0?<Text style={{ textAlign: "center", paddingTop: 20,fontWeight: "600" }}>
 Today Arrival
  </Text>:null}
  {
arrivalArray?.length>0?  arrivalArray?.map((arrival,index)=>{
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
                  {arrival.roomNo}
                </Text>
                <Text variant="bodySmall" style={{ color: "gray" }}>
                  {arrival.roomType} • {arrival.floor}
                </Text>
              </View>

            
              {/* 🔹 GUESTS */}
              <View style={{ marginBottom: 8 }}>
                <Text variant="bodyMedium">
                  Guest :
                  <Text style={{ fontWeight: "600" }}>
                    {" "}
                    {arrival?.customerName}
                  </Text>
                </Text>
              </View>

              {/* 🔹 PHONE */}
              <View style={{ marginBottom: 12,marginTop:4 }}>
                <Text variant="bodyMedium">
                  Phone :
                  <Text style={{ fontWeight: "600" }}>
                    {" "}
                    {arrival.customerPhoneNumber}
                  </Text>
                </Text>
              </View>

              <View style={{ marginBottom: 12 }}>
                <Text variant="bodyMedium">
                  Total Payment :
                  <Text style={{ fontWeight: "600" }}>
                    {" "}
                    {arrival.totalPayment}
                  </Text>
                </Text>
              </View>

              <View style={{ marginBottom: 12 }}>
                <Text variant="bodyMedium">
                  Advance Payment :
                  <Text style={{ fontWeight: "600" }}>
                    {" "}
                    {arrival.advancePayment?arrival.advancePayment:0}
                  </Text>
                </Text>
              </View>

              <View style={{ marginBottom: 12 }}>
                <Text variant="bodyMedium">
                  paymentDue : 
                  <Text style={{ fontWeight: "600" }}>
                    {" "}
                    {arrival.paymentDue?arrival.paymentDue:0}
                  </Text>
                </Text>
              </View>

              <View style={{ marginBottom: 12 }}>
                <Text variant="bodyMedium">
                  Front Desk : 
                  <Text style={{ fontWeight: "600" }}>
                    {" "}
                    {arrival.frontDeskExecutiveName}
                  </Text>
                </Text>
              </View>


              {/* 🔹 ACTION BUTTON */}
            

            </Card.Content>
          </Card>
        )
    })
    :  <Text  style={{textAlign:'center',padding:40,fontSize:15,fontWeight: "600"}}>No arrival scheduled for today</Text>
  }
    </ScrollView>
    </>
)
}
export default Arrival