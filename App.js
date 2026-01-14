import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { ActivityIndicator, View ,Platform} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import io from 'socket.io-client';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import store from './src/Redux/Store/store';
import SignUpPage from './src/Pages/signUpPage/signUpPage';
import LoginPage from './src/Pages/loginPage/loginPage';
import GetOtpPage from './src/Pages/getOtpPage/getOtpPage';
import DashboardPage from './src/Pages/dashboardPage/dashboardPage';
import HeaderPage from './src/Pages/headerPage/headerPage';
// import ReportPage from './src/Pages/reportPage/reportPage';
import EditProfilePage from './src/Pages/editProfilePage/editProfilePage';
import ProfileDetailsPage from './src/Pages/profileDetailsPage/profileDetailsPage';
import EditStaffProfilePage from './src/Pages/editStaffProfilePage/editStaffProfilePage';
import ProfilePage from './src/Pages/profilePage/profilePage';
import { LogBox } from 'react-native';
import ExistingAccountPage from './src/Pages/existingAccountPage/exisingAccountPage';
import { BackHandler } from "react-native";
import MaintenancePage from './src/Pages/maintenancePage/maintenancePage';
import * as Notifications from "expo-notifications";
import * as Updates from "expo-updates";
import { DevSettings } from "react-native";
import PaymentSuccessPage from './src/Pages/paymentSuccessPage/paymentSuccessPage';
import PaymentHistoryPage from './src/Pages/paymentHistoryPage/paymentHistoryPage';



LogBox.ignoreLogs([
  'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
  // "HwBackHandler.removeEventListener"
  "HwBackHandler.removeEventListener is not a function",
]);
if (!BackHandler.removeEventListener) {
  BackHandler.removeEventListener = () => {};
}
const Stack = createNativeStackNavigator();



export default function App() {
  const [loginObj, setLoginObj] = useState(null);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef(null);


  // ✅ SecureStore se login data lana
  useEffect(() => {
    const getLoginDataToSecureStore = async () => {
      try {
        const data = await SecureStore.getItemAsync('loginOtpObj');
        if (data) {
          const parsedData = JSON.parse(data);
          setLoginObj(parsedData);
          console.log('Retrieved login obj Data:', parsedData);
        } else {
          console.log('No login obj data found in SecureStore');
          setLoginObj({});
        }
      } catch (error) {
        console.error('Error retrieving SecureStore data:', error);
        setLoginObj({});
      } finally {
        setLoading(false);
      }
    };

    getLoginDataToSecureStore();
  }, []);

  
  const isLoggedIn = loginObj && loginObj.token && loginObj.token !== "";
  const hotelId = loginObj?.matchedHotels?.[0]?._id;

  // ✅ Socket setup hook (always called)
  useEffect(() => {
    if (!hotelId) return;

    if (!socketRef.current) {
      socketRef.current = io('http://192.168.29.169:4000', {
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
        pingTimeout: 60000,
        pingInterval: 25000,
      });
    // if (!socketRef.current) {
    //   socketRef.current = io('https://roommanagementsystembackend-1.onrender.com', {
    //     transports: ['websocket'],
    //     reconnection: true,
    //     reconnectionAttempts: 10,
    //     reconnectionDelay: 1000,
    //     reconnectionDelayMax: 5000,
    //     timeout: 20000,
    //     pingTimeout: 60000,
    //     pingInterval: 25000,
    //   });


      socketRef.current.emit('setup', hotelId);

      socketRef.current.on('connect', () => {
        console.log('✅ Connected to server');
        console.log('🔑 Socket ID:', socketRef.current.id);
      });

      socketRef.current.on('disconnect', () => {
        console.log('⚠️ Disconnected from server');
      });

      socketRef.current.on('connected', () => {
        console.log('🔗 Socket is connected');
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log('🔌 Socket disconnected on cleanup');
      }
    };
  }, [hotelId]);

  useEffect(() => {
    const subscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data;
        console.log("🔔 Notification clicked:", data);
  
        if (data?.type === "ROOM_ADDED"||data?.type === "FLOOR_ADDED" 
        ||data?.type === "ROOM_DELETE"||data?.type === "PROFILE_ADDED" || 
        data?.type === "PROFILE_DELETE") {
          console.log("🔄 Reloading app on THIS device only");
  
          if (__DEV__) {
            DevSettings.reload();     // dev build
          } 
          else {
            Updates.reloadAsync();    // preview / production
          }
        }
      });
  
    return () => subscription.remove();
  }, []);
  

  return (
    <Provider store={store}>
      <AlertNotificationRoot theme='dark'>
      <NavigationContainer>
        {loading ? (
          // ✅ Loader yaha render hoga
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="orange" />
          </View>
        ) : (
          // ✅ Navigation tab render hoga
          <Stack.Navigator initialRouteName={isLoggedIn ? "HeaderPage" : "LoginPage"}>
            <Stack.Screen
              name="DashboardPage"
              component={DashboardPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoginPage"
              component={LoginPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUpPage"
              component={SignUpPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="GetOtpPage"
              component={GetOtpPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HeaderPage"
              component={HeaderPage}
              options={{ headerShown: false }}
              // initialParams={{ expoPushToken }}
            />
               
              {/* <Stack.Screen
              name="ReportPage"
              component={ReportPage}
              options={{ headerShown: false }}
            /> */}
               <Stack.Screen
              name="ProfilePage"
              component={ProfilePage}
              options={{ headerShown: false }}
            />
                 <Stack.Screen
              name="EditProfilePage"
              component={EditProfilePage}
              options={{ headerShown: false }}
            />
              <Stack.Screen
              name="ProfileDetailsPage"
              component={ProfileDetailsPage}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="EditStaffProfilePage"
              component={EditStaffProfilePage}
              options={{ headerShown: false }}
            />
              <Stack.Screen
              name="ExistingAccountPage"
              component={ExistingAccountPage}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="MaintenancePage"
              component={MaintenancePage}
              options={{ headerShown: false }}
            />
              <Stack.Screen
              name="PaymentSuccessPage"
              component={PaymentSuccessPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PaymentHistoryPage"
              component={PaymentHistoryPage}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
      </AlertNotificationRoot>
    </Provider>
  );
}
