import {ScrollView, View} from 'react-native'
import { Card, Text} from "react-native-paper";
import { HotelSuperviseData, generalStaffData, howToUseAppData } from '../../utils/appData';
const AppExplain=({profile})=>{
return (
    <>
        <ScrollView>
            <View>
                { !profile.post?
  howToUseAppData.map((item, index) => {
    return (
      <Card key={index} style={{ margin: 10, borderRadius: 10 }}>
        
        {/* Title Row */}
        <View style={{ flexDirection: 'row', gap: 0 }}>
          <Text
            style={{
              fontWeight: '800',
              fontSize: 15,
              paddingLeft: 12,
              paddingTop: 12
            }}
          >
            {item.id}. {item.title}
          </Text>
        </View>

        {/* Divider */}
        <View
          style={{
            height: 1,
            backgroundColor: "#E5E7EB",
            marginTop: 8,
            marginHorizontal: 12
          }}
        />

        {/* Description */}
        <Text
          style={{
            paddingHorizontal: 12,
            paddingTop: 10,
            fontSize: 14,
            color: "#6B7280",
            lineHeight: 20
          }}
        >
          {item.description}
        </Text>

        {/* Steps */}
        <View style={{ padding: 12 }}>
          {item.steps.map((step, i) => (
            <View key={i} style={{ flexDirection: 'row', marginBottom: 6 }}>
              <Text style={{ marginRight: 6 }}>•</Text>

              <Text
                style={{
                  flex: 1,
                  fontSize: 14,
                  lineHeight: 20
                }}
              >
                {step}
              </Text>
            </View>
          ))}
        </View>

      </Card>
    );
  })
:null}

{ profile.post ==="Hotel Supervisor"?
  HotelSuperviseData.map((item, index) => {
    return (
      <Card key={index} style={{ margin: 10, borderRadius: 10 }}>
        
        {/* Title Row */}
        <View style={{ flexDirection: 'row', gap: 0 }}>
          <Text
            style={{
              fontWeight: '800',
              fontSize: 15,
              paddingLeft: 12,
              paddingTop: 12
            }}
          >
            {item.id}. {item.title}
          </Text>
        </View>

        {/* Divider */}
        <View
          style={{
            height: 1,
            backgroundColor: "#E5E7EB",
            marginTop: 8,
            marginHorizontal: 12
          }}
        />

        {/* Description */}
        <Text
          style={{
            paddingHorizontal: 12,
            paddingTop: 10,
            fontSize: 14,
            color: "#6B7280",
            lineHeight: 20
          }}
        >
          {item.description}
        </Text>

        {/* Steps */}
        <View style={{ padding: 12 }}>
          {item.steps.map((step, i) => (
            <View key={i} style={{ flexDirection: 'row', marginBottom: 6 }}>
              <Text style={{ marginRight: 6 }}>•</Text>

              <Text
                style={{
                  flex: 1,
                  fontSize: 14,
                  lineHeight: 20
                }}
              >
                {step}
              </Text>
            </View>
          ))}
        </View>

      </Card>
    );
  })
:null}

{ profile.post ==="General Staff"?
  generalStaffData.map((item, index) => {
    return (
      <Card key={index} style={{ margin: 10, borderRadius: 10 }}>
        
        {/* Title Row */}
        <View style={{ flexDirection: 'row', gap: 0 }}>
          <Text
            style={{
              fontWeight: '800',
              fontSize: 15,
              paddingLeft: 12,
              paddingTop: 12
            }}
          >
            {item.id}. {item.title}
          </Text>
        </View>

        {/* Divider */}
        <View
          style={{
            height: 1,
            backgroundColor: "#E5E7EB",
            marginTop: 8,
            marginHorizontal: 12
          }}
        />

        {/* Description */}
        <Text
          style={{
            paddingHorizontal: 12,
            paddingTop: 10,
            fontSize: 14,
            color: "#6B7280",
            lineHeight: 20
          }}
        >
          {item.description}
        </Text>

        {/* Steps */}
        <View style={{ padding: 12 }}>
          {item.steps.map((step, i) => (
            <View key={i} style={{ flexDirection: 'row', marginBottom: 6 }}>
              <Text style={{ marginRight: 6 }}>•</Text>

              <Text
                style={{
                  flex: 1,
                  fontSize: 14,
                  lineHeight: 20
                }}
              >
                {step}
              </Text>
            </View>
          ))}
        </View>

      </Card>
    );
  })
:null}
            </View>
        </ScrollView>
    </>
)
}
export default AppExplain