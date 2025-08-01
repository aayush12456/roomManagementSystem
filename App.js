import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpPage from './src/Pages/signUpPage/signUpPage';
import LoginPage from './src/Pages/loginPage/loginPage';
import { Provider } from 'react-redux';
import store from './src/Redux/Store/store';
import GetOtpPage from './src/Pages/getOtpPage/getOtpPage';
import DashboardPage from './src/Pages/dashboardPage/dashboardPage';
import * as SecureStore from 'expo-secure-store';
import { useEffect,useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
const Stack = createNativeStackNavigator();

export default function App() {
  const [loginObj, setLoginObj] = useState(null); // null = unknown, {} = empty
  const [loading, setLoading] = useState(true);
  const getLoginDataToSecureStore = async () => {
    try {
      const data = await SecureStore.getItemAsync('loginOtpObj');
      if (data) {
        const parsedData = JSON.parse(data);
        setLoginObj(parsedData)
        console.log('Retrieved login obj Data:', parsedData);
        // You can also set it to local state if needed
      } else {
        console.log('No login obj data found in SecureStore');
        setLoginObj({})
      }
    } catch (error) {
      console.error('Error retrieving SecureStore data:', error);
      setLoginObj({});
    }
    finally {
      setLoading(false); // ✅ loading done
    }
  };

  useEffect(() => {
    getLoginDataToSecureStore(); // ✅ function called on screen mount
  }, []);

  if (loading) {
    // ✅ Show loader while checking storage
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }
  const isLoggedIn = loginObj && loginObj.token && loginObj.token !== "";
  console.log('tokem is',loginObj.token)
  console.log('logged in',isLoggedIn)
  return (
    <Provider store={store}>
 <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "DashboardPage" : "LoginPage"}>
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
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
