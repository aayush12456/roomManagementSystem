import RazorpayCheckout from "react-native-razorpay";
import {View,Alert} from 'react-native'
import { Text,Button } from "react-native-paper";
import axios from "axios";
const Payment=({hotelId})=>{
  const BASE_URL = "http://192.168.29.169:4000";
  const subscribe = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/hotel/create/${hotelId}`,
        { planId: "plan_RziUw1NAukBSo5" },
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
        .then(() => {
          Alert.alert(
            "Payment Success",
            "Invoice & subscription will be updated automatically via webhook."
          );
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
       <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>
        Upgrade to Pro Plan
      </Text>

      {/* 👉 YAHAN BUTTON ME payNow CALL HO RHA */}
      <Button  style={{width:100,height:50,backgroundColor:'orange',color:'white'}} onPress={subscribe}>
      Pay ₹499
        </Button>
    </View>
    </>
)
}
export default Payment