import AllHotelDetails from "../../components/allHotelDetails/allHotelDetails"
import AnotherHeader from "../../components/common/anotherHeader/anotherHeader"

const AllHotelDetailsPage=({route})=>{
    const hotelDetailsObj=route?.params?.formData
return (
    <>
    <AnotherHeader edit={route}/>
<AllHotelDetails hotelDetails={hotelDetailsObj}/>
    </>
)
}
export default AllHotelDetailsPage