import { Card,Text,Button } from "react-native-paper"
import { ScrollView, View } from "react-native"
import { useSelector } from "react-redux"
import { reportArray } from "../../utils/reportData"
import {useEffect,useState} from 'react'
const PoliceReport=({policeReport})=>{
  const [staffObj,setStaffObj]=useState({})
    const hotelDetailSelector=useSelector((state)=>state.getHotelDetails.getHotelDetailsObj.hotelObj)
    console.log('hotel ',hotelDetailSelector)
    const finalDate=new Date()
    const todayDate=finalDate.toLocaleDateString("en-GB") 
    // console.log('police report',policeReport)
    const staffArray=Object.values(hotelDetailSelector.staff)
    // console.log('staffArray',staffArray)
    useEffect(()=>{
      const postObj=staffArray?.find((staff)=>staff.post==="Hotel Supervisor")
      setStaffObj(postObj)
    },[staffArray])
    // console.log('staff obj',staffObj)
return (
    <>
 <Card style={{ margin: 10, borderRadius: 10 }}>
        <Card.Content>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 10,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Text style={{textAlign:'right'}}>Registration No:{hotelDetailSelector?.hotelRegistrationNumber}</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: "column",
                alignItems: "center",
                paddingTop: 6,
                gap: 12,
              }}
            >
            <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:6,gap:40}}>
        <Text style={{fontSize:16,color:'black',fontWeight:"800"}}>{hotelDetailSelector?.hotelName}</Text>
        <Text style={{fontSize:16,color:'black'}}>Mahakal Road Ujjain</Text>
        <View style={{flexDirection:"row",justifyContent:'space-between',gap:5}}>
        {hotelDetailSelector?.owner1?.phone? <Text style={{fontSize:16,color:'black'}}>Mob : {hotelDetailSelector?.owner1?.phone},</Text>:null}
       {hotelDetailSelector?.owner2?.phone? <Text style={{fontSize:16,color:'black'}}>{hotelDetailSelector?.owner2?.phone},</Text>:null}
       {hotelDetailSelector?.owner3?.phone? <Text style={{fontSize:16,color:'black'}}>{hotelDetailSelector?.owner3?.phone},</Text>:null}
       {hotelDetailSelector?.owner4?.phone? <Text style={{fontSize:16,color:'black'}}>{hotelDetailSelector?.owner4?.phone}</Text>:null}
        </View>
    
            </View> 
            <View style={{flexDirection:'row',justifyContent:'center',paddingTop:6,gap:40}}>
       <Text style={{fontSize:16,color:'black'}}>Manager Name : {staffObj?.name}</Text>
       <Text style={{fontSize:16,color:'black'}}>Date : {todayDate}</Text>
            </View>
            </ScrollView>
          </View>
          


<ScrollView 
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={{
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 6,
    gap: 12,
  }}
>
<View
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 10,
              backgroundColor: "#f9f9f9",
              marginTop:4
            }}
          >
           <View
  style={{
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#f9f9f9",
    marginTop: 4,
  }}
>
  {/* Header Row */}
  <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#e6e6e6",
                  borderBottomWidth: 1,
                  borderColor: "#ccc",
                  paddingVertical: 8,
                }}
              >
                {reportArray?.map((report) => (
                  <Text
                    key={report.id}
                    style={{
                      minWidth: 120,
                      textAlign: "center",
                      fontWeight: "bold",
                      paddingHorizontal: 8,
                    }}
                  >
                    {report.name}
                  </Text>
                ))}
              </View>
              <View style={{ height: 300 }}>
              <ScrollView showsVerticalScrollIndicator={true}>
{policeReport?.map((item, index) => (
                <View
                  key={item._id}
                  style={{
                    flexDirection: "row",
                    borderBottomWidth: 1,
                    borderColor: "#eee",
                    paddingVertical: 8,
                  }}
                >
                  <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>
                    {index + 1}
                  </Text>
                  <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>
                    {item.roomNo}
                  </Text>
                  <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>
                    {item.customerName}
                  </Text>
                  <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>
                    {item.customerAddress}
                  </Text>
                  <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>
                    {item.customerPhoneNumber}
                  </Text>
                  <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>
                    {item.customerOccupation}
                  </Text>
                  <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>
                    {item.reasonToStay}
                  </Text>
                  <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>
                    {item.totalCustomer}
                  </Text>
                  <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>
                    {item.customerIdProof}
                  </Text>
                  <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>
                    {item.customerCity}
                  </Text>
                  <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>
                    {item.customerDestination}
                  </Text>
                  <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>
                    {item.checkInDate}
                  </Text>
                  <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>
                    {item.checkOutDate}
                  </Text>
                  <Button
              mode="contained"
              style={{
                borderRadius: 11,
                marginLeft:20
              }}
              buttonColor="rgba(234, 88, 12, 1)"
            >
            Delete
            </Button>
                </View>
              ))}
</ScrollView>
              </View>

  {/* Data Rows */}
  
</View>

          </View>
</ScrollView>
        </Card.Content>
      </Card>
    </>
)
}
export default PoliceReport