import HotelCard from "../common/hotelCard/hotelCard"
import { ScrollView,View } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
const AllHotel=({hotelArray})=>{
    const navigation = useNavigation();
    const [hotelList, setHotelList] = useState([])
    const logoutHandler=()=>{
        navigation.navigate('LoginPage')
 }
 const deleteHotelSelector=useSelector((state)=>state.deleteHotel.deleteHotelObj)
 useEffect(() => {
  if (hotelArray) {
    setHotelList(hotelArray)
  }
}, [hotelArray])

// 🔹 delete hone par filter
useEffect(() => {

  const deletedHotelId = deleteHotelSelector?.deletedImages?._id

  if (deletedHotelId) {

    setHotelList((prev) =>
      prev.filter((hotel) => hotel._id !== deletedHotelId)
    )

  }

}, [deleteHotelSelector])
return (
    <>
    <ScrollView>
    {
          hotelList?.map((hotel)=>{
            console.log('hotel admin',hotel)
            return (
                <>
<HotelCard hotelCard={hotel}/>
                </>
            )
        })
    }
      <View style={{ padding: 20, marginTop: "auto" }}>
  <Button
    mode="contained"
    buttonColor="#BEBEBE"
    textColor="#374151"
    style={{
      borderRadius: 25,
      height: 50,
      justifyContent: "center",
      elevation: 0, // shadow remove for clean look
      borderWidth:1,
      borderColor:'#E5E7EB'
    }}
    contentStyle={{
      height: 50,
    }}
    onPress={logoutHandler}
  >
    Sign Out
  </Button>
</View>
    </ScrollView>
    </>
)
}
export default AllHotel