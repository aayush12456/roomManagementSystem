import GetOtpInput from "../../components/getOtpInput/getOtpInput"

const GetOtpPage=({route})=>{
    const { formData } = route?.params
    console.log('form data page',formData)
return(
    <>
    <GetOtpInput hotelName={formData}/>
    </>
)
}
export default GetOtpPage