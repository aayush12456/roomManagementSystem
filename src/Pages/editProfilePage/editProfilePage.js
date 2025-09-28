import AnotherHeader from "../../components/common/anotherHeader/anotherHeader";
import EditProfile from "../../components/editProfile/editProfile";

const EditProfilePage=({route})=>{
    console.log('route is',route)
return (
    <>
    <AnotherHeader edit={route}/>
    <EditProfile edit={route}/>
    </>
)
}
export default EditProfilePage