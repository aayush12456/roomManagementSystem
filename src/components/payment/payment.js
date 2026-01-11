import RazorpayCheckout from "react-native-razorpay";
import {View,Alert,Image, ScrollView,Pressable} from 'react-native'
import { Card, Text, Button } from "react-native-paper";
import axios from "axios";
import { premiumDetails } from "../../utils/premiumData";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
// plan_RziUw1NAukBSo5 ->1 Rs plan
// plan_Rzu3d5Zlg3vI3A ->50 Rs plan
// plan_S2Vj0VT1CEKM5a -> 299 Rs plan
// plan_S2VjYWmEsj8Buc -> 699 Rs plan
const Payment=({hotelId})=>{
const BASE_URL = "http://192.168.29.169:4000";
const navigation=useNavigation()
const [planType,setPlanType]=useState('')
const [planAmount,setPlanAmount]=useState('')
const planSelect=(type,amount)=>{
setPlanType(type)
setPlanAmount(amount)
}

let plan=""
  const subscribe = async () => {
    if(planType=="single"){
      plan="plan_S2Vj0VT1CEKM5a"
    }
    else{
      plan="plan_S2VjYWmEsj8Buc"
    }
    try {
      const res = await axios.post(
        `${BASE_URL}/hotel/create/${hotelId}`,
        { planId:plan,amount:planAmount },
      );
console.log('respose razor',res)
      const options = {
        key: "rzp_test_RzIR2c4u7D5T00", // Test or Live key
        subscription_id: res.data.subscription.id ,  
        name: "Hotel App",
        description: "Weekly subscription",
        prefill: { email: "aayushtapadia28@example.com" }
      };

      RazorpayCheckout.open(options)
        .then((data) => {
          console.log('data pay',data)
          // Alert.alert(
          //   "Payment Success",
          //   "Invoice & subscription will be updated automatically via webhook."
          // );
          navigation.navigate("PaymentSuccessPage", {
            formData: {
              obj: data,          // Razorpay response
              amount: planAmount // Selected amount
            }
          });
        })
        .catch((err) => {
          Alert.alert("Payment failed", err.description);
        });
    } catch (err) {
      console.log(err);
      Alert.alert("Error creating subscription");
    }
  }
return (
    <>
     <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>

{/* MAIN CONTENT */}
<ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
  <Text style={{ textAlign: "center", paddingTop: 20,fontWeight: "600" }}>
    Choose a plan
  </Text>

{
  premiumDetails.map((premium)=>{
    return (
      <>
      <Card style={{ margin: 10, borderRadius: 10 }}>
      <Card.Content>
      {/* <ScrollView style={{ maxHeight: 200,}}   nestedScrollEnabled={true}> */}
      <ScrollView style={{ maxHeight: 200,}}>
        {
          premium.premiumData.map((premiumSub) => (
            <View
              key={premium.id}
              style={{ flexDirection: "row", gap: 10, marginTop: 8 }}
            >
              <Image source={premiumSub.img} style={{ width: 25, height: 25 }} />
              <Text>{premiumSub.name}</Text>
            </View>
          ))
        }
      </ScrollView>
      <Pressable 
        onPress={() =>planSelect(premium.monthly.type,premium.monthly.amount) }
      >
        <View
          style={{
            borderWidth: 2,
            marginTop: 20,
            padding: 15,
            borderRadius: 10,
            borderColor:planType === premium.monthly.type  ? "#2979FF" : "#ccc",
            backgroundColor:planType === premium.monthly.type  ? "#E3F2FD" : null,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 20
          }}
        >
          {/* CHECKBOX */}
          <View
            style={{
              width: 22,
              height: 22,
              borderRadius: 4,
              borderWidth: 2,
              borderColor:"#999",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent"
            }}
          >
            {
            planType === premium.monthly.type&&<Text style={{ color: "#fff", fontWeight: "bold",color:'blue' }}>✓</Text>
            }
          </View>

          {/* TEXT */}
          <View>
            <Text style={{ fontSize: 16, fontWeight: "700" }}>
           {premium.monthly.name}
            </Text>
            <Text style={{ fontSize: 14, marginTop: 5 }}>
              {premium.monthly.plan}
            </Text>
          </View>
        </View>
      </Pressable>
      </Card.Content>
      </Card>
      </>
    )
  })
}


  
</ScrollView>

{/* BOTTOM FIXED PAYMENT BOX */}
{
 planType !="" && (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 15,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: "#ddd",
        elevation: 15
      }}
    >
      <Button
        mode="contained"
        style={{ borderRadius:20, backgroundColor: "#2979FF" }}
        onPress={() => subscribe(planType)}
      >
   {planType==="single"?"Pay ₹299":"Pay ₹699"}
      </Button>
    </View>
  )
}

</View>
    </>
)
}
export default Payment