import { Card,Text,Button } from "react-native-paper"
import { ScrollView, View,Pressable,Dimensions } from "react-native"
import { useSelector,useDispatch } from "react-redux"
import { filterReport, reportArray } from "../../utils/reportData"
import {useEffect,useState} from 'react'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import io from "socket.io-client";
import axios from "axios";
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from "@react-native-community/datetimepicker";
import { passReportObjSliceActions } from "../../Redux/Slice/passReportObjSlice/passReportObjSlice"

const socket = io.connect("http://192.168.29.169:4000")
const PoliceReport=({policeReport,dateSelector})=>{
  const BASE_URL = "http://192.168.29.169:4000";
  const dispatch=useDispatch()
  const [staffObj,setStaffObj]=useState({})
  const [filterDate,setFilterDate]=useState('')
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [currentPicker, setCurrentPicker] = useState(null); 
const [selectedToDate, setSelectedToDate] = useState(null);
const windowHeight = Dimensions.get('window').height;
const containerHeight = windowHeight * 0.2; 
    const hotelDetailSelector=useSelector((state)=>state.getHotelDetails.getHotelDetailsObj.hotelObj)
    // console.log('hotel ',hotelDetailSelector)
    const finalDate=new Date()
    const todayDate=finalDate?.toLocaleDateString("en-GB") 
    // console.log('police report',policeReport)
    const staffArray=Object.values(hotelDetailSelector.staff)
    // console.log('staffArray',staffArray)
    useEffect(()=>{
      const postObj=staffArray?.find((staff)=>staff.post==="Hotel Supervisor")
      setStaffObj(postObj)
    },[staffArray])
    // console.log('staff obj',staffObj)


  
    const deleteCustomerReport=async(id)=>{
      const deleteObj={
        id:hotelDetailSelector?._id,
        customerId:id
        }
        try {
          const response = await axios.post(`${BASE_URL}/hotel/deleteReportCustomerDetails/${deleteObj.id}`,deleteObj);
          // console.log('response in delete obj is',response?.data)
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Customer Details report Deleted Successfully",
            autoClose: 10000, // 10 sec me band hoga
          });
          socket.emit('deleteReportCustomerDetails', response?.data)
      } catch (error) {
          // console.error('Error sending activate', error);
      }
    }
    // console.log('filter date is',filterDate)

    const filterReportHandler=(value)=>{
        if(value==="yesterday"){
          const today = new Date();
          today.setDate(today.getDate() - 1); // ek din kam karna
          const day = String(today.getDate()).padStart(2, '0');
          const month = String(today.getMonth() + 1).padStart(2, '0'); // month 0-based hota hai
          const year = today.getFullYear();
          const yesterdayDate = `${day}/${month}/${year}`;
          // console.log("Yesterday's date:", yesterdayDate);
          dispatch(passReportObjSliceActions.passReportObj({dates:yesterdayDate,type:value}))
          setSelectedFromDate('')
          setSelectedToDate('')
        }
        else if(value==="today"){
          dispatch(passReportObjSliceActions.passReportObj({dates:todayDate,type:value}))
          setSelectedFromDate('')
          setSelectedToDate('')
        }
        setFilterDate(value)
    }
    // console.log('select from date',selectedFromDate)
    // console.log('select to date',selectedToDate)

    const rangeDateHandler=()=>{
      const rangeObj={
        startDate:selectedFromDate,
        endDate:selectedToDate,
        type:filterDate
      }  
      dispatch(passReportObjSliceActions.passReportObj(rangeObj))
    }

//     const generateAndDownloadPDF = async () => {
//       try {
//         // PDF के लिए HTML कंटेंट
//         const htmlContent = `
//         <html>
// <head>
//   <style>
//     table {
//       width: 100%;
//       border-collapse: collapse;
//     }
//     th, td {
//       border: 1px solid #ddd;
//       padding: 8px;
//       text-align: center;
//     }
//     .header-box {
//       width: 100%;
//       border: 1px solid #ddd;
//       padding: 10px;
//       box-sizing: border-box;
//       margin-bottom: 20px;
//     }
//     .header-text {
//       text-align: right;
//       font-weight: bold;
//     }
//   </style>
// </head>
// <body>

