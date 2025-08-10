import { Text,Button } from "react-native-paper"
import { useEffect,useState } from "react"
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { View } from "react-native";
import { ScrollView } from "react-native";
import RoomDetailCard from "../common/roomDetailCard/roomDetailCard";
import { SafeAreaView } from "react-native-safe-area-context";
const Dashboard=({hotelDetails})=>{
  console.log('hotel details is',hotelDetails)
    const navigation = useNavigation();
    const totalRoom=hotelDetails?.totalRoom
    const room=hotelDetails?.room
    // console.log('room is',Object.entries(room))
    // const hotelObj=hotelDetails?.matchedHotels[0]
    // const removeLoginData = async () => {
    //     try {
    //       await SecureStore.deleteItemAsync('loginOtpObj');
    //       console.log('login obj removed from SecureStore');
    //     } catch (error) {
    //       console.error('Error removing login obj:', error);
    //     }
    //   };
    // const logoutHandler=()=>{
    //  removeLoginData()
    //  navigation.navigate('LoginPage')
    // }
return (
    <>
    {/* {
    <Button
                      mode="contained"
                      style={{
                        height: 50, // Set the desired height
                        borderRadius:23,
                        color: '#FFFFFF',
                         fontSize: 16, 
                         justifyContent:'center',
                         marginLeft: 12,
                         marginTop:12,
                         marginRight: 20,
                      }}
                      buttonColor="rgba(234, 88, 12, 1)"
                      onPress={logoutHandler}
                    >
           logout
                    </Button> } */}
                    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:8,marginRight:8}}>
                    <View>
                   <Text>Total Rooms : {totalRoom}</Text>
                    </View>
                    <View style={{}}>
                   <Text>Booked Room</Text>
                   <Text>Non Booked Room : {totalRoom}</Text>
                    </View>
                    </View>

                    <View>
                    {/* {room && typeof room === 'object' &&
  Object.entries(room).map(([floorKey, floorRooms], floorIndex) => (
    <View key={floorIndex} style={{ marginBottom: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
        {floorKey.replace(/([a-z])([A-Z])/g, '$1 $2')}
      </Text>

      {floorRooms && typeof floorRooms === 'object' &&
        Object.entries(floorRooms).map(([roomLabel, roomData], roomIndex) => (
          <View key={roomIndex} style={{ padding: 6 }}>
            <Text style={{ fontWeight: 'bold' }}>{roomLabel}</Text>
            <Text>Room Type: {roomData.roomType}</Text>
            <Text>Bed Type: {roomData.bedType}</Text>
          </View>
        ))}
    </View>
  ))
} */}
<ScrollView  contentContainerStyle={{
    paddingBottom: 100, // last card ke liye space
  }}>
{
          room && typeof room==='object'?Object.entries(room).map(([floorKey,floorRooms],floorIndex)=>{
                        return (
                          <View style={{marginTop:12,marginLeft:8,marginRight:8}} key={floorIndex}>
                            <RoomDetailCard roomTitle={floorKey} roomDetails={floorRooms}  />
                          </View>
                        )
                      }):null
                    }
</ScrollView>

                    </View>
                    </SafeAreaView>
                    
             
    </>
)
}
export default Dashboard