import React, { useEffect, useRef, useState } from 'react';
import { 
  View, 
  Animated, 
  Dimensions, 
  StatusBar,
  Text,
  ImageBackground 
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [loading, setLoading] = useState(true);
  
  // Animation Values
  const fadeAnim = useRef(new Animated.Value(0)).current; 
  const scaleAnim = useRef(new Animated.Value(0.5)).current; 
  const moveUp = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Animation Logic
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(moveUp, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start();

    // 3.5 Seconds baad app dikhao
    const timer = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FA' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>🏠 Welcome Home!</Text>
      </View>
    );
  }

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: '#6A64F8', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Background Subtle Pattern (Optional) */}
      <View style={{ 
        position: 'absolute', 
        width: width * 1.5, 
        height: width * 1.5, 
        borderRadius: width, 
        backgroundColor: '#F0F7FF', 
        opacity: 0.5,
        zIndex: -1 
      }} />

      {/* Animated Logo Container */}
      <Animated.View style={{ 
        opacity: fadeAnim, 
        transform: [{ scale: scaleAnim }],
        alignItems: 'center'
      }}>
        <Animated.Image
          source={require('../../../assets/splash-icon.png')} 
          style={{
            width: 220,
            height: 220,
            resizeMode: 'contain',
            // Elevation for Android
            elevation: 10,
            // Shadow for iOS
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.1,
            shadowRadius: 15,
          }}
        />
      </Animated.View>

      {/* Bottom Text Animation */}
      <Animated.View style={{ 
        marginTop: 30,
        opacity: fadeAnim,
        transform: [{ translateY: moveUp }]
      }}>
        <Text style={{ 
          fontSize: 14, 
          letterSpacing: 4, 
          color: '#FFFFFF', 
          fontWeight: '600',
          textAlign: 'center'
        }}>
      SMART OPERATIONS PLATFORM
        </Text>
        
        {/* Animated Progress Bar (Unique Touch) */}
        <View style={{ 
          height: 3, 
          width: 60, 
          backgroundColor: '#FFFFFF', 
          marginTop: 10, 
          alignSelf: 'center',
          borderRadius: 2
        }} />
      </Animated.View>

      {/* Copyright Text at Bottom */}
      <View style={{ position: 'absolute', bottom: 40 }}>
        <Text style={{ color: '#FFFFFF', fontSize: 12 }}>v1.0.0</Text>
      </View>
    </View>
  );
}