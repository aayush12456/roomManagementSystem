import HotelGallery from "../../components/hotelGallery/hotelGallery"
const HotelGalleryPage=({hotelImg,hotelId,notifyTokenArray})=>{
   
return (
    <>
    <HotelGallery hotelImg={hotelImg} hotelId={hotelId} notifyTokenArray={notifyTokenArray}/>
    
    </>
)
}
export default HotelGalleryPage
