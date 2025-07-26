import { SafeAreaView } from 'react-native-safe-area-context';
import LoginImage from "../common/loginImage/loginImage"
import signUpImg from '../../../assets/AllIcons/signupImg.png'
import { TextInput,Button } from 'react-native-paper';
import { View,Text,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const LoginForm=()=>{
    const navigation = useNavigation();
    const signUpHandler=()=>{
        navigation.navigate('SignUpPage')
    }
return (
    <>
<SafeAreaView style={{ flex: 1 }}>
<LoginImage/>
<View style={{ paddingHorizontal: 16 }}>
        <TextInput
          label="Enter your registered mobile number  "
          mode="outlined"
        />
      </View> 
      <View style={{ width: '100%', overflow: 'hidden' }}>
         <Button
                      mode="contained"
                      style={{
                        height: 50, // Set the desired height
                        borderRadius:23,
                        color: '#FFFFFF',
                         fontSize: 16, 
                         justifyContent:'center',
                         marginTop: 24,
                         marginLeft: 12,
                         marginRight: 20,
                      }}
                      buttonColor="rgba(234, 88, 12, 1)"
                    >
           SEND OTP
                    </Button>
      </View>
      <View>
        <Text style={{textAlign:'center',paddingTop:16}}>Don't have an account?</Text>
      </View>
      <View style={{flexDirection:'row', gap:6,marginTop:30,}}>
      <View>
        <Image source={signUpImg} style={{width:80,height:80,marginLeft:12}}/>
      </View>
      <View style={{width:'70%'}} >
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
                      onPress={signUpHandler}
                    >
           SIGN UP
                    </Button>
      </View>
      </View>
</SafeAreaView>
    </>
)
}
export default LoginForm