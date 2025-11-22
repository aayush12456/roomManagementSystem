import Settings from "../../components/settings/settings"
const SettingsPage=({profileArray,hotelId,phone, hotelImgFirst})=>{
return (
    <>
    <Settings profileArray={profileArray} hotelId={hotelId} phone={phone} hotelImgFirst={hotelImgFirst} />
    </>
)
}
export default SettingsPage