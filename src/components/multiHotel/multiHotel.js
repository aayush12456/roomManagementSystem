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

import multiHotelImg from '../../../assets/onBoarding/multiHotel.png';

const {width, height} = Dimensions.get('window');

const MultiHotel = () => {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        
        {/* MAIN CONTAINER */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            paddingHorizontal: width * 0.06,
            paddingTop: height * 0.03,
            paddingBottom: height * 0.02,
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
            Multi Hotel &
          </Text>

          <Text
            style={{
              fontSize: width * 0.085,
              fontWeight: '800',
              color: '#111',
              textAlign: 'center',
              lineHeight: width * 0.11,
            }}>
            Staff Management
          </Text>

          {/* PURPLE LINE */}
          <View
            style={{
              width: width * 0.12,
              height: 4,
              backgroundColor: '#5A3FFF',
              borderRadius: 20,
              marginTop: height * 0.012,
              marginBottom: height * 0.018,
            }}
          />

          {/* DESCRIPTION */}
          <Text
            style={{
              textAlign: 'center',
              color: '#555',
              fontSize: width * 0.04,
              lineHeight: width * 0.058,
              fontWeight: '500',
              paddingHorizontal: width * 0.04,
            }}>
            Manage multiple hotels, staff, roles{'\n'}
            and permissions with full control.
          </Text>

          {/* IMAGE */}
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              marginTop: height * 0.015,
            }}>
            
            <Image
              source={multiHotelImg}
              resizeMode="contain"
              style={{
                width: width * 0.88,
                height: height * 0.28,
              }}
            />
          </View>

          {/* FEATURES BOXES */}
          <View
            style={{
              width: '100%',
              marginTop: height * 0.015,
            }}>
            
            {/* ROW 1 */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: height * 0.015,
              }}>
              
              {/* BOX 1 */}
              <View
                style={{
                  width: '31%',
                  backgroundColor: '#fff',
                  borderRadius: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: height * 0.018,
                  elevation: 3,
                }}>
                
                <Ionicons
                  name="business-outline"
                  size={width * 0.065}
                  color="#5A3FFF"
                />

                <Text
                  style={{
                    marginTop: 8,
                    textAlign: 'center',
                    fontSize: width * 0.03,
                    fontWeight: '700',
                    color: '#111',
                    lineHeight: width * 0.04,
                  }}>
                  Multiple{'\n'}Hotels
                </Text>
              </View>

              {/* BOX 2 */}
              <View
                style={{
                  width: '31%',
                  backgroundColor: '#fff',
                  borderRadius: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: height * 0.018,
                  elevation: 3,
                }}>
                
                <Ionicons
                  name="people-outline"
                  size={width * 0.065}
                  color="#5A3FFF"
                />

                <Text
                  style={{
                    marginTop: 8,
                    textAlign: 'center',
                    fontSize: width * 0.03,
                    fontWeight: '700',
                    color: '#111',
                    lineHeight: width * 0.04,
                  }}>
                  Staff{'\n'}Hierarchy
                </Text>
              </View>

              {/* BOX 3 */}
              <View
                style={{
                  width: '31%',
                  backgroundColor: '#fff',
                  borderRadius: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: height * 0.018,
                  elevation: 3,
                }}>
                
                <Ionicons
                  name="shield-checkmark-outline"
                  size={width * 0.065}
                  color="#5A3FFF"
                />

                <Text
                  style={{
                    marginTop: 8,
                    textAlign: 'center',
                    fontSize: width * 0.03,
                    fontWeight: '700',
                    color: '#111',
                    lineHeight: width * 0.04,
                  }}>
                  Role Based{'\n'}Access
                </Text>
              </View>
            </View>

            {/* ROW 2 */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              
              {/* BOX 4 */}
              <View
                style={{
                  width: '31%',
                  backgroundColor: '#fff',
                  borderRadius: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: height * 0.018,
                  elevation: 3,
                }}>
                
                <Ionicons
                  name="person-add-outline"
                  size={width * 0.065}
                  color="#5A3FFF"
                />

                <Text
                  style={{
                    marginTop: 8,
                    textAlign: 'center',
                    fontSize: width * 0.03,
                    fontWeight: '700',
                    color: '#111',
                    lineHeight: width * 0.04,
                  }}>
                  Add Owner{'\n'}& Staff
                </Text>
              </View>

              {/* BOX 5 */}
              <View
                style={{
                  width: '31%',
                  backgroundColor: '#fff',
                  borderRadius: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: height * 0.018,
                  elevation: 3,
                }}>
                
                <Ionicons
                  name="lock-closed-outline"
                  size={width * 0.065}
                  color="#5A3FFF"
                />

                <Text
                  style={{
                    marginTop: 8,
                    textAlign: 'center',
                    fontSize: width * 0.03,
                    fontWeight: '700',
                    color: '#111',
                    lineHeight: width * 0.04,
                  }}>
                  Permissions{'\n'}& Control
                </Text>
              </View>

              {/* BOX 6 */}
              <View
                style={{
                  width: '31%',
                  backgroundColor: '#fff',
                  borderRadius: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: height * 0.018,
                  elevation: 3,
                }}>
                
                <Ionicons
                  name="swap-horizontal-outline"
                  size={width * 0.065}
                  color="#5A3FFF"
                />

                <Text
                  style={{
                    marginTop: 8,
                    textAlign: 'center',
                    fontSize: width * 0.03,
                    fontWeight: '700',
                    color: '#111',
                    lineHeight: width * 0.04,
                  }}>
                  Switch{'\n'}Hotel
                </Text>
              </View>
            </View>
          </View>

          {/* BOTTOM SECTION */}
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: height * 0.03,
              paddingHorizontal: width * 0.03,
            }}>
            
            {/* DOTS */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              
              <View
                style={{
                  width: width * 0.025,
                  height: width * 0.025,
                  borderRadius: 50,
                  backgroundColor: '#D9D3FF',
                  marginHorizontal: 4,
                }}
              />

              <View
                style={{
                  width: width * 0.025,
                  height: width * 0.025,
                  borderRadius: 50,
                  backgroundColor: '#D9D3FF',
                  marginHorizontal: 4,
                }}
              />

              <View
                style={{
                  width: width * 0.03,
                  height: width * 0.03,
                  borderRadius: 50,
                  backgroundColor: '#5A3FFF',
                  marginHorizontal: 4,
                }}
              />

              <View
                style={{
                  width: width * 0.025,
                  height: width * 0.025,
                  borderRadius: 50,
                  backgroundColor: '#D9D3FF',
                  marginHorizontal: 4,
                }}
              />
            </View>

            {/* NEXT BUTTON */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('SmartFeaturesPage')}
              style={{
                width: width * 0.17,
                height: width * 0.17,
                borderRadius: 100,
                backgroundColor: '#5A3FFF',
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 8,
              }}>
              
              <Ionicons
                name="arrow-forward"
                size={width * 0.075}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default MultiHotel;