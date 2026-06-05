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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import welcome from '../../../assets/onBoarding/welcome.png';

const {width, height} = Dimensions.get('window');

const Welcome = () => {
  const navigation = useNavigation();

  const nextButton = () => {
    navigation.navigate('RoomBookingPage');
  };

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
        }}>

        <View
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            paddingHorizontal: width * 0.05,
            paddingTop: height * 0.015,
            paddingBottom: height * 0.025,
            justifyContent: 'space-between',
          }}>

          {/* TOP IMAGE SECTION */}

          <View
            style={{
              width: '100%',
              height: height * 0.48,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}>

            <Image
              source={welcome}
              resizeMode="contain"
              style={{
                width: '100%',
                height: '100%',
              }}
            />

            {/* LEFT BED ICON */}

            <View
              style={{
                position: 'absolute',
                left: width * 0.01,
                top: height * 0.18,
                width: width * 0.15,
                height: width * 0.15,
                backgroundColor: '#fff',
                borderRadius: width * 0.045,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 6,
                shadowColor: '#000',
                shadowOpacity: 0.12,
                shadowRadius: 8,
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
              }}>

              <Ionicons
                name="bed-outline"
                size={width * 0.07}
                color="#5A3FFF"
              />
            </View>

            {/* RIGHT GRAPH ICON */}

            <View
              style={{
                position: 'absolute',
                right: width * 0.01,
                top: height * 0.11,
                width: width * 0.15,
                height: width * 0.15,
                backgroundColor: '#fff',
                borderRadius: width * 0.045,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 6,
                shadowColor: '#000',
                shadowOpacity: 0.12,
                shadowRadius: 8,
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
              }}>

              <Ionicons
                name="stats-chart"
                size={width * 0.07}
                color="#5A3FFF"
              />
            </View>
          </View>

          {/* TEXT SECTION */}

          <View
            style={{
              alignItems: 'center',
              marginTop: height * 0.005,
            }}>

            <Text
              style={{
                fontSize: width * 0.09,
                fontWeight: '800',
                textAlign: 'center',
                color: '#111',
                lineHeight: width * 0.11,
              }}>
              Welcome to
            </Text>

            <Text
              style={{
                fontSize: width * 0.09,
                fontWeight: '800',
                textAlign: 'center',
                color: '#111',
                lineHeight: width * 0.11,
              }}>

              Hotel{' '}

              <Text
                style={{
                  color: '#5A3FFF',
                  fontWeight: '800',
                }}>
                Optix
              </Text>
            </Text>

            {/* UNDERLINE */}

            <View
              style={{
                width: width * 0.10,
                height: 4,
                borderRadius: 20,
                backgroundColor: '#5A3FFF',
                marginTop: 8,
                marginBottom: 16,
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
                width: '88%',
              }}>

              Smart hotel management platform to simplify your operations and
              grow your business.
            </Text>
          </View>

          {/* FEATURE CARDS */}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              marginTop: height * 0.02,
            }}>

            {/* CARD 1 */}

            <View
              style={{
                width: width * 0.27,
                height: height * 0.11,
                backgroundColor: '#fff',
                borderRadius: width * 0.04,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 5,
                shadowColor: '#000',
                shadowOpacity: 0.08,
                shadowRadius: 8,
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
              }}>

              <Ionicons
                name="business"
                size={width * 0.07}
                color="#5A3FFF"
              />

              <Text
                style={{
                  textAlign: 'center',
                  fontSize: width * 0.03,
                  marginTop: 7,
                  fontWeight: '700',
                  color: '#222',
                }}>
                Smart{'\n'}Operations
              </Text>
            </View>

            {/* CARD 2 */}

            <View
              style={{
                width: width * 0.27,
                height: height * 0.11,
                backgroundColor: '#fff',
                borderRadius: width * 0.04,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 5,
                shadowColor: '#000',
                shadowOpacity: 0.08,
                shadowRadius: 8,
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
              }}>

              <Ionicons
                name="shield-checkmark"
                size={width * 0.07}
                color="#5A3FFF"
              />

              <Text
                style={{
                  textAlign: 'center',
                  fontSize: width * 0.03,
                  marginTop: 7,
                  fontWeight: '700',
                  color: '#222',
                }}>
                Secure &{'\n'}Reliable
              </Text>
            </View>

            {/* CARD 3 */}

            <View
              style={{
                width: width * 0.27,
                height: height * 0.11,
                backgroundColor: '#fff',
                borderRadius: width * 0.04,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 5,
                shadowColor: '#000',
                shadowOpacity: 0.08,
                shadowRadius: 8,
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
              }}>

              <Ionicons
                name="rocket"
                size={width * 0.07}
                color="#5A3FFF"
              />

              <Text
                style={{
                  textAlign: 'center',
                  fontSize: width * 0.03,
                  marginTop: 7,
                  fontWeight: '700',
                  color: '#222',
                }}>
                Grow Your{'\n'}Business
              </Text>
            </View>
          </View>

          {/* BOTTOM SECTION */}

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: height * 0.025,
            }}>

            {/* DOTS */}

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>

              {[0, 1, 2, 3].map((item, index) => (
                <View
                  key={index}
                  style={{
                    width: index === 0 ? 12 : 10,
                    height: index === 0 ? 12 : 10,
                    borderRadius: 20,
                    marginHorizontal: 5,
                    backgroundColor:
                      index === 0 ? '#5A3FFF' : '#D8D3F8',
                  }}
                />
              ))}
            </View>

            {/* NEXT BUTTON */}

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={nextButton}
              style={{
                width: width * 0.17,
                height: width * 0.17,
                borderRadius: 100,
                backgroundColor: '#5A3FFF',
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 8,
                shadowColor: '#5A3FFF',
                shadowOpacity: 0.35,
                shadowRadius: 10,
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
              }}>

              <Ionicons
                name="arrow-forward"
                size={width * 0.08}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Welcome;