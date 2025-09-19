import * as React from 'react';
import { BottomNavigation,Text} from "react-native-paper"
import { View,Dimensions } from "react-native"
import { useState,useEffect } from "react"
import PoliceReport from "../policeReport/policeReport"
import { useSelector } from "react-redux"
const Report=({totalReportArray})=>{
  // console.log('total report array',totalReportArray)
    const finalDate=new Date()
    const todayDate=finalDate?.toLocaleDateString("en-GB") 
    // console.log('today date report',todayDate)
    const [filterReportArray,setFilterReportArray]=useState([])
    const dateSelector=useSelector((state)=>state.passReportObj.passReportObj)
    // console.log('date selector',dateSelector)

    const parseDate = (dateStr) => {
      const [day, month, year] = dateStr?.split('/').map(Number);
      return new Date(year, month - 1, day);
    };
    useEffect(()=>{
     if(dateSelector.type==='yesterday' || dateSelector.type === 'today'){
      const currenReport=totalReportArray?.filter((report)=> report.checkInDate===dateSelector?.dates)
      setFilterReportArray(currenReport)
    }
    else if (dateSelector.type === 'Custom') {
      // Parse startDate and endDate
      const start = parseDate(dateSelector.startDate);
      
      const end = parseDate(dateSelector.endDate);
  
      const currenReport = totalReportArray?.filter((report) => {
        const reportDate = parseDate(report.checkInDate);
        return reportDate >= start && reportDate <= end;
      });
  
      setFilterReportArray(currenReport);
    } 
    else {
      const currenReport=totalReportArray?.filter((report)=>report.checkInDate===todayDate)
      setFilterReportArray(currenReport)
          }
    },[todayDate,totalReportArray,dateSelector?.dates,dateSelector.type,dateSelector.startDate, dateSelector.endDate])
    // console.log('filter report',filterReportArray)

    const screenHeight = Dimensions.get("window").height;
    console.log('screen height',screenHeight)
    const isSmallScreen = screenHeight <= 640;

    const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'policeReport', title: 'Police Report', focusedIcon: 'shield-account' },
    { key: 'normalReport', title: 'Normal Report', focusedIcon: 'file-document' },
  ]);

  const PoliceReportRoute = () => (
    <View style={{ flex: 1 }}>
      <PoliceReport policeReport={filterReportArray} dateSelector={dateSelector} isSmallScreen={isSmallScreen} />
    </View>
  );
  
  const NormalReportRoute = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>No report selected</Text>
    </View>
  );
  const renderScene = BottomNavigation.SceneMap({
    policeReport: PoliceReportRoute,
    normalReport: NormalReportRoute,
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
export default Report

