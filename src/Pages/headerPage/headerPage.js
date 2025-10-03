import Header from "../../components/common/header/header"
import { useEffect,useState } from "react"
import { useDispatch,useSelector } from "react-redux";
import * as SecureStore from 'expo-secure-store';
import { getHotelDetailsAsync } from "../../Redux/Slice/getHotelDetailSlice/getHotelDetailSlice";
import { useNavigation } from '@react-navigation/native';
const HeaderPage=()=>{
    const [loginObj, setLoginObj] = useState(null);
    const [profileObj,setProfileObj]=useState({})
    const dispatch=useDispatch()
    const navigation = useNavigation();
    const hotelDetailSelector=useSelector((state)=>state.getHotelDetails.getHotelDetailsObj.hotelObj)
    const updateHotelDetailSelector=useSelector((state)=>state?.updateMyProfiles?.updateMyProfileObj?.updatedData)
    console.log('hotel update',updateHotelDetailSelector)
    console.log('hotel details',hotelDetailSelector)
    const oldNumber=useSelector((state)=>state?.updateMyProfiles?.updateMyProfileObj?.oldPhone)
    const newNumber=useSelector((state)=>state?.updateMyProfiles?.updateMyProfileObj?.newPhone)

    useEffect(()=>{
  if(oldNumber!==newNumber){
removeLoginData()
navigation.navigate('LoginPage')
  }
    },[oldNumber,newNumber])

    const removeLoginData = async () => {
      try {
        await SecureStore.deleteItemAsync('loginOtpObj');
        console.log('login obj removed from SecureStore');
      } catch (error) {
        console.error('Error removing login obj:', error);
      }
    };
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
       console.log('login obj is',loginObj)
      const phone=loginObj?.phone
      console.log('phone is',phone)
      const id=loginObj?.matchedHotels[0]?._id

      useEffect(()=>{
        if(id){
        dispatch(getHotelDetailsAsync(id))
        }
        },[id])

          
        function findByPhone(obj, phone) {
            for (let key in obj) {
              if (typeof obj[key] === "object" && obj[key] !== null) {
                if (obj[key].phone === phone) {
                  return obj[key];
                }
                const result = findByPhone(obj[key], phone);
                if (result) return result;
              }
            }
            return null;
          }
          
          const finalHotelDetailSelector =
          updateHotelDetailSelector && Object.keys(updateHotelDetailSelector).length > 0
            ? updateHotelDetailSelector
            : hotelDetailSelector;

          useEffect(() => {
            if (finalHotelDetailSelector && phone) {
              const matchedObj = findByPhone(finalHotelDetailSelector, phone);
              if (matchedObj) {
                setProfileObj(matchedObj);
              } else {
                console.log("Phone not found!");
                setProfileObj(null); // safe reset
              }
            }
          }, [finalHotelDetailSelector, phone]);  
          console.log('profile obj is',profileObj)
          console.log('profile obj is',profileObj)
return (
    <>
    <Header profile={profileObj}/>
    </>
)
}
export default HeaderPage