//   <!-- Header Section – अलग बॉक्स -->
//   <div class="header-box">
//     <p class="header-text" style="font-size: 18px;">
//       Registration No: ${hotelDetailSelector?.hotelRegistrationNumber || 'N/A'}
//     </p>
//     <div style="display: flex; flex-direction: row; justify-content:center; flex-wrap: nowrap; gap: 20px; overflow-x: auto;">
//       <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
//         ${hotelDetailSelector?.hotelName}
//       </div>
//       <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
//         ${hotelDetailSelector?.hotelAddress}
//       </div>
//       <div style="display: flex; flex-direction: row; flex-wrap: nowrap; gap:7px; overflow-x: auto;">
//         <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
//           Mob: ${hotelDetailSelector?.owner1?.phone || ''},
//         </div>
//         <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
//           ${hotelDetailSelector?.owner2?.phone || ''},
//         </div>
//         <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
//           ${hotelDetailSelector?.owner3?.phone || ''},
//         </div>
//         <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
//           ${hotelDetailSelector?.owner4?.phone || ''}
//         </div>
//       </div>
//     </div>
//     <div style="display: flex; flex-direction: row; flex-wrap: nowrap; gap:7px; overflow-x: auto; justify-content:center;padding-top:2%;">
//       <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
//         Manager Name : ${staffObj?.name || ''}
//       </div>
//       <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
//         Date : ${dateSelector.type==="yesterday"?dateSelector.dates: todayDate || ''}
//       </div>
//     </div>
//   </div>

//   <!-- Table Section – अलग बॉक्स -->
//   <div style="width: 100%; border: 1px solid #ddd; padding: 10px; box-sizing: border-box;">
//     <table>
//       <tr>
//         <th>Sr No</th>
//         <th>Room No</th>
//         <th>Name,Address,Phone</th>
//         <th>Occupation</th>
//         <th>Reason</th>
//         <th>Total Customer</th>
//         <th>ID Proof</th>
//         <th>City</th>
//         <th>Destination</th>
//         <th>Check-In</th>
//         <th>Check-Out</th>
//       </tr>
//       ${policeReport.map((item, index) => `
//         <tr>
//           <td>${index + 1}</td>
//           <td>${item.roomNo}</td>
//           <td>${item.customerName} ${item.customerAddress} ${item.customerPhoneNumber}</td>
//           <td>${item.customerOccupation}</td>
//           <td>${item.reasonToStay}</td>
//           <td>${item.totalCustomer}</td>
//           <td>${item.customerIdProof}</td>
//           <td>${item.customerCity}</td>
//           <td>${item.customerDestination}</td>
//           <td>${item.checkInDate}</td>
//           <td>${item.checkOutDate}</td>
//         </tr>
//       `).join('')}
//     </table>
//   </div>

// </body>
// </html>

//         `;
  
//         // PDF जनरेट करें
//         const { uri } = await Print.printToFileAsync({
//           html: htmlContent,
//         });
  
//         console.log('PDF Path:', uri);
  
//         // डाउनलोड फ़ोल्डर में कॉपी करें
//         const fileUri = FileSystem.documentDirectory + 'report.pdf';
//         await FileSystem.copyAsync({
//           from: uri,
//           to: fileUri,
//         });
  
//         console.log('File saved to:', fileUri);
  
//         // शेयर या डाउनलोड करें
//         await Sharing.shareAsync(fileUri);
//       } catch (error) {
//         console.error('Error creating PDF:', error);
//         Alert.alert('Error', 'PDF बनाने में समस्या हुई');
//       }
//     };

//new pdf
// const generateAndDownloadPDF = async () => {
//   try {
//     const chunkSize = 6;
//     const totalRows = 6; // हर पेज में 6 पंक्तियाँ दिखानी हैं
//     const chunks = [];

//     // डेटा को chunks में विभाजित करें
//     for (let i = 0; i < policeReport.length; i += chunkSize) {
//       chunks.push(policeReport.slice(i, i + chunkSize));
//     }

