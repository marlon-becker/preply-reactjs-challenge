
import { useEffect, useRef, useState } from 'react';

const THROTTLE_TIME = 2000;
const DISCONNECTED = false;

const useIsOnlineNotification = () => {
  const reconnectionTimeOut = useRef(null)
  const [isOnlineApp, setIsOnlineApp] = useState(false);
  const [isOnlineNotification, setIsOnlineNotification] = useState(false);

  useEffect(() => {
    if (isOnlineApp === DISCONNECTED) {
      reconnectionTimeOut.current = setTimeout(() => {
        setIsOnlineNotification(false);
      }, THROTTLE_TIME);
    } else {
      clearTimeout(reconnectionTimeOut.current)
      setIsOnlineNotification(true);
    }

    return () => {
      clearTimeout(reconnectionTimeOut.current)
    }
  }, [isOnlineApp]);

  return [
    isOnlineNotification,
    setIsOnlineApp
  ]
}

export default useIsOnlineNotification
