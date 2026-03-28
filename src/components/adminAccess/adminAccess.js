import io from "socket.io-client";
import axios from "axios";
import { useState,useEffect } from "react"
const socket = io.connect("http://192.168.29.169:4000")
const AdminAccess=()=>{
const BASE_URL = "http://192.168.29.169:4000";
const id=1
const [adminAccessObj,setAdminAccessObj]=useState({})
useEffect(() => {
    const fetchAdminAccessHandler = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `${BASE_URL}/hotel/getAllName/${id}`
          );
          setAdminAccessObj(response?.data);
        }
      } catch (error) {}
    };

    fetchAdminAccessHandler();

    // socket.on("getAccessAmount", (newUser) => {
    //   setAccessObj(newUser);
    // });

    // return () => {
    //   socket.off("getAccessAmount");
    // };
  }, [id]);
  console.log('admin access obj',adminAccessObj)
return (
    <>
    </>
)
}
export default AdminAccess