import React from "react";
import {
  View,
  TouchableOpacity,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import DocumentScanner from "react-native-document-scanner-plugin";
import { useNavigation } from "@react-navigation/native";
const DocumentScan=()=>{
  const navigation=useNavigation()
  const currentDate = new Date();
  const { width, height } = useWindowDimensions();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Month 0 se start hota hai
  const year = currentDate.getFullYear();

  console.log("Date:", day);
  console.log("Month:", month);
  console.log("Year:", year);
    const scanDocument = async () => {
        const { scannedImages } = await DocumentScanner.scanDocument();
        if (scannedImages.length > 0) {
          console.log('screen images screen',scannedImages)
          navigation.navigate("PreviewDocumentScreen", {
            images: scannedImages,
            heading:`New Doc ${day} - ${month} - ${year}`
          });
        }
      };
return (
    <>
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F8F8FC",
      }}
    >
      <StatusBar barStyle="dark-content" />

      {/* Main Content */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: width * 0.08,
          marginBottom: height * 0.12,
    
        }}
      >
        {/* Scanner Illustration */}
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: height * 0.03,
          }}
        >
          <MaterialCommunityIcons
            name="file-document-outline"
            size={width * 0.28}
            color="#D9D6FF"
          />

          <View
            style={{
              position: "absolute",
              width: width * 0.35,
              height: 3,
              backgroundColor: "#4F46E5",
              borderRadius: 20,
            }}
          />
        </View>

        {/* Title */}
        <Text
          style={{
            fontSize:20,
            fontWeight: "700",
            color: "#111827",
            marginBottom: 12,
          }}
        >
          Scan Documents
        </Text>

        {/* Subtitle */}
        <Text
          style={{
            textAlign: "center",
            color: "#6B7280",
            fontSize: width * 0.042,
            lineHeight: width * 0.065,
            marginBottom: height * 0.04,
          }}
        >
          Tap the button below to start{"\n"}
          scanning your documents
        </Text>

        {/* Scan Button */}
        <TouchableOpacity
          onPress={scanDocument}
          activeOpacity={0.9}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",

            width: width * 0.6,
            maxWidth: 260,

            height: height * 0.075,
            minHeight: 55,

            borderRadius: 50,

            backgroundColor: "#0A66FF",

            shadowColor: "#0A66FF",
            shadowOpacity: 0.35,
            shadowRadius: 10,
            shadowOffset: {
              width: 0,
              height: 5,
            },

            elevation: 8,
          }}
        >
          <Feather
            name="maximize"
            size={width * 0.055}
            color="#fff"
          />

          <Text
            style={{
              color: "#fff",
              fontSize:16,
              fontWeight: "400",
              marginLeft: 12,
            }}
          >
            Document
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Card */}
    

    </SafeAreaView>
    </>
)
}
export default DocumentScan