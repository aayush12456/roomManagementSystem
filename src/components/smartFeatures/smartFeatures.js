import React from 'react';
import {
  View,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import {Text} from 'react-native-paper';
import smartFeaturesImg from '../../../assets/onBoarding/smartFeatures.png';
import * as SecureStore from 'expo-secure-store';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');

const SmartFeatures = () => {
    const navigation = useNavigation();
    const handleStart = async () => {
        try {
    
          /* FLAG STORE */
          await SecureStore.setItemAsync('flag', '1');
    
          /* NAVIGATE */
          navigation.navigate('LoginPage');
    
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#F6F4FF',
        }}>

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: height * 0.05,
            paddingBottom: height * 0.035,
            paddingHorizontal: width * 0.06,
          }}>

          {/* TOP CONTENT */}
          <View
            style={{
              width: '100%',
              alignItems: 'center',
            }}>

            {/* HEADING */}
            <Text
              style={{
                fontSize: width * 0.085,
                fontWeight: '800',
                color: '#111',
                textAlign: 'center',
                lineHeight: width * 0.11,
              }}>
              Smart Features &
            </Text>

            <Text
              style={{
                fontSize: width * 0.085,
                fontWeight: '800',
                color: '#111',
                textAlign: 'center',
                lineHeight: width * 0.11,
              }}>
              Real-Time Insights
            </Text>

            {/* PURPLE LINE */}
            <View
              style={{
                width: width * 0.11,
                height: 4,
                backgroundColor: '#5A3FFF',
                borderRadius: 20,
                marginTop: height * 0.015,
                marginBottom: height * 0.02,
              }}
            />

            {/* DESCRIPTION */}
            <Text
              style={{
                textAlign: 'center',
                color: '#555',
                fontSize: width * 0.041,
                lineHeight: width * 0.06,
                fontWeight: '500',
                paddingHorizontal: width * 0.03,
              }}>
              Track performance, download reports,{'\n'}
              maintenance, advance booking and{'\n'}
              stay updated with notifications.
            </Text>

            {/* MAIN IMAGE */}
            <Image
              source={smartFeaturesImg}
              resizeMode="contain"
              style={{
                width: width * 0.95,
                height:
                  height < 700
                    ? height * 0.42
                    : height * 0.48,
                marginTop: height * 0.025,
              }}
            />
          </View>

          {/* BOTTOM SECTION */}
          <View
            style={{
              width: '100%',
              alignItems: 'center',
            }}>

            {/* DOTS */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: height * 0.025,
              }}>

              <View
                style={{
                  width: width * 0.022,
                  height: width * 0.022,
                  borderRadius: 100,
                  backgroundColor: '#D5D1F4',
                  marginHorizontal: 5,
                }}
              />

              <View
                style={{
                  width: width * 0.022,
                  height: width * 0.022,
                  borderRadius: 100,
                  backgroundColor: '#5A3FFF',
                  marginHorizontal: 5,
                }}
              />

              <View
                style={{
                  width: width * 0.022,
                  height: width * 0.022,
                  borderRadius: 100,
                  backgroundColor: '#D5D1F4',
                  marginHorizontal: 5,
                }}
              />
            </View>

            {/* BUTTON */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleStart}
              style={{
                width: width * 0.82,
                height: height * 0.07,
                backgroundColor: '#5A3FFF',
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#5A3FFF',
                shadowOffset: {
                  width: 0,
                  height: 8,
                },
                shadowOpacity: 0.3,
                shadowRadius: 10,
                elevation: 8,
              }}>

              <Text
                style={{
                  color: '#fff',
                  fontSize: width * 0.05,
                  fontWeight: '700',
                }}>
                ✓ Let’s Get Started
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SmartFeatures;