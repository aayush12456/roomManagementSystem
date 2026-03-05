import AnotherHeader from "../../components/common/anotherHeader/anotherHeader"
import PrivacyPolicy from "../../components/privacyPolicy/privacyPolicy"

const PrivacyPolicyPage=({route})=>{
return (
    <>
    <AnotherHeader edit={route}/>
    <PrivacyPolicy/>
    </>
)
}
export default PrivacyPolicyPage