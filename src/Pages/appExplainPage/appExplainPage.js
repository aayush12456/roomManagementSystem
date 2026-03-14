import AppExplain from "../../components/appExplain/appExplain"
import AnotherHeader from "../../components/common/anotherHeader/anotherHeader"

const AppExplainPage=({route})=>{
    console.log('explain route',route)
    const profile=route?.params?.profile
return (
    <>
    <AnotherHeader edit={route}/>
    <AppExplain profile={profile}/>
    </>
)
}
export default AppExplainPage