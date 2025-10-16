import AnotherHeader from "../../components/common/anotherHeader/anotherHeader"
import ExistingAccount from "../../components/existingAccount/existingAccount"

const ExistingAccountPage=({route})=>{
return (
    <>
    <AnotherHeader edit={route}/>
    <ExistingAccount/>
    </>
)
}
export default ExistingAccountPage