//     // हर chunk के लिए पेज बनाएँ
//     const pagesHtml = chunks.map((chunk, pageIndex) => {
//       // खाली पंक्तियाँ भरने के लिए
//       const rowsToRender = [...chunk];
//       while (rowsToRender.length < totalRows) {
//         rowsToRender.push({
//           roomNo: '',
//           customerName: '',
//           customerAddress: '',
//           customerPhoneNumber: '',
//           customerOccupation: '',
//           reasonToStay: '',
//           totalCustomer: '',
//           customerIdProof: '',
//           customerCity: '',
//           customerDestination: '',
//           checkInDate: '',
//           checkOutDate: ''
//         });
//       }

//       return `
//       <div style="page-break-after: always; width: 100%; padding: 20px; box-sizing: border-box;">
//         <div class="header-box">
//           <p class="header-text" style="font-size: 18px;">
//             Registration No: ${hotelDetailSelector?.hotelRegistrationNumber || 'N/A'}
//           </p>
//           <div style="display: flex; flex-direction: row; justify-content:center; flex-wrap: nowrap; gap: 20px; overflow-x: auto;">
//             <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
//               ${hotelDetailSelector?.hotelName}
//             </div>
//             <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
//               ${hotelDetailSelector?.hotelAddress}
//             </div>
//             <div style="display: flex; flex-direction: row; flex-wrap: nowrap; gap:7px; overflow-x: auto;">
//               <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
//                 Mob: ${hotelDetailSelector?.owner1?.phone || ''},
//               </div>
//               <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
//                 ${hotelDetailSelector?.owner2?.phone || ''}
//               </div>
//               <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
//                 ${hotelDetailSelector?.owner3?.phone || ''}
//               </div>
//               <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
//                 ${hotelDetailSelector?.owner4?.phone || ''}
//               </div>
//             </div>
//           </div>
//           <div style="display: flex; flex-direction: row; flex-wrap: nowrap; gap:7px; overflow-x: auto; justify-content:center;padding-top:2%;">
//             <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
//               Manager Name : ${staffObj?.name || ''}
//             </div>
//             <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
//               Date : ${dateSelector.type==="yesterday"?dateSelector.dates: todayDate || ''}
//             </div>
//           </div>
//         </div>

//         <table style="width: 100%; border-collapse: collapse; height: 700px;">
//           <tr>
//             <th>Sr No</th>
//             <th>Room No</th>
//             <th>Name,Address,Phone</th>
//             <th>Occupation</th>
//             <th>Reason</th>
//             <th>Total Customer</th>
//             <th>ID Proof</th>
//             <th>City</th>
//             <th>Destination</th>
//             <th>Check-In</th>
//             <th>Check-Out</th>
//           </tr>
//           ${rowsToRender.map((item, index) => `
//             <tr style="height: calc(700px / 7);">
//               <td>${pageIndex * chunkSize + index + 1}</td>
//               <td>${item.roomNo}</td>
//               <td>${item.customerName} ${item.customerAddress} ${item.customerPhoneNumber}</td>
//               <td>${item.customerOccupation}</td>
//               <td>${item.reasonToStay}</td>
//               <td>${item.totalCustomer}</td>
//               <td>${item.customerIdProof}</td>
//               <td>${item.customerCity}</td>
//               <td>${item.customerDestination}</td>
//               <td>${item.checkInDate}</td>
//               <td>${item.checkOutDate}</td>
//             </tr>
//           `).join('')}
//         </table>
//       </div>
//       `;
//     }).join('');

//     // पूरी PDF का HTML
//     const htmlContent = `
//     <html>
//     <head>
//       <style>
//         table {
//           width: 100%;
//           border-collapse: collapse;
//         }
//         th, td {
//           border: 1px solid #ddd;
//           padding: 8px;
//           text-align: center;
//         }
//         .header-box {
//           width: 100%;
//           border: 1px solid #ddd;
//           padding: 10px;
//           box-sizing: border-box;
//           margin-bottom: 20px;
//         }
//         .header-text {
//           text-align: right;
//           font-weight: bold;
//         }
//       </style>
//     </head>
//     <body>
//       ${pagesHtml}
//     </body>
//     </html>
//     `;

