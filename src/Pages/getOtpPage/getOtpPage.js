import GetOtpInput from "../../components/getOtpInput/getOtpInput"

const GetOtpPage=({route})=>{
    console.log('route',route)
    const { formData } = route?.params
    const {passData}=route?.params
    console.log('form data page',formData)
return(
    <>
    <GetOtpInput hotelObj={formData} data={passData}/>
    </>
)
}
export default GetOtpPage