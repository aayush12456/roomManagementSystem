import MyProfile from "../../components/myProfile/myProfile"
import { BottomNavigation} from "react-native-paper"
import { View,Dimensions } from "react-native"
import { useState } from "react"
import Hierarchy from "../../components/Hierarchy/hierarchy"
import AddStaff from "../../components/addStaff/addStaff"
const ProfilePage=({profile})=>{
    console.log('pofile page',profile)

    const screenHeight = Dimensions.get("window").height;
    console.log('screen height',screenHeight)
    const isSmallScreen = screenHeight <= 640;

    const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'myProfile', title: 'My Profile', focusedIcon: 'account-circle' },
    { key: 'hierarchy', title: 'Hierarchy', focusedIcon: 'family-tree' },
    { key: 'addStaff', title: 'Add Staff', focusedIcon: 'account-plus' },
  ]);
  const MyProfileRoute = () => (
    <View style={{ flex: 1 }}>
      <MyProfile profiles={profile}/> 
    </View>
  );
  const HierarchyRoute = () => (
    <View style={{ flex: 1 }}>
<Hierarchy/>
    </View>
  );
  const AddStaffRoute = () => (
    <View style={{ flex: 1 }}>
<AddStaff/>
    </View>
  );
    const renderScene = BottomNavigation.SceneMap({
        myProfile: MyProfileRoute,
        hierarchy: HierarchyRoute,
        addStaff:AddStaffRoute
      });
return (
    <>
    {/* <MyProfile profiles={profile}/> */}
    <View style={{ flex: 1 }}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </View>
    </>
)
}
export default ProfilePage