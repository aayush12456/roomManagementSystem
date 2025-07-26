import loginImg from '../../../../assets/AllIcons/loginImage.png'
import { Image,View } from 'react-native'
const LoginImage=()=>{
return (
    <>
  <View style={{flex:'1',justifyContent:'center',alignItems:'center'}}>
      <Image source={loginImg} style={{width:300,height:300,resizeMode:'contain'}} />
      </View>
    </>
)
}
export default LoginImage