import Settings from "../../components/settings/settings"
const SettingsPage=({profileArray,hotelId,phone})=>{
return (
    <>
    <Settings profileArray={profileArray} hotelId={hotelId} phone={phone} />
    </>
)
}
export default SettingsPage