//     // PDF जनरेट करें
//     const { uri } = await Print.printToFileAsync({
//       html: htmlContent,
//     });

//     console.log('PDF Path:', uri);

//     // फ़ाइल कॉपी करें
//     const fileUri = FileSystem.documentDirectory + 'report.pdf';
//     await FileSystem.copyAsync({
//       from: uri,
//       to: fileUri,
//     });

//     console.log('File saved to:', fileUri);

//     // शेयर या डाउनलोड करें
//     await Sharing.shareAsync(fileUri);

//   } catch (error) {
//     console.error('Error creating PDF:', error);
//     Alert.alert('Error', 'PDF बनाने में समस्या हुई');
//   }
// };


const generateAndDownloadPDF = async () => {
  try {
    const chunkSize = 6;
    const totalRows = 6;
    const pagesHtmlArray = [];

    const parseDate = (dateStr) => {
      const parts = dateStr.split('/');
      return new Date(parts[2], parts[1] - 1, parts[0]);
    };

    const formatDate = (date) => {
      const d = date.getDate().toString().padStart(2, '0');
      const m = (date.getMonth() + 1).toString().padStart(2, '0');
      const y = date.getFullYear();
      return `${d}/${m}/${y}`;
    };

    if (selectedFromDate && selectedToDate) {
      // Date range के आधार पर PDF बनाना
      let start = parseDate(selectedFromDate);
      let end = parseDate(selectedToDate);
      const dates = [];
      while (start <= end) {
        dates.push(new Date(start));
        start.setDate(start.getDate() + 1);
      }

      for (let dateObj of dates) {
        const dateStr = formatDate(dateObj);
        const filteredData = policeReport.filter(item => item.checkInDate === dateStr);

        const chunks = [];
        for (let i = 0; i < filteredData.length; i += chunkSize) {
          chunks.push(filteredData.slice(i, i + chunkSize));
        }
        if (chunks.length === 0) {
          chunks.push([]);
        }

        chunks.forEach((chunk, pageIndex) => {
          const rowsToRender = [...chunk];
          while (rowsToRender.length < totalRows) {
            rowsToRender.push({
              roomNo: '',
              customerName: '',
              customerAddress: '',
              customerPhoneNumber: '',
              customerOccupation: '',
              reasonToStay: '',
              totalCustomer: '',
              customerIdProof: '',
              customerCity: '',
              customerDestination: '',
              checkInDate: '',
              checkOutDate: ''
            });
          }

          const pageHtml = `
            <div style="page-break-after: always; width: 100%; padding: 20px; box-sizing: border-box;">
              <div class="header-box">
                <p class="header-text" style="font-size: 18px;">
                  Registration No: ${hotelDetailSelector?.hotelRegistrationNumber || 'N/A'}
                </p>
                <div style="display: flex; flex-direction: row; justify-content:center; flex-wrap: nowrap; gap: 20px; overflow-x: auto;">
                  <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
                    ${hotelDetailSelector?.hotelName}
                  </div>
                  <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
                    ${hotelDetailSelector?.hotelAddress}
                  </div>
                  <div style="display: flex; flex-direction: row; flex-wrap: nowrap; gap:7px; overflow-x: auto;">
                    <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
                      Mob: ${hotelDetailSelector?.owner1?.phone || ''},
                    </div>
                    <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
                      ${hotelDetailSelector?.owner2?.phone || ''}
                    </div>
                    <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
                      ${hotelDetailSelector?.owner3?.phone || ''}
                    </div>
                    <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
                      ${hotelDetailSelector?.owner4?.phone || ''}
                    </div>
                  </div>
                </div>
                <div style="display: flex; flex-direction: row; flex-wrap: nowrap; gap:7px; overflow-x: auto; justify-content:center;padding-top:2%;">
                  <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
                    Manager Name : ${staffObj?.name || ''}
                  </div>
                  <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
                    Date : ${dateStr}
                  </div>
                </div>
              </div>

              <table style="width: 100%; border-collapse: collapse; height: 700px;">
                <tr>
                  <th>Sr No</th>
                  <th>Room No</th>
                  <th>Name, Address, Phone</th>
                  <th>Occupation</th>
                  <th>Reason</th>
                  <th>Total Customer</th>
                  <th>ID Proof</th>
                  <th>City</th>
                  <th>Destination</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                </tr>
                ${rowsToRender.map((item, index) => `
                  <tr style="height: calc(700px / 7);">
                    <td>${pageIndex * chunkSize + index + 1}</td>
                    <td>${item.roomNo}</td>
                    <td>${item.customerName} ${item.customerAddress} ${item.customerPhoneNumber}</td>
                    <td>${item.customerOccupation}</td>
                    <td>${item.reasonToStay}</td>
                    <td>${item.totalCustomer}</td>
                    <td>${item.customerIdProof}</td>
                    <td>${item.customerCity}</td>
                    <td>${item.customerDestination}</td>
                    <td>${item.checkInDate}</td>
                    <td>${item.checkOutDate}</td>
                  </tr>
                `).join('')}
              </table>
            </div>
          `;
          pagesHtmlArray.push(pageHtml);
        });
      }

    } else {
      // Default behavior — जैसा तुमने दिया था
      const chunks = [];
      for (let i = 0; i < policeReport.length; i += chunkSize) {
        chunks.push(policeReport.slice(i, i + chunkSize));
      }

      chunks.forEach((chunk, pageIndex) => {
        const rowsToRender = [...chunk];
        while (rowsToRender.length < totalRows) {
          rowsToRender.push({
            roomNo: '',
            customerName: '',
            customerAddress: '',
            customerPhoneNumber: '',
            customerOccupation: '',
            reasonToStay: '',
            totalCustomer: '',
            customerIdProof: '',
            customerCity: '',
            customerDestination: '',
            checkInDate: '',
            checkOutDate: ''
          });
        }

        const pageHtml = `
          <div style="page-break-after: always; width: 100%; padding: 20px; box-sizing: border-box;">
            <div class="header-box">
              <p class="header-text" style="font-size: 18px;">
                Registration No: ${hotelDetailSelector?.hotelRegistrationNumber || 'N/A'}
              </p>
              <div style="display: flex; flex-direction: row; justify-content:center; flex-wrap: nowrap; gap: 20px; overflow-x: auto;">
                <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
                  ${hotelDetailSelector?.hotelName}
                </div>
                <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
                  ${hotelDetailSelector?.hotelAddress}
                </div>
                <div style="display: flex; flex-direction: row; flex-wrap: nowrap; gap:7px; overflow-x: auto;">
                  <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
                    Mob: ${hotelDetailSelector?.owner1?.phone || ''},
                  </div>
                  <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
                    ${hotelDetailSelector?.owner2?.phone || ''}
                  </div>
                  <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
                    ${hotelDetailSelector?.owner3?.phone || ''}
                  </div>
                  <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
                    ${hotelDetailSelector?.owner4?.phone || ''}
                  </div>
                </div>
              </div>
              <div style="display: flex; flex-direction: row; flex-wrap: nowrap; gap:7px; overflow-x: auto; justify-content:center;padding-top:2%;">
                <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
                  Manager Name : ${staffObj?.name || ''}
                </div>
                <div style="font-weight: bold; font-size: 18px; white-space: nowrap;">
                  Date : ${dateSelector.type==="yesterday"?dateSelector.dates: todayDate || ''}
                </div>
              </div>
            </div>

            <table style="width: 100%; border-collapse: collapse; height: 700px;">
              <tr>
                <th>Sr No</th>
                <th>Room No</th>
                <th>Name, Address, Phone</th>
                <th>Occupation</th>
                <th>Reason</th>
                <th>Total Customer</th>
                <th>ID Proof</th>
                <th>City</th>
                <th>Destination</th>
                <th>Check-In</th>
                <th>Check-Out</th>
              </tr>
              ${rowsToRender.map((item, index) => `
                <tr style="height: calc(700px / 7);">
                  <td>${pageIndex * chunkSize + index + 1}</td>
                  <td>${item.roomNo}</td>
                  <td>${item.customerName} ${item.customerAddress} ${item.customerPhoneNumber}</td>
                  <td>${item.customerOccupation}</td>
                  <td>${item.reasonToStay}</td>
                  <td>${item.totalCustomer}</td>
                  <td>${item.customerIdProof}</td>
                  <td>${item.customerCity}</td>
                  <td>${item.customerDestination}</td>
                  <td>${item.checkInDate}</td>
                  <td>${item.checkOutDate}</td>
                </tr>
              `).join('')}
            </table>
          </div>
        `;
        pagesHtmlArray.push(pageHtml);
      });
    }

    // Final PDF content
    const htmlContent = `
    <html>
    <head>
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: center;
        }
        .header-box {
          width: 100%;
          border: 1px solid #ddd;
          padding: 10px;
          box-sizing: border-box;
          margin-bottom: 20px;
        }
        .header-text {
          text-align: right;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      ${pagesHtmlArray.join('')}
    </body>
    </html>
    `;

    const { uri } = await Print.printToFileAsync({
      html: htmlContent,
    });

    console.log('PDF Path:', uri);

    const fileUri = FileSystem.documentDirectory + 'report.pdf';
    await FileSystem.copyAsync({
      from: uri,
      to: fileUri,
    });

    console.log('File saved to:', fileUri);

    await Sharing.shareAsync(fileUri);

  } catch (error) {
    console.error('Error creating PDF:', error);
    Alert.alert('Error', 'PDF बनाने में समस्या हुई');
  }
};


