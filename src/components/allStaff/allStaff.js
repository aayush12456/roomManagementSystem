import {View,ScrollView} from 'react-native'
import StaffCard from '../staffCard/staffCard'
const AllStaff=({allStaff})=>{
    console.log('all',allStaff)
return (
    <>
    <ScrollView>
    {
        allStaff.map(staff=>{
            return (
             <View key={staff?._id}>
                <StaffCard staffObj={staff}/>
             </View>
            )
        })
    }
    </ScrollView>
    </>
)

}
export default AllStaff