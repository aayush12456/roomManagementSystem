import EditStaffProfile from "../../components/editStaffProfile/editStaffProfile"

const EditStaffProfilePage=({route})=>{
    console.log('route srd',route)
    const editStaffObj=route?.params?.formData
return (
    <>
    <EditStaffProfile editStaff={editStaffObj} />
    </>
)
}
export default EditStaffProfilePage