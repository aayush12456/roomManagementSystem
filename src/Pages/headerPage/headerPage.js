import Header from "../../components/common/header/header"
import { useEffect,useState,useRef } from "react"
import { useDispatch,useSelector } from "react-redux";
import * as SecureStore from 'expo-secure-store';
import { getHotelDetailsAsync } from "../../Redux/Slice/getHotelDetailSlice/getHotelDetailSlice";
import { useNavigation } from '@react-navigation/native';
import io from "socket.io-client";
import axios from "axios";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform,View,Text,Image,Animated } from "react-native";
import { deleteSwitchProfileData } from "../../Redux/Slice/deleteSwitchProfileSlice/deleteSwitchProfileSlice";
import FreeTrialModal from "../../components/common/freeTrialModal/freeTrialModal";
import money from '../../../assets/premiumIcon/Money.gif'
import { BlurView } from "expo-blur";


const socket = io.connect("http://192.168.29.169:4000")
// const socket = io.connect("https://roommanagementsystembackend-1.onrender.com")
const HeaderPage=({route})=>{
  const BASE_URL = "http://192.168.29.169:4000";
  // const BASE_URL = "https://roommanagementsystembackend-1.onrender.com";
  const { paymentData} = route.params || {};
  console.log("Payment Data 👉", paymentData);
  const profileData = route?.params?.profileData;
  console.log("profile Data header 👉", profileData);

  const slideAnim = useRef(new Animated.Value(-100)).current;


  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
    const [loginObj, setLoginObj] = useState(null);
    const [profileObj,setProfileObj]=useState({})
    const [allStaffOwnerObj,setAllStaffOwnerObj]=useState({})
    const [reportObj,setReportObj]=useState({})
    const [finalProfileArray,setFinalProfileArray]=useState([])
    const [expoPushToken, setExpoPushToken] = useState(null);
    const [notifyTokenObj,setNotifyTokenObj]=useState({})
    const [timeEnd,setTimeEnd]=useState({})
    const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
    const [switchVisible, setSwitchVisible] = useState(false);

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
                  console.log('visitor user in response',response?.data)
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
          console.log('hotelid',hotelId)
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

          const registerForPushNotificationsAsync = async () => {
            if (!Device.isDevice) return null;
        
            if (Platform.OS === "android") {
              await Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
              });
            }
        
            const { status } = await Notifications.requestPermissionsAsync();
            console.log('status is',status)
            if (status !== "granted") return null;
        
            return (await Notifications.getExpoPushTokenAsync()).data;
          };
        
          // useEffect(() => {
          //   if (!hotelId) return;
        
          //   const initPush = async () => {
          //     const token = await registerForPushNotificationsAsync();
          //     if (token) {
          //       await axios.post(`${BASE_URL}/hotel/addNotificationToken/${hotelId}`,  {
          //         notifyToken: token,   // ✅ backend ke according
          //         phone:phone,   // ✅ jo phone save karna ho
          //       });
          //       setExpoPushToken(token)
          //       console.log("🔥 EXPO PUSH TOKEN:", token);
          //     }
          //   };
        
          //   initPush();
          // }, [hotelId]);
          // const savePushToken = async (token) => {
          //   try {
          //     await SecureStore.setItemAsync("expoPushToken", token);
          //   } catch (e) {
          //     console.log("Token save error", e);
          //   }
          // };

          // const getSavedPushToken = async () => {
          //   try {
          //     return await SecureStore.getItemAsync("expoPushToken");
          //   } catch (e) {
          //     console.log("Token fetch error", e);
          //     return null;
          //   }
          // };

          useEffect(() => {
            if (!hotelId) return;
          
            const initPush = async () => {
              try {
                const token = await registerForPushNotificationsAsync();
                if (!token) return;
          
                const response = await axios.post(
                  `${BASE_URL}/hotel/addNotificationToken/${hotelId}`,
                  {
                    notifyToken: token,
                    phone,
                  }
                );
          
                setExpoPushToken(token);
                console.log("🔥 EXPO PUSH TOKEN:", token);
          
                // 🔥 YAHIN EMIT CHALANA HAI
                socket.emit("addNotifyToken", response?.data);
          
              } catch (err) {
                console.log("addNotificationToken error", err);
              }
            };
          
            initPush();
          }, [hotelId]);
          

          useEffect(() => {
            const fetchNotifyToken = async () => {
              try {
                if (phone) {
                  const response = await axios.get(
                    `${BASE_URL}/hotel/getNotificationToken/${hotelId}`,
                    {
                      params: {
                        token: expoPushToken,
                      },
                    }
                  );
                  console.log('notify detail response in header',response?.data)
                  setNotifyTokenObj(response?.data || {} )
                }
              } catch (error) {
                // console.error("Error fetching visitors:", error);
              }
            };
          
            fetchNotifyToken();
            socket.on("getNotifyToken", (newUser) => {
            setNotifyTokenObj(newUser)
            });
            return () => {
              socket.off("getNotifyToken");
            };
          }, [hotelId]);

          console.log('token obj',notifyTokenObj)

         
        const reportArray=reportObj?.reportArray
        // console.log('report',reportArray)
        const totalRoom=finalHotelDetailSelector?.totalRoom
        const hotelImgFirst=finalHotelDetailSelector?.hotelImg
        const hotelName=finalHotelDetailSelector?.hotelName

        const tokenArray=notifyTokenObj.notifyTokenArray?.map((item)=>item.token)
        console.log('token array',tokenArray)
        const finalTokenArray=tokenArray?.filter((token)=>token!==expoPushToken)
        console.log('final token array',finalTokenArray)
        // // console.log('filter token array',filteredTokenArray)

