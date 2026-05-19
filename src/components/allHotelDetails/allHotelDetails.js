import { ScrollView } from "react-native"
import { Text,Card,Button } from "react-native-paper"
import { View,Image} from "react-native"
import { useEffect,useState } from "react"
import { useNavigation } from '@react-navigation/native';
import { useDispatch,useSelector } from "react-redux"
import { getPaymentHistoryAsync } from "../../Redux/Slice/getPaymentHistorySlice/getPaymentHistorySlice"
import { getPaymentActiveAsync } from "../../Redux/Slice/getPaymentActiveSlice/getPaymentActiveSlice"
import { deleteAdminStaffOwnerAsync } from "../../Redux/Slice/deleteAdminStaffOwnerSlice/deleteAdminStaffOwnerSlice"
import io from "socket.io-client";
import axios from "axios";
const socket = io.connect("http://192.168.29.169:4000")
// const socket = io.connect("https://roommanagementsystembackend-1.onrender.com")
const AllHotelDetails=({hotelDetails})=>{
    // console.log('detus',hotelDetails)
    const BASE_URL = "http://192.168.29.169:4000";
    // const BASE_URL = "https://roommanagementsystembackend-1.onrender.com";  
    const dispatch=useDispatch()
    const navigation = useNavigation();
    const [staffList, setStaffList] = useState([])
    const [ownerList, setOwnerList] = useState([])
    useEffect(()=>{
        if(hotelDetails?._id){
        dispatch(getPaymentHistoryAsync(hotelDetails?._id))
        }
            },[hotelDetails?._id])

            useEffect(()=>{
                if(hotelDetails?._id){
                dispatch(getPaymentActiveAsync(hotelDetails?._id))
                }
                    },[hotelDetails?._id])

            const paymentHistorySelector=useSelector((state)=>state.getPaymentHistory.getPaymentHistoryObj)
            // console.log('pay history',paymentHistorySelector)
            const paymentActiveSelector=useSelector((state)=>state.getPaymentActive.getPaymentActiveObj)
            // console.log('pay select',paymentActiveSelector)
            const subscriptionArray=paymentHistorySelector?.subscriptionArray

            const deleteStaffSelector=useSelector((state)=>state.deleteAdminStaffOwnerData.deleteAdminStaffOwnerObj)
            // console.log('delete staff',deleteStaffSelector)



  useEffect(() => {
    const staff = Object.values(hotelDetails?.staff || {})
    setStaffList(staff)
    const owners = Object.values(hotelDetails || {}).filter(
      (item) => item?.name && item?.phone && item?.address && item?.image && item?.imagePublicId
    )
    setOwnerList(owners)
  }, [hotelDetails])
  
  useEffect(() => {
    if (deleteStaffSelector?.deletedStaffId) {
      setStaffList((prev) =>
        prev.filter(
          (staff) => staff._id !== deleteStaffSelector.deletedStaffId
        )
      )
    }
  }, [deleteStaffSelector])

  useEffect(() => {

    if (deleteStaffSelector?.deletedOwnerPhone) {
  
      setOwnerList((prev) =>
        prev.filter(
          (owner) => owner.phone !== deleteStaffSelector.deletedOwnerPhone
        )
      )
  
    }
  
  }, [deleteStaffSelector?.deletedOwnerPhone])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
  
    const day = date.getDate()
    const month = date.toLocaleString("en-US", { month: "long" })
    const year = date.getFullYear()
  
    return `${day} ${month} ${year}`
  }

const deleteStaffHandler=async(staff)=>{
// console.log('staf is',staff)
const staffObject = {
    id:hotelDetails?._id,
    staffId: staff?._id,
    imgUrl: staff?.image,
    message:'staff'
  };
  const deleteNameObj={
    id:hotelDetails?._id,
    name:staff.name
  }
dispatch(deleteAdminStaffOwnerAsync(staffObject))

try {
  const response = await axios.post(`${BASE_URL}/hotel/deleteName/${deleteNameObj.id}`,deleteNameObj);
  // console.log('response in delete obj is',response?.data)
  
  socket.emit('deleteName', response?.data)
} catch (error) {
  console.error('Error sending activate', error);
}
}

