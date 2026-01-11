import PaymentSuccess from "../../components/paymentSuccess/paymentSuccess"

const PaymentSuccessPage=({route})=>{
    const { formData } = route.params
    console.log('form data',formData)
    const amount=formData.amount
    const objData=formData.obj
return (
    <>
    <PaymentSuccess amount={amount} objData={objData}/>
    </>
)
}
export default PaymentSuccessPage