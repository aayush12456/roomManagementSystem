import React from 'react';
import { View, Text, StatusBar, Platform,Image, Pressable } from 'react-native';
import back from '../../../../assets/profileIcon/back.png'
import { useNavigation } from "@react-navigation/native"
const AnotherHeader=({edit})=>{
    console.log('edit',edit)
    const navigation=useNavigation()
    const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44;
    const backHandler=()=>{
    if(edit?.params?.heading==="Edit Profile"){
    navigation.goBack();
    }
    else if(edit?.params?.heading==="Staff Details"){
      navigation.goBack();
      }
      else if(edit?.params?.heading==="Manager Details"){
        navigation.goBack();
        }
        else if(edit?.params?.heading==="Owner Details"){
          navigation.goBack();
          }
    }
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
 <Pressable onPress={backHandler}>
 <View>
<Image source={back} style={{width:20,height:20}} />
</View>
    </Pressable>       
      

        {/* Title centered visually. Use flex so title stays centered while left icon takes fixed width */}
        <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: 20 }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 20,
              fontWeight: '500',
              color: '#111',
            }}
          >
            {edit?.params?.heading}
          </Text>
        </View>

        {/* Right placeholder (keeps title visually centered). empty view same width as left */}
        <View style={{ width: 36 }} />
      </View>
    </>
)
}
export default AnotherHeader