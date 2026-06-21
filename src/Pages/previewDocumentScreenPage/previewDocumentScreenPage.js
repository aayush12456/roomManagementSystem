import PreviewDocumenScreen from "../../components/previewDocumentScreen/previewDocumenScreen"
import AnotherHeader from "../../components/common/anotherHeader/anotherHeader"
const PreviewDocumentScreenPage=({route})=>{
    console.log('route in screen',route)
    const documentImg=route?.params?.images
   const key=route?.params?.data
   const singleImg=route?.params?.finalImg
return (
    <>
    <AnotherHeader edit={route}/>
    <PreviewDocumenScreen documentImgUrlArray={documentImg} data={key} singleImg={singleImg}/>
    </>
)
}
export default PreviewDocumentScreenPage