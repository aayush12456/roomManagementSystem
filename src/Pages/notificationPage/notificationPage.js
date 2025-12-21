import Notification from "../../components/notification/notification"
import {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { getMessageNotifyAsync } from "../../Redux/Slice/getMessageNotifySlice/getMessageNotifySlice"
const NotificationPage=({hotelId})=>{
    const dispatch=useDispatch()
    const messageNotifySelector=useSelector((state)=>state.getMessageNotify.getMessageNotifyObj.notifyMessageArray)
    const addRoomSelector = useSelector((state) => state.addRoomData.addRoomObj);
    const addFloorSelector = useSelector((state) => state.addFloorData.addFloorObj);
    const deleteFloorSelector = useSelector(
        (state) => state.deleteFloorData.deleteFloorObj
      );
      const deleteRoomSelector = useSelector(
        (state) => state.deleteRoomData.deleteRoomObj
      );
    console.log('add rooms notify',addRoomSelector)
    console.log('message notify',messageNotifySelector)
    console.log('deelte room notify',deleteRoomSelector)
    useEffect(()=>{
     if(hotelId){
     dispatch(getMessageNotifyAsync(hotelId))
     }
    },[hotelId])
    
    const finalNotifyArray=addRoomSelector.notifyMessageArray||messageNotifySelector||
    addFloorSelector.notifyMessageArray || deleteRoomSelector.notifyMessageArray
return (
    <>
    <Notification message={finalNotifyArray}/>
    </>
)
}
export default NotificationPage