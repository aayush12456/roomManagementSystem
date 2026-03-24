import AnotherHeader from "../../components/common/anotherHeader/anotherHeader"
import Reply from "../../components/reply/reply"

const ReplyPage=({route})=>{
    const profile=route.params.profile
    const hotelName=route.params.hotelName
    const hotelId=route.params.hotelId
return (
    <>
   <AnotherHeader edit={route}/>
    <Reply profile={profile} hotelName={hotelName} hotelId={hotelId}/>
    </>
)
}
export default ReplyPage