import { Text,Button } from "react-native-paper"
import { useEffect,useState } from "react"
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
const Dashboard=()=>{
    const navigation = useNavigation();
    const removeLoginData = async () => {
        try {
          await SecureStore.deleteItemAsync('loginOtpObj');
          console.log('login obj removed from SecureStore');
        } catch (error) {
          console.error('Error removing login obj:', error);
        }
      };
    const logoutHandler=()=>{
     removeLoginData()
     navigation.navigate('LoginPage')
    }
return (
    <>
    <Text>Hello world</Text>
    <Button
                      mode="contained"
                      style={{
                        height: 50, // Set the desired height
                        borderRadius:23,
                        color: '#FFFFFF',
                         fontSize: 16, 
                         justifyContent:'center',
                         marginLeft: 12,
                         marginTop:12,
                         marginRight: 20,
                      }}
                      buttonColor="rgba(234, 88, 12, 1)"
                      onPress={logoutHandler}
                    >
           logout
                    </Button>
    </>
)
}
export default Dashboard