const deleteOwnerHandler=async(owner)=>{
const ownerObject={
  id:hotelDetails?._id,
    imgUrl: owner?.image,
    phone:owner?.phone,
    message:'owner'
}
dispatch(deleteAdminStaffOwnerAsync(ownerObject))
// console.log('ownrer ong',ownerObject)
const deleteNameObj={
  id:hotelDetails?._id,
  name:owner.name
}
try {
  const response = await axios.post(`${BASE_URL}/hotel/deleteName/${deleteNameObj.id}`,deleteNameObj);
  // console.log('response in delete obj is',response?.data)
  
  socket.emit('deleteName', response?.data)
} catch (error) {
  console.error('Error sending activate', error);
}
}

const replyHandler=(data)=>{
// console.log('data is',data)
navigation.navigate('ReplyPage',{heading:'Reply Mail',profile:data,hotelId:hotelDetails?._id,hotelName:hotelDetails?.hotelName})
}
const accessHandler=(data)=>{
  // console.log('data is',data)
  navigation.navigate('AccessPage',{heading:'Access',profile:data,hotelId:hotelDetails?._id,hotelName:hotelDetails?.hotelName})
  }
return (
    <>
    <ScrollView>
     <Card style={{ margin: 10, borderRadius: 10 }}>
     <Image
  source={{ uri: hotelDetails?.hotelImg }}
  style={{
    width: "100%",
    height: 200,
    borderRadius: 10
  }}
/>
<View>
    <Text style={{paddingLeft:12,paddingTop:10,fontWeight:"700",fontSize:16}}>{hotelDetails?.hotelName}</Text>
    <Text style={{paddingLeft:12,paddingTop:12,paddingBottom:12}}>
            <Text style={{fontSize:15}}>Registration No : 
            </Text>
            <Text style={{fontSize:15}}> {hotelDetails?.hotelRegistrationNumber}</Text>
        </Text>
        <Text style={{paddingLeft:12,paddingTop:4,paddingBottom:12}}>
            <Text style={{fontSize:15}}>Register Date : 
            </Text>
            <Text style={{fontSize:15}}> {hotelDetails?.registerDate}</Text>
        </Text>
        <View style={{flexDirection:'row',gap:20}}>
        <Text style={{paddingLeft:12}}>
            <Text style={{fontSize:15}}>Total Rooms : 
            </Text>
            <Text style={{fontSize:15}}> {hotelDetails?.totalRoom}</Text>
        </Text>
        <Text style={{paddingLeft:12}}>
            <Text style={{fontSize:15}}>Total Floors : 
            </Text>
            <Text style={{fontSize:15}}> {hotelDetails?.totalFloor}</Text>
        </Text>
        </View>
        {paymentActiveSelector?.msg==="Active subscription"
?<View style={{flexDirection:'row',justifyContent:"space-between",paddingLeft:12,paddingRight:12,paddingBottom:16,paddingTop:12}}>
          <Text  style={{fontSize:15}}>Pay : {paymentActiveSelector?.activeSubscription?.amount}</Text>
          <Text  style={{fontSize:15}}>{paymentActiveSelector?.activeSubscription?.startDate}</Text>
          <Text  style={{fontSize:15}}>{paymentActiveSelector?.activeSubscription?.endDate}</Text>
        </View>:null}
</View>
     </Card>

     <Card style={{ margin: 10, borderRadius: 10 }}>
     <Text style={{paddingLeft:12,paddingTop:10,fontWeight:"700",fontSize:16}}>Owner Details</Text>
     <View style={{height: 1,backgroundColor: "#E5E7EB",marginTop: 8,marginHorizontal: 32,}}/>
     <ScrollView>
     {
     ownerList.map((owner,index)=>{
            return (
                 <View
    key={index}
  >
   <View
  style={{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12
  }}
>

<View style={{flexDirection:"row",alignItems:"center",gap:10}}>

<Image
  source={{ uri: owner.image }}
  style={{ width: 50, height: 50, borderRadius: 25 }}
/>

<View style={{paddingLeft:20}}>
  <Text style={{ fontWeight: "600" }}>{owner.name}</Text>
  <Text>{owner.phone}</Text>
  <Text>{owner.address}</Text>
  <View style={{ maxWidth: 140 }}>
  <Text>
    {owner.email}
  </Text>
</View>
</View>

</View>

<View>
<Button
  mode="contained"
  buttonColor="#DC3545"
  style={{
    borderRadius: 25,
    height: 40,
    justifyContent:"center"
  }}
  onPress={()=>deleteOwnerHandler(owner)}
>
Delete
</Button>
<Button
  mode="contained"
  buttonColor="green"
  style={{
    borderRadius: 25,
    height: 40,
    justifyContent:"center",
    marginTop:20
  }}
  onPress={()=>replyHandler(owner)}
>
Reply
</Button>
<Button
  mode="contained"
  buttonColor="blue"
  style={{
    borderRadius: 25,
    height: 40,
    justifyContent:"center",
    marginTop:20
  }}
  onPress={()=>accessHandler(owner)}
>
Access
</Button>
</View>
</View>
<View style={{height: 1,backgroundColor: "#E5E7EB",marginTop: 8,marginHorizontal: 32,}}/>
  </View>

  
            )
        })
     }
     </ScrollView>
    
     </Card>
     
     <Card style={{ margin: 10, borderRadius: 10 }}>
     <Text style={{paddingLeft:12,paddingTop:10,fontWeight:"700",fontSize:16}}>Staff Details</Text>
     <View style={{height: 1,backgroundColor: "#E5E7EB",marginTop: 8,marginHorizontal: 32,}}/>
     <ScrollView>
     {
   staffList.map((staff,index)=>{
            return (
                 <View
    key={index}
  >
    <View style={{ flexDirection: "row", alignItems: "center", padding: 12,justifyContent:'space-between' }}>
    <View style={{flexDirection:"row",alignItems:"center",gap:10}}>
    <Image
      source={{ uri: staff.image }}
      style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
    />

    <View style={{paddingLeft:20}}>
      <Text style={{ fontWeight: "600" }}>{staff.name}</Text>
      <Text>{staff.phone}</Text>
      <Text>{staff.address}</Text>
      <Text style={{color:"grey"}}>{staff.post}</Text>
      <View style={{ maxWidth: 140 }}>
  <Text>
    {staff.email}
  </Text>
</View>
    </View>
    </View>
    <View>
    <Button
  mode="contained"
  buttonColor="#DC3545"
  style={{
    borderRadius: 25,
    height: 40,
    justifyContent:"center"
  }}
  onPress={()=>deleteStaffHandler(staff)}
>
  Delete
</Button>
<Button
  mode="contained"
  buttonColor="green"
  style={{
    borderRadius: 25,
    height: 40,
    justifyContent:"center",
    marginTop:20
  }}
onPress={()=>replyHandler(staff)}
>
Reply
</Button>
    </View>
    </View>
    <View style={{height: 1,backgroundColor: "#E5E7EB",marginTop: 8,marginHorizontal: 32,}}/>
  </View>
  
            )
        })
     }
     </ScrollView>
     
     </Card>

     <Card style={{ margin: 10, borderRadius: 10 }}>
     <Text style={{paddingLeft:12,paddingTop:10,fontWeight:"700",fontSize:16}}>Subscription Details</Text>
     <View style={{height: 1,backgroundColor: "#E5E7EB",marginTop: 8,marginHorizontal: 12,}}/>
     <Text style={{paddingLeft:12,paddingTop:10,fontWeight:"500",fontSize:16}}>Free</Text>
     <View style={{height: 1,backgroundColor: "#E5E7EB",marginTop: 8,marginHorizontal: 10,}}/>
     <View style={{paddingLeft:12,paddingTop:12}}>
     <Text>
Start Date : {formatDate(hotelDetails?.freeSubscription?.startDate)}
</Text>

<Text style={{paddingTop:6}}>
End Date : {formatDate(hotelDetails?.freeSubscription?.endDate)}
</Text>
     </View>
     <View style={{height: 1,backgroundColor: "#E5E7EB",marginTop: 8,marginHorizontal: 10,}}/>
     <Text style={{paddingLeft:12,paddingTop:10,fontWeight:"500",fontSize:16}}>Paid</Text>
     <View style={{height: 1,backgroundColor: "#E5E7EB",marginTop: 8,marginHorizontal: 10,}}/>
     <ScrollView>
        {
       subscriptionArray?.map((subscribeData,index)=>{
       return (
        <View key={index}>
            <View style={{flexDirection:"row",justifyContent:'space-between',paddingLeft:6,paddingRight:6,paddingTop:6}}>
            <Text>{subscribeData?.amount==="₹299"?'Monthly':'6 Monthly'}</Text>
        <Text>{subscribeData?.amount}</Text>
        <Text>{subscribeData?.startDate}</Text>
        <Text>{subscribeData?.endDate}</Text>
            </View>
            <View style={{height: 1,backgroundColor: "#E5E7EB",marginTop: 8,marginHorizontal: 10,}}/>
        </View>
       )
       })
        }
     </ScrollView>
     </Card>
    </ScrollView>
    </>
)
}
export default AllHotelDetails