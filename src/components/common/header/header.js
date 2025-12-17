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
import ProfilePage from '../../../Pages/profilePage/profilePage';
import SettingsPage from '../../../Pages/settingsPage/settingsPage';
import PerformancePage from '../../../Pages/performancePage/performancePage';
import HotelGalleryPage from '../../../Pages/hotelGalleryPage/hotelGalleryPage';

const Header=({profile,allStaffPlusOwner,hotelId,profileArrays,policeReport,totalRoom,hotelImgFirst,hotelName,notifyToken})=>{
    const Drawer = createDrawerNavigator();
    const navigation = useNavigation();
    console.log('profile is',profile)
    // console.log('hotelid',hotelId)
    console.log('polive',policeReport)
    const policeReportArray=policeReport

    const removeLoginData = async () => {
        try {
          await SecureStore.deleteItemAsync('loginOtpObj');
          console.log('login obj removed from SecureStore');
        } catch (error) {
          console.error('Error removing login obj:', error);
        }
      };
    const logoutHandler=()=>{
     removeLoginData()
     navigation.navigate('LoginPage')
    }
return (
    <>
   <Drawer.Navigator
  drawerContent={(props) => (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      
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
           {(props) => <DashboardPage {...props} profile={profile}/>}
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
        {(props) => <ProfilePage {...props}  profile={profile} allStaffOwner={allStaffPlusOwner} hotelIds={hotelId}/>}
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
     </Drawer.Navigator>
     
    </>
)
}
export default Header