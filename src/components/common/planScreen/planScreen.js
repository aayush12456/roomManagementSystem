import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
// import { Video } from "expo-av";
import YoutubePlayer from "react-native-youtube-iframe";


import hotelImg from '../../../../assets/premiumIcon/hotelService.png'
import RazorpayCheckout from "react-native-razorpay";
import { useState } from "react";
import axios from "axios";
import { planScreenActions } from "../../../Redux/Slice/planScreenSlice/planScreenSlice";
const PlanScreen=({hotelId,profile})=>{
console.log('profile is',profile)
const dispatch=useDispatch()
const [selectedPlan, setSelectedPlan] = useState(699);
const [planType,setPlanType]=useState('')
const BASE_URL = "http://192.168.29.169:4000"; 
let plan=""
  const subscribe = async (planType) => {
    if(planType=="single"){
      plan="plan_S2Vj0VT1CEKM5a"
    }
    else{
      plan="plan_S2VjYWmEsj8Buc"
    }
    try {
      const res = await axios.post(
        `${BASE_URL}/hotel/create/${hotelId}`,
        { planId:plan,amount:`₹${selectedPlan}` },
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
          Alert.alert(
            "Payment Success",
            "Invoice & subscription will be updated automatically via webhook."
          );
        //   navigation.navigate("PaymentSuccessPage", {
        //     formData: {
        //       obj: data,          // Razorpay response
        //       amount: planAmount // Selected amount
        //     }
        //   });
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
     <View style={{ flex: 1, backgroundColor: "#000" }}>

{/* 🎥 VIDEO SECTION */}
{/* <View style={{ height: 280, backgroundColor: "#000" }}>
  <Video
    source={{ uri: "https://www.w3schools.com/html/mov_bbb.mp4" }}
    useNativeControls
    resizeMode="contain"
    style={{ width: "100%", height: "100%" }}
  />
</View> */}
<TouchableOpacity
  onPress={() => {
    dispatch(planScreenActions.planScreenVisibleToggle())
  }}
  style={{
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 6,
  }}
>
  <Ionicons name="close" size={22} color="#fff" />
</TouchableOpacity>

{/* 💳 SUBSCRIPTION SECTION */}
<ImageBackground
  source={hotelImg}
  style={{
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  }}
>

  
  {/* Dark overlay */}
  <View
    style={{
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.65)",
      padding: 20,
      justifyContent: "center",
    }}
  >
<View style={{ marginBottom: 20 }}>
  <YoutubePlayer
    height={220}
    play={false}
    videoId="kAtdMrxovcI"
  />
</View>


    <Text
      style={{
        color: "#fff",
        fontSize: 22,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 6,
      }}
    >
Your access has ended
    </Text>

    <Text
      style={{
        color: "#ccc",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 20,
      }}
    >
{!profile.post?'Recharge now to continue enjoying premium features.':'Please contact your hotel owner or administrator to activate a new subscription plan.'}
    </Text>

    {/* PLANS */}
   {!profile.post? <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
      }}
    >
      {/* 1 Month */}
      <TouchableOpacity
onPress={() => {
    setSelectedPlan(299);
    setPlanType("single"); // ya jo bhi value
  }}
  
        style={{
          width: "48%",
          backgroundColor:
          selectedPlan === 299
            ? "rgba(245,197,66,0.15)"
            : "rgba(255,255,255,0.1)",
          borderRadius: 16,
          paddingVertical: 20,
          alignItems: "center",
          borderWidth: 1,
          borderColor:selectedPlan === 299 ? "#F5C542" : "#444",
        }}
      >
        <Text
          style={{
            color: "#F5C542",
            fontSize: 24,
            fontWeight: "800",
          }}
        >
          ₹299
        </Text>
        <Text
          style={{
            color: "#fff",
            fontSize: 14,
            marginTop: 4,
          }}
        >
          1 Month
        </Text>
      </TouchableOpacity>

      {/* 6 Month */}
      <TouchableOpacity
        onPress={() => {
            setSelectedPlan(699);
            setPlanType("Six"); // ya jo bhi value
          }}
        style={{
          width: "48%",
          backgroundColor:
          selectedPlan === 699
            ? "rgba(245,197,66,0.15)"
            : "rgba(255,255,255,0.1)",
          borderRadius: 16,
          paddingVertical: 20,
          alignItems: "center",
          borderWidth: 1,
          borderColor:selectedPlan === 699 ? "#F5C542" : "#444",
        }}
      >
        <Text
          style={{
            color: "#F5C542",
            fontSize: 24,
            fontWeight: "800",
          }}
        >
          ₹699
        </Text>
        <Text
          style={{
            color: "#fff",
            fontSize: 14,
            marginTop: 4,
          }}
        >
          6 Months
        </Text>
      </TouchableOpacity>
    </View>:null}

    {/* PAY BUTTON */}
    {!profile.post?<TouchableOpacity
       onPress={() => subscribe(planType)}
      style={{
        backgroundColor: "#5865F2",
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: 16,
          fontWeight: "700",
        }}
      >
      Continue with ₹{selectedPlan}
      </Text>
    </TouchableOpacity>:null}
  </View>
</ImageBackground>
</View>
    </>
)
}
export default PlanScreen