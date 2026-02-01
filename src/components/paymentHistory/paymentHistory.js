import {View,Image, ScrollView,Dimensions} from 'react-native'
import { Card, Text } from "react-native-paper";
import infoIcon from '../../../assets/settingIcon/info.png'
import { LinearGradient } from "expo-linear-gradient";

const PaymentHistory=({paymentHistory,paymentActive})=>{
    // console.log('pays',paymentHistory)
    // console.log('pay active',paymentActive)
    const { height } = Dimensions.get("window");
    const CARD_HEIGHT = height * 0.5;  
return (
    <>
<View style={{marginTop:25}}>
    <View>
        <Text style={{paddingLeft:16,fontSize:14}}>Your Monthly Payment</Text>
       {paymentActive?.activeSubscription? <Card  style={{marginLeft:12,marginRight:12,marginTop:12,overflow:'hidden' }}>
        <LinearGradient
    colors={["#4A00E0", "#8E2DE2"]}   // blue → purple
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={{
      height:8,
      width: "100%",
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    }}
  />
        <Card.Content style={{marginTop:12}}>
           <View style={{flexDirection:"row",justifyContent:'space-between'}}>
            <Text style={{fontWeight:700}}>{paymentActive?.activeSubscription?.amount=='₹299'?'Monthly Plan':'6 Monthly Plan'}</Text>
            <Text style={{fontWeight:700}}>{paymentActive?.activeSubscription?.amount}</Text>
           </View>
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
           <Text style={{paddingTop:12}}>Your next billing date is <Text style={{fontWeight:700}}>{paymentActive?.activeSubscription?.endDate}</Text></Text>
           <Text style={{paddingTop:12,color:'green'}}>{paymentActive?.activeSubscription?.status}</Text>
           </View>
        </Card.Content>
        </Card>:<Text style={{paddingLeft:15,paddingTop:10,fontWeight:700}}>No active Subscription</Text>}
    </View>

    {paymentHistory.length>0?<View style={{marginTop:20}}>
    <View style={{flexDirection:"row",gap:4}}>
    <Text style={{paddingLeft:16,fontSize:14}}>Payment History </Text>
    <Image source={infoIcon} style={{width:15,height:15,marginTop:4}}/>
    </View>
    <Card  style={{ height: CARD_HEIGHT,marginLeft:12,marginRight:12,marginTop:12 }}>
    <Card.Content >
        <ScrollView>
        {
        paymentHistory?.map((pay)=>{
            return (
                <>
                <View>
                  <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:10}}>
                    <Text style={{fontWeight:700}}>
                        {pay?.startDate}
                    </Text>
                    <Text style={{fontWeight:700}}>{pay?.amount}</Text>
                  </View>
                  <Text style={{paddingTop:12}}>Subscription for {pay?.startDate}--{pay?.endDate}</Text>
                  <Text style={{paddingTop:12}}>{pay?.planId}</Text>
                  <View
          style={{
            height: 1,
            backgroundColor: "#e0e0e0",
            marginTop: 10,
            width: "100%",
          }}
        />
                </View>
                </>
            )
        })
       }
        </ScrollView>
    </Card.Content>
    </Card>
    </View>:null}
   
</View>
    </>
)
}
export default PaymentHistory