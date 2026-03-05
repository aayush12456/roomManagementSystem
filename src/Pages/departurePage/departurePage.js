import Departure from "../../components/departure/departure"
import io from "socket.io-client";
import axios from "axios";
import { useEffect,useState } from "react";
const socket = io.connect("http://192.168.29.169:4000")
// const socket = io.connect("https://roommanagementsystembackend-1.onrender.com")
const DeparturePage=({hotelId})=>{
const BASE_URL = "http://192.168.29.169:4000";
// const BASE_URL = "https://roommanagementsystembackend-1.onrender.com";
const [departureObj,setDepartureObj]=useState({})

useEffect(() => {
  const fetchRoomDetails = async () => {
    try {
      if (hotelId) {
        const response = await axios.get(
          `${BASE_URL}/hotel/getCustomerDetails/${hotelId}`
        );
        setDepartureObj(response?.data || {});
      }
    } catch (error) {}
  };

  fetchRoomDetails();

  socket.on("getCustomerDetails", (newUser) => {
    setDepartureObj(newUser);
  });
  return () => {
    socket.off("getCustomerDetails");
    socket.off("getCustomerDetailsAdvance");
  };
}, [hotelId]);
console.log('hotels data',departureObj)

const today = new Date();
const todayDate =
  String(today.getDate()).padStart(2, "0") +
  "/" +
  String(today.getMonth() + 1).padStart(2, "0") +
  "/" +
  today.getFullYear();

  const checkoutTodayArray = departureObj.getCustomerDetailsArray
  ?.filter((room) => room.checkOutDate === todayDate)
  ?.map((room) => {

    const allNames = [
      room.customerName,
      ...(room.extraCustomers?.map((extra) => extra.customerName) || [])
    ];

    return {
      roomNo: room.roomNo,
      roomType: room.roomType,
      floor: room.floor,
      checkOutDate: room.checkOutDate,
      phoneNumber: room.customerPhoneNumber,
      checkOutTime: room.personalCheckOutTime,
      guests: allNames   // ✅ full array here
    };
  });

  console.log('final hotel data',checkoutTodayArray)
return (
    <>
    <Departure checkOutArray={checkoutTodayArray}/>
    </>
)
}
export default DeparturePage