return (
    <>
 <Card style={{ margin: 10, borderRadius: 10 }}>
        <Card.Content>
       

          <View
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 10,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Text style={{textAlign:'right'}}>Registration No:{hotelDetailSelector?.hotelRegistrationNumber}</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: "column",
                alignItems: "center",
                paddingTop: 6,
                gap: 12,
              }}
            >
            <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:6,gap:40}}>
        <Text style={{fontSize:16,color:'black',fontWeight:"800"}}>{hotelDetailSelector?.hotelName}</Text>
        <Text style={{fontSize:16,color:'black'}}>{hotelDetailSelector?.hotelAddress}</Text>
        <View style={{flexDirection:"row",justifyContent:'space-between',gap:5}}>
        {hotelDetailSelector?.owner1?.phone? <Text style={{fontSize:16,color:'black'}}>Mob : {hotelDetailSelector?.owner1?.phone},</Text>:null}
       {hotelDetailSelector?.owner2?.phone? <Text style={{fontSize:16,color:'black'}}>{hotelDetailSelector?.owner2?.phone},</Text>:null}
       {hotelDetailSelector?.owner3?.phone? <Text style={{fontSize:16,color:'black'}}>{hotelDetailSelector?.owner3?.phone},</Text>:null}
       {hotelDetailSelector?.owner4?.phone? <Text style={{fontSize:16,color:'black'}}>{hotelDetailSelector?.owner4?.phone}</Text>:null}
        </View>
    
            </View> 
            <View style={{flexDirection:'row',justifyContent:'center',paddingTop:6,gap:40}}>
       <Text style={{fontSize:16,color:'black'}}>Manager Name : {staffObj?.name}</Text>
       {dateSelector.type==="Custom"?null:<Text style={{fontSize:16,color:'black'}}>Date : {dateSelector.type==="yesterday"?dateSelector.dates: todayDate }</Text>}
            </View>
            </ScrollView>
          </View>
 <Text style={{paddingTop:5}}>Date</Text>         
