import * as React from 'react';
import { BottomNavigation,Text} from "react-native-paper"
import { View,Dimensions } from "react-native"
import { useState,useEffect } from "react"
import PoliceReport from "../policeReport/policeReport"
import { useSelector } from "react-redux"
import PersonalReport from '../personalReport/personalReport';
const Report=({totalReportArray,personalReportArray,planStatus})=>{
  console.log('total report array',totalReportArray)
  console.log('personal report',personalReportArray)
    const finalDate=new Date()
    const todayDate=finalDate?.toLocaleDateString("en-GB") 
    // console.log('today date report',todayDate)
    const [filterReportArray,setFilterReportArray]=useState([])
    const [filterPersonalReportArray,setFilterPersonalReportArray]=useState([])

    const dateSelector=useSelector((state)=>state.passReportObj.passReportObj)
    console.log('date selector',dateSelector)

    const hotelDetailSelector = useSelector((state) => state.getHotelDetails.getHotelDetailsObj.hotelObj);

    const paymentActiveSelector=useSelector((state)=>state.getPaymentActive.getPaymentActiveObj)
// console.log('pay active in funal',paymentActiveSelector)

    const parseDate = (dateStr) => {
      const [day, month, year] = dateStr?.split('/').map(Number);
      return new Date(year, month - 1, day);
    };
    useEffect(()=>{
     if((dateSelector.type==='yesterday' || dateSelector.type === 'today') && dateSelector.report==="police"){
      const currenReport=totalReportArray?.filter((report)=> report.checkInDate===dateSelector?.dates)
      setFilterReportArray(currenReport)
    }
    else if((dateSelector.type==='yesterday' || dateSelector.type === 'today') && dateSelector.report==="personal"){
      const personalReport=personalReportArray?.filter((report)=> report.checkInDate===dateSelector?.dates)
      setFilterPersonalReportArray(personalReport)
    }
    else if (dateSelector.type === 'Custom' && dateSelector.report==="police" ) {
      // Parse startDate and endDate
      const start = parseDate(dateSelector.startDate);
      
      const end = parseDate(dateSelector.endDate);
  
      const currenReport = totalReportArray?.filter((report) => {
        const reportDate = parseDate(report.checkInDate);
        return reportDate >= start && reportDate <= end;
      });
  
      setFilterReportArray(currenReport);
    } 

    else if (dateSelector.type === 'Custom' && dateSelector.report==="personal" ) {
      // Parse startDate and endDate
      const start = parseDate(dateSelector.startDate);
      
      const end = parseDate(dateSelector.endDate);
  
      const currenReport = personalReportArray?.filter((report) => {
        const reportDate = parseDate(report.checkInDate);
        return reportDate >= start && reportDate <= end;
      });
  
      setFilterPersonalReportArray(currenReport);
    } 
    else {
      if(todayDate){
        const currenReport=totalReportArray?.filter((report)=>report.checkInDate===todayDate)
        setFilterReportArray(currenReport)
        const currentReport=personalReportArray?.filter((report)=>report.checkInDate===todayDate)
        setFilterPersonalReportArray(currentReport)
      }
          }
    },[todayDate,totalReportArray,dateSelector?.dates,dateSelector.type,dateSelector.startDate, dateSelector.endDate,personalReportArray,dateSelector.report])
    console.log('filter report',filterReportArray)

    const screenHeight = Dimensions.get("window").height;
    console.log('screen height',screenHeight)
    const isSmallScreen = screenHeight <= 640;

    const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'policeReport', title: 'Police Report', focusedIcon: 'shield-account' },
    { key: 'normalReport', title: 'Personal Report', focusedIcon: 'file-document' },
  ]);

  const PoliceReportRoute = () => (
    <View style={{ flex: 1 }}>
      <PoliceReport policeReport={filterReportArray} dateSelector={dateSelector} 
      isSmallScreen={isSmallScreen} hotelDetailSelector={hotelDetailSelector} planStatus={planStatus}
      paymentActiveSelector={paymentActiveSelector}/>
    </View>
  );
  
  const NormalReportRoute = () => (
  
    <View style={{ flex: 1 }}>
<PersonalReport isSmallScreen={isSmallScreen} personalReport={filterPersonalReportArray} 
hotelDetailSelector={hotelDetailSelector} dateSelector={dateSelector}
 planStatus={planStatus}   paymentActiveSelector={paymentActiveSelector} />
  </View>
  );
  const renderScene = BottomNavigation.SceneMap({
    policeReport: PoliceReportRoute,
    normalReport: NormalReportRoute,
  });
  // console.log('filter report personal',filterReportArray)
  console.log('total report',filterReportArray)
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

