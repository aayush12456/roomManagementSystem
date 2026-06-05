
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

import roomBookingImg from '../../../assets/onBoarding/roomBooking.png';

const {width, height} = Dimensions.get('window');

const RoomBooking = () => {
  const navigation = useNavigation();

  const nextButton = () => {
    navigation.navigate('MultiHotelPage');
  };

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        
        {/* TOP CONTENT */}
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            paddingTop: height * 0.025,
            paddingHorizontal: width * 0.06,
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
            Easy Check-In &
          </Text>

          <Text
            style={{
              fontSize: width * 0.085,
              fontWeight: '800',
              color: '#111',
              textAlign: 'center',
              lineHeight: width * 0.11,
            }}>
            Room Booking
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
              fontSize: width * 0.040,
              lineHeight: width * 0.06,
              fontWeight: '500',
              paddingHorizontal: width * 0.04,
            }}>
            Book rooms, manage guest details and{'\n'}
            handle check-in & check-out in seconds
          </Text>
        </View>

        {/* IMAGE SECTION */}
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: height * 0.02,
          }}>
          
          <Image
            source={roomBookingImg}
            resizeMode="contain"
            style={{
              width: width,
              height: height * 0.58,
            }}
          />
        </View>

        {/* BOTTOM SECTION */}
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: width * 0.08,
            paddingBottom: height * 0.03,
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
                  width: index === 1 ? 14 : 10,
                  height: index === 1 ? 14 : 10,
                  borderRadius: 20,
                  backgroundColor:
                    index === 1 ? '#5A3FFF' : '#D8D2FF',
                  marginHorizontal: 5,
                }}
              />
            ))}
          </View>

          {/* NEXT BUTTON */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={nextButton}
            style={{
              width: width * 0.16,
              height: width * 0.16,
              backgroundColor: '#5A3FFF',
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 5,
            }}>
            
            <Ionicons
              name="arrow-forward"
              size={width * 0.075}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default RoomBooking;

