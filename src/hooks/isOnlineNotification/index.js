
import { useEffect, useState } from 'react';

let reconnectionTimeOut = null;
const THROTTLE_TIME = 2000;
const DISCONNECTED = false;

const useIsOnlineNotification = () => {
  const [isOnlineApp, setIsOnlineApp] = useState(false);
  const [isOnlineNotification, setIsOnlineNotification] = useState(false);

  useEffect(() => {
    if (isOnlineApp === DISCONNECTED) {
      reconnectionTimeOut = setTimeout(() => {
        setIsOnlineNotification(false);
      }, THROTTLE_TIME);
    } else {
      clearTimeout(reconnectionTimeOut)
      setIsOnlineNotification(true);
    }

    return () => {
      clearTimeout(reconnectionTimeOut)
    }    
  }, [isOnlineApp]);

  return [
    isOnlineNotification,
    setIsOnlineApp
  ]
}

export default useIsOnlineNotification