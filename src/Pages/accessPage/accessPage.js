import Access from "../../components/access/access"
import AnotherHeader from "../../components/common/anotherHeader/anotherHeader"

const AccessPage=({route})=>{
    const profile=route.params.profile
    const hotelName=route.params.hotelName
    const hotelId=route.params.hotelId
return (
    <>
       <AnotherHeader edit={route}/>
    <Access profile={profile} hotelName={hotelName} hotelId={hotelId} />
    </>
)
}
export default AccessPage