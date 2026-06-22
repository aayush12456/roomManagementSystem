import DocumentScan from "../../components/documentScan/documentScan"

const DocumentScannerPage=({planStatus,paymentActiveSelector})=>{
return (
    <>
    <DocumentScan planStatus={planStatus} paymentActiveSelector={paymentActiveSelector}/>
    </>
)
}
export default DocumentScannerPage