import { Image,View,Pressable } from "react-native"
import { useState,useEffect } from "react"
import { Button } from "react-native-paper"
import * as ImagePicker from 'expo-image-picker';
import { useDispatch,useSelector } from "react-redux";
import { updateHotelImgAsync } from "../../Redux/Slice/updateHotelImgSlice/updateHotelImgSlice";
const HotelGallery=({hotelImg,hotelId,notifyTokenArray})=>{
    console.log('hotel img',hotelImg)
    const updateHotelImgSelector=useSelector((state)=>state?.updateHotelImg?.updateHotelImgObj?.updatedData)
    console.log('hotel upf',updateHotelImgSelector)
    const dispatch=useDispatch()
    const [hotelShow,setHotelShow]=useState(false)
    const [selectHotelImage,setSelectHotelImage]=useState("")
const hotelImgs=updateHotelImgSelector?updateHotelImgSelector.hotelImg:hotelImg
    const imgClickHandler=()=>{
     setHotelShow(true)
    }
    const pickHotelImage = async () => {
      try {
        // const result = await ImagePicker.launchImageLibraryAsync({
        //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //   allowsMultipleSelection: false, // 👈 only single image
        //   quality: 0.7,
        // });
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (!permissionResult.granted) {
          alert("Permission to access media library is required!");
          return;
        }
    
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images, // 👈 only images
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    
        if (!result.canceled) {
          setSelectHotelImage(result.assets[0].uri);
          setHotelShow(false)
        }
      } catch (err) {
        console.log(err);
      }
    };
    console.log('hotel slect',selectHotelImage)

    const imgSubmitHandler=()=>{
      const formData = new FormData()
      formData.append("id",hotelId)
      if (selectHotelImage) {
        const imageUri = selectHotelImage;
        const fileName = imageUri.split("/").pop();
        const fileType = "image/jpeg"; // ya mime-type detect karlo
    
        formData.append("updateHotelImg", {
          uri: imageUri,
          type: fileType,
          name: fileName,
        });
      }
      console.log('form data',formData)
      dispatch(updateHotelImgAsync(formData))
    }
    useEffect(()=>{
  if(updateHotelImgSelector?.hotelImg!=""){
    setSelectHotelImage("")
  }
    },[updateHotelImgSelector?.hotelImg])

  
      
return (
    <>
{!selectHotelImage?<Pressable onPress={imgClickHandler}>
<View style={{marginTop:20,marginBottom:20,marginLeft:15,marginRight:15}} >

<Image source={{uri:hotelImgs}} style={{ width:'100%', height:'90%' }}/>
</View>
    </Pressable>:null}

    {selectHotelImage?<View style={{marginTop:20,marginBottom:20,marginLeft:15,marginRight:15}} >

<Image source={{uri:selectHotelImage}} style={{ width:'100%', height:'90%' }}/>
</View>:null}

{hotelShow==true?<View
 style={{
    position: "absolute",
    top: "40%",               // center vertically
    left: "50%",              // center horizontally
    transform: [{ translateX: -50 }, { translateY: -25 }],
    zIndex: 10
  }}
>
<Button
          mode="contained"
          buttonColor="#28a745"
          style={{ borderRadius: 25, height: 50, paddingTop: 4, fontSize: 16}}
          onPress={pickHotelImage}
        >
change
        </Button>
</View>:null}

{hotelShow && (
        <Pressable
          onPress={() => setHotelShow(false)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "transparent", // invisible layer
          }}
        />
      )}
      {selectHotelImage!==""?<View style={{flexDirection:'row',
      justifyContent:'space-between',marginLeft:15,marginRight:15,marginTop:-40}}>
      <Button
          mode="contained"
          buttonColor="#28a745"
          style={{ borderRadius: 25, height: 50, paddingTop: 4, fontSize: 16}}
          onPress={()=>imgSubmitHandler()}
        >
Submit
        </Button>
        <Button
          mode="contained"
          buttonColor="#28a745"
          style={{ borderRadius: 25, height: 50, paddingTop: 4, fontSize: 16}}
          onPress={()=>setSelectHotelImage("")}
        >
Cancel
        </Button>
      </View>:null}

 

    </>
)
}
export default HotelGallery