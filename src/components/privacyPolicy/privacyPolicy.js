import {ScrollView, View,Image,Linking} from 'react-native'
import { Card, Text, Button } from "react-native-paper";
import { privacyPolicyData } from '../../utils/policyData';
const PrivacyPolicy=()=>{
  const openFullPolicy = () => {
    Linking.openURL("https://hotel-optix-privacy.netlify.app/"); 
    // 🔴 yaha apna real privacy policy URL daalna
  };
return (
    <>
    <ScrollView>
    <View>
    <View>
        <Text style={{paddingLeft:12,paddingTop:12}}>
            <Text style={{fontWeight:'800'}}>Effective Date :
            </Text>
            <Text> 27 February 2026</Text>
        </Text>
    </View>
    <View>
    <Card style={{ margin: 10, borderRadius: 10 }}>
    <Text style={{paddingLeft:12,paddingTop:12}}>
            <Text style={{fontWeight:'800',fontSize:15}}>Application Name :
            </Text>
            <Text style={{fontSize:15}}> HotelOptix</Text>
        </Text>
        <View style={{height: 1,backgroundColor: "#E5E7EB",marginTop: 8,marginHorizontal: 32,}}/>
        <Text style={{paddingLeft:12,paddingTop:12,paddingBottom:12}}>
            <Text style={{fontWeight:'800',fontSize:15}}>Service Provider / Developer :
            </Text>
            <Text style={{fontSize:15}}> Aayush Tapadia</Text>
        </Text>
    </Card>
    </View>
{
     privacyPolicyData.map((policy,index)=>{
        return (
                <Card key={index} style={{ margin: 10, borderRadius: 10 }} >
                    <View style={{flexDirection:'row',gap:0}}>
                     <Image source={policy.img} style={{width:15,height:18,marginTop:12,marginLeft:12}}/>
                     <Text style={{fontWeight:'800',fontSize:15,paddingLeft:12,paddingTop:12}} >{policy.title}</Text>
                    </View>
                    <View style={{height: 1,backgroundColor: "#E5E7EB",marginTop: 8,marginHorizontal: 32,}}/>
                    <View style={{ padding: 12 }}>
          {policy.points.map((point, i) => (
            <View key={i} style={{ flexDirection: 'row', marginBottom: 6 }}>
              <Text style={{ marginRight: 6 }}>•</Text>
              <Text style={{ flex: 1, fontSize: 14, lineHeight: 20 }}>
                {point}
              </Text>
            </View>
          ))}
        </View>
                </Card>

        )
     })
}
    </View>
    <View style={{ marginTop: 20, marginBottom: 30 }}>
      <Button
       mode="contained"
        onPress={openFullPolicy}
        buttonColor="#007BFF"
        style={{  color:"#ffffff"}}
      >
          View Full Privacy Policy →
        </Button>
    </View>
    </ScrollView>
    </>
)
}
export default PrivacyPolicy