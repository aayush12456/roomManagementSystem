import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Modal
} from "react-native";

import ViewShot from "react-native-view-shot";
import { useNavigation } from "@react-navigation/native";
import { UseDispatch, useDispatch } from "react-redux";
import { Dimensions } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { passCollageNameSliceActions } from "../../Redux/Slice/passCollageNameSlice/passCollageNameSlice";

// const PAGE_WIDTH = 350;
// const PAGE_HEIGHT = 500;
const { width ,height} = Dimensions.get("window");
const maxPageWidth = width - 16;
const maxPageHeight = height * 0.85;

let PAGE_WIDTH = maxPageWidth;
let PAGE_HEIGHT = PAGE_WIDTH * 1.414;

if (PAGE_HEIGHT > maxPageHeight) {
  PAGE_HEIGHT = maxPageHeight;
  PAGE_WIDTH = PAGE_HEIGHT / 1.414;
}

const DraggableImage = ({ uri, index }) => {
  const [imgSize, setImgSize] = useState({
    width: 180,
    height: 180,
  });

  const imgWidth = useSharedValue(180);
  const imgHeight = useSharedValue(180);

  useEffect(() => {
    Image.getSize(
      uri,
      (width, height) => {
        const maxWidth = 180;
        const ratio = width / height;

        const calculatedWidth = maxWidth;
        const calculatedHeight = maxWidth / ratio;

        setImgSize({
          width: calculatedWidth,
          height: calculatedHeight,
        });

        imgWidth.value = calculatedWidth;
        imgHeight.value = calculatedHeight;
      },
      () => {}
    );
  }, [uri]);

  const translateX = useSharedValue(20 + index * 20);
  const translateY = useSharedValue(20 + index * 20);

  const startX = useSharedValue(20 + index * 20);
  const startY = useSharedValue(20 + index * 20);

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate((event) => {
      const scaledWidth =
        imgWidth.value * scale.value;

      const scaledHeight =
        imgHeight.value * scale.value;

      const minX = -scaledWidth + 50;
      const maxX = PAGE_WIDTH - 50;

      const minY = -scaledHeight + 50;
      const maxY = PAGE_HEIGHT - 50;

      let nextX =
        startX.value + event.translationX;

      let nextY =
        startY.value + event.translationY;

      if (nextX < minX) nextX = minX;
      if (nextX > maxX) nextX = maxX;

      if (nextY < minY) nextY = minY;
      if (nextY > maxY) nextY = maxY;

      translateX.value = nextX;
      translateY.value = nextY;
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      let nextScale =
        savedScale.value * event.scale;

      if (nextScale < 0.5) nextScale = 0.5;
      if (nextScale > 4) nextScale = 4;

      scale.value = nextScale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;

      const scaledWidth =
        imgWidth.value * scale.value;

      const scaledHeight =
        imgHeight.value * scale.value;

      const minX = -scaledWidth + 50;
      const maxX = PAGE_WIDTH - 50;

      const minY = -scaledHeight + 50;
      const maxY = PAGE_HEIGHT - 50;

      if (translateX.value < minX)
        translateX.value = minX;

      if (translateX.value > maxX)
        translateX.value = maxX;

      if (translateY.value < minY)
        translateY.value = minY;

      if (translateY.value > maxY)
        translateY.value = maxY;
    });

  const gesture = Gesture.Simultaneous(
    panGesture,
    pinchGesture
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          {
            position: "absolute",
            width: imgSize.width,
            height: imgSize.height,
          },
          animatedStyle,
        ]}
      >
        <Image
          source={{ uri }}
          style={{
            width: "100%",
            height: "100%",
            borderWidth: 2,
            borderColor: "#2196F3",
          }}
          resizeMode="contain"
        />
      </Animated.View>
    </GestureDetector>
  );
};

const Collage = ({collageImgUrlArray = []}) => {
  const viewShotRef = useRef(null);
  const navigation=useNavigation()
  const dispatch=useDispatch()
  const currentDate = new Date();

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Month 0 se start hota hai
  const year = currentDate.getFullYear();
  const [showModal, setShowModal] = useState(false);
  const [imgUrl,setImgUrl]=useState('')
  const [collageText,setCollageText]=useState(`New Doc ${day} - ${month} - ${year}`)
  const saveCollage = async () => {
    try {
      const uri =
        await viewShotRef.current.capture();
        console.log('uris',uri)
        setImgUrl(uri)    
        setShowModal(true)
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   if (imgUrl) {
  //     setShowModal(true);
  //   }
  // }, [imgUrl]);

const saveCollageHandler=()=>{
  dispatch(passCollageNameSliceActions.passCollageName(collageText))
  setShowModal(false)
  navigation.navigate("PreviewDocumentScreen", {
    images:collageImgUrlArray,
    heading:collageText,
    data:'filter',
    finalImg:imgUrl
    
  });
  
}

  return (
    <>
    <GestureHandlerRootView
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#f2f2f2",
        }}
      >
       
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ViewShot
            ref={viewShotRef}
            options={{
              format: "jpg",
              quality: 1,
            }}
          >
            <View
              style={{
                width: PAGE_WIDTH,
                height: PAGE_HEIGHT+60,
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: "#ccc",
                overflow: "hidden",
              }}
            >
              {collageImgUrlArray.map(
                (item, index) => (
                  <DraggableImage
                    key={index}
                    uri={item}
                    index={index}
                  />
                )
              )}
               
            </View>
          </ViewShot>
        </View>
      </View>
    </GestureHandlerRootView>
    <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              width: "85%",
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 20,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                marginBottom: 15,
              }}
            >
              Enter Document Name
            </Text>

            <TextInput
              placeholder="Enter document name"
              value={collageText}
              autoFocus
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 10,
              }}
              onChangeText={(text)=>setCollageText(text)}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setShowModal(false);
                }}
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  marginRight: 10,
                }}
              >
                <Text style={{ color: "#666" }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={saveCollageHandler}
                style={{
                  backgroundColor: "#007AFF",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "600",
                  }}
                >
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View
  style={{
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: "#f2f2f2",
  }}
>
  <TouchableOpacity
    onPress={saveCollage}
    style={{
      height: 56,
      backgroundColor: "#007BFF",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 11,
      elevation: 3,
    }}
  >
    <Text
      style={{
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
      }}
    >
      Done
    </Text>
  </TouchableOpacity>
</View>
    </>
    
  );
};

export default Collage;