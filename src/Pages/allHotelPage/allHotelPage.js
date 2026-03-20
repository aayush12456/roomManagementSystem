import AllHotel from "../../components/allHotel/allHotel"
import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { getAllHotelDetailsAsync } from "../../Redux/Slice/getAllHotelSlice/getAllHotelSlice"
import { View, Text, StatusBar, Platform,Image, Pressable } from 'react-native';
const AllHotelPage=()=>{
    const dispatch=useDispatch()
    const allHotelSelector=useSelector((state)=>state.getAllHotelData.getAllHotelDetailsObj)
    console.log('all hotels',allHotelSelector)
    const id='1'
    useEffect(()=>{
    if(id){
    dispatch(getAllHotelDetailsAsync(id))
    }
    },[id])
    const hotelArray=allHotelSelector.getAllHotelArray
    console.log('hotel array',hotelArray)

    const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44;
return (
    <>
           <StatusBar translucent barStyle="dark-content" />
           <View
        style={{
          backgroundColor: '#ffffff',
          paddingTop: STATUS_BAR_HEIGHT+14,
          // header total height looks approx 88-96 in the screenshot (status + toolbar)
          paddingBottom:22,
          paddingHorizontal: 16,

      
          // align items in row
          flexDirection: 'row',
          alignItems: 'center',
          height: STATUS_BAR_HEIGHT + 64,
        }}
      >
      <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: 20 }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 20,
              fontWeight: '500',
              color: '#111',
            }}
          >
         All Hotel List
          </Text>
        </View>
        </View>
    <AllHotel hotelArray={hotelArray}/>
    </>
)
}
export default AllHotelPage