<View 
style={{
  borderWidth: 1,
  borderColor: '#888',
  borderRadius: 8,
  backgroundColor: '#fff',
  overflow: 'hidden',
  marginTop:12
}}
>
<Picker
 selectedValue={filterDate}
 onValueChange={(itemValue) => filterReportHandler(itemValue)}
>
           {
     filterReport.map((item)=>{
            return (
              <Picker.Item 
              key={item.id} 
              label={item.name} 
              value={item.name} 
              onValueChange={(itemValue) => filterReportHandler(itemValue)}
            />
            )
          })
         }
            </Picker>
</View>
{filterDate === 'Custom' ? (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <View style={{ flex: 1 }}>
      <Pressable
        onPress={() => {
          setCurrentPicker('from');
          setShowDatePicker(true);
        }}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 12,
          margin: 12,
           backgroundColor: "#f9f9f9",
                  
        }}
      >
        <Text style={{ fontSize: 16, color: "#333" }}>
          {selectedFromDate ? selectedFromDate : "Select From Date"}
        </Text>
      </Pressable>
    </View>

    <View style={{ flex: 1 }}>
      <Pressable
        onPress={() => {
          setCurrentPicker('to');
          setShowDatePicker(true);
        }}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 12,
          margin: 12,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Text style={{ fontSize: 16, color: "#333" }}>
          {selectedToDate ? selectedToDate : "Select To Date"}
        </Text>
      </Pressable>
    </View>

    {showDatePicker && (
      <DateTimePicker
        value={new Date()}
        mode="date"
        display="default"
        maximumDate={new Date()}  // ✅ This limits both pickers to today or earlier
        onChange={(event, date) => {
          if (date) {
            if (currentPicker === 'from') {
              setSelectedFromDate(date.toLocaleDateString("en-GB"));
            } else if (currentPicker === 'to') {
              setSelectedToDate(date.toLocaleDateString("en-GB"));
            }
          }
          setShowDatePicker(false);
        }}
      />
    )}
    <View style={{marginTop:14}}>
    <Button
              mode="contained"
              style={{
                borderRadius: 11,
              }}
              buttonColor="rgba(234, 88, 12, 1)"
              onPress={rangeDateHandler}
            >
   Go
            </Button>
    </View>
  </View>
) : null}

