import React, { useState } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable
} from "react-native";
import DocumentScanner from "react-native-document-scanner-plugin";
import { BottomNavigation,Text,Checkbox} from "react-native-paper"
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Share from "react-native-share";
import {useSelector} from 'react-redux'

const PreviewDocumenScreen = ({ documentImgUrlArray,data,singleImg }) => {
  console.log('fata',data)
  console.log('single',singleImg)
  const [images, setImages] = useState(documentImgUrlArray || []);
  const [index, setIndex] = useState(0)
  const [selectedImages, setSelectedImages] = useState([]);
  const navigation=useNavigation()
  const collageNameSelector=useSelector((state)=>state?.collageName?.passCollageName)
  const scanDocument = async () => {
    try {
      const { scannedImages } = await DocumentScanner.scanDocument();

      if (scannedImages?.length > 0) {
        setImages((prev) => [...prev, ...scannedImages]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const shareImage = async () => {
    try {
      if (singleImg) {
        await Share.open({
          url: singleImg,
          type: "image/jpeg",
          filename:collageNameSelector
        });
        return;
      }
  
      if (images?.length > 0) {
        await Share.open({
          urls: images,
          type: "image/jpeg",
        });
        return;
      }
  
      console.log("No image available");
    } catch (error) {
      console.log(error);
    }
  };


 const routes =
  selectedImages.length > 0
    ? [
        {
          key: "delete",
          title: `Delete (${selectedImages.length})`,
          focusedIcon: "delete",
        },
      ]
    : [
        {
          key: "collage",
          title: "Collage",
          focusedIcon: "image-multiple",
        },
        {
          key: "share",
          title: "Share",
          focusedIcon: "share-variant",
        },
      ];

  const handleLongPress = (image) => {
    setSelectedImages((prev) =>
      prev.includes(image)
        ? prev.filter((item) => item !== image)
        : [...prev, image]
    );
  }
  const handleDelete = () => {
    const filteredImages = images.filter(
      (item) => !selectedImages.includes(item)
    );
  
    setImages(filteredImages);
    setSelectedImages([]);
  };
  return (
    <>
     <ScrollView contentContainerStyle={{ padding: 15 }}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
       {data === "filter" ? (
  <View
    style={{
      width: "100%",
      height: 500,
      borderRadius: 10,
      overflow: "hidden",
    }}
  >
    <Image
      source={{ uri: singleImg }}
      style={{
        width: "100%",
        height: "100%",
      }}
      resizeMode="contain"
    />
  </View>
) : (
  images?.map((item, index) => (
    <Pressable
      key={index}
      onLongPress={() => handleLongPress(item)}
      onPress={() => {
        if (selectedImages.length > 0) {
          handleLongPress(item);
        }
      }}
      style={{
        width: "48%",
        height: 200,
        borderWidth: selectedImages.includes(item) ? 3 : 1,
        borderColor: selectedImages.includes(item)
          ? "#007BFF"
          : "#ccc",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <Text
        style={{
          position: "absolute",
          top: 5,
          left: 5,
          zIndex: 1,
          backgroundColor: "white",
          paddingHorizontal: 5,
        }}
      >
        {index + 1}
      </Text>

      {selectedImages.includes(item) && (
        <View
          style={{
            position: "absolute",
            top: 5,
            right: 5,
            zIndex: 2,
            backgroundColor: "white",
            borderRadius: 20,
          }}
        >
          <Checkbox status="checked" />
        </View>
      )}

      <Image
        source={{ uri: item }}
        style={{
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
      />
    </Pressable>
  ))
)}
       { singleImg?null:<TouchableOpacity
          onPress={scanDocument}
          style={{
            width: "48%",
            height: 200,
            borderWidth: 2,
            borderStyle: "dashed",
            borderColor: "#007BFF",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
  style={{
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  }}
>
  <MaterialCommunityIcons
    name="file-document-outline"
    size={55}
    color="#007BFF"
  />

  <View
    style={{
      position: "absolute",
      right: 10,
      bottom: 12,
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: "#007BFF",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <MaterialCommunityIcons
      name="plus"
      size={18}
      color="#fff"
    />
  </View>
</View>
          <Text
            style={{
              color: "#007BFF",
              textAlign: "center",
            }}
          >
            + Tap to Add New Page
          </Text>
        </TouchableOpacity>}
      </View>
    </ScrollView>
    <BottomNavigation.Bar
      navigationState={{ index, routes }}
      onTabPress={({ route }) => {
        if (route.key === "collage") {
          console.log("Create Collage");
          navigation.navigate("CollagePageScreen", {
            images: images,
            heading:"Collage"
          });
        }

        if (route.key === "share") {
          console.log("Share Document");
          shareImage();
        }
        if (route.key === "delete") {
          handleDelete()
        }

      }}
    />
    </>
   
  );
};

export default PreviewDocumenScreen;