import {useEffect,useState} from 'react'
import axios from "axios";
import { Text } from 'react-native-paper';
import { View } from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import { getPaymentActiveAsync } from '../../Redux/Slice/getPaymentActiveSlice/getPaymentActiveSlice';
const TrialCountDown=({hotelId,onLast24HoursChange,setTimeEnd})=>{
  console.log('hotel id tril',hotelId)
  const BASE_URL = "http://192.168.29.169:4000";
    const dispatch=useDispatch()
    const [sub,setSub] = useState(null);
    const [remainingMs, setRemainingMs] = useState(0);
    // const [subRemainingMs, setSubRemainingMs] = useState(0);
    const [subTimerMs, setSubTimerMs] = useState(0);

    const loadSubscription = async()=>{
      const res = await axios.get(`${BASE_URL}/hotel/free-trial/${hotelId}`);
      console.log('res load',res)
      setTimeEnd(res.data)
      setSub(res.data);
      const end = new Date(res.data.endDate);   // 🔥 yeh missing tha
      const now = new Date();
    
      const diff = end - now;
      setRemainingMs(diff > 0 ? diff : 0);
     };
    const ONE_DAY = 24 * 60 * 60 * 1000; // 24 hours

    useEffect(() => {
      if (!sub?.endDate) return;
    
      const end = new Date(sub.endDate);
    
      const timer = setInterval(() => {
        const now = new Date();
        const diff = end - now;
    
        // 🔴 expired
        if (diff <= 0) {
          setRemainingMs(0);
          return;
        }
    
        // ⛔ before last 24 hours → don't show countdown
        if (diff > ONE_DAY) {
          return;
        }
    
        // ⏳ last 24 hours
        setRemainingMs(diff);
      }, 1000);
    
      return () => clearInterval(timer);
    }, [sub?.endDate]);
    

   useEffect(() => {
    if(hotelId){
      axios.post(`${BASE_URL}/hotel/app-open/${hotelId}`);
    }
    loadSubscription();
  }, [hotelId]);
   
   const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    return `[${hours}] Hours [${minutes}] Min [${seconds}] Sec`;
  };
// const countDownTime=formatTime(remainingMs)  
const isLast24Hours = remainingMs > 0 && remainingMs <= ONE_DAY;
console.log('is lasr',isLast24Hours)
useEffect(() => {
  if (onLast24HoursChange) {
    onLast24HoursChange(isLast24Hours);
  }
}, [isLast24Hours]);




// const formatISTDate = (dateString) => {
//   if (!dateString) return "";

//   const date = new Date(dateString);

//   return date.toLocaleString("en-IN", {
//     timeZone: "Asia/Kolkata",
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };

// ✅ Hotel change होते ही पुराने countdown reset कर दो
useEffect(() => {
  setSubTimerMs(0);
}, [hotelId]);


