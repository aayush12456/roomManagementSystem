
import { Text,BottomNavigation } from "react-native-paper"
import { View,Dimensions } from "react-native"
import { useState,useMemo } from "react"
import Daily from "../../components/daily/daily";
import Weekly from "../../components/weekly/weekly";
const PerformancePage=({policeReport,totalRoom})=>{
const screenHeight = Dimensions.get("window").height;
console.log('polices',policeReport)
    // console.log('screen height',screenHeight)
const isSmallScreen = screenHeight <= 640;

const [index, setIndex] = useState(0);

const [routes] = useState([
    { key: 'dailyGraph', title: 'Daily', focusedIcon: 'shield-account' },
    { key: 'weeklyGraph', title: 'Weekly+Monthly', focusedIcon: 'file-document' },
  ]);

const DailyRoute = () => (
    <View style={{ flex: 1 }}>
<Daily policeReport={policeReport} totalRoom={totalRoom}/> 
    </View>
  );
  const WeeklyRoute = () => (
    <View style={{ flex: 1 }}>
<Weekly policeReport={policeReport} totalRoom={totalRoom}/>
    </View>
  );

 
  const renderScene = BottomNavigation.SceneMap({
    dailyGraph: DailyRoute,
    weeklyGraph:WeeklyRoute,
  });

return (
    <>
  <View style={{ flex: 1 }}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </View>
    </>
)
}
export default PerformancePage