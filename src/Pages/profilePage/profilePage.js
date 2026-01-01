import MyProfile from "../../components/myProfile/myProfile"
import { BottomNavigation} from "react-native-paper"
import { View,Dimensions } from "react-native"
import { useState,useMemo } from "react"
import Hierarchy from "../../components/Hierarchy/hierarchy"
import AddStaff from "../../components/addStaff/addStaff"
import AllStaff from "../../components/allStaff/allStaff"
import AddOwner from "../../components/addOwner/addOwner"
const ProfilePage=({profile,allStaffOwner,hotelIds,notifyTokenArray})=>{
  console.log('staff profile',allStaffOwner)
  console.log('id is',hotelIds)
    console.log('pofile page',profile)
    const allStaffArray = allStaffOwner?.staff ? Object.values(allStaffOwner.staff) : [];
    console.log('staff array',allStaffArray)
    const allOwnerArray=[allStaffOwner.owner1,allStaffOwner.owner2,allStaffOwner.owner3,allStaffOwner.owner4]
    console.log('owner array',allOwnerArray)
    const screenHeight = Dimensions.get("window").height;
    // console.log('screen height',screenHeight)
    const isSmallScreen = screenHeight <= 640;

    const [index, setIndex] = useState(0);
    const routes = useMemo(() => {
      if (profile?.post) {
        // If user has a "post", show only MyProfile & Hierarchy
        return [
          { key: "myProfile", title: "My Profile", focusedIcon: "account-circle" },
          { key: "hierarchy", title: "Hierarchy", focusedIcon: "family-tree" },
        ];
      } else {
        // If no post, show all options
        return [
          { key: "myProfile", title: "My Profile", focusedIcon: "account-circle" },
          { key: "hierarchy", title: "Hierarchy", focusedIcon: "family-tree" },
          { key: "allStaff", title: "All Staff", focusedIcon: "account-group" },
          { key: "addStaff", title: "Add Staff", focusedIcon: "account-plus" },
          { key: "addOwner", title: "Add Owner", focusedIcon: "account-tie" },
        ];
      }
    }, [profile?.post]);
//   const MyProfileRoute = () => (
//     <View style={{ flex: 1 }}>
//       <MyProfile profiles={profile}/> 
//     </View>
//   );
//   const HierarchyRoute = () => (
//     <View style={{ flex: 1 }}>
// <Hierarchy/>
//     </View>
//   );
//   const AddStaffRoute = () => (
//     <View style={{ flex: 1 }}>
// <AddStaff/>
//     </View>
//   );
//   const AllStaffRoute = () => (
//     <View style={{ flex: 1 }}>
// <AllStaff allStaff={allStaffArray} />
//     </View>
//   );
//   const AddOwnerRoute = () => (
//     <View style={{ flex: 1 }}>
// <AddOwner/>
//     </View>
//   );


    // const renderScene = BottomNavigation.SceneMap({
    //     myProfile: MyProfileRoute,
    //     hierarchy: HierarchyRoute,
    //     addStaff:AddStaffRoute,
    //     allStaff:AllStaffRoute,
    //     addOwner:AddOwnerRoute
    //   });
    const renderScene = ({ route }) => {
      switch (route.key) {
        case "myProfile":
          return <MyProfile profiles={profile} />;
        case "hierarchy":
          return <Hierarchy allStaff={allStaffArray} allOwner={allOwnerArray} />;
        case "allStaff":
          return <AllStaff allStaff={allStaffArray} hotelsId={hotelIds} profile={profile}notifyTokenArray={notifyTokenArray}/>;
        case "addStaff":
          return <AddStaff profile={profile}notifyTokenArray={notifyTokenArray}  hotelId={hotelIds} />;
        case "addOwner":
          return <AddOwner  hotelsId={hotelIds}  profile={profile}notifyTokenArray={notifyTokenArray} />;
        default:
          return null;
      }
    };
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