import React, { useEffect,useMemo,useState } from "react";
import { View, Text, Image } from "react-native";
import successImg from '../../../assets/AllIcons/successImg.gif'
import money from '../../../assets/premiumIcon/Money.gif'
import { useNavigation } from "@react-navigation/native";
const PaymentSuccess=({amount,objData})=>{
    const navigation = useNavigation();
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //       navigation.replace("HeaderPage");
    //     }, 7000);
    
    //     return () => clearTimeout(timer);
    //   }, []);
    useEffect(() => {
      
        const t2 = setTimeout(() => {
          // navigation.replace("HeaderPage");
          navigation.replace("HeaderPage", {
            paymentData: objData,
          });
          
        }, 4000);
    
        return () => {
          clearTimeout(t2);
        };
      }, []);
    const formattedDate = useMemo(() => {
        const date = new Date();
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
    
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
    
        hours = hours % 12 || 12; // convert 0 to 12
    
        return `${month} ${day}, ${year}, ${hours}:${minutes} ${ampm}`;
      }, []);
    
return (
    <>
     {<View
      style={{
        flex: 1,
        backgroundColor: "#0DB57E",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Top Text */}
      <Text style={{ color: "#fff", fontSize: 12, marginBottom: 5 }}>
        You will be redirected in 4 seconds
      </Text>

      <Text
        style={{
          color: "#fff",
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 30,
        }}
      >
        Payment Successful
      </Text>

      {/* GIF */}
      <Image
        source={successImg}
        style={{
          width: 140,
          height: 140,
          resizeMode: "contain",
        }}
      />

      {/* Bottom White Card */}
      <View
        style={{
          position: "absolute",
          bottom: 50,
          backgroundColor: "#fff",
          width: "90%",
          borderRadius: 16,
          padding: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        <View>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Hotel subscription </Text>

          <Text
            style={{ fontSize: 12, color: "#777" }}
          >
                   {formattedDate}
          </Text>

          <Text style={{ fontSize: 12, color: "#555" }}>{objData?.razorpay_payment_id
}</Text>
        </View>

        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{amount}</Text>
      </View>

      {/* Footer */}
      <Text
        style={{
          position: "absolute",
          bottom: 15,
          color: "#fff",
          fontSize: 12,
        }}
      >
        Secured by Razorpay
      </Text>
    </View>}


    </>
)
}
export default PaymentSuccess