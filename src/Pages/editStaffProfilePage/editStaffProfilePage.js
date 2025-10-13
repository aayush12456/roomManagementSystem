import EditStaffProfile from "../../components/editStaffProfile/editStaffProfile"

const EditStaffProfilePage=({route})=>{
    console.log('route srd',route)
    const editStaffObj=route?.params?.formData
    const hotelId=route?.params?.hotelsId
return (
    <>
    <EditStaffProfile editStaff={editStaffObj} hotelId={hotelId}/>
    </>
)
}
export default EditStaffProfilePage