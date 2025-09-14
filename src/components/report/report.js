import { Button} from "react-native-paper"
import { View } from "react-native"
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
return (
    <>

<View>
  <PoliceReport policeReport={filterReportArray} dateSelector={dateSelector}/>
</View>
    </>
)
}
export default Report