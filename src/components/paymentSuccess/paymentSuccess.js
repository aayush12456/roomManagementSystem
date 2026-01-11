import React, { useEffect,useMemo,useState } from "react";
import { View, Text, Image } from "react-native";
import successImg from '../../../assets/AllIcons/successImg.gif'
import money from '../../../assets/premiumIcon/Money.gif'
import { useNavigation } from "@react-navigation/native";
const PaymentSuccess=({amount,objData})=>{
    const navigation = useNavigation();
    const [showActivatedBox, setShowActivatedBox] = useState(false); 
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //       navigation.replace("HeaderPage");
    //     }, 7000);
    
    //     return () => clearTimeout(timer);
    //   }, []);
    useEffect(() => {
        // 7 sec → show activation box
        const t1 = setTimeout(() => {
          setShowActivatedBox(true);
        }, 4000);
    
        // 11 sec → navigate (4 + 4)
        const t2 = setTimeout(() => {
          navigation.replace("HeaderPage");
        }, 8000);
    
        return () => {
          clearTimeout(t1);
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
     {showActivatedBox===false?<View
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
    </View>:null}
    {showActivatedBox===true && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.2)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              width: "85%",
              borderRadius: 20,
              padding: 25,
              alignItems: "center",
              elevation: 10,
            }}
          >
            <Image source={money} style={{ width: 90, height: 90 }} />

            <Text
              style={{
                marginTop: 15,
                fontSize: 17,
                fontWeight: "700",
                color: "#0DB57E",
                textAlign: 'center',
              }}
            >
              Subscription Activated Successfully
            </Text>
          </View>
        </View>
      )}

    </>
)
}
export default PaymentSuccess