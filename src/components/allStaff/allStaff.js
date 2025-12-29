import {View,ScrollView} from 'react-native'
import StaffCard from '../staffCard/staffCard'
const AllStaff=({allStaff,hotelsId,profile,notifyTokenArray})=>{
    console.log('all',allStaff)
    console.log('staff is',hotelsId)
return (
    <>
    <ScrollView>
    {
        allStaff.map(staff=>{
            return (
             <View key={staff?._id}>
            <StaffCard staffObj={staff} hotelId={hotelsId} profile={profile} notifyTokenArray={notifyTokenArray}/>

             </View>
            )
        })
    }
    </ScrollView>
    </>
)

}
export default AllStaff