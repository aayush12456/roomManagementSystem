import Collage from "../../components/collage/collage"
import AnotherHeader from "../../components/common/anotherHeader/anotherHeader"

const CollagePage=({route})=>{
    const collageImg=route?.params?.images
return (
    <>
<AnotherHeader edit={route}/>
    <Collage  collageImgUrlArray={collageImg}/>
    </>
)
}
export default CollagePage