<View>
<View style={{marginTop:14}}>
    <Button
              mode="contained"
              style={{
                borderRadius: 11,
              }}
              buttonColor="rgba(234, 88, 12, 1)"
              onPress={generateAndDownloadPDF}
            >
          Download Pdf
            </Button>
    </View>
</View>
<ScrollView 
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={{
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 6,
    gap: 12,
  }}
>
<View
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 10,
              backgroundColor: "#f9f9f9",
              marginTop:4
            }}
          >
           <View
  style={{
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#f9f9f9",
    marginTop: 4,
  }}
>
  {/* Header Row */}
  <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#e6e6e6",
                  borderBottomWidth: 1,
                  borderColor: "#ccc",
                  paddingVertical: 8,
                }}
              >
                {reportArray?.map((report) => (
                  <Text
                    key={report.id}
                    style={{
                      minWidth: 120,
                      textAlign: "center",
                      fontWeight: "bold",
                      paddingHorizontal: 8,
                    }}
                  >
                    {report.name}
                  </Text>
                ))}
              </View>
              <View style={{ height: containerHeight }}>
              <ScrollView showsVerticalScrollIndicator={true}>
{policeReport?.map((item, index) => (
                <View
                  key={item._id}
                  style={{
                    flexDirection: "row",
                    borderBottomWidth: 1,
                    borderColor: "#eee",
                    paddingVertical: 8,
                  }}
                >
                  <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>
                    {index + 1}
                  </Text>
                  <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>
                    {item.roomNo}
                  </Text>
                  <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>
                    {item.customerName}
                  </Text>
                  <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>
                    {item.customerAddress}
                  </Text>
                  <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>
                    {item.customerPhoneNumber}
                  </Text>
                  <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>
                    {item.customerOccupation}
                  </Text>
                  <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>
                    {item.reasonToStay}
                  </Text>
                  <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>
                    {item.totalCustomer}
                  </Text>
                  <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>
                    {item.customerIdProof}
                  </Text>
                  <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>
                    {item.customerCity}
                  </Text>
                  <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>
                    {item.customerDestination}
                  </Text>
                  <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>
                    {item.checkInDate}
                  </Text>
                  <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>
                    {item.checkOutDate}
                  </Text>
                  <Button
              mode="contained"
              style={{
                borderRadius: 11,
                marginLeft:20
              }}
              buttonColor="rgba(234, 88, 12, 1)"
              onPress={()=>deleteCustomerReport(item._id)}
            >
            Delete
            </Button>
                </View>
              ))}
</ScrollView>
              </View>

  {/* Data Rows */}
  
</View>

          </View>
</ScrollView>
        </Card.Content>
      </Card>
    </>
)
}
export default PoliceReport