import AnotherHeader from "../../components/common/anotherHeader/anotherHeader"
import Maintenance from "../../components/maintenance/maintenance"

const MaintenancePage=({route})=>{
    const { formData } = route.params
    const floorName=route.params.titles
    const profileName=route.params.profileName
    // console.log('profile is',profileName)
return (
    <>
        <AnotherHeader edit={route}/>
    <Maintenance roomDetails={formData} floorName={floorName} profileName={profileName}/>
    </>
)
}
export default MaintenancePage