import axios from "axios";

const API = axios.create({
  // node js local server url
  // baseURL: "http://localhost:4000/user",
  baseURL: "http://192.168.29.169:4000/hotel",
  // baseURL: "https://e861-2405-201-3014-a811-6dfb-7c80-d8ef-e3e0.ngrok-free.app/user",
  // production server backend url
//   baseURL: "https://apnapandatingbackend.onrender.com/user",
});


export default API;