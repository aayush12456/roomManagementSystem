import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpPage from './src/Pages/signUpPage/signUpPage';
import LoginPage from './src/Pages/signUpPage/loginPage/loginPage';
import { Provider } from 'react-redux';
import store from './src/Redux/Store/store';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
 <NavigationContainer>
      <Stack.Navigator>
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
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
