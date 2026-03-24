import Arrival from "../../components/arrival/arrival"
import io from "socket.io-client";
import axios from "axios";
import { useEffect,useState } from "react";
const socket = io.connect("http://192.168.29.169:4000")
// const socket = io.connect("https://roommanagementsystembackend-1.onrender.com")
const ArrivalPage=({hotelId})=>{
const BASE_URL = "http://192.168.29.169:4000";
// const BASE_URL = "https://roommanagementsystembackend-1.onrender.com";
const [arrivalArray,setArrivalArray]=useState([])
const [todayArrivals, setTodayArrivals] = useState([]);

  

useEffect(() => {
    const fetchRoomDetailsAdvance = async () => {
      try {
        if (hotelId) {
          const response = await axios.get(
            `${BASE_URL}/hotel/getCustomerDetailsAdvance/${hotelId}`
          );
          setArrivalArray(response?.data?.getAdvanceCustomerDetailsArray || []);
        }
      } catch (error) {}
    };

    fetchRoomDetailsAdvance();

    socket.on("getCustomerDetailsAdvance", (newUser) => {
        setArrivalArray(newUser);
    });

    return () => {
      socket.off("getCustomerDetailsAdvance");
    };
  }, [hotelId]);
  console.log('arrival ara',arrivalArray)

  useEffect(() => {
    const getTodayDate = () => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
  
      return `${day}/${month}/${year}`;
    };
  
    const todayDate = getTodayDate();
  
    const filtered = arrivalArray?.filter(
      (item) => item.selectedDate === todayDate
    );
  
    setTodayArrivals(filtered || []);
  }, [arrivalArray]);
return (
    <>
    <Arrival arrivalArray={todayArrivals}/>
    </>
)
}
export default ArrivalPage