useEffect(()=>{
  if(hotelId){
  dispatch(getPaymentActiveAsync(hotelId))
  }
      },[hotelId])
      const paymentActiveSelector=useSelector((state)=>state.getPaymentActive.getPaymentActiveObj)
      console.log('pays active',paymentActiveSelector)

      const parseCustomDate = (dateStr) => {
        if (!dateStr) return null;
      
        // "27 Jan 2026"
        const [day, month, year] = dateStr.split(" ");
      
        const months = {
          Jan: 0,
          Feb: 1,
          Mar: 2,
          Apr: 3,
          May: 4,
          Jun: 5,
          Jul: 6,
          Aug: 7,
          Sep: 8,
          Oct: 9,
          Nov: 10,
          Dec: 11,
        };
      
        return new Date(year, months[month], day);
      };
      
  //     useEffect(() => {
  //       if (!paymentActiveSelector?.activeSubscription?.endDate) return;
        
  // // ✅ Countdown sirf उसी hotel ke liye चले
  // if (paymentActiveSelector?.activeSubscription?.hotelId !== hotelId) {
  //   setSubTimerMs(0);
  //   return;
  // }
      
  //       const rawEndDate =
  //         paymentActiveSelector.activeSubscription.endDate;
      
  //       // ✅ Parse Date Properly
  //       const end = parseCustomDate(rawEndDate);
      
  //       console.log("📌 End Date String:", rawEndDate);
  //       console.log("✅ Parsed Date Object:", end);
      
  //       if (!end || isNaN(end.getTime())) {
  //         console.log("❌ Invalid Date Format");
  //         return;
  //       }
      
  //       // ✅ Countdown Timer
  //       const timer = setInterval(() => {
  //         const now = new Date();
  //         const diff = end - now;
      
  //         if (diff <= 0) {
  //           setSubTimerMs(0);
  //           console.log("❌ Subscription Expired");
  //           clearInterval(timer);
  //           return;
  //         }
  //         if (diff > ONE_DAY) {
  //           return;
  //         }
  //         // const finalTimer=formatTime(diff)
  //         setSubTimerMs(diff);
  //         console.log("⏳ Subscription Countdown:", formatTime(diff));
  //       }, 1000);
      
  //       return () => clearInterval(timer);
  //     }, [paymentActiveSelector?.activeSubscription?.endDate,paymentActiveSelector?.activeSubscription?.hotelId]);

  useEffect(() => {
    if (!paymentActiveSelector?.activeSubscription?.endDate) return;
  
    // ✅ Countdown sirf उसी hotel ke liye चले
    if (paymentActiveSelector?.activeSubscription?.hotelId !== hotelId) {
      setSubTimerMs(0);
      return;
    }
  
    const rawEndDate =
      paymentActiveSelector.activeSubscription.endDate;
  
    const end = parseCustomDate(rawEndDate);
  
    console.log("📌 End Date String:", rawEndDate);
    console.log("✅ Parsed Date Object:", end);
  
    if (!end || isNaN(end.getTime())) {
      console.log("❌ Invalid Date Format");
      setSubTimerMs(0);
      return;
    }
  
    const timer = setInterval(() => {
      const now = new Date();
      const diff = end - now;
  
      // 🔴 Expired
      if (diff <= 0) {
        setSubTimerMs(0);
        console.log("❌ Subscription Expired");
        clearInterval(timer);
        return;
      }
  
      // ⛔ Last 24 hours से ज्यादा बाकी है तो मत दिखाओ
      if (diff > ONE_DAY) {
        setSubTimerMs(0);
        return;
      }
  
      // ✅ Only last 24 hours me countdown चले
      setSubTimerMs(diff);
      console.log("⏳ Subscription Countdown:", formatTime(diff));
  
    }, 1000);
  
    return () => clearInterval(timer);
  
  }, [
    paymentActiveSelector?.activeSubscription?.endDate,
    paymentActiveSelector?.activeSubscription?.hotelId,
    hotelId
  ]);
  
  
      
      // console.log('final times',subTimerMs)
      const anotherIsLast24Hours=subTimerMs > 0 && subTimerMs <= ONE_DAY;

      useEffect(() => {
        if (anotherIsLast24Hours) {
          onLast24HoursChange(anotherIsLast24Hours);
        }
      }, [anotherIsLast24Hours]);
return (
  <>

 {/* {isLast24Hours || anotherIsLast24Hours?<View
  style={{
    marginTop: -12,
    marginHorizontal: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#5F2EEA",
    borderWidth: 1,
    borderColor: "#4C9AFF",
    shadowColor: "#4C9AFF",
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8
  }}
> */}
 {(remainingMs > 0 && remainingMs <= ONE_DAY) ||
 (subTimerMs > 0 && subTimerMs <= ONE_DAY)?<View
  style={{
    marginTop: -12,
    marginHorizontal: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#5F2EEA",
    borderWidth: 1,
    borderColor: "#4C9AFF",
    shadowColor: "#4C9AFF",
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8
  }}
>
  <Text
    style={{
      textAlign: "center",
      color: "#FFFFFF",
      fontWeight: "700",
      fontSize: 14
    }}
  >
    {/* Free Trial Ending Soon */}
    {anotherIsLast24Hours?'Subscription Ending Soon':'Free Trial Ending Soon'}
  </Text>

 {remainingMs? <Text
    style={{
      textAlign: "center",
      paddingTop: 4,
      color: "#FFD700",
      fontSize: 16,
      fontWeight: "bold"
    }}
  >
    {formatTime(remainingMs)}
  </Text>:null}
  
 {subTimerMs? <Text
    style={{
      textAlign: "center",
      paddingTop: 4,
      color: "#FFD700",
      fontSize: 16,
      fontWeight: "bold"
    }}
  >
    {formatTime(subTimerMs)}
  </Text>:null}

</View>:null}


  </>
)
}
export default TrialCountDown

// 2026-01-21T13:47:56.198+00:00
