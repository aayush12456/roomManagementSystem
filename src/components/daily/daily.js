import { Text } from "react-native-paper"
import { useState,useEffect } from "react"
import DateTimePicker from "@react-native-community/datetimepicker";
import { View,Pressable } from "react-native";
import Graph from "../common/graph/graph";
const Daily=({policeReport,totalRoom})=>{
    console.log('police',policeReport)
    console.log('total room',totalRoom)
const [showDatePicker, setShowDatePicker] = useState(false); 
const [selectedDate, setSelectedDate] = useState(new Date());  
const [dailyReportArray,setDailyReportArray]=useState([])
const finalDate=new Date()
const todayDate=finalDate.toLocaleDateString("en-GB") 

const handleDateChange = (event, date) => {

    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };
  const currentDate=selectedDate.toLocaleDateString("en-GB")
  console.log('selected date',currentDate)

  useEffect(()=>{
    if(currentDate){
const arr=policeReport.filter((police)=>police.checkInDate==currentDate)
setDailyReportArray(arr)
    }
  },[currentDate,policeReport])
  
  console.log('daily report',dailyReportArray)

  const occupiedRooms = dailyReportArray.length;
  const availableRooms = Math.max(totalRoom - occupiedRooms, 0);

const occupiedPercentage = totalRoom > 0 ? ((occupiedRooms / totalRoom) * 100).toFixed(2) : "0.00";
const availablePercentage = totalRoom > 0 ? ((availableRooms / totalRoom) * 100).toFixed(2) : "0.00";
return (
    <>
    <View style={{ flexDirection:'row',justifyContent:'center',marginTop:20 }}>
        <Pressable
        onPress={() => setShowDatePicker(true)}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 12,
          margin: 12,
          backgroundColor: "#f9f9f9",
          width:'50%'
        }}
      >
        <Text style={{ fontSize: 16, color: "#333" }}>
          {selectedDate.toLocaleDateString("en-GB")} {/* dd/mm/yyyy */}
        </Text>
      </Pressable>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            onChange={handleDateChange}
          />
        )}
      </View>
      <Graph occupied={occupiedRooms} available={availableRooms} totalRoom={totalRoom} finalTotalRoom={totalRoom}
       occupiedPercentage={occupiedPercentage} availablePercentage={availablePercentage}/>
       
      {availableRooms > 0 && availableRooms < totalRoom|| occupiedRooms > 0? <View style={{flexDirection:"row",justifyContent:'center',gap:20,paddingTop:10,paddingLeft:4}} >
       <Text style={{color:"#FF6B6B",textAlign:'center'}}>{occupiedRooms} Occupied </Text>
       <Text style={{color:"#4ECDC4",textAlign:'center'}}>{availableRooms} Available </Text>
       </View>:null}
    </>
)
}
export default Daily