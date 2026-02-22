import NetInfo from "@react-native-community/netinfo";
import { useEffect, useRef } from "react";
import { Alert } from "react-native";

const InternetChecker = () => {
  const wasOffline = useRef(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const isOnline = state.isConnected && state.isInternetReachable;

      if (!isOnline && !wasOffline.current) {
        wasOffline.current = true;

        Alert.alert(
          "No Internet",
          "Internet connection is not available. Please check your connection."
        );
      }

      if (isOnline) {
        wasOffline.current = false;
      }
    });

    return () => unsubscribe();
  }, []);

  return null;
};

export default InternetChecker;
