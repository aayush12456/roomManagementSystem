import Settings from "../../components/settings/settings"
const SettingsPage=({profileArray,hotelId,phone, hotelImgFirst,hotelName,profile})=>{
return (
    <>
    <Settings profileArray={profileArray} hotelId={hotelId} phone={phone}
     hotelImgFirst={hotelImgFirst} hotelName={hotelName} profile={profile} />
    </>
)
}
export default SettingsPage