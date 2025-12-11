import { Card, Text, Button } from "react-native-paper";
import { ScrollView, View, Pressable, Dimensions,Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { filterReport, personalReportArray} from "../../utils/reportData";
import { useEffect, useState } from "react";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import io from "socket.io-client";
import axios from "axios";
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from "@react-native-community/datetimepicker";
import { passReportObjSliceActions } from "../../Redux/Slice/passReportObjSlice/passReportObjSlice";
import HeaderReportCard from "../common/headerReportCard/headerReportCard";

const socket = io.connect("http://192.168.29.169:4000");
const PersonalReport=({personalReport,isSmallScreen,hotelDetailSelector,dateSelector})=>{
    console.log('hotel detail',hotelDetailSelector)
    console.log('personal report',personalReport)
    const BASE_URL = "http://192.168.29.169:4000";
    const dispatch=useDispatch()
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedPersonalFromDate, setSelectedPersonalFromDate] = useState(null);
    const [personalCurrentPicker, setPersonalCurrentPicker] = useState(null);
    const [selectedPersonalToDate, setSelectedPersonalToDate] = useState(null);
    const [personalFilterDate, setPersonalFilterDate] = useState('today');
    const [openRowId, setOpenRowId] = useState(null);


    const windowHeight = Dimensions.get('window').height;
    const containerHeight = windowHeight * 0.2;
    const finalDate = new Date();
    const todayDate = finalDate.toLocaleDateString("en-GB");

    const filterReportHandler = (value) => {
        console.log('value is',value)
        if (value === "yesterday" ) {
          const today = new Date();
          today.setDate(today.getDate() - 1);
          const day = String(today.getDate()).padStart(2, '0');
          const month = String(today.getMonth() + 1).padStart(2, '0');
          const year = today.getFullYear();
          const yesterdayDate = `${day}/${month}/${year}`;
          dispatch(passReportObjSliceActions.passReportObj({ dates: yesterdayDate, type: value,report:'personal' }));
          setSelectedPersonalFromDate('');
          setSelectedPersonalToDate('');
        } else if (value === "today") {
          dispatch(passReportObjSliceActions.passReportObj({ dates: todayDate, type: value,report:'personal' }));
          setSelectedPersonalFromDate('');
          setSelectedPersonalToDate('');
        }
        setPersonalFilterDate(value); 
      };
    
      const rangeDateHandler = () => {
        const rangeObj = {
          startDate: selectedPersonalFromDate,
          endDate: selectedPersonalToDate,
          type: personalFilterDate,
          report:'personal'
        };
        dispatch(passReportObjSliceActions.passReportObj(rangeObj));
      };

      const morePersonalDetailsHandler = (id) => {
        setOpenRowId(prev => (prev === id ? null : id)); // toggle
      };
      const deletePersonalCustomerReport = async (id) => {
        const deleteObj = {
          id: hotelDetailSelector?._id,
          customerId: id
        };
        try {
          const response = await axios.post(`${BASE_URL}/hotel/deletePersonalCustomerDetails/${deleteObj.id}`, deleteObj);
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Customer Details report Deleted Successfully",
            autoClose: 10000,
          });
          socket.emit('deletePersonalCustomerDetails', response?.data);
        } catch (error) {
          console.error('Error deleting report:', error);
        }
      };
    

      // useEffect(() => {
      //   if (dateSelector?.type && dateSelector.report==="personal") {
      //     setPersonalFilterDate(dateSelector.type);
      //   }
      // }, [dateSelector?.type,dateSelector.report]);
     
      

      const generatePersonalAndDownloadPDF = async () => {
        try {
          const chunkSize = 6;
          const totalRows = 6;
          const pagesHtmlArray = [];
    
          const parseDate = (dateStr) => {
            const [day, month, year] = dateStr?.split('/').map(Number);
            return new Date(year, month - 1, day);
          };
    
          const formatDate = (date) => {
            const d = date.getDate().toString().padStart(2, '0');
            const m = (date.getMonth() + 1).toString().padStart(2, '0');
            const y = date.getFullYear();
            return `${d}/${m}/${y}`;
          };
    
          // ---- अगर Custom date range चुना गया है ----
          if (dateSelector.type === "Custom" && dateSelector.startDate && dateSelector.endDate) {
            let start = parseDate(dateSelector.startDate);
            let end = parseDate(dateSelector.endDate);
            const dates = [];
            while (start <= end) {
              dates.push(new Date(start));
              start.setDate(start.getDate() + 1);
            }
    
            for (let dateObj of dates) {
              const dateStr = formatDate(dateObj);
              const filteredData = personalReport.filter((item) => item.checkInDate === dateStr);
    
              const chunks = [];
              for (let i = 0; i < filteredData.length; i += chunkSize) {
                chunks.push(filteredData.slice(i, i + chunkSize));
              }
              if (chunks.length === 0) chunks.push([]);
    
              chunks.forEach((chunk) => {
                const rowsToRender = [...chunk];
                while (rowsToRender.length < totalRows) {
                  rowsToRender.push({
                    roomNo: '',
                    customerName: '',
                    customerAddress: '',
                    customerPhoneNumber: '',
                    customerOccupation: '',
                    relation:'',
                    customerCity:'',
                    customerDestination:'',
                    totalCustomer: '',
                    customerIdProof: '',
                    customerCity: '',
                    customerDestination: '',
                    checkInDate: '',
                    checkInTime:'',
                    checkOutDate: '',
                    personalCheckOutTime:'',
                    customerSignature:'',
                    totalPayment:'',
                    paymentPaid:'',
                    paymentDue:''
                  });
                }
    
                const pageHtml = `
                <p style="font-size:20px; text-align:center;padding-top:6px; padding-bottom:6px">LODGER'S REGISTER</p>
                <div style="page-break-after: always;">
                    <table style="width: 100%; border-collapse: collapse; height: 700px;">
                      <tr>
                        <th>Sr No</th>
                        <th>Room No</th>
                        <th>Full Name & Aadhar No</th>
                        <th>Permanent Address</th>
                        <th>Occupation</th>
                        <th>No of Person</th>
                        <th>Relation With Person</th>
                        <th>Coming From</th>
                        <th>Going To</th>
                        <th>Check-In-Date</th>
                        <th>Check-In-Time</th>
                        <th>Check-Out-Date</th>
                        <th>Check-Out-Time</th>
                        <th>Person Signature</th>
                        <th>Total Amount</th>
                        <th>Paid Amount</th>
                        <th>Due Amount</th>
                      </tr>
                      ${rowsToRender.map((item, index) => `
                        <tr style="height: calc(700px / 7);">
                          <td>${index + 1}</td>
                          <td>${item.roomNo ? item.roomNo.split('R-').join('') : ''}</td>
                          <td>
                      <div style="margin-bottom:6px; ">
                        ${item.customerName || ''} 
                        ${item.customerAadharNumber || ''}
                      </div>
                    
                      ${
                        item.extraCustomers?.length
                          ? item.extraCustomers.map(ex => `
                            <div style="margin-top:4px; padding-left:10px;">
                              ${ex.customerName || ''} 
                              ${ex.customerAadharNumber || ''}
                            </div>
                          `).join('')
                          : ''
                      }
                    </td>
                    <td>
                    <div style="margin-bottom:6px; ">
                      ${item.customerAddress || ''} 
                    </div>
                  
                    ${
                      item.extraCustomers?.length
                        ? item.extraCustomers.map(ex => `
                          <div style="margin-top:4px; padding-left:10px;">
                            ${ex.customerAddress || ''} 
                          </div>
                        `).join('')
                        : ''
                    }
                  </td>
                          <td>${item.customerOccupation || ''}</td>
                          <td>${item.totalCustomer || '' }</td>
                          <td>${item.relation || ''}</td>
                          <td>${item.customerCity || ''}</td>
                          <td>${item.customerDestination || ''}</td>
                          <td>${item.checkInDate || ''}</td>
                          <td>${item.checkInTime || ''}</td>
                          <td>${item.checkOutDate || ''}</td>
                          <td>${item.personalCheckOutTime || ''}</td>
                          <td>
                          ${item.customerSignature 
                            ? `<img src="${item.customerSignature}" style="width:50px;height:25px;object-fit:contain;border:1px solid #ccc;" />`
                            : ''}
                        </td>
                          <td>${item.totalPayment || ''}</td>
                          <td>${item.paymentPaid || ''}</td>
                          <td>${item.paymentDue || ''}</td>
                        </tr>
                      `).join('')}
                    </table>
                  </div>
                `;
                pagesHtmlArray.push(pageHtml);
              });
            }
          } 
          // ---- Default case (Today / Yesterday / All) ----
          else {
            const chunks = [];
            for (let i = 0; i < personalReport.length; i += chunkSize) {
              chunks.push(personalReport.slice(i, i + chunkSize));
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
                    relation:'',
                    customerCity:'',
                    customerDestination:'',
                    totalCustomer: '',
                    customerIdProof: '',
                    customerCity: '',
                    customerDestination: '',
                    checkInDate: '',
                    checkInTime:'',
                    checkOutDate: '',
                    personalCheckOutTime:'',
                    customerSignature:'',
                    totalPayment:'',
                    paymentPaid:'',
                    paymentDue:''
                });
              }
    
              const pageHtml = `
              <p style="font-size:20px; text-align:center;padding-top:6px; padding-bottom:6px">LODGER'S REGISTER</p>
              <div style="page-break-after: always;">
                  <table style="width: 100%; border-collapse: collapse; height: 700px;">
                    <tr>
                    <th>Sr No</th>
                    <th>Room No</th>
                    <th>Full Name & Aadhar No</th>
                    <th>Permanent Address</th>
                    <th>Occupation</th>
                    <th>No of Person</th>
                    <th>Relation With Person</th>
                    <th>Coming From</th>
                    <th>Going To</th>
                    <th>Check-In-Date</th>
                    <th>Check-In-Time</th>
                    <th>Check-Out-Date</th>
                    <th>Check-Out-Time</th>
                    <th>Person Signature</th>
                    <th>Total Amount</th>
                    <th>Paid Amount</th>
                    <th>Due Amount</th>
                    </tr>
                    ${rowsToRender.map((item, index) => `
                    <tr style="height: calc(700px / 7);">
                    <td>${pageIndex * chunkSize + index + 1}</td>
                      <td>${item.roomNo ? item.roomNo.split('R-').join('') : ''}</td>
                      <td>
                      <div style="margin-bottom:6px; ">
                        ${item.customerName || ''} 
                        ${item.customerAadharNumber || ''}
                      </div>
                    
                      ${
                        item.extraCustomers?.length
                          ? item.extraCustomers.map(ex => `
                            <div style="margin-top:4px; padding-left:10px;">
                              ${ex.customerName || ''} 
                              ${ex.customerAadharNumber || ''}
                            </div>
                          `).join('')
                          : ''
                      }
                    </td>
                    <td>
                    <div style="margin-bottom:6px; ">
                      ${item.customerAddress || ''} 
                    </div>
                  
                    ${
                      item.extraCustomers?.length
                        ? item.extraCustomers.map(ex => `
                          <div style="margin-top:4px; padding-left:10px;">
                            ${ex.customerAddress || ''} 
                          </div>
                        `).join('')
                        : ''
                    }
                  </td>
                      <td>${item.customerOccupation || ''}</td>
                      <td>${item.totalCustomer || ''}</td>
                      <td>${item.relation || ''}</td>
                      <td>${item.customerCity || ''}</td>
                      <td>${item.customerDestination || ''}</td>
                      <td>${item.checkInDate || ''}</td>
                      <td>${item.checkInTime || ''}</td>
                      <td>${item.checkOutDate || ''}</td>
                      <td>${item.personalCheckOutTime || ''}</td>
                      <td>
                      ${item.customerSignature 
                        ? `<img src="${item.customerSignature}" style="width:50px;height:25px;object-fit:contain;border:1px solid #ccc;" />`
                        : ''}
                    </td>
                      <td>${item.totalPayment || ''}</td>
                      <td>${item.paymentPaid || ''}</td>
                      <td>${item.paymentDue || ''}</td>
                    </tr>
                  `).join('')}
                  </table>
                </div>
              `;
              pagesHtmlArray.push(pageHtml);
            });
          }
    
          const htmlContent = `
            <html>
            <head>
              <style>
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
                .header-box { width: 100%; border: 1px solid #ddd; padding: 10px; margin-bottom: 20px; }
                .header-text { text-align: center; font-weight: bold; }
              </style>
            </head>
            <body>
              ${pagesHtmlArray.join('')}
            </body>
            </html>
          `;
    
          const { uri } = await Print.printToFileAsync({ html: htmlContent,width:842,height:595,landscape:true });
          const fileUri = FileSystem.documentDirectory + 'personalReport.pdf';
          await FileSystem.copyAsync({ from: uri, to: fileUri });
          await Sharing.shareAsync(fileUri);
        } catch (error) {
          console.error('Error creating PDF:', error);
          Alert.alert('Error', 'PDF बनाने में समस्या हुई');
        }
      };

      const renderCardContent = () => {
        return (
          <Card style={{ margin: 10, borderRadius: 10 }}>
            <Card.Content>
            <HeaderReportCard hotelDetailSelector={hotelDetailSelector} dateSelector={dateSelector} />
            <Text style={{ paddingTop: 5 }}>Date</Text>
        
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
  selectedValue={personalFilterDate === 'Custom'?personalFilterDate: dateSelector.type}
  onValueChange={(itemValue) => {
   
    if (itemValue !== "default") filterReportHandler(itemValue);
  }}
>
<Picker.Item 
    label="Select your date" 
    value="default"
  />
           {
     filterReport.map((item)=>{

            return (
              <Picker.Item 
              key={item.id} 
              label={item.name} 
              value={item.name} 
            />
            )
          })
         }
            </Picker>
</View>
{personalFilterDate === 'Custom' ? (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <View style={{ flex: 1 }}>
      <Pressable
        onPress={() => {
          setPersonalCurrentPicker('from');
          setShowDatePicker(true);
        }}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          marginTop:12,
           backgroundColor: "#f9f9f9",
                  height:40,
                  width:110
        }}
      >
        <Text style={{ fontSize: 16, color: "#333",textAlign:'center',paddingTop:6 }}>
          {selectedPersonalFromDate ? selectedPersonalFromDate : "Start Date"}
        </Text>
      </Pressable>
    </View>

    <View style={{ flex: 1 }}>
      <Pressable
        onPress={() => {
          setPersonalCurrentPicker('to');
          setShowDatePicker(true);
        }}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          marginTop:12,
          height:40,
          width:110,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Text style={{ fontSize: 16, color: "#333",textAlign:'center',paddingTop:6 }}>
          {selectedPersonalToDate ? selectedPersonalToDate : "End Date"}
        </Text>
      </Pressable>
    </View>

    {showDatePicker && (
  <DateTimePicker
    value={new Date()}
    mode="date"
    display="default"
    maximumDate={new Date()}  // ✅ limit to today
    onChange={(event, date) => {
      if (date) {
        if (personalCurrentPicker === 'from') {
          setSelectedPersonalFromDate(date.toLocaleDateString("en-GB"));
        } else if (personalCurrentPicker === 'to') {
          setSelectedPersonalToDate(date.toLocaleDateString("en-GB"));
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
        

        <View style={{ marginTop: 14 }}>
          <Button
            mode="contained"
            style={{ borderRadius: 11 }}
            buttonColor="rgba(234, 88, 12, 1)"
            onPress={generatePersonalAndDownloadPDF}
            disabled={personalReport?.length === 0 || !dateSelector.type}
          >
            Download Pdf
          </Button>
        </View>


        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 6,
          gap: 12,
        }}>
          <View style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, backgroundColor: "#f9f9f9", marginTop: 4 }}>
            <View style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, backgroundColor: "#f9f9f9", marginTop: 4 }}>
              <View style={{
                flexDirection: "row",
                backgroundColor: "#e6e6e6",
                borderBottomWidth: 1,
                borderColor: "#ccc",
                paddingVertical: 8,
              }}>
                {personalReportArray?.map((report,index) => (
                  <Text key={index} style={{ minWidth: 120, textAlign: "center", fontWeight: "bold", paddingHorizontal: 8 }}>
                    {report.name}
                  </Text>
                ))}
              </View>
              <View style={{ height: containerHeight }}>
                <ScrollView showsVerticalScrollIndicator={true}>
                  {!dateSelector.type?
                  <Text style={{paddingTop:12,paddingLeft:40}}>please select your date</Text>:
                  personalReport.length==0 ? <Text style={{paddingTop:12,paddingLeft:40}}>No data is available on {dateSelector?.dates}</Text> :
                    personalReport?.map((item, index) => (
                    <View key={item._id} style={{
                      flexDirection: "row",
                      borderBottomWidth: 1,
                      borderColor: "#eee",
                      paddingVertical: 8,
                    }}>
                      <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>{index + 1}</Text>
                      <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>{item.roomNo}</Text>
                      {/* <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>{item.customerName}</Text>
                      <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>{item.customerAddress}</Text>
                      <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>{item.customerPhoneNumber}</Text> */}
                      <View style={{ minWidth: 120 }}>
                <Text style={{ textAlign: "center" }}>
                  {item.customerName}
                </Text>

                {openRowId === item._id &&
                  item.extraCustomers?.map((ex) => (
                    <Text
                      key={ex._id}
                      style={{
                        textAlign: "center",
                        marginTop: 4,
                      }}
                    >
                      {ex.customerName}
                    </Text>
                  ))}
              </View>
              <View style={{ minWidth: 120 }}>
                <Text style={{ textAlign: "center" }}>
                  {item.customerAddress}
                </Text>

                {openRowId === item._id &&
                  item.extraCustomers?.map((ex) => (
                    <Text
                      key={ex._id + "addr"}
                      style={{
                        textAlign: "center",
                        marginTop: 4,
                      }}
                    >
                      {ex.customerAddress}
                    </Text>
                  ))}
              </View>
              <View style={{ minWidth: 120 }}>
                <Text style={{ textAlign: "center" }}>
                  {item.customerPhoneNumber}
                </Text>

                {openRowId === item._id &&
                  item.extraCustomers?.map((ex) => (
                    <Text
                      key={ex._id + "phone"}
                      style={{
                        textAlign: "center",
                        marginTop: 4,
                      }}
                    >
                      {ex.customerPhoneNumber}
                    </Text>
                  ))}
              </View>
                      <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>{item.customerOccupation}</Text>
                      <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>{item.totalCustomer}</Text>
                      <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>{item.relation}</Text>
                      <Text style={{ minWidth: 150, textAlign: "center", paddingHorizontal: 8 }}>{item.customerCity}</Text>
                      <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>{item.customerDestination}</Text>
                      <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>{item.checkInDate}</Text>
                      <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>{item.checkInTime}</Text>
                      <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>{item.checkOutDate}</Text>
                      <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>{item.personalCheckOutTime}</Text>
                      <View style={{flex:1,justifyContent:"center"}}>
                      <Image
      source={{ uri: item.customerSignature }}
      style={{ width: 50, height: 25, resizeMode: "contain", borderWidth:1, borderColor:"#ccc",marginLeft:30,marginTop:-12 }}
    />
         
                      </View>
                      <Text style={{minWidth: 120,textAlign: "center", paddingHorizontal: 8 }}>{item.totalPayment}</Text>
                     <Text style={{minWidth: 120,  textAlign: "center", paddingHorizontal: 8 }}>{item.paymentPaid}</Text>
                     <Text style={{ minWidth: 120, textAlign: "center", paddingHorizontal: 8 }}>{item.paymentDue}</Text>
                     <Button mode="contained" style={{ borderRadius: 11, marginLeft: 20,height:40 }} buttonColor="rgba(234, 88, 12, 1)" onPress={() => morePersonalDetailsHandler(item._id)}>
                     Details
                      </Button>
                      <Button mode="contained" style={{ borderRadius: 11, marginLeft: 20 }} buttonColor="rgba(234, 88, 12, 1)" onPress={() => deletePersonalCustomerReport(item._id)}>
                        Delete
                      </Button>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
        </ScrollView>
            </Card.Content>
          </Card>
        );
      };
      
    
return (
    <View style={{ flex: 1 }}>
    {isSmallScreen ? (
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {renderCardContent()}
      </ScrollView>
    ) : (
      <View style={{ flex: 1 }}>
        {renderCardContent()}
      </View>
    )}
  </View>
)
}
export default PersonalReport