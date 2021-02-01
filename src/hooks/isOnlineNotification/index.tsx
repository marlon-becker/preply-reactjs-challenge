import { useEffect, useRef, useState } from 'react'

const THROTTLE_TIME = 2000
const DISCONNECTED = false

const useIsOnlineNotification = () => {
  const reconnectionTimeOut = useRef<NodeJS.Timeout | null>(null)
  const [isOnlineApp, setIsOnlineApp] = useState<boolean>(false)
  const [isOnlineNotification, setIsOnlineNotification] = useState<boolean>(
    false
  )

  useEffect(() => {
    if (isOnlineApp === DISCONNECTED) {
      reconnectionTimeOut.current = global.setTimeout(() => {
        setIsOnlineNotification(false)
      }, THROTTLE_TIME)
    } else {
      if (reconnectionTimeOut.current) {
        clearTimeout(reconnectionTimeOut.current)
      }
      setIsOnlineNotification(true)
    }

    return () => {
      if (reconnectionTimeOut.current) {
        clearTimeout(reconnectionTimeOut.current)
      }
    }
  }, [isOnlineApp])

  return [isOnlineNotification, setIsOnlineApp]
}

export default useIsOnlineNotification
