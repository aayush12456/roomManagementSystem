
import AnotherHeader from "../../components/common/anotherHeader/anotherHeader"
import PaymentHistory from "../../components/paymentHistory/paymentHistory"

const PaymentHistoryPage=({route})=>{
    // console.log('edit sharma',route)
    const paymentHistorySelector=route.params.paymentHistory
    const paymentActiveSelector=route.params.paymentActive
return (
    <>
    <AnotherHeader edit={route}/>
    <PaymentHistory paymentHistory={paymentHistorySelector?.subscriptionArray} paymentActive={paymentActiveSelector} />
    </>
)
}
export default PaymentHistoryPage