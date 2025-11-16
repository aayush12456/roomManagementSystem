import Dashboard from "../../components/dashboard/dashboard"
import { useEffect,useState } from "react"
import { useDispatch,useSelector } from "react-redux";
import * as SecureStore from 'expo-secure-store';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { getHotelDetailsAsync } from "../../Redux/Slice/getHotelDetailSlice/getHotelDetailSlice";
import { deleteRoomData } from "../../Redux/Slice/deleteRoomSlice/deleteRoomSlice";
import { addRoomData } from "../../Redux/Slice/addRoomSlice/addRoomSlice";
import { addFloorData } from "../../Redux/Slice/addFloorSlice/addFloorSlice";
import { deleteFloorData } from "../../Redux/Slice/deleteFloorSlice/deleteFloorSlice";
const DashboardPage=({profile})=>{
    const dispatch=useDispatch()
    const hotelDetailSelector=useSelector((state)=>state.getHotelDetails.getHotelDetailsObj.hotelObj)
    const addRoomSelector=useSelector((state)=>state.addRoomData.addRoomObj)
    const deleteRoomSelector=useSelector((state)=>state.deleteRoomData.deleteRoomObj)
    const addFloorSelector=useSelector((state)=>state.addFloorData.addFloorObj)
    const deleteFloorSelector=useSelector((state)=>state.deleteFloorData.deleteFloorObj)
    console.log('add floor',addFloorSelector)
    console.log('deelte room',deleteRoomSelector)
    console.log('add room selctsdddd',addRoomSelector)
    console.log('hotel details',hotelDetailSelector)
    console.log('deelte floor',deleteFloorSelector)
    const roomMssg=addRoomSelector?.mssg ||deleteRoomSelector?.mssg
    console.log('room mssg',roomMssg)
    const floorMssg=addFloorSelector?.mssg || deleteFloorSelector?.mssg
    const roomArraySelector=addRoomSelector?.matchedHotels || deleteRoomSelector?.matchedHotels|| addFloorSelector?.matchedHotels
     
  console.log('room array selector',roomArraySelector)

    const [loginObj, setLoginObj] = useState(null);
    const [finalRoomArraySelector,setFinalRoomArraySelector]=useState(null)
    
    const getLoginDataToSecureStore = async () => {
        try {
          const data = await SecureStore.getItemAsync('loginOtpObj');
          if (data) {
            const parsedData = JSON.parse(data);
            setLoginObj(parsedData)
            console.log('Retrieved login obj Data:', parsedData);
            // You can also set it to local state if needed
          } else {
            console.log('No login obj data found in SecureStore');
            setLoginObj({})
          }
        } catch (error) {
          console.error('Error retrieving SecureStore data:', error);
          setLoginObj({});
        }
        finally {
          setLoading(false); // ✅ loading done
        }
      };
    
      useEffect(() => {
        getLoginDataToSecureStore(); // ✅ function called on screen mount
      }, []);
      const id=loginObj?.matchedHotels[0]?._id
      useEffect(()=>{
      if(id){
      dispatch(getHotelDetailsAsync(id))
      }
      },[id])

    


      const finalHotelDetailSelector=roomArraySelector?roomArraySelector:hotelDetailSelector
      console.log('final hotel',finalHotelDetailSelector)
      useEffect(() => {
        if (roomMssg === "New room added successfully") {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Room Added Successfully",
            autoClose: 5000,
          });
      
          // Re-fetch hotel details
          if (id) dispatch(getHotelDetailsAsync(hotelDetailSelector?._id));
      
          // Reset add slice after a small delay (so UI can use matchedHotels)
          setTimeout(() => {
            dispatch(addRoomData());
          }, 3000);
        } 
        
        else if (roomMssg === "Room deleted successfully") {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Room Deleted Successfully",
            autoClose: 5000,
          });
      
          // Re-fetch hotel details
          if (id) dispatch(getHotelDetailsAsync(hotelDetailSelector?._id));
      
          // Reset delete slice after delay
          setTimeout(() => {
            dispatch(deleteRoomData());
          }, 1000);
        }
      }, [roomMssg,dispatch]);
      
      useEffect(()=>{
        if (floorMssg === "New Floor Added Successfully") {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Floor Added Successfully",
            autoClose: 5000,
          });
      
          // Re-fetch hotel details
          if (id) dispatch(getHotelDetailsAsync(hotelDetailSelector?._id));
      
          // Reset add slice after a small delay (so UI can use matchedHotels)
          setTimeout(() => {
            dispatch(addFloorData());
          }, 3000);
        } 

        else if (floorMssg === "Floor deleted successfully") {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Floor deleted successfully",
            autoClose: 5000,
          });
      
          // Re-fetch hotel details
          // if (id) dispatch(getHotelDetailsAsync(hotelDetailSelector?._id));
      
          // Reset delete slice after delay
          setTimeout(() => {
            dispatch(deleteFloorData());
          }, 1000);
        }
      },[floorMssg,dispatch])
return (
    <>
    <Dashboard hotelDetails={finalHotelDetailSelector} profile={profile}/>
    </>
)
}
export default DashboardPage