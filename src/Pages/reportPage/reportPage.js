import Report from "../../components/report/report"
import { useEffect,useState } from "react"
import { useDispatch,useSelector } from "react-redux";
import io from "socket.io-client";
import axios from 'axios'
const socket = io.connect("http://192.168.29.169:4000")
// const socket = io.connect("https://roommanagementsystembackend-1.onrender.com")
const ReportPage=({planStatus})=>{
    const BASE_URL = "http://192.168.29.169:4000";
    // const BASE_URL = "https://roommanagementsystembackend-1.onrender.com";
    const dispatch=useDispatch()
    const hotelDetailSelector=useSelector((state)=>state.getHotelDetails.getHotelDetailsObj.hotelObj)
    console.log('hotel details',hotelDetailSelector)
    const [reportObj,setReportObj]=useState({})
    useEffect(() => {
        const fetchReportDetails = async () => {
          try {
            if (hotelDetailSelector._id) {
              const response = await axios.get(
                `${BASE_URL}/hotel/getCustomerDetails/${hotelDetailSelector?._id}`
              );
              console.log('report detail response',response?.data)
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
          if (data.hotelId === hotelDetailSelector._id) {
            setReportObj(prev => ({
              ...prev,
              reportArray: data.reportArray,
            }));
          }
        });

        socket.on("updatePersonalCustomerDetails", (data) => {
          if (data.hotelId === hotelDetailSelector._id) {
            setReportObj(prev => ({
              ...prev,
              getCustomerDetailsArray: data.getCustomerDetailsArray,
            }));
          }
        });
        return () => {
          socket.off("getCustomerDetails");
          socket.off("updateCustomerDetails");
          socket.off("updatePersonalCustomerDetails");
        };
      }, [hotelDetailSelector._id]);
      const reportArray=reportObj?.reportArray
      console.log('report details',reportArray)
      const PersonalReportArray=reportObj?.getCustomerDetailsArray
return (
    <>
    <Report totalReportArray={reportArray} personalReportArray={PersonalReportArray} planStatus={planStatus} />
    </>
)
}
export default ReportPage