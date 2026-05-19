import AnotherHeader from "../../components/common/anotherHeader/anotherHeader"
import ContactUs from "../../components/contactUs/contactUs"

const ContactUsPage=({route})=>{
    // console.log('contact route',route)
    const profile=route.params.profile
    const hotelName=route.params.hotelName
    const hotelId=route.params.hotelId
return (
    <>
    <AnotherHeader edit={route}/>
    <ContactUs profile={profile} hotelName={hotelName} hotelId={hotelId}/>
    </>
)
}
export default ContactUsPage