import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardPage from '../../../Pages/dashboardPage/dashboardPage';
import ReportPage from '../../../Pages/reportPage/reportPage';
const Header=()=>{
    const Drawer = createDrawerNavigator();
return (
    <>
     <Drawer.Navigator >
     <Drawer.Screen
        name='Room Preview'
        component={DashboardPage}
        // options={{ 
        //   drawerLabel: () => (
        //     <View style={{ flexDirection: 'row', alignItems: 'center',marginLeft:-12 }}>
        //       {/* User Name */}
        //       <Text style={{ fontSize: 16,color:`${completeObj?.appearanceMode==='Dark Mode'?'white':'black'}`, marginRight: 60 }}>
        //         {loginData?.name || 'data'}
        //       </Text>
        //       {/* Settings Icon */}
        //       <Pressable   onPress={() => navigation.navigate('Settings')}>
        //       <Image
        //         source={settings} // Replace with your settings image path
        //         style={{ width: 24, height: 24,tintColor:`${completeObj?.appearanceMode==='Dark Mode'?'white':'black'}` }}
        //       />
        //       </Pressable>
        //     </View>
        //   ),
          
        //     drawerIcon:()=>(
        //         <Image source={{ uri: loginData?.image }}
        //         style={{ width: 65, height: 65,borderRadius:30 }}/>
        //     ),
        //     drawerLabelStyle: {
        //         marginLeft:'-13%'
        //       },
        //       drawerActiveBackgroundColor: 'none', // No background when active
        //       drawerInactiveBackgroundColor: 'none', // No background when inactive
        //       drawerActiveTintColor: 'black', // Set text color as needed
        //       drawerInactiveTintColor: 'black', // Text color remains the same
        //  }}
      />
         <Drawer.Screen
        name='Performance Graph'
        component={DashboardPage}
        // options={{ 
        //   drawerLabel: () => (
        //     <View style={{ flexDirection: 'row', alignItems: 'center',marginLeft:-12 }}>
        //       {/* User Name */}
        //       <Text style={{ fontSize: 16,color:`${completeObj?.appearanceMode==='Dark Mode'?'white':'black'}`, marginRight: 60 }}>
        //         {loginData?.name || 'data'}
        //       </Text>
        //       {/* Settings Icon */}
        //       <Pressable   onPress={() => navigation.navigate('Settings')}>
        //       <Image
        //         source={settings} // Replace with your settings image path
        //         style={{ width: 24, height: 24,tintColor:`${completeObj?.appearanceMode==='Dark Mode'?'white':'black'}` }}
        //       />
        //       </Pressable>
        //     </View>
        //   ),
          
        //     drawerIcon:()=>(
        //         <Image source={{ uri: loginData?.image }}
        //         style={{ width: 65, height: 65,borderRadius:30 }}/>
        //     ),
        //     drawerLabelStyle: {
        //         marginLeft:'-13%'
        //       },
        //       drawerActiveBackgroundColor: 'none', // No background when active
        //       drawerInactiveBackgroundColor: 'none', // No background when inactive
        //       drawerActiveTintColor: 'black', // Set text color as needed
        //       drawerInactiveTintColor: 'black', // Text color remains the same
        //  }}
      />
         <Drawer.Screen
        name='Reports'
        component={ReportPage}
        // options={{ 
        //   drawerLabel: () => (
        //     <View style={{ flexDirection: 'row', alignItems: 'center',marginLeft:-12 }}>
        //       {/* User Name */}
        //       <Text style={{ fontSize: 16,color:`${completeObj?.appearanceMode==='Dark Mode'?'white':'black'}`, marginRight: 60 }}>
        //         {loginData?.name || 'data'}
        //       </Text>
        //       {/* Settings Icon */}
        //       <Pressable   onPress={() => navigation.navigate('Settings')}>
        //       <Image
        //         source={settings} // Replace with your settings image path
        //         style={{ width: 24, height: 24,tintColor:`${completeObj?.appearanceMode==='Dark Mode'?'white':'black'}` }}
        //       />
        //       </Pressable>
        //     </View>
        //   ),
          
        //     drawerIcon:()=>(
        //         <Image source={{ uri: loginData?.image }}
        //         style={{ width: 65, height: 65,borderRadius:30 }}/>
        //     ),
        //     drawerLabelStyle: {
        //         marginLeft:'-13%'
        //       },
        //       drawerActiveBackgroundColor: 'none', // No background when active
        //       drawerInactiveBackgroundColor: 'none', // No background when inactive
        //       drawerActiveTintColor: 'black', // Set text color as needed
        //       drawerInactiveTintColor: 'black', // Text color remains the same
        //  }}
      />
     </Drawer.Navigator>
    </>
)
}
export default Header