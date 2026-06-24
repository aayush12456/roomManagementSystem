import React from 'react';
import { View, Text, StatusBar, Platform,Image, Pressable } from 'react-native';
import back from '../../../../assets/profileIcon/back.png'
import { useNavigation } from "@react-navigation/native"
import { useSelector } from 'react-redux';
const AnotherHeader=({edit})=>{
    // console.log('edit',edit)
    const currentDate = new Date();

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Month 0 se start hota hai
    const year = currentDate.getFullYear();
    const navigation=useNavigation()
    const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44;
    const collageNameSelector=useSelector((state)=>state?.collageName?.passCollageName)
    console.log('collage names',collageNameSelector)
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
          else if(edit?.params?.heading==="Add account"){
            navigation.goBack();
            }
            else if(edit?.params?.heading==="Payment History"){
              navigation.goBack();
              }
              else if(edit?.params?.heading==="Privacy Policy"){
                navigation.goBack();
                }
                else if(edit?.params?.heading==="How to Use the App"){
                  navigation.goBack();
                  }
                  else if(edit?.params?.heading==="Contact Us"){
                    navigation.goBack();
                    }
                    else if(edit?.params?.heading==="Reply Mail"){
                      navigation.goBack();
                      }
                      else if(edit?.params?.heading==="Access"){
                        navigation.goBack();
                        }
            else if(edit?.params?.heading===edit?.params?.title){
              navigation.goBack();
              }
              else if(edit?.params?.heading===edit?.params?.hotelName){
                navigation.goBack();
                }
                else if(edit?.params?.heading==="Collage"){
                  navigation.goBack();
                  }
                else if(edit?.params?.heading===`New Doc ${day} - ${month} - ${year}`){
                  navigation.goBack();
                  }
                  else if(edit?.params?.heading===collageNameSelector){
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