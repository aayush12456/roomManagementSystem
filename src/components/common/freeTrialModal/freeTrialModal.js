import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useEffect,useState } from "react";
import TrialCountDown from "../../trialCountDown/trialCountDown";
const FreeTrialModal = ({ visible, onClose,hotelId,endDate }) => {
  const [isLast24Hours, setIsLast24Hours] = useState(false);
  console.log('last 24',isLast24Hours)
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
    >
      {/* 🔥 Background Blur */}
      <BlurView
        intensity={60}
        tint="dark"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      />

      {/* 🔲 Center Wrapper */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {/* 📦 Modal Box */}
        <View
          style={{
            width: "85%",
            backgroundColor: "#fff",
            borderRadius: 16,
            padding: 24,
            elevation: 10
          }}
        >
          {/* ❌ Close Button */}
          <TouchableOpacity
            onPress={onClose}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 10
            }}
          >
            <Ionicons name="close" size={22} color="#333" />
          </TouchableOpacity>

          {/* 📝 Content */}
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              textAlign: "center",
              marginBottom: 10
            }}
          >
            Free Trial Active
          </Text>

          {isLast24Hours==false?<Text
            style={{
              fontSize: 15,
              textAlign: "center",
              color: "#444",
              marginTop: 2
            }}
          >
            Your free trial is active upto{" "}
            <Text style={{ fontWeight: "bold", color: "#5F2EEA" }}>
              {endDate}
            </Text>
          </Text>:null}

        </View>
      </View>
    </Modal>
  );
};

export default FreeTrialModal;
