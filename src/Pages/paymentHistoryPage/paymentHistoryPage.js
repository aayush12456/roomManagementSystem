import { getPaymentActiveAsync } from "../../Redux/Slice/getPaymentActiveSlice/getPaymentActiveSlice"
import { getPaymentHistoryAsync } from "../../Redux/Slice/getPaymentHistorySlice/getPaymentHistorySlice"
import AnotherHeader from "../../components/common/anotherHeader/anotherHeader"
import PaymentHistory from "../../components/paymentHistory/paymentHistory"
import {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
const PaymentHistoryPage=({route})=>{
    const dispatch=useDispatch()
    const paymentHistorySelector=useSelector((state)=>state.getPaymentHistory.getPaymentHistoryObj)
    // console.log('payment hidtory',paymentHistorySelector)
    const paymentActiveSelector=useSelector((state)=>state.getPaymentActive.getPaymentActiveObj)
    // console.log('payment active',paymentActiveSelector)
    const hotelId=route.params.hotelId
    useEffect(()=>{
if(hotelId){
dispatch(getPaymentHistoryAsync(hotelId))
}
    },[hotelId])
    useEffect(()=>{
        if(hotelId){
        dispatch(getPaymentActiveAsync(hotelId))
        }
            },[hotelId])
return (
    <>
    <AnotherHeader edit={route}/>
    <PaymentHistory paymentHistory={paymentHistorySelector.subscriptionArray} paymentActive={paymentActiveSelector} />
    </>
)
}
export default PaymentHistoryPage