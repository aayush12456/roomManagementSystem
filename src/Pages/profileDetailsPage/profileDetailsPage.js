import AnotherHeader from "../../components/common/anotherHeader/anotherHeader"
import ProfileDetails from "../../components/common/profileDetails/profileDetails"

const ProfileDetailsPage=({route})=>{
    console.log('staff route',route)
    const profileDetailsObj=route?.params?.formData
return (
    <>
    <AnotherHeader  edit={route}/>
    <ProfileDetails profileDetails={profileDetailsObj}/>
    </>
)
}
export default ProfileDetailsPage