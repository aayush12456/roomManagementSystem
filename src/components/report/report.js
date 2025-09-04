import { Button} from "react-native-paper"
import { View } from "react-native"
import { useState,useEffect } from "react"
const Report=({totalReportArray})=>{
    const finalDate=new Date()
    const todayDate=finalDate.toLocaleDateString("en-GB") 
    console.log('today date report',todayDate)
    const [filterReportArray,setFilterReportArray]=useState([])

    useEffect(()=>{
    if(todayDate){
const currenReport=totalReportArray.filter((report)=>report.checkInDate===todayDate)
setFilterReportArray(currenReport)
    }
    },[todayDate])
    console.log('filter report',filterReportArray)
return (
    <>
<View style={{flexDirection:"row",justifyContent:'center'}}>
<View>
            <Button
              mode="contained"
              style={{
                height: 50,
                borderRadius: 11,
                justifyContent: "center",
                marginTop: 20,
              }}
              buttonColor="rgba(234, 88, 12, 1)"
            >
              Personal Report
            </Button>
          </View>        
</View>

    </>
)
}
export default Report