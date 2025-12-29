
import { Card, Text } from "react-native-paper";
import { View, Pressable, ScrollView} from "react-native";
import { useSelector } from "react-redux";
import MaintenanceModal from '../../components/common/maintenanceModal/maintenanceModal'
import moment from "moment";
import { useState,useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
// const socket = io.connect("http://192.168.29.169:4000");
const socket = io.connect("https://roommanagementsystembackend-1.onrender.com");
const Maintenance=({roomDetails,floorName,profileName})=>{
    console.log('maintain',roomDetails)
    // const BASE_URL = "http://192.168.29.169:4000";
    const BASE_URL = "https://roommanagementsystembackend-1.onrender.com";
    const hotelDetailSelector = useSelector(
        (state) => state.getHotelDetails.getHotelDetailsObj.hotelObj
      );
      const [maintainAlert,setMaintainAlert]=useState(false)
      const [maintainObj,setMaintainObj]=useState({})
      const [mainCleanObj,setMainCleanObj]=useState({})
      const [finalMainCleanObj,setFinalMainCleanObj]=useState({})
    const selectMaintenanceHandler=(roomType,roomId,shortLabel)=>{
      const stringToday = moment().format("DD/MM/YYYY"); 
     const selectData={
        id:hotelDetailSelector?._id,
        roomId:roomId,
        roomType:roomType,
        roomNo:shortLabel,
        floorName:floorName,
        mainCleanerName:profileName,
        todayDate: stringToday 

     }
     console.log('shorts',selectData)
     setMaintainAlert(true)
     setMaintainObj(selectData)
    }

    useEffect(() => {
      const fetchMainCleanDetails = async () => {
        try {
          if (hotelDetailSelector?._id) {
            const response = await axios.get(
              `${BASE_URL}/hotel/getMaintenanceCleanRoom/${hotelDetailSelector?._id}`
            );
            setMainCleanObj(response?.data || {});
          }
        } catch (error) {}
      };
  
      fetchMainCleanDetails();
  
      socket.on("getMaintainCleanRoom", (newUser) => {
        setMainCleanObj(newUser);
      });
      return () => {
        socket.off("getMaintainCleanRoom");
      };
    }, [hotelDetailSelector?._id]);

    console.log('clen',mainCleanObj)

    const maintainCleanRoomArray=mainCleanObj?.maintainCleanRoom

    useEffect(()=>{
      if(maintainObj?.roomId){
 const obj=maintainCleanRoomArray?.find((item)=>item.roomId===maintainObj?.roomId)
 console.log('obj is',obj)
setFinalMainCleanObj(obj)
      }
    },[maintainObj?.roomId,maintainCleanRoomArray])

    console.log('final main obj',finalMainCleanObj)
return (
    <>
    <ScrollView>
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10,marginLeft:13,marginTop:15 }}>
          {roomDetails &&
            typeof roomDetails === "object" &&
            Object.entries(roomDetails).map(([roomLabel, roomData], roomIndex) => {
              const roomId = roomData?._id;
              const shortLabel = `R-${roomData?.number}`;
              const bedType = roomData.bedType
                .split(",")
                .map((item) => item.replace(" Bed", ""));
            //   const today = moment(todayDate, "DD/MM/YYYY");
            //   const current = moment(currentDate, "DD/MM/YYYY");
            //   const isMatched = customerArray?.some((cust) => cust.roomId === roomId);
            //   const isRoomBooked = customerArray
            //     ?.filter(
            //       (cust) =>
            //         !(
            //           current.isAfter(moment(cust.checkOutDate, "DD/MM/YYYY")) &&
            //           cust.roomId === roomId
            //         )
            //     )
            //     ?.some(
            //       (cust) =>
            //         cust.roomId === roomId &&
            //         today.isBetween(
            //           moment(cust.checkInDate, "DD/MM/YYYY"),
            //           moment(cust.checkOutDate, "DD/MM/YYYY"),
            //           undefined,
            //           "[]"
            //         )
            //     );

            //   const isAdvanceMatched = customerArrayAdvance.some(
            //     (cust) => cust.roomId === roomId && cust.selectedDate === currentDate
            //   );
            //   console.log('advance match',isAdvanceMatched)
            //   console.log('is match',isMatched)

            //   const hasAdvanceBooking = isAdvanceMatched;
              const roomType = roomData.roomType;
              // const isRoomMatched=maintainCleanRoomArray?.some((item)=>item?.roomId===roomId)
              const cleanMatched=maintainCleanRoomArray?.some((item)=>item?.roomId===roomId && item.type==="Clean Room")
              const maintenanceMatched=maintainCleanRoomArray?.some((item)=>item?.roomId===roomId && item.type==="Maintenance Room")
              return (
                <View key={roomIndex} style={{ padding: 6 }}>
                  <Pressable onPress={()=>selectMaintenanceHandler(roomType,roomId,shortLabel)} >
                    <View
                      style={{
                        borderWidth: cleanMatched || maintenanceMatched? 0 : 1,

                        // borderColor: `${
                        //   isAdvanceMatched && todayDate !== currentDate
                        //     ? "pink"
                        //     : isMatched && todayDate === currentDate
                        //     ? "red"
                        //     : isRoomBooked
                        //     ? "red"
                        //     : roomType === "Ac"
                        //     ? "blue"
                        //     : roomType === "Non Ac"
                        //     ? "green"
                        //     : ""
                        // }`,
                        borderRadius: 12,
                        padding: 12,
                        marginBottom: 5,
                        width: 50,
                        backgroundColor:`${cleanMatched===true?'#2ECC71':maintenanceMatched===true?'#FF9800':''}`,
          
                      }}
                    >
                      <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <Text style={{ fontWeight: "bold", textAlign: "center" }}>R-</Text>
                        <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                          {roomData?.number}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                  <Text style={{ textAlign: "center" }}>{bedType}</Text>
                </View>
              );
            })}

      
           
        </View>
    </ScrollView>
   
        <MaintenanceModal maintainAlert={maintainAlert} setMaintainAlert={setMaintainAlert} maintainObj={maintainObj}
        finalMainCleanObj={finalMainCleanObj}
        />
    </>
)
}
export default Maintenance