//         const loadSubscription = async()=>{
//           const res = await axios.get(`${BASE_URL}/hotel/free-trial/${hotelId}`);
//           setSub(res.data);
    
//           const end = new Date(res.data.endDate);   // 🔥 yeh missing tha
//           const now = new Date();
        
//           const diff = end - now;
//           setRemainingMs(diff > 0 ? diff : 0);
//          };

//          const ONE_DAY = 24 * 60 * 60 * 1000; // 24 hours

//          useEffect(() => {
//           if (!sub?.endDate) return;
        
//           const end = new Date(sub.endDate);
        
//           const timer = setInterval(() => {
//             const now = new Date();
//             const diff = end - now;
        
//             // ⛔ before 1 day → don't show countdown
//             if (diff > ONE_DAY) {
//               setRemainingMs(0);
//               return;
//             }
        
//             // ⏳ last 1 hour → start reverse timer
//             setRemainingMs(diff > 0 ? diff : 0);
        
//           }, 1000);
        
//           return () => clearInterval(timer);
//         }, [sub?.endDate]);
        
        

//         useEffect(() => {
//           if(hotelId){
//             axios.post(`${BASE_URL}/hotel/app-open/${hotelId}`);
//           }
//           loadSubscription();
//         }, [hotelId]);
        
//         const formatTime = (ms) => {
//           const totalSeconds = Math.floor(ms / 1000);
//           const days = Math.floor(totalSeconds / (3600 * 24));
//           const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
//           const minutes = Math.floor((totalSeconds % 3600) / 60);
//           const seconds = totalSeconds % 60;
        
//           return `${days}d ${hours}h ${minutes}m ${seconds}s`;
//         };
// const countDownTime=formatTime(remainingMs)    
const [showTrialModal, setShowTrialModal] = useState(false);

// 🔥 App load hote hi modal open

useEffect(() => {
  if (timeEnd?.status === "ended") {
    setShowTrialModal(false); // ❌ never open
    return;
  }

  const timer = setTimeout(() => {
    setShowTrialModal(true); // ✅ open only if NOT expired
  }, 2000);

  return () => clearTimeout(timer);
}, [timeEnd?.status]);
console.log('time nds',timeEnd)
const formatISTDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
const endDate=formatISTDate(timeEnd.endDate)
const planStatus=timeEnd.plan


useEffect(() => {
  if (paymentData?.razorpay_payment_id) {
    setShowPaymentSuccess(true);

    const timer = setTimeout(() => {
      setShowPaymentSuccess(false);
    }, 3000); // ⏱️ 3 seconds

    return () => clearTimeout(timer);
  }
}, [paymentData?.razorpay_payment_id]);

useEffect(() => {
  if (profileData?.mssg === "fetch data") {

    // ✅ 1 sec delay ke baad show
    const delayTimer = setTimeout(() => {
      setSwitchVisible(true);

      // 🔥 Slide Down Animation
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();

      // ✅ Show hone ke 3 sec baad hide
      const hideTimer = setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: -120,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setSwitchVisible(false);
        });
      }, 3000);

      return () => clearTimeout(hideTimer);

    }, 2000); // ⏳ 3 seconds delay

    return () => clearTimeout(delayTimer);
  }
}, [profileData?.mssg]);



return (
  
    <>
    <Header profile={profileObj} allStaffPlusOwner={allStaffOwnerObj} hotelId={hotelId}
     profileArrays={finalProfileArray} policeReport={reportArray} totalRoom={totalRoom} 
     hotelImgFirst={hotelImgFirst} hotelName={hotelName} notifyTokenArray={finalTokenArray} notifyToken={expoPushToken}
     setTimeEnd={setTimeEnd} planStatus={planStatus}
     />
     
     <FreeTrialModal
  visible={showTrialModal}
  onClose={() => setShowTrialModal(false)}
  hotelId={hotelId}
  endDate={endDate}
/>

{showPaymentSuccess && (
  <View
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 999,
    }}
  >
    {/* 🔥 BLUR BACKGROUND */}
    <BlurView
      intensity={50}          // blur strength (30–80 best)
      tint="dark"             // "light" | "dark" | "default"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    />

    {/* 🔥 CENTER BOX */}
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          width: "85%",
          borderRadius: 20,
          padding: 25,
          alignItems: "center",
          elevation: 10,
        }}
      >
        <Image source={money} style={{ width: 90, height: 90 }} />

        <Text
          style={{
            marginTop: 15,
            fontSize: 17,
            fontWeight: "700",
            color: "#0DB57E",
            textAlign: "center",
          }}
        >
          Subscription Activated Successfully
        </Text>
      </View>
    </View>
  </View>
)}

{switchVisible && (
  <Animated.View
    style={{
      position: "absolute",
      top: 60,
      left: 0,
      right: 0,
      zIndex: 9999,
      transform: [{ translateY: slideAnim }],
    }}
  >
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "#fff",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        opacity:0.9,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        elevation: 6,

        width: "95%",
        alignSelf: "center",
      }}
    >
      {/* Profile Image */}
      <Image
        source={{ uri: profileData?.image }}
        style={{
          width: 45,
          height: 45,
          borderRadius: 100,
          marginRight: 15,
        }}
      />

      {/* Text */}
      <Text
        style={{
          fontSize: 14,
          fontWeight: "800",
          color: "#000",
        }}
      >
        Switched to{" "}
        <Text style={{ fontWeight: "800" }}>
          {profileData?.name}
        </Text>
      </Text>
    </View>
  </Animated.View>
)}

    </>
)
}
export default HeaderPage