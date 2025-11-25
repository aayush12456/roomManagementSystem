import Header from "../../components/common/header/header"
import { useEffect,useState } from "react"
import { useDispatch,useSelector } from "react-redux";
import * as SecureStore from 'expo-secure-store';
import { getHotelDetailsAsync } from "../../Redux/Slice/getHotelDetailSlice/getHotelDetailSlice";
import { useNavigation } from '@react-navigation/native';
import io from "socket.io-client";
import axios from "axios";
import { deleteSwitchProfileData } from "../../Redux/Slice/deleteSwitchProfileSlice/deleteSwitchProfileSlice";
const socket = io.connect("http://192.168.29.169:4000")
const HeaderPage=()=>{
  const BASE_URL = "http://192.168.29.169:4000";
    const [loginObj, setLoginObj] = useState(null);
    const [profileObj,setProfileObj]=useState({})
    const [allStaffOwnerObj,setAllStaffOwnerObj]=useState({})
    const [reportObj,setReportObj]=useState({})
    const [finalProfileArray,setFinalProfileArray]=useState([])
    const dispatch=useDispatch()
    const navigation = useNavigation();
    const hotelDetailSelector=useSelector((state)=>state.getHotelDetails.getHotelDetailsObj.hotelObj)
    const updateHotelDetailSelector=useSelector((state)=>state?.updateMyProfiles?.updateMyProfileObj?.updatedData)
    const deleteSwitchProfileArray=useSelector((state)=>state?.deleteSwitchProfileData?.
    deleteSwitchProfileObj?.hotelArray)
    const deleteId=useSelector((state)=>state?.deleteSwitchProfileData?.
    deleteSwitchProfileObj?.deleteId)
    console.log('delete switch profile',deleteSwitchProfileArray)
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
      //  console.log('login obj is',loginObj)
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
          
            console.log('final hotel',finalHotelDetailSelector)
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

          useEffect(() => {
            const fetchAllStaffDetails = async () => {
              try {
                if (finalHotelDetailSelector?._id) {
                  const response = await axios.get(
                    `${BASE_URL}/hotel/getStaffPlusOwner/${finalHotelDetailSelector?._id}`
                  );
                  // console.log('visitor user in response',response?.data)
                  setAllStaffOwnerObj(response?.data || {} )
                }
              } catch (error) {
                // console.error("Error fetching visitors:", error);
              }
            };
          
            fetchAllStaffDetails();
          
            socket.on("getStaffOwnerObj", (newUser) => {
              setAllStaffOwnerObj(newUser);
            });
      
            return () => {
              socket.off("getStaffOwnerObj");
            };
          }, [finalHotelDetailSelector?._id]);
          console.log('all staff',allStaffOwnerObj)
          
          const hotelId=finalHotelDetailSelector?._id
          // console.log('hotelid',hotelId)
          const profileArray=finalHotelDetailSelector?.profileArray

          useEffect(()=>{
           if(phone){
            const array=profileArray?.filter((profile)=>profile?.loginNumber===phone)
            setFinalProfileArray(array)
           }
          },[phone,profileArray])
          // useEffect(() => {
          //   if (phone) {
          //     // loginNumber से अपने profiles निकालो
          //     let array = profileArray?.filter(
          //       (profile) => profile?.loginNumber === phone
          //     );
          
          //     // delete list के phones वाले profiles हटा दो
          //     if (deleteSwitchProfileArray?.length > 0) {
          //       array = array.filter(
          //         (profile) =>
          //           !deleteSwitchProfileArray.some(
          //             (del) => del.phone === profile.phone
          //           )
          //       );
          //     }
          
          //     setFinalProfileArray(array);
          //   }
          // }, [phone, profileArray, deleteSwitchProfileArray]);
          useEffect(() => {
            if (!deleteId) return;
          
            setFinalProfileArray((prev) => {
              // ✅ delete based on current visible profiles (not Redux array)
              const updated = prev.filter((profile) => profile?._id !== deleteId);
              return updated;
            });
          
            // ✅ backend update bhi karo (Redux slice reset karne se pehle)
            const timer = setTimeout(() => {
              dispatch(deleteSwitchProfileData());
            }, 0);
          
            return () => clearTimeout(timer);
          }, [deleteId]);
          
          
          console.log('final profile',finalProfileArray)

          //report
          useEffect(() => {
            const fetchReportDetails = async () => {
              try {
                if (hotelId) {
                  const response = await axios.get(
                    `${BASE_URL}/hotel/getCustomerDetails/${hotelId}`
                  );
                  console.log('report detail response in header',response?.data)
                  setReportObj(response?.data || {} )
                }
              } catch (error) {
                // console.error("Error fetching visitors:", error);
              }
            };
          
            fetchReportDetails();
            socket.on("getCustomerDetails", (newUser) => {
              setReportObj(newUser);
            });
    
            socket.on("updateCustomerDetails", (data) => {
              if (data.hotelId === hotelId) {
                setReportObj(prev => ({
                  ...prev,
                  reportArray: data.reportArray,
                }));
              }
            });
    
            socket.on("updatePersonalCustomerDetails", (data) => {
              if (data.hotelId === hotelId) {
                setReportObj(prev => ({
                  ...prev,
                  getCustomerDetailsArray: data.getCustomerDetailsArray,
                }));
              }
            });
            return () => {
              socket.off("getReportDetails");
              socket.off("updateCustomerDetails");
              socket.off("updatePersonalCustomerDetails");
            };
          }, [hotelId]);

        const reportArray=reportObj?.reportArray
        // console.log('report',reportArray)
        const totalRoom=finalHotelDetailSelector?.totalRoom
        const hotelImgFirst=finalHotelDetailSelector?.hotelImg1
        const hotelName=finalHotelDetailSelector?.hotelName
return (
  
    <>
    <Header profile={profileObj} allStaffPlusOwner={allStaffOwnerObj} hotelId={hotelId}
     profileArrays={finalProfileArray} policeReport={reportArray} totalRoom={totalRoom} 
     hotelImgFirst={hotelImgFirst} hotelName={hotelName} />
    </>
)
}
export default HeaderPage