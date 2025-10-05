import { Card, Text, Button } from "react-native-paper";
import {View,Image,Pressable} from 'react-native'
import { useNavigation } from "@react-navigation/native"
const StaffCard=({staffObj})=>{
  const navigation=useNavigation()
  const cardClickHandler=()=>{
    // console.log('hello')
    navigation.navigate('ProfileDetailsPage',{formData:staffObj,heading:'Staff Details'})
  }
return (
    <>
    <Pressable>
    <Card style={{ margin: 10, borderRadius: 10 }} onPress={cardClickHandler}>
        <Card.Content>
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
           <Image
          source={{ uri: staffObj?.image }}
          style={{
            width: 75,
            height: 75,
            borderRadius: 85,
          }}
        />
        <Text style={{ fontWeight: "500",paddingTop:20}}>{staffObj?.name}</Text>
        <Button
          mode="contained"
          buttonColor="#28a745"
          style={{ borderRadius: 25, height: 50, paddingTop: 4, fontSize: 16,marginTop:6 }}
        >
Delete
        </Button>
           </View>
        </Card.Content>
        </Card>
    </Pressable>
        
    </>

)
}
export default StaffCard