import axios from "axios";

const API = axios.create({
  // node js local server url
  baseURL: "http://192.168.29.169:4000/hotel",
  // production server backend url
  // baseURL: "https://roommanagementsystembackend-1.onrender.com/hotel",
});


export default API;