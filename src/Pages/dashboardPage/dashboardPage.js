import Dashboard from "../../components/dashboard/dashboard"
import { useEffect,useState } from "react"
import { useDispatch,useSelector } from "react-redux";
import * as SecureStore from 'expo-secure-store';
import { getHotelDetailsAsync } from "../../Redux/Slice/getHotelDetailSlice/getHotelDetailSlice";
const DashboardPage=()=>{
    const dispatch=useDispatch()
    const hotelDetailSelector=useSelector((state)=>state.getHotelDetails.getHotelDetailsObj.hotelObj)
    console.log('hotel details',hotelDetailSelector)
    const [loginObj, setLoginObj] = useState(null);
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
return (
    <>
    <Dashboard hotelDetails={hotelDetailSelector}/>
    </>
)
}
export default DashboardPage