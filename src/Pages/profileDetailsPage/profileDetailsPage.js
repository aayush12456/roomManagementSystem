import AnotherHeader from "../../components/common/anotherHeader/anotherHeader"
import ProfileDetails from "../../components/common/profileDetails/profileDetails"

const ProfileDetailsPage=({route})=>{
    console.log('staff route',route)
    const profileDetailsObj=route?.params?.formData
    const hotelId=route?.params?.hotelId
    const hierarchyHeading=route?.params?.anotherHeading
return (
    <>
    <AnotherHeader  edit={route}/>
    <ProfileDetails profileDetails={profileDetailsObj} hotelId={hotelId} hierarchyHeading={hierarchyHeading}/>
    </>
)
}
export default ProfileDetailsPage