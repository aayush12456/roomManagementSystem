import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList } from '@react-navigation/drawer';
import DashboardPage from '../../../Pages/dashboardPage/dashboardPage';
import ReportPage from '../../../Pages/reportPage/reportPage';
import { Image,View ,Text} from 'react-native';
import { Button } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import room from '../../../../assets/sidebarIcons/bed.png'
import chart from '../../../../assets/sidebarIcons/pieChart.png'
import report from '../../../../assets/sidebarIcons/report.png'
import setting from '../../../../assets/sidebarIcons/settingImg.png'
import myProfile from '../../../../assets/sidebarIcons/profile.png'
import hotelIcon from '../../../../assets/sidebarIcons/hotelIcon.png'
import premiumIcon from '../../../../assets/sidebarIcons/premium.png'
import notifyIcon from '../../../../assets/notification.png'
import ProfilePage from '../../../Pages/profilePage/profilePage';
import SettingsPage from '../../../Pages/settingsPage/settingsPage';
import PerformancePage from '../../../Pages/performancePage/performancePage';
import HotelGalleryPage from '../../../Pages/hotelGalleryPage/hotelGalleryPage';
import NotificationPage from '../../../Pages/notificationPage/notificationPage';
import io from "socket.io-client";
import axios from "axios";
import PaymentPage from '../../../Pages/paymentPage/paymentPage';
import TrialCountDown from '../../trialCountDown/trialCountDown';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import PlanScreen from '../planScreen/planScreen';
const socket = io.connect("http://192.168.29.169:4000")
// const socket = io.connect("https://roommanagementsystembackend-1.onrender.com")

const Header=({profile,allStaffPlusOwner,hotelId,profileArrays,policeReport,totalRoom,
  hotelImgFirst,hotelName,notifyTokenArray,notifyToken,setTimeEnd,planStatus})=>{

    const BASE_URL = "http://192.168.29.169:4000";
    // const BASE_URL = "https://roommanagementsystembackend-1.onrender.com";
    const Drawer = createDrawerNavigator();
    const navigation = useNavigation();
    const planSlice=useSelector((state)=>state.planScreenData.planScreenToggle)
    console.log('profile is',profile)
    const paymentActiveSelector=useSelector((state)=>state.getPaymentActive.getPaymentActiveObj)
    console.log('pay seelctor',paymentActiveSelector)
    // console.log('hotelid',hotelId)
    console.log('notify tokens',notifyToken)
    console.log('polive',policeReport)
    const policeReportArray=policeReport
    const [isLast24Hours, setIsLast24Hours] = useState(false);
    
    const removeLoginData = async () => {
        try {
          await SecureStore.deleteItemAsync('loginOtpObj');
          console.log('login obj removed from SecureStore');
        } catch (error) {
          console.error('Error removing login obj:', error);
        }
      };
    const logoutHandler=async()=>{
      try {
        const response = await axios.post(`${BASE_URL}/hotel/deleteNotificationToken/${hotelId}`,{notifyToken:notifyToken});
        console.log('notify token delete',response?.data)
        socket.emit('deleteNotificationToken', response?.data)
    } catch (error) {
        // console.error('Error sending activate', error);
    }
     removeLoginData()
     navigation.navigate('LoginPage')
    }
    console.log('is last',isLast24Hours)
return (
    <>
  {planSlice===false? <Drawer.Navigator
  drawerContent={(props) => (
    <DrawerContentScrollView {...props} 
    // contentContainerStyle={{ flex: 1 }}
    scrollEnabled={isLast24Hours}
showsVerticalScrollIndicator={isLast24Hours}

    >
      {/* <Text>Free Trial End</Text>
      <Text>{countDownTime}</Text> */}
      <TrialCountDown hotelId={hotelId}   onLast24HoursChange={setIsLast24Hours} setTimeEnd={setTimeEnd}/>
      {/* 👇 Profile Section Top Fixed */}
      <View style={{ alignItems: "center", paddingVertical: 20 }}>
        <Image
          source={{ uri: profile?.image }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 60,
            marginBottom: 5,
          }}
        />
        <Text style={{ color: "black", fontSize: 20,fontWeight:500,textAlign:'center',paddingTop:6 }}>{profile?.name}</Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <DrawerItemList {...props} />
      </View>

      {/* 👇 Logout Button Bottom Fixed */}
      <View style={{ padding: 20, marginTop: "auto" }}>
        <Button
          mode="contained"
          buttonColor="#28a745"
          style={{ borderRadius: 25, height: 50, paddingTop: 4, fontSize: 16 }}
          onPress={logoutHandler}
        >
          Sign Out
        </Button>
      </View>
    </DrawerContentScrollView>
  )}
>
     {/* <Drawer.Screen
        name='Room Preview'
        component={DashboardPage}
        options={{
          drawerIcon:()=>(
            <Image  source={room}
            style={{ width: 20, height: 20 }}/>
        ),
        }}
        
      /> */}
    
        <Drawer.Screen
        name='Room Preview'
        options={{
          drawerIcon:()=>(
            <Image  source={room}
            style={{ width: 20, height: 20 }}/>
        ),
        }}
        
      >
           {(props) => <DashboardPage {...props} profile={profile} notifyTokenArray={notifyTokenArray}
           planStatus={planStatus}
           />}
        </Drawer.Screen>

         <Drawer.Screen
        name='Performance Graph'
        options={{
          drawerIcon:()=>(
            <Image  source={chart}
            style={{ width: 20, height: 20 }}/>
        ),
        }}
      >
            {(props) => <PerformancePage {...props} policeReport={policeReportArray} totalRoom={totalRoom}/>}
        </Drawer.Screen>
         <Drawer.Screen
        name='Reports'
        component={ReportPage}
        options={{
          drawerIcon:()=>(
            <Image  source={report}
            style={{ width: 20, height: 20 }}/>
        ),
        }}
      />
      <Drawer.Screen
        name='Profile'
        options={{
          drawerIcon:()=>(
            <Image  source={myProfile}
            style={{ width: 20, height: 20 }}/>
        ),
        }}
      >
        {(props) => <ProfilePage {...props}  profile={profile} allStaffOwner={allStaffPlusOwner}
         hotelIds={hotelId} notifyTokenArray={notifyTokenArray} planStatus={planStatus} />}
        </Drawer.Screen>

        <Drawer.Screen
        name='Settings'
        // component={SettingsPage}
        options={{
          drawerIcon:()=>(
            <Image  source={setting}
            style={{ width: 20, height: 20 }}/>
        ),
        }}
      >
      {(props) => <SettingsPage {...props}  profileArray={profileArrays} hotelId={hotelId}  
       phone={profile?.phone}  hotelImgFirst={hotelImgFirst} hotelName={hotelName} profile={profile}/>}
        </Drawer.Screen>

        {!profile.post?<Drawer.Screen
        name='Hotel Gallery'
        // component={SettingsPage}
        options={{
          drawerIcon:()=>(
            <Image  source={hotelIcon}
            style={{ width: 20, height: 20 }}/>
        ),
        }}
      >
      {(props) => <HotelGalleryPage hotelImg={hotelImgFirst} hotelId={hotelId}  />}
        </Drawer.Screen>:null}

 <Drawer.Screen
        name='Notification'
        // component={SettingsPage}
        options={{
          drawerIcon:()=>(
            <Image  source={notifyIcon}
            style={{ width: 20, height: 20 }}/>
        ),
        }}
      >
      {(props) =><NotificationPage hotelId={hotelId}  allStaffOwner={allStaffPlusOwner} />}
        </Drawer.Screen>

       {!profile.post && planStatus !== "free" && paymentActiveSelector.activeSubscription==null? <Drawer.Screen
        name='Premium'
        // component={SettingsPage}
        options={{
          drawerIcon:()=>(
            <Image  source={premiumIcon}
            style={{ width: 20, height: 20 }}/>
        ),
        }}
      >
      {(props) =><PaymentPage hotelId={hotelId}  />}
        </Drawer.Screen>:null}
     </Drawer.Navigator>
    :
    <PlanScreen hotelId={hotelId} profile={profile}/> 
    }
     
    </>
)
}
export default Header