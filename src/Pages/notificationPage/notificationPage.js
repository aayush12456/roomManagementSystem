import Notification from "../../components/notification/notification";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessageNotifyAsync } from "../../Redux/Slice/getMessageNotifySlice/getMessageNotifySlice";

const NotificationPage = ({ hotelId, allStaffOwner }) => {
  const dispatch = useDispatch();

  const messageNotifySelector = useSelector(
    (state) =>
      state.getMessageNotify?.getMessageNotifyObj?.notifyMessageArray 
  )|| []

  const allStaffOwnerNotifyArray =
    allStaffOwner?.notifyMessageArray || [];

  // 🔥 Fetch redux notifications once per hotel
  useEffect(() => {
    if (hotelId) dispatch(getMessageNotifyAsync(hotelId));
  }, [hotelId, dispatch]);

  // 🔥 ALWAYS merge + remove duplicates
  const preFinalNotifyArray = useMemo(() => {
    const merged = [
      ...messageNotifySelector,
      ...allStaffOwnerNotifyArray,
    ];

    const map = new Map();
    merged.forEach((m) =>
      map.set(m._id || m.createdAt || JSON.stringify(m), m)
    );

    return Array.from(map.values()).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [messageNotifySelector, allStaffOwnerNotifyArray]);
  const finalNotifyArray=preFinalNotifyArray?.filter((item)=>item.hotelId==hotelId)

  return <Notification message={finalNotifyArray} hotelId={hotelId} />;
};

export default NotificationPage;
