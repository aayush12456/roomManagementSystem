import Payment from "../../components/payment/payment"
const PaymentPage=({hotelId,profile})=>{
return (
    <>
    <Payment hotelId={hotelId} profile={profile}/>
    </>
)
}
